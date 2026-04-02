'use client';

import { useState, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CompactUnitCard from '@/components/cards/CompactUnitCard';
import ProjectDrawer from '@/components/home/ProjectDrawer';
import { useGetProjectsQuery } from '@/redux/api/projectsApi';
import { useGetBuildingUnitsQuery } from '@/redux/api/unitsApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { Unit } from '@/types';

type TabType = 'overview' | 'shops' | 'offices' | 'flats';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function ProjectDetailsClient({ params }: PageProps) {
    const resolvedParams = use(params);
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const { data: projects, isLoading: loading, error } = useGetProjectsQuery();
    
    const building = projects?.find(p => p.id.toString() === resolvedParams.id);
    
    const { data: unitsData} = useGetBuildingUnitsQuery(
        building?.id || skipToken,
        { skip: !building?.id }
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-xl text-gray-400 font-medium animate-pulse">Loading project details...</div>
            </div>
        );
    }

    if (error || !building) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-2xl font-normal text-red-600 mb-2">Project Not Found</h2>
                    <p className="text-gray-500 mb-6 font-normal">The project you are looking for does not exist or has been removed.</p>
                    <Link href="/projects" className="text-[#D4AF37] font-medium hover:underline">← Back to Projects</Link>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview' as TabType, label: 'Overview' },
        { id: 'shops' as TabType, label: 'Shops' },
        { id: 'offices' as TabType, label: 'Offices' },
        { id: 'flats' as TabType, label: 'Flats' },
    ];

    // Filter units
    const units = unitsData || building.units || [];
    const shops = units.filter((u: Unit) => u.type === 'shop');
    const offices = units.filter((u: Unit) => u.type === 'office');
    const flats = units.filter((u: Unit) => u.type === 'flat');

    // Prepare images for display
    const allImages = building.images?.flatMap(section => section.images) || [];
    const mainHeroImage = allImages.length > 0 ? allImages[0] : '/images/placeholder.jpg';

    // Helper to get unit image URL (same logic as CompactUnitCard)
    const getUnitImageUrl = (unit: Unit, projectImage?: string) => {
        let parsedImages: (string | { url: string; thumbnailUrl?: string })[] = [];
        if (Array.isArray(unit.images)) {
            parsedImages = unit.images;
        } else if (typeof unit.images === 'string') {
            try {
                parsedImages = JSON.parse(unit.images);
            } catch {
                parsedImages = [];
            }
        }
        
        let mainImage = projectImage || '/images/placeholder.jpg';
        if (Array.isArray(parsedImages) && parsedImages.length > 0) {
            const firstImg = parsedImages[0];
            let imgPath = '';
            if (typeof firstImg === 'string') {
                imgPath = firstImg;
            } else if (typeof firstImg === 'object' && firstImg !== null) {
                imgPath = firstImg.thumbnailUrl || firstImg.url || '';
            }
            
            if (imgPath) {
                mainImage = imgPath.startsWith('http') ? imgPath : `https://api.agkinfrastructures.com${imgPath}`;
            }
        }
        return mainImage;
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Image Preloader - Hidden */}
            <div style={{ display: 'none' }} aria-hidden="true">
                {units.map((unit: Unit) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                        key={`preload-${unit.id}`}
                        src={getUnitImageUrl(unit, mainHeroImage)}
                        alt=""
                        onLoad={() => {}} // Optional: might trigger earlier load
                    />
                ))}
            </div>

            <Header />

            {/* Hero Section - Full Image with Side Animations */}
            <section className="relative h-[60vh] min-h-[400px] lg:h-[80vh] lg:min-h-[600px] overflow-hidden bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src={mainHeroImage}
                        alt={building.name}
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="100vw"
                        unoptimized
                    />
                </div>
                <div className="absolute inset-0 bg-black/20" />

                {/* Animated Left Side Elements */}
                <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30"
                    >
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-4xl mb-3 text-center"
                        >
                            🏢
                        </motion.div>
                        <p className="text-2xl font-bold text-gray-900 text-center mb-1">
                            {units?.length || 0}
                        </p>
                        <p className="text-xs text-gray-600 uppercase tracking-wider text-center">Total Units</p>
                    </motion.div>
                </div>

                {/* Animated Right Side Elements */}
                <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-10">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30 space-y-4"
                    >
                        <motion.div
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/10 rounded-xl p-3 text-center border border-[#D4AF37]/30"
                        >
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                                className="text-2xl mb-1"
                            >
                                🏪
                            </motion.div>
                            <p className="text-lg font-bold text-gray-900">{shops.length}</p>
                            <p className="text-xs text-gray-600 uppercase">Shops</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/10 rounded-xl p-3 text-center border border-[#D4AF37]/30"
                        >
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                                className="text-2xl mb-1"
                            >
                                🏢
                            </motion.div>
                            <p className="text-lg font-bold text-gray-900">{offices.length}</p>
                            <p className="text-xs text-gray-600 uppercase">Offices</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/10 rounded-xl p-3 text-center border border-[#D4AF37]/30"
                        >
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                                className="text-2xl mb-1"
                            >
                                🏠
                            </motion.div>
                            <p className="text-lg font-bold text-gray-900">{flats.length}</p>
                            <p className="text-xs text-gray-600 uppercase">Flats</p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Floating Decorative Elements */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="hidden lg:block absolute top-20 left-20 text-5xl"
                >
                    ✨
                </motion.div>
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        rotate: [0, -10, 10, 0],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                    className="hidden lg:block absolute bottom-20 right-20 text-5xl"
                >
                    ⭐
                </motion.div>
            </section>

            {/* Project Info Section - Below Image */}
            <section className="bg-white py-8 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
                    >
                        <div className="py-4">
                            <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-6 tracking-tighter">
                                {building.name}
                            </h1>
                            <div className="flex items-center text-gray-400 text-sm md:text-lg font-normal tracking-wide">
                                <span className="mr-3 text-[#D4AF37]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </span>
                                <span>{building.address}</span>
                            </div>
                        </div>
                        <div className="hidden md:block text-right">
                            <span className="bg-[#FDF8E7] text-[#D4AF37] px-4 py-2 rounded-lg font-medium text-xs uppercase tracking-[0.2em]">
                                Premium Real Estate Development
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Sticky Tabs Navigation */}
            <section className="sticky top-[73px] z-[50] bg-white border-y border-gray-100 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex overflow-x-auto no-scrollbar gap-2 py-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-8 py-3 font-medium text-sm md:text-base whitespace-nowrap transition-all rounded-lg border-2 ${activeTab === tab.id
                                    ? 'border-gray-900 text-[#D4AF37]'
                                    : 'border-transparent text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tab Content */}
            <section className="py-16 bg-gray-50/30">
                <div className="container mx-auto px-4">
                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 p-8 md:p-16 mb-12 border border-gray-50">
                                    <h2 className="text-2xl md:text-3xl font-normal text-gray-900 mb-8 tracking-tight">About <span className="text-[#D4AF37]">{building.name}</span></h2>
                                    <p className="text-lg text-gray-500 leading-relaxed font-normal mb-12 whitespace-pre-line">{building.description}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="space-y-8">
                                            <h3 className="text-xl font-normal text-gray-900 uppercase tracking-[0.2em] mb-8">Premium Amenities</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                {building.amenities?.map((amenity) => (
                                                    <div key={amenity.id} className="flex items-center p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                                                        <span className="text-2xl mr-3">{amenity.icon}</span>
                                                        <span className="font-medium text-xs text-gray-700 uppercase tracking-wide">{amenity.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-gray-900 rounded-[2rem] p-10 text-white relative overflow-hidden flex flex-col justify-center">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                                            <h3 className="text-xl font-normal mb-8 uppercase tracking-[0.2em]">Inventory Status</h3>
                                            <div className="space-y-5">
                                                <div className="flex justify-between border-b border-white/5 pb-3">
                                                    <span className="text-gray-500 text-xs uppercase tracking-widest font-medium">Total Units</span>
                                                    <span className="font-medium">{units?.length || 0}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-white/5 pb-3">
                                                    <span className="text-gray-500 text-xs uppercase tracking-widest font-medium">Project Status</span>
                                                    <span className="font-medium text-[#D4AF37]">Available</span>
                                                </div>
                                                <div className="flex justify-between border-b border-white/5 pb-3">
                                                     <span className="text-gray-500 text-xs uppercase tracking-widest font-medium">Digital Gallery</span>
                                                     <span className="font-medium text-xs uppercase tracking-widest">
                                                         {building.images?.reduce((sum, s) => sum + s.images.length, 0) || 0} Assets
                                                     </span>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>

                                     {/* Section-based Gallery */}
                                     {building.images && building.images.length > 0 && (
                                         <div className="mt-20 space-y-16">
                                             <div className="text-center max-w-2xl mx-auto mb-12">
                                                 <h3 className="text-3xl font-normal text-gray-900 tracking-tighter uppercase mb-4">Project <span className="text-[#D4AF37]">Gallery</span></h3>
                                                 <div className="h-1 w-20 bg-[#D4AF37] mx-auto opacity-30"></div>
                                             </div>

                                             {/* Filter sections with existing images and map */}
                                             {building.images.filter(section => section.images && section.images.length > 0).map((section, idx) => (
                                                 <div key={idx} className="space-y-6">
                                                     <div className="flex items-center gap-4">
                                                         <h4 className="text-sm font-bold text-gray-900 uppercase tracking-[0.3em] whitespace-nowrap">{section.title}</h4>
                                                         <div className="h-px w-full bg-gray-100"></div>
                                                     </div>
                                                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                         {section.images.map((url: string, iIdx: number) => (
                                                             <motion.div
                                                                 key={iIdx}
                                                                 whileHover={{ y: -8 }}
                                                                 className="relative aspect-video rounded-[1.5rem] overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100 group"
                                                             >
                                                                 <Image
                                                                     src={url.startsWith('http') ? url : `https://api.agkinfrastructures.com${url}`}
                                                                     alt={`${section.title} view ${iIdx + 1}`}
                                                                     fill
                                                                     className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                                     unoptimized
                                                                 />
                                                                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                             </motion.div>
                                                         ))}
                                                     </div>
                                                 </div>
                                             ))}
                                         </div>
                                     )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'shops' && (
                            <motion.div
                                key="shops"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                            >
                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {shops.map((shop: Unit) => (
                                        <CompactUnitCard key={shop.id} unit={shop} projectId={building.id} projectImage={mainHeroImage} />
                                    ))}
                                    {shops.length === 0 && <p className="col-span-full text-center py-24 text-gray-400 font-medium uppercase tracking-[0.2em] text-xs">No commercial shops available</p>}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'offices' && (
                            <motion.div
                                key="offices"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {offices.map((office: Unit) => (
                                        <CompactUnitCard key={office.id} unit={office} projectId={building.id} projectImage={mainHeroImage} />
                                    ))}
                                    {offices.length === 0 && <p className="col-span-full text-center py-24 text-gray-400 font-medium uppercase tracking-[0.2em] text-xs">No office spaces available</p>}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'flats' && (
                            <motion.div
                                key="flats"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {flats.map((flat: Unit) => (
                                        <CompactUnitCard key={flat.id} unit={flat} projectId={building.id} projectImage={mainHeroImage} />
                                    ))}
                                    {flats.length === 0 && <p className="col-span-full text-center py-24 text-gray-400 font-medium uppercase tracking-[0.2em] text-xs">No luxury flats available</p>}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            <div className="container mx-auto px-4 pb-24">
                 <ProjectDrawer project={building} />
            </div>
            <Footer />
        </div>
    );
}
