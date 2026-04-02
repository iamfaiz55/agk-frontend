'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';
import { motion } from 'framer-motion';

export default function ContactClient() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Header />
            
            {/* Hero Section for Contact */}
            <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-gray-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#D4AF37]/5 skew-x-12 translate-x-1/2" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="text-[#D4AF37] font-medium uppercase tracking-[0.3em] text-xs mb-4 block">Get in Touch</span>
                        <h1 className="text-4xl md:text-6xl font-normal text-gray-900 mb-6 tracking-tighter">
                            Your Future at <span className="text-[#D4AF37]">Pearl Heights</span>
                        </h1>
                        <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto">
                            Whether you&apos;re looking for a premium 3BHK home or a strategic commercial investment in Chhatrapati Sambhajinagar, we are here to guide you.
                        </p>
                    </motion.div>
                </div>
            </div>

            <main className="container mx-auto px-4 py-16 md:py-24 relative">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl font-medium mb-8">Contact Information</h2>
                            
                            <div className="space-y-8">
                                <div className="group">
                                    <h3 className="text-xs font-medium uppercase tracking-widest text-[#D4AF37] mb-2">Office Address</h3>
                                    <p className="text-xl text-gray-800 font-light group-hover:pl-4 transition-all duration-300 border-l-2 border-transparent group-hover:border-[#D4AF37]">
                                        Gut No. 111, Mitmita,<br />
                                        Opp. Global Law College,<br />
                                        Chhatrapati Sambhajinagar - 431002
                                    </p>
                                </div>

                                <div className="group">
                                    <h3 className="text-xs font-medium uppercase tracking-widest text-[#D4AF37] mb-2">Phone</h3>
                                    <p className="text-xl text-gray-800 font-light group-hover:pl-4 transition-all duration-300 border-l-2 border-transparent group-hover:border-[#D4AF37]">
                                        +91 70205 15701
                                    </p>
                                </div>

                                <div className="group">
                                    <h3 className="text-xs font-medium uppercase tracking-widest text-[#D4AF37] mb-2">Email</h3>
                                    <p className="text-xl text-gray-800 font-light group-hover:pl-4 transition-all duration-300 border-l-2 border-transparent group-hover:border-[#D4AF37]">
                                        agkinfrastructures@gmail.com
                                    </p>
                                </div>
                            </div>

                            {/* Map Preview or abstract graphic */}
                            <div className="mt-12 h-64 bg-gray-100 rounded-3xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
                                <iframe 
                                    src="https://maps.google.com/maps?q=19.894856,75.271961&z=15&output=embed" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen 
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </motion.div>

                        {/* Form Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100"
                        >
                            <h2 className="text-2xl font-medium mb-8">Send Us a Message</h2>
                            <LeadCaptureForm />
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
