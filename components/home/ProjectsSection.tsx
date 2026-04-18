'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6"/>
    </svg>
);
import { Building } from '@/types';

const ProjectsSection = ({ projects = [] }: { projects?: Building[] }) => {
  const fallbackProjects = [
    { 
        id: undefined,
        img: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop', 
        type: 'Commercial', 
        title: 'Skyline Business Hub', 
        loc: 'Downtown Metro', 
        desc: 'A sprawling modern commercial hub built with state-of-the-art clear glass facades.' 
    },
    { 
        id: undefined,
        img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2012&auto=format&fit=crop', 
        type: 'Residential', 
        title: 'Azure Horizons', 
        loc: 'Westbay Valley', 
        desc: 'Premium luxury residential complex showcasing elegant landscaping and modern architecture.' 
    },
    { 
        id: undefined,
        img: 'https://images.unsplash.com/photo-1587293852726-0e060010cbeb?q=80&w=2070&auto=format&fit=crop', 
        type: 'Industrial', 
        title: 'Apex Industrial Park', 
        loc: 'Northside Hub', 
        desc: 'Heavy duty industrial infrastructure project optimized for maximum logistical efficiency.' 
    },
  ];

  const displayProjects = projects.length > 0 
    ? projects.map(p => ({
        id: p.id,
        img: p.images?.[0]?.images?.[0] || 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop',
        type: p.address?.toLowerCase().includes('ind') ? 'Industrial' : p.flats ? 'Residential' : 'Commercial',
        title: p.name,
        loc: p.address,
        desc: p.description?.substring(0, 100) + '...'
      }))
    : fallbackProjects;

  return (
    <section id="projects" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4 md:gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-2 md:mb-4">
              <div className="w-8 h-1 bg-[#FCA311]"></div>
              <h3 className="text-[#FCA311] font-bold uppercase tracking-widest text-xs md:text-sm">Portfolio</h3>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900">Our Projects</h2>
            <p className="text-slate-600 mt-2 md:mt-4 text-base md:text-lg">A glimpse of our work across various sectors.</p>
          </div>
          <Link href="/projects" className="hidden md:inline-flex px-8 py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-full hover:bg-slate-900 hover:text-white transition-all">
            View All Projects
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((proj, idx) => (
            <motion.div 
              key={proj.id || idx}
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-50px" }} 
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 hover:shadow-2xl transition-all block cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 right-4 z-10 bg-[#FCA311] text-slate-900 text-xs font-bold uppercase px-4 py-1.5 rounded-full shadow-lg">
                  {proj.type}
                </div>
                <Image 
                    src={proj.img} 
                    alt={proj.title} 
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              <div className="p-8">
                <p className="text-amber-600 font-semibold text-sm mb-2">📍 {proj.loc}</p>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{proj.title}</h3>
                <p className="text-slate-600 mb-6">{proj.desc}</p>
                <Link href={proj.id ? `/projects/${proj.id}` : "/projects"} className="inline-flex items-center text-slate-900 font-bold group-hover:text-[#FCA311] transition-colors">
                  Explore Details <ChevronRight />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
           <Link href="/projects" className="inline-flex px-8 py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-full hover:bg-slate-900 hover:text-white transition-all w-full justify-center">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
