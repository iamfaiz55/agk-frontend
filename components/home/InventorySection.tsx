
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CompactUnitCard from '@/components/cards/CompactUnitCard';

import { Building, Unit } from '@/types';

interface InventorySectionProps {
    project: Building;
    projectImageUrl: string;
    units?: Unit[];
}

export const InventorySection = ({ project, projectImageUrl, units }: InventorySectionProps) => {
    // If units are passed explicitly (from unitsApi), use them. 
    // Otherwise fallback to project?.units (from projectsApi includeUnits=true)
    const displayUnits = units || project?.units || [];

    return (
        <section className="py-20 bg-gray-50/50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '400px' }}
                    className="mb-16 text-center"
                >
                    <span className="text-[#D4AF37] font-medium uppercase tracking-[0.3em] text-[10px] mb-3 block">Digital Catalog</span>
                    <h2 className="text-3xl md:text-5xl font-normal text-gray-900 tracking-tighter">
                        Featured <span className="text-[#D4AF37]">Inventory</span>
                    </h2>
                </motion.div>

                {/* Shops Row */}
                <div className="mb-16">
                    <div className="flex justify-between items-end mb-6">
                        <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">01. Premium Shops</h3>
                        <Link href="/projects" className="text-[10px] font-medium text-[#D4AF37] uppercase tracking-widest hover:underline">View All Shops</Link>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-6 snap-x hide-scrollbar thin-scrollbar">
                        {displayUnits.filter((u: Unit) => u.type === 'shop').map((unit: Unit, idx: number) => (
                            <CompactUnitCard key={unit.id} unit={unit} projectId={project?.id || unit.buildingId || 1} projectImage={projectImageUrl} className="w-[48%] md:w-[30%] lg:w-[23%] snap-start" priority={idx < 4} />
                        ))}
                    </div>
                </div>

                {/* Offices Row */}
                <div className="mb-16">
                    <div className="flex justify-between items-end mb-6">
                        <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">02. Modern Offices</h3>
                        <Link href="/projects" className="text-[10px] font-medium text-[#D4AF37] uppercase tracking-widest hover:underline">View All Offices</Link>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-6 snap-x hide-scrollbar thin-scrollbar">
                        {displayUnits.filter((u: Unit) => u.type === 'office').map((unit: Unit, idx: number) => (
                            <CompactUnitCard key={unit.id} unit={unit} projectId={project?.id || unit.buildingId || 1} projectImage={projectImageUrl} className="w-[48%] md:w-[30%] lg:w-[23%] snap-start" priority={idx < 4} />
                        ))}
                    </div>
                </div>

                {/* Flats Row */}
                <div>
                    <div className="flex justify-between items-end mb-6">
                        <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">03. Luxury Flats</h3>
                        <Link href="/projects" className="text-[10px] font-medium text-[#D4AF37] uppercase tracking-widest hover:underline">View All Flats</Link>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-6 snap-x hide-scrollbar thin-scrollbar">
                        {displayUnits.filter((u: Unit) => u.type === 'flat').map((unit: Unit, idx: number) => (
                            <CompactUnitCard key={unit.id} unit={unit} projectId={project?.id || unit.buildingId || 1} projectImage={projectImageUrl} className="w-[48%] md:w-[30%] lg:w-[23%] snap-start" priority={idx < 4} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InventorySection;
