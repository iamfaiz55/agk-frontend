'use client';

import { useState, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useGetProjectsQuery } from '@/redux/api/projectsApi';
import { useGetGalleriesQuery } from '@/redux/api/galleryApi';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function GalleryDetailClient({ params }: PageProps) {
    const resolvedParams = use(params);
    const { data: projects, isLoading: projectsLoading } = useGetProjectsQuery({ includeUnits: false });
    const { data: galleryImages = [], isLoading: galleryLoading } = useGetGalleriesQuery({ buildingId: resolvedParams.id });
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const project = projects?.find(p => p.id.toString() === resolvedParams.id);

    // Helper functions for lightbox
    const showNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
        }
    };

    const showPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
        }
    };

    if (projectsLoading || galleryLoading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="container mx-auto px-4 pt-40 pb-20 flex justify-center">
                    <div className="animate-pulse text-gray-300 text-xl">Loading...</div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="container mx-auto px-4 pt-40 pb-20 text-center">
                    <h1 className="text-2xl mb-4">Project Not Found</h1>
                    <Link href="/gallery" className="text-[#D4AF37] underline">Back to Gallery</Link>
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
                <div className="mb-12">
                    <Link href="/gallery" className="text-gray-400 hover:text-[#D4AF37] text-sm uppercase tracking-widest mb-4 inline-block transition-colors">
                        ← Back to all folders
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-2 tracking-tighter">
                                {project.name}
                            </h1>
                            <p className="text-gray-500 text-lg">{project.address}</p>
                        </div>
                        <div className="text-right hidden md:block">
                            <span className="text-6xl font-thin text-[#D4AF37]/20">
                                {String(galleryImages.length).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                </div>

                {galleryImages.length === 0 ? (
                    <div className="py-24 text-center bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
                        <p className="text-gray-400 font-medium">No images uploaded to this gallery yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {galleryImages.map((img, index) => (
                            <motion.div
                                key={img.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-zoom-in bg-gray-100 shadow-lg hover:shadow-xl transition-shadow"
                                onClick={() => setSelectedImageIndex(index)}
                            >
                                <Image
                                    src={img.imageUrl}
                                    alt={project.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority={index < 4}
                                    unoptimized
                                    decoding="sync"
                                />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-3xl font-light">+</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10010] bg-black/95 backdrop-blur-md flex flex-col"
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-white/50 hover:text-white p-4 z-[10020]"
                            onClick={() => setSelectedImageIndex(null)}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 md:p-4 z-[10020]"
                            onClick={showPrev}
                        >
                            <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 md:p-4 z-[10020]"
                            onClick={showNext}
                        >
                            <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Image Container */}
                        <div
                            className="flex-1 relative w-full h-full flex items-center justify-center overflow-hidden px-12 md:px-20 py-12 md:py-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                key={selectedImageIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={galleryImages[selectedImageIndex].imageUrl}
                                    alt={galleryImages[selectedImageIndex].description || "Full screen view"}
                                    fill
                                    className="object-contain"
                                    quality={100}
                                    priority
                                />
                            </motion.div>
                        </div>

                        {/* Caption & Counter */}
                        <div className="w-full text-center pb-8 pt-4 px-4 z-[10020] bg-gradient-to-t from-black to-transparent flex-shrink-0">
                             {galleryImages[selectedImageIndex].description && (
                                <p className="text-white text-lg font-medium mb-2 max-w-3xl mx-auto drop-shadow-md">
                                    {galleryImages[selectedImageIndex].description}
                                </p>
                            )}
                            <div className="text-white/60 font-mono text-sm tracking-widest uppercase">
                                {selectedImageIndex + 1} / {galleryImages.length}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
