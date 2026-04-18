'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 relative w-full"
          >
            <div className="absolute inset-0 bg-[#FCA311] transform translate-x-4 translate-y-4 rounded-2xl"></div>
            <div className="relative z-10 w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                 <Image 
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931&auto=format&fit=crop" 
                    alt="Who We Are - AGK Infrastructures" 
                    fill
                    className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500" 
                />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-1 bg-[#FCA311]"></div>
              <h3 className="text-[#FCA311] font-bold uppercase tracking-widest text-sm">Who We Are</h3>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">Engineered To Stand The Test Of Time.</h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              AGK Infrastructures is a dedicated infrastructure and construction company focused on delivering dependable, cost-effective, and high-quality projects. With a strong commitment to engineering excellence and timely execution, we serve residential, commercial, and industrial sectors.
            </p>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
              Our approach combines technical expertise, modern construction practices, and a client-first mindset to ensure every project meets the highest standards.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
