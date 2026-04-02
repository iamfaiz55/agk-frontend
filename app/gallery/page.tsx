'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useGetProjectsQuery } from '@/redux/api/projectsApi';
import { useGetGalleriesQuery } from '@/redux/api/galleryApi';

export default function GalleryListingPage() {
    const { data: projects, isLoading: projectsLoading } = useGetProjectsQuery({ includeUnits: false });
    const { data: allGalleries = [], isLoading: galleriesLoading } = useGetGalleriesQuery();

    if (projectsLoading || galleriesLoading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="container mx-auto px-4 pt-32 pb-20 flex justify-center">
                    <div className="animate-pulse text-gray-300 text-xl tracking-widest uppercase">Loading Gallery...</div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Header />
            <div className="h-24"></div>

            <main className="container mx-auto px-4 py-8">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-normal text-gray-900 mb-4 tracking-tighter"
                    >
                        Project <span className="text-[#D4AF37]">Gallery</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 max-w-2xl mx-auto font-normal text-lg"
                    >
                        Explore visual stories of our completed and ongoing premium developments.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {projects?.map((project, index) => {
                        const projectGalleryImages = allGalleries.filter(g => g.buildingId === project.id);
                        
                        // Find a representative image: either first gallery image, or first project image
                        const coverImage = projectGalleryImages[0]?.imageUrl
                            || project.images?.[0]?.images?.[0]
                            || '/images/placeholder.jpg';

                        const galleryCount = projectGalleryImages.length;

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/gallery/${project.id}`} className="group block">
                                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-100 border border-gray-100 bg-gray-100">
                                        <Image
                                            src={coverImage}
                                            alt={project.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            priority={true}
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                        {/* Folder Tab Effect */}
                                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-500">
                                            <div className="bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                                                <span className="text-xl">↗</span>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-0 left-0 p-8 w-full">
                                            <p className="text-[#D4AF37] font-medium text-xs uppercase tracking-[0.2em] mb-2">
                                                {galleryCount} Photos
                                            </p>
                                            <h3 className="text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                                                {project.name}
                                            </h3>
                                            <p className="text-white/60 text-sm mt-1 line-clamp-1 font-light">
                                                {project.address}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {(!projects || projects.length === 0) && (
                    <div className="text-center py-20 text-gray-400">
                        No projects found.
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
