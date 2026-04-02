
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Unit } from '@/types';

interface CompactUnitCardProps {
    unit: Unit;
    projectId: number | string;
    projectImage?: string;
    className?: string;
    priority?: boolean;
}

export default function CompactUnitCard({ unit, projectId, projectImage, className = "w-full", priority = false }: CompactUnitCardProps) {
    const statusColors = {
        available: 'bg-green-500',
        reserved: 'bg-yellow-500',
        sold: 'bg-red-500',
    };

    const iconMap = {
        shop: '🏪',
        office: '🏢',
        flat: '🏠',
    };

    // Safe image parsing
    let parsedImages: (string | { url: string; thumbnailUrl?: string })[] = [];
    if (Array.isArray(unit.images)) {
        parsedImages = unit.images;
    } else if (typeof unit.images === 'string') {
        try {
            parsedImages = JSON.parse(unit.images);
        } catch (e) {
            console.error('Failed to parse unit images:', unit.images);
            parsedImages = [];
        }
    }

    // Ensure parsedImages is actually an array
    if (!Array.isArray(parsedImages)) {
        parsedImages = [];
    }

    let mainImage = projectImage || '/images/placeholder.jpg';

    if (parsedImages.length > 0) {
        const firstImg = parsedImages[0];
        if (typeof firstImg === 'string') {
            mainImage = firstImg.startsWith('http') ? firstImg : `https://api.agkinfrastructures.com${firstImg}`;
        } else if (typeof firstImg === 'object' && firstImg !== null) {
            // Prefer thumbnail if available, then url
            const imgPath = firstImg.thumbnailUrl || firstImg.url || '';
            if (imgPath) {
                mainImage = imgPath.startsWith('http') ? imgPath : `https://api.agkinfrastructures.com${imgPath}`;
            }
        }
    }

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`flex-shrink-0 ${className}`}
        >
            <Link href={`/projects/${projectId}/unit/${unit.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                    <div className="relative aspect-square">
                        <Image
                            src={mainImage}
                            alt={unit.type}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                            unoptimized
                            priority={priority}
                        />
                        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${statusColors[unit.status]} shadow-glow`} />
                        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm p-1 rounded-lg">
                            <span className="text-sm">{iconMap[unit.type]}</span>
                        </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                            <h4 className="text-xs md:text-sm font-normal text-gray-900 line-clamp-1 uppercase tracking-[0.1em] mb-1">
                                {unit.type} {unit.id}
                            </h4>
                            <p className="text-[10px] md:text-xs text-gray-400 font-normal">Floor {unit.floorNumber}</p>
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-3">
                            <span className="text-xs md:text-base font-medium text-[#D4AF37]">Price on Request</span>
                            <span className="text-[9px] md:text-[10px] text-gray-300 font-normal uppercase tracking-widest">{unit.size}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
