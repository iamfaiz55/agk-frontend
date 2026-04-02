'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building } from '@/types';
import FloorCard from '@/components/cards/FloorCard';
import { projectData } from '@/data/mockData';

interface ProjectDrawerProps {
    project: Building;
}

export default function ProjectDrawer({ project }: ProjectDrawerProps) {
    const [isOpen, setIsOpen] = useState(false);

    const commercialFeatures = project.commercialFeatures || [];
    const residentialFeatures = project.residentialFeatures || [];
    const investmentPoints = project.investmentPoints || [];

    return (
        <div className="w-full">
            {/* Project Name Button / Trigger - Centered layout */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full group relative overflow-hidden bg-white hover:bg-gray-50 rounded-[2.5rem] md:rounded-[3.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 p-8 md:p-12 transition-all flex flex-col items-center text-center"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="absolute top-0 left-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full -ml-12 -mt-12 transition-transform group-hover:scale-150" />
                
                <span className="text-[#D4AF37] font-medium uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 block">Project Showcase</span>
                <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tighter group-hover:text-[#D4AF37] transition-colors leading-[1.1]">
                    {project.name}
                </h3>
                
                <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Click to Explore Details</span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0, y: isOpen ? 0 : [0, 5, 0] }}
                        transition={{ y: { repeat: Infinity, duration: 2 } }}
                        className="w-10 h-10 rounded-full bg-gray-900 group-hover:bg-[#D4AF37] text-white flex items-center justify-center text-xl transition-colors shadow-lg"
                    >
                        ↓
                    </motion.div>
                </div>
            </motion.button>

            {/* Hidden Content (Drawer) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="pt-10 pb-20 px-4 md:px-8 space-y-16">
                            
                            {/* 1. Project Overview / Description */}
                            <div className="max-w-4xl mx-auto text-center">
                                <h4 className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-6">About the Development</h4>
                                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light whitespace-pre-line">
                                    {project.description}
                                </p>
                                {project.tagline && (
                                    <p className="mt-8 text-[#D4AF37] font-serif italic text-lg opacity-80">&quot;{project.tagline}&quot;</p>
                                )}
                            </div>

                            {/* 2. Architecture & Hierarchy (Consolidated from ArchitectureSection) */}
                            <div className="space-y-12">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-center">
                                    {projectData.floors.map((floor, index) => (
                                        <FloorCard key={floor.id} floor={floor} delay={index * 0.1} />
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-lg border border-gray-50">
                                    <h5 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-tighter">Vertical <span className="text-[#D4AF37]">Hierarchy</span></h5>
                                    <ul className="space-y-6">
                                        {[
                                            { level: 'BASEMENT', desc: 'Secure Parking Facilities', icon: '🚗' },
                                            { level: 'GROUND FLOOR', desc: 'Commercial Shops & Showrooms', icon: '🏪' },
                                            { level: 'FIRST FLOOR', desc: 'Modern Office Spaces', icon: '🏢' },
                                            { level: '2ND - 6TH FLOOR', desc: 'Premium 3BHK Luxury Flats', icon: '🏠' }
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                                                <span className="text-2xl">{item.icon}</span>
                                                <div className="flex-1">
                                                    <span className="block font-bold text-gray-900 text-[10px] tracking-widest leading-none mb-1">{item.level}</span>
                                                    <span className="text-gray-500 font-normal text-sm">{item.desc}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-gray-50 rounded-[3rem] p-10 md:p-14 border border-gray-100 flex flex-col justify-center">
                                    <h5 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-tighter text-center lg:text-left">Key <span className="text-[#D4AF37]">Assets</span></h5>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { label: 'Location', val: 'Prime Hub', icon: '📍' },
                                            { label: 'Facade', val: 'Iconic Design', icon: '🏛️' },
                                            { label: 'Finish', val: 'Premium Elite', icon: '✨' },
                                            { label: 'Tech', val: 'Smart Ready', icon: '⚡' }
                                        ].map((h, i) => (
                                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100/50 flex flex-col items-center text-center">
                                                <span className="text-2xl mb-2">{h.icon}</span>
                                                <span className="block text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-1">{h.label}</span>
                                                <span className="font-bold text-gray-800 text-xs tracking-wide">{h.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Features (Commercial & Residential) */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Commercial Section */}
                                <div className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <h4 className="text-xl font-bold text-gray-900">Commercial Dominance</h4>
                                    </div>
                                    <ul className="space-y-4">
                                        {commercialFeatures.map((feature, idx) => (
                                            <li key={idx} className="flex gap-3">
                                                <span className="text-[#D4AF37] font-bold">🔹</span>
                                                <p className="text-gray-600 text-sm md:text-base leading-relaxed">{feature}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Residential Section */}
                                <div className="bg-gray-900 p-8 md:p-12 rounded-[2.5rem] text-white">
                                    <div className="flex items-center gap-3 mb-6">
                                        <h4 className="text-xl font-bold">Residential Convenience</h4>
                                    </div>
                                    <ul className="space-y-4">
                                        {residentialFeatures.map((feature, idx) => (
                                            <li key={idx} className="flex gap-3">
                                                <span className="text-[#D4AF37] font-bold">🔹</span>
                                                <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">{feature}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* 4. Investment Points */}
                            <div className="bg-white border-2 border-dashed border-gray-100 p-8 md:p-12 rounded-[2.5rem]">
                                <h4 className="text-xl font-bold text-gray-900 mb-8 text-center uppercase tracking-widest">Investment Advantage</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                    {investmentPoints.map((point, idx) => {
                                        const [title, description] = point.split(':');
                                        return (
                                            <div key={idx} className="text-center group">
                                                <div className="text-2xl font-serif italic text-[#D4AF37] mb-3 opacity-60">0{idx + 1}</div>
                                                <h5 className="font-bold text-gray-900 mb-2 truncate">{title}</h5>
                                                <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-light">{description}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
