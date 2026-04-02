
'use client';

import { motion } from 'framer-motion';
import AmenityCard from '@/components/cards/AmenityCard';
import { projectData } from '@/data/mockData';

import { Amenity, Building } from '@/types';

interface AmenitiesSectionProps {
    project?: Building;
    amenities?: Amenity[];
}

export const AmenitiesSection = ({ project, amenities }: AmenitiesSectionProps) => {
    // Prioritize passed amenities, then project amenities, then mock data
    const displayAmenities = (amenities && amenities.length > 0) 
        ? amenities 
        : (project?.amenities && project.amenities.length > 0) 
            ? project.amenities 
            : projectData.amenities;

    return (
        <section id="amenities" className="py-32 bg-white relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gray-50 -skew-x-12 -translate-x-1/2" />
            <div className="container mx-auto px-4 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '400px' }}
                    className="mb-24 text-center"
                >
                    <span className="text-[#D4AF37] font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block">Exclusive Living</span>
                    <h2 className="text-4xl md:text-6xl font-normal text-gray-900 mb-8 tracking-tighter">
                        Premium <span className="text-[#D4AF37]">Lifestyle</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-normal leading-relaxed">
                        Every detail is curated to provide a sophisticated sanctuary, merging comfort with cutting-edge amenities.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12">
                     {displayAmenities.map((amenity: Amenity, index: number) => (
                        <AmenityCard key={amenity.id || index} amenity={amenity} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AmenitiesSection;
