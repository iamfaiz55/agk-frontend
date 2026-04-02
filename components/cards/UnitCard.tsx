
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Unit } from '@/types';

interface UnitCardProps {
    unit: Unit;
    projectId: number | string;
    projectImage?: string;
    delay?: number;
}

export default function UnitCard({ unit, projectId, projectImage, delay = 0 }: UnitCardProps) {
    const statusColors = {
        available: 'bg-green-100 text-green-800',
        reserved: 'bg-yellow-100 text-yellow-800',
        sold: 'bg-red-100 text-red-800',
    };

    const iconMap = {
        shop: '🏪',
        office: '🏢',
        flat: '🏠',
    };

    // Safe image handling
    let mainImage = projectImage || '/images/placeholder.jpg';
    
    if (unit.images) {
        // Handle if images is a string (JSON) or array
        let img: string | { url: string } | null = null;
        
        if (Array.isArray(unit.images) && unit.images.length > 0) {
            img = unit.images[0];
        } else if (typeof unit.images === 'string') {
            try {
                const parsed = JSON.parse(unit.images);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    img = parsed[0];
                }
            } catch {
                // Formatting error, ignore
            }
        }

        if (img) {
            // Check if img is object (legacy) or string
            const url = typeof img === 'object' ? img.url : img;
            if (url) {
                mainImage = url.startsWith('http') ? url : `https://api.agkinfrastructures.com${url}`;
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden cursor-pointer group"
        >
            <Link href={`/projects/${projectId}/unit/${unit.id}`}>
                <div className="relative h-56 overflow-hidden">
                    <Image
                        src={mainImage}
                        alt={`${unit.type} detail`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg ${statusColors[unit.status]}`}>
                        {unit.status.toUpperCase()}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-2xl shadow-lg">
                        <span className="text-2xl">{iconMap[unit.type]}</span>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 capitalize">
                                {unit.type} #{unit.id}
                            </h3>
                            <p className="text-gray-500 font-medium">Floor {unit.floorNumber}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-black text-[#D4AF37]">Price on Request</p>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Contact for Price</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-50 p-3 rounded-2xl">
                            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Area</p>
                            <p className="text-sm font-bold text-gray-700">{unit.size}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-2xl">
                            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Status</p>
                            <p className="text-sm font-bold text-gray-700 capitalize">{unit.status}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between group-hover:translate-x-1 transition-transform">
                        <span className="text-gray-900 font-bold text-sm">View Details</span>
                        <span className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors">→</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
