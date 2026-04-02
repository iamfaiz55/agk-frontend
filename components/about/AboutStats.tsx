'use client';

import { motion } from 'framer-motion';

const stats = [
    { label: "Years of Excellence", value: "25+", icon: "🏆" },
    { label: "Projects Completed", value: "150+", icon: "building" }, // Using text or svg normally, but placeholder icon text here
    { label: "Happy Families", value: "5000+", icon: "users" },
    { label: "Acres Developed", value: "10M+", icon: "map" },
];

export default function AboutStats() {
    return (
        <section className="py-20 bg-gray-900 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <h3 className="text-4xl md:text-5xl font-light text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                                {stat.value}
                            </h3>
                            <p className="text-gray-400 text-xs md:text-sm uppercase tracking-[0.2em] font-medium">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
