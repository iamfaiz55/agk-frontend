'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutHero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section className="relative min-h-[70vh] flex items-center bg-zinc-950 overflow-hidden pt-32 pb-20">
            {/* Ambient Background Glows - Parallax */}
            <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />
            
            {/* Grid Pattern - CSS Only */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" 
                 style={{ 
                     backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)', 
                     backgroundSize: '40px 40px' 
                 }} 
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                     <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block mb-6">
                            <span className="py-2 px-6 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-xs font-medium uppercase tracking-[0.2em] bg-[#D4AF37]/5 backdrop-blur-sm">
                                Since 1999
                            </span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tighter mb-8 leading-[1.1]">
                            Constructing <span className="font-serif italic text-[#D4AF37]">Excellence</span> <br/>
                            <span className="text-gray-400">Delivering Trust.</span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-12">
                            For over two decades, AGK Infrastructures has been the cornerstone of premium development in Chhatrapati Sambhajinagar.
                        </p>

                        <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: 100 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="w-[1px] bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
