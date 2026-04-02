'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function AboutStory() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} className="py-24 md:py-36 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-stretch gap-12 md:gap-20">
                    
                    {/* Visual Side - Stylized Card */}
                    <div className="w-full lg:w-5/12">
                        <motion.div 
                            style={{ y }}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-zinc-900 rounded-[3rem] p-12 md:p-16 h-full min-h-[500px] relative overflow-hidden flex flex-col justify-between"
                        >
                            {/* Abstract Patterns */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-800/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
                            
                            <div className="relative z-10">
                                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block opacity-80">Our Philosophy</span>
                                <h3 className="text-3xl md:text-5xl font-light text-white leading-tight mb-8">
                                    Creating <br/>
                                    <span className="font-serif italic text-[#D4AF37]">Enduring</span> <br/>
                                    Communities.
                                </h3>
                            </div>

                            <div className="relative z-10 border-t border-white/10 pt-8 mt-auto">
                                <p className="text-lg md:text-xl text-gray-400 font-light italic">
                                    "We build with integrity, design with passion, and deliver with pride."
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Text Content Side */}
                    <div className="w-full lg:w-7/12 flex flex-col justify-center">
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block py-1 px-3 border border-gray-200 rounded-full text-gray-500 text-xs uppercase tracking-widest mb-6">
                                Since 1999
                            </span>
                            <h2 className="text-4xl md:text-6xl font-normal text-gray-900 mb-8 tracking-tighter leading-[1.1]">
                                Redefining <span className="text-[#D4AF37]">Real Estate</span> Excellence
                            </h2>
                            
                            <div className="space-y-8 text-gray-500 text-lg leading-relaxed font-light">
                                <p>
                                    <span className="text-gray-900 font-medium">AGK Infrastructures</span> was founded with a singular vision: to transform regional landscapes into thriving communities. Our flagship project, <span className="text-gray-900 font-medium">Pearl Heights</span> in Chhatrapati Sambhajinagar, represents the pinnacle of this journey—a G+6 mixed-use landmark blending residential tranquility with commercial energy.
                                </p>
                                <p>
                                    We believe a home is more than bricks and mortar; it's a sanctuary, a legacy, and a foundation. Strategically located near <span className="text-gray-900 font-medium">Samruddhi Mahamarg</span> in Mitmita, our developments capture the rapid economic appreciation of Aurangabad's growing infrastructure.
                                </p>
                                
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
