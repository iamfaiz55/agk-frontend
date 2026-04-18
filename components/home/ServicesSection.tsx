'use client';

import { motion } from 'framer-motion';

const ServicesSection = () => {
  const services = [
    {
      title: 'Construction Services',
      desc: 'Complete construction solutions with a focus on quality, safety, and durability.',
      icon: '🏗️'
    },
    {
      title: 'Project Management',
      desc: 'Efficient planning, coordination, and execution to deliver projects on time and within budget.',
      icon: '📋'
    },
    {
      title: 'Infrastructure Development',
      desc: 'Development of roads, buildings, and civil infrastructure with modern engineering practices.',
      icon: '🛣️'
    },
    {
      title: 'Renovation & Maintenance',
      desc: 'Upgrading and maintaining existing structures to improve performance and longevity.',
      icon: '🔧'
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-1 bg-[#FCA311]"></div>
            <h3 className="text-[#FCA311] font-bold uppercase tracking-widest text-xs md:text-sm">Our Services</h3>
            <div className="w-8 h-1 bg-[#FCA311]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 md:mb-6 leading-tight">End-To-End Infrastructure Solutions</h2>
          <p className="text-slate-600 text-base md:text-lg">We provide end-to-end infrastructure solutions tailored to your project requirements.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((srv, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-50px" }} 
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-2xl hover:border-[#FCA311] transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:bg-amber-50 transition-colors">
                {srv.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{srv.title}</h3>
              <p className="text-slate-600 leading-relaxed">{srv.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
