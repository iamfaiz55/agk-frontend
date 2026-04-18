'use client';

import { motion } from 'framer-motion';

const ProcessSection = () => {
  const steps = [
    { step: '1', title: 'Consultation', text: 'Understanding your requirements and project goals.' },
    { step: '2', title: 'Planning & Design', text: 'Detailed planning with technical precision.' },
    { step: '3', title: 'Execution', text: 'Efficient construction with quality control.' },
    { step: '4', title: 'Delivery', text: 'On-time completion with client satisfaction.' },
  ];

  return (
    <section id="process" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h3 className="text-[#FCA311] font-bold uppercase tracking-widest text-xs md:text-sm mb-2 md:mb-4">Our Work Process</h3>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Proven Methodology</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-[40px] left-0 w-full h-1 bg-slate-200 z-0"></div>
          
          {steps.map((p, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative z-10 text-center"
            >
              <div className="w-20 h-20 mx-auto bg-slate-900 border-4 border-slate-50 rounded-full flex items-center justify-center text-3xl font-black text-[#FCA311] shadow-xl mb-6 shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                {p.step}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">{p.title}</h4>
              <p className="text-slate-600">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
