'use client';

import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white border-b-8 border-[#FCA311]">
       <div className="container mx-auto px-6 lg:px-12">
         <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black">What Our Clients Say</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            className="bg-slate-800 p-6 md:p-10 rounded-2xl border border-slate-700 relative"
          >
            <span className="absolute top-4 right-6 text-6xl text-slate-700 font-serif leading-none">"</span>
            <p className="text-base md:text-xl text-slate-300 italic mb-8 relative z-10 leading-relaxed">
              “AGK Infrastructures delivered our project on time with excellent quality and professionalism.”
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FCA311] rounded-full flex items-center justify-center text-slate-900 font-bold text-xl flex-shrink-0">M</div>
              <div>
                <h5 className="font-bold text-white text-base md:text-lg">Mohammad Imran</h5>
                <p className="text-slate-400 text-xs md:text-sm">Satisfied Client</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.2 }} 
            className="bg-slate-800 p-6 md:p-10 rounded-2xl border border-slate-700 relative"
          >
            <span className="absolute top-4 right-6 text-6xl text-slate-700 font-serif leading-none">"</span>
            <p className="text-base md:text-xl text-slate-300 italic mb-8 relative z-10 leading-relaxed">
              “Reliable team with strong technical expertise and commitment.”
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FCA311] rounded-full flex items-center justify-center text-slate-900 font-bold text-xl flex-shrink-0">A</div>
              <div>
                <h5 className="font-bold text-white text-base md:text-lg">Mr. Ajay</h5>
                <p className="text-slate-400 text-xs md:text-sm">Satisfied Client</p>
              </div>
            </div>
          </motion.div>
        </div>
       </div>
    </section>
  );
};

export default TestimonialsSection;
