
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Building } from '@/types';

interface ProjectCardProps {
    project: Building;
    delay?: number;
}

export default function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
    // Find the primary building image
    // Find the primary building image
    const heroImage = project.images?.[0]?.images?.[0] || '/images/placeholder.jpg';

    // Count units types
    // Count units types
    // Use pre-calculated counts from API if available, otherwise calculate from units array
    const projectStats = project as Building & { shops?: number; offices?: number; flats?: number };
    const shopCount = projectStats.shops !== undefined ? projectStats.shops : (project.units?.filter(u => u.type === 'shop').length || 0);
    const officeCount = projectStats.offices !== undefined ? projectStats.offices : (project.units?.filter(u => u.type === 'office').length || 0);
    const flatCount = projectStats.flats !== undefined ? projectStats.flats : (project.units?.filter(u => u.type === 'flat').length || 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '400px' }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -10 }}
            className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden">
                <Image
                    src={heroImage}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                    priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute bottom-4 left-6">
                    <span className="bg-[#D4AF37] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Premium
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {project.name}
                </h3>
                <p className="text-gray-500 mb-6 flex items-center text-sm">
                    <span className="mr-1">📍</span> {project.address}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8 py-4 border-y border-gray-50">
                    <div className="text-center">
                        <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Shops</p>
                        <p className="text-lg font-bold text-gray-800">{shopCount}</p>
                    </div>
                    <div className="text-center border-x border-gray-100">
                        <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Offices</p>
                        <p className="text-lg font-bold text-gray-800">{officeCount}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Flats</p>
                        <p className="text-lg font-bold text-gray-800">{flatCount}</p>
                    </div>
                </div>

                <div className="mt-auto">
                    <Link href={`/projects/${project.id}`}>
                        <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-[#D4AF37] transition-all transform active:scale-95 shadow-lg hover:shadow-[#D4AF37]/20">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
