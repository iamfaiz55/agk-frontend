'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Flat } from '@/data/mockData';

interface FlatCardProps {
  flat: Flat;
  delay?: number;
}

export default function FlatCard({ flat, delay = 0 }: FlatCardProps) {
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    booked: 'bg-yellow-100 text-yellow-800',
    sold: 'bg-red-100 text-red-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden cursor-pointer group"
    >
      <Link href={`/flats/${flat.id}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={flat.image}
            alt={`Flat ${flat.flatNumber}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[flat.status]}`}>
            {flat.status.toUpperCase()}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Flat {flat.flatNumber}</h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <span className="font-medium mr-2">Area:</span>
              <span>{flat.area}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="font-medium mr-2">Type:</span>
              <span>{flat.type}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="font-medium mr-2">Floor:</span>
              <span>{flat.floor}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <span className="text-2xl font-bold text-[#D4AF37]">{flat.price}</span>
            <span className="text-[#D4AF37] font-semibold group-hover:underline">View Details →</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

