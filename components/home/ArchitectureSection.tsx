
'use client';

import { motion } from 'framer-motion';
import FloorCard from '@/components/cards/FloorCard';
import { projectData } from '@/data/mockData';

import { Building } from '@/types';

export const ArchitectureSection = ({ project }: { project: Building }) => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 translate-x-1/2" />
            <div className="container mx-auto px-4 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '400px' }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <span className="text-[#D4AF37] font-medium uppercase tracking-[0.3em] text-[10px] mb-3 block text-center">Development Details</span>
                    <h2 className="text-4xl md:text-6xl font-normal text-gray-900 mb-6 text-center tracking-tighter">
                        Project <span className="text-[#D4AF37]">Architecture</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-3xl mx-auto text-center font-normal leading-relaxed whitespace-pre-line">
                        {project?.description || projectData.description}
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20 text-center">
                    {projectData.floors.map((floor, index) => (
                        <FloorCard key={floor.id} floor={floor} delay={index * 0.1} />
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl shadow-gray-100 border border-gray-50 relative">
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#D4AF37] rounded-full blur-sm opacity-50" />
                    <div>
                        <h3 className="text-2xl font-normal text-gray-900 mb-8 tracking-tighter uppercase">Vertical <span className="text-[#D4AF37]">Hierarchy</span></h3>
                        <ul className="space-y-6">
                            {[
                                { level: 'BASEMENT', desc: 'Secure Parking Facilities' },
                                { level: 'GROUND FLOOR', desc: 'Commercial Shops & Showrooms' },
                                { level: 'FIRST FLOOR', desc: 'Modern Office Spaces' },
                                { level: '2ND - 6TH FLOOR', desc: 'Premium 3BHK Luxury Flats' }
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                                    <div>
                                        <span className="block font-medium text-gray-900 text-xs tracking-widest leading-none mb-1">{item.level}</span>
                                        <span className="text-gray-400 font-normal text-sm">{item.desc}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="border-t md:border-t-0 md:border-l border-gray-100 pt-10 md:pt-0 md:pl-12">
                        <h3 className="text-2xl font-normal text-gray-900 mb-8 tracking-tighter uppercase">Key <span className="text-[#D4AF37]">Features</span></h3>
                        <ul className="grid grid-cols-2 gap-4">
                            {['Prime Location', 'Iconic Facade', 'Elite Finish', 'Smart Home Ready'].map((h, i) => (
                                <li key={i} className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/50">
                                    <span className="block text-[#D4AF37] text-xs mb-1">✦</span>
                                    <span className="font-medium text-gray-800 text-sm tracking-wide">{h}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ArchitectureSection;
