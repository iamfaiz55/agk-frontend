'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutValues from '@/components/about/AboutValues';
import AboutProjectShowcase from '@/components/about/AboutProjectShowcase';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main>
                <AboutHero />
                <AboutStory />
                <AboutProjectShowcase />
                <AboutValues />

                {/* CTA Section */}
                <section className="py-24 bg-[#111] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                         <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
                    </div>
                    
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-6xl font-light text-white mb-8">
                                Ready to find your <span className="text-[#D4AF37] font-serif italic">dream home?</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto font-light">
                                Join the thousands of families who found their sanctuary with AGK Infrastructures. Let&apos;s build your future together.
                            </p>
                            <div className="flex flex-col md:flex-row gap-4 justify-center">
                                <Link href="/projects" className="bg-[#D4AF37] text-white px-10 py-4 rounded-full font-medium tracking-wide hover:bg-[#b5932a] transition-colors shadow-lg shadow-[#D4AF37]/20 uppercase text-sm">
                                    Explore Projects
                                </Link>
                                <Link href="/contact" className="bg-transparent border border-white text-white px-10 py-4 rounded-full font-medium tracking-wide hover:bg-white hover:text-black transition-all uppercase text-sm">
                                    Contact Us
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
