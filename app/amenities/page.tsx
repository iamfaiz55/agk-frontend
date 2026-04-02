
'use client';

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AmenityCard from '@/components/cards/AmenityCard';
import { useGetProjectsQuery } from '@/redux/api/projectsApi';

export default function AmenitiesPage() {
  const { data: projects, isLoading, error } = useGetProjectsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-gray-400 font-medium animate-pulse">Loading amenities...</div>
      </div>
    );
  }

  if (error || !projects) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-red-500 font-medium">Failed to load amenities. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <div className="h-20"></div> {/* Spacer for fixed navbar */}

      <section className="py-24 bg-gray-50/20 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-[#D4AF37] font-medium text-[10px] uppercase tracking-[0.3em] mb-3 block">Lifestyle & Comfort</span>
            <h1 className="text-4xl md:text-6xl font-normal text-gray-900 mb-6 tracking-tighter">
              Premium <span className="text-[#D4AF37]">Amenities</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-normal leading-relaxed">
              Experience the curated selection of luxury features across our signature developments.
            </p>
          </motion.div>

          {projects.map((project, pIndex) => (
            <div key={project.id} className="mb-24 last:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-5 mb-10 border-l-[3px] border-[#D4AF37] pl-8"
              >
                <div>
                  <h2 className="text-2xl font-normal text-gray-900 tracking-tight">{project.name}</h2>
                  <p className="text-gray-400 text-sm font-normal">📍 {project.address}</p>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
                {project.amenities && project.amenities.length > 0 ? (
                  project.amenities.map((amenity, aIndex) => (
                    <AmenityCard
                      key={amenity.id}
                      amenity={amenity}
                      delay={(pIndex * 0.2) + (aIndex * 0.1)}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center bg-white rounded-[2rem] border border-dashed border-gray-100 shadow-sm">
                    <p className="text-gray-400 font-normal">No amenities listed for this project yet.</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
