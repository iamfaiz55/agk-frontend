'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const WhyChooseUs = () => {
  const points = [
    'Commitment to Quality',
    'Timely Project Delivery',
    'Experienced Team',
    'Cost-Effective Solutions',
    'Safety-First Approach'
  ];

  const Check = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#FCA311]">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  );

  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800 opacity-50 transform skew-x-[-20deg] translate-x-32 hidden lg:block"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
          <div className="lg:w-1/2">
            <h3 className="text-[#FCA311] font-bold uppercase tracking-widest text-xs md:text-sm mb-2 md:mb-4">Why Choose AGK Infrastructures</h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 leading-tight">Reliability At Every Stage.</h2>
            <p className="text-slate-400 mb-8 md:mb-10 text-base md:text-lg leading-relaxed">
              We focus on delivering reliable infrastructure solutions that stand the test of time while maintaining transparency and client satisfaction at every stage.
            </p>
            <ul className="space-y-6">
              {points.map((item, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-center gap-4 text-xl font-semibold text-slate-200"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <Check />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 w-full">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6 }}
                className="relative w-full h-[400px] md:h-[500px]"
             >
                <Image 
                    src="https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=1887&auto=format&fit=crop" 
                    fill
                    className="rounded-2xl shadow-2xl relative z-10 border-4 border-slate-800 object-cover" 
                    alt="Quality Construction" 
                />
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
