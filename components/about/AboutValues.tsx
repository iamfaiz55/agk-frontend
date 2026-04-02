'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const values = [
    {
        title: "Integrity First",
        description: "Transparency and honesty are the cornerstones of every transaction. We build trust before we build homes.",
        icon: "⚖️"
    },
    {
        title: "Innovation Driven",
        description: "Embracing the latest technologies and sustainable practices to create future-ready living spaces.",
        icon: "💡"
    },
    {
        title: "Customer Obsessed",
        description: "Your dream is our command. We go above and beyond to ensure every detail exceeds expectations.",
        icon: "❤️"
    },
    {
        title: "Quality Assured",
        description: "Zero compromise on materials or workmanship. We set the gold standard in construction quality.",
        icon: "💎"
    }
];

export default function AboutValues() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const yCards = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section ref={containerRef} className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div style={{ y: yTitle }} className="text-center mb-16">
                    <span className="text-[#D4AF37] font-medium uppercase tracking-[0.3em] text-[10px] mb-3 block">Our Core Values</span>
                    <h2 className="text-3xl md:text-5xl font-normal text-gray-900 tracking-tighter">
                        The Pillars of <span className="font-serif italic">AGK</span>
                    </h2>
                </motion.div>

                <motion.div style={{ y: yCards }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-[#D4AF37]/10 border border-gray-100 hover:border-[#D4AF37]/30 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="text-4xl mb-6 bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
