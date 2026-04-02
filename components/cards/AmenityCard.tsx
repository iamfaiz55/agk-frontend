'use client';

import { motion } from 'framer-motion';
import { Amenity } from '@/types';

interface AmenityCardProps {
  amenity: Amenity;
  delay?: number;
}

export default function AmenityCard({ amenity, delay = 0 }: AmenityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white border border-gray-50 rounded-[1.5rem] p-6 shadow-xl shadow-gray-100/50 text-center transition-all group flex flex-col items-center h-full"
    >
      <div className="text-4xl md:text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">{amenity.icon}</div>
      <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2 tracking-tight uppercase leading-tight">{amenity.name}</h3>
      <p className="text-[10px] md:text-xs text-gray-500 font-normal leading-relaxed flex-1">{amenity.description}</p>
    </motion.div>
  );
}

