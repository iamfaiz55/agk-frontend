'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGetProjectsQuery } from '@/redux/api/projectsApi';
import { projectData } from '@/data/mockData';

export default function AboutProjectShowcase() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

    // Fetch real project data
    const { data: projects } = useGetProjectsQuery({ includeUnits: false });
    // Fallback to mock data if API fails or no projects
    const project = projects?.find(p => p.name.includes("Pearl")) || projects?.[0] || {
        id: 'pearl-heights',
        name: projectData.name,
        description: projectData.description,
        images: [{ title: 'Main Gallery', images: [projectData.heroImage] }]
    };

    const projectImage = project.images?.[0]?.images?.[0] || projectData.heroImage;
    const imageUrl = projectImage.startsWith('http') ? projectImage : `https://api.agkinfrastructures.com${projectImage}`;

    return (
        <section ref={containerRef} className="py-24 bg-zinc-900 text-white overflow-hidden relative">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('/images/grid-pattern.svg')] mix-blend-overlay" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Content Side */}
                    <div className="w-full lg:w-1/2">
                        <motion.div style={{ y }}>
                            <span className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
                                Flagship Development
                            </span>
                            <h2 className="text-4xl md:text-6xl font-normal mb-8 tracking-tighter leading-tight text-white">
                                Pearl <span className="font-serif italic text-[#D4AF37]">Heights</span>
                            </h2>
                            
                            <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light max-w-xl">
                                A testament to our vision, Pearl Heights stands as a beacon of modern living in Chhatrapati Sambhajinagar. This G+6 mixed-use marvel seamlessly integrates premium residential spaces with high-value commercial zones.
                            </p>

                            <div className="flex flex-wrap gap-6 mb-12">
                                <div className="border-l border-[#D4AF37] pl-4">
                                    <span className="block text-2xl font-light text-white">G+6</span>
                                    <span className="text-xs uppercase tracking-widest text-gray-500">Floors</span>
                                </div>
                                <div className="border-l border-[#D4AF37] pl-4">
                                    <span className="block text-2xl font-light text-white">Mixed</span>
                                    <span className="text-xs uppercase tracking-widest text-gray-500">Use Type</span>
                                </div>
                                <div className="border-l border-[#D4AF37] pl-4">
                                    <span className="block text-2xl font-light text-white">Prime</span>
                                    <span className="text-xs uppercase tracking-widest text-gray-500">Location</span>
                                </div>
                            </div>

                            <Link href="/projects" className="inline-flex items-center gap-3 text-[#D4AF37] uppercase tracking-widest text-sm font-medium hover:text-white transition-colors group">
                                Explore Project
                                <span className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                                    →
                                </span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Image Side */}
                    <div className="w-full lg:w-1/2">
                         <motion.div 
                            style={{ scale: imageScale }}
                            className="relative h-[500px] md:h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl shadow-black/50 border border-white/10"
                        >
                            <Image
                                src={imageUrl}
                                alt="Pearl Heights Building"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                            
                            <div className="absolute bottom-8 left-8 right-8">
                                <p className="font-serif italic text-2xl text-white/90">
                                    "Where luxury meets lifestyle."
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
