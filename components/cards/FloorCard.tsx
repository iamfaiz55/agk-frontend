'use client';

import { motion } from 'framer-motion';
import { Floor } from '@/data/mockData';

interface FloorCardProps {
  floor: Floor;
  delay?: number;
}

export default function FloorCard({ floor, delay = 0 }: FloorCardProps) {
  const icons = {
    parking: '🚗',
    shops: '🏪',
    offices: '🏢',
    flats: '🏠',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-[1.5rem] p-6 md:p-8 shadow-xl shadow-gray-100/50 border border-gray-50 flex flex-col items-center text-center h-full"
    >
      <div className="text-4xl md:text-5xl mb-6">{icons[floor.type]}</div>
      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 tracking-tight">{floor.name}</h3>
      <p className="text-xs md:text-sm text-gray-400 font-normal leading-relaxed mb-4 flex-1">{floor.description}</p>
      {floor.count && (
        <div className="text-[10px] md:text-xs font-bold text-[#D4AF37] uppercase tracking-widest mt-auto">
          {floor.count} {floor.type === 'flats' ? 'Flats' : floor.type === 'shops' ? 'Shops' : 'Offices'}
        </div>
      )}
    </motion.div>
  );
}

