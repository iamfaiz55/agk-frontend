
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import ImageCarousel from '@/components/ui/ImageCarousel';

export const HeroSection = ({ desktopCarouselImages, mobileCarouselImages, projectImageUrl }: any) => {
    return (
        <section className="relative min-h-screen lg:h-[100vh] flex items-end justify-center pt-20 transition-colors duration-300 overflow-hidden">
            {/* Desktop: Carousel or Static Image */}
            <div className="hidden lg:block absolute inset-0 top-0">
                {desktopCarouselImages.length > 0 ? (
                    <ImageCarousel
                        images={desktopCarouselImages}
                        className="h-full w-full"
                        autoPlay
                        interval={6000}
                    />
                ) : (
                    <>
                        <Image
                            src={projectImageUrl}
                            alt="AGK Developers Building"
                            fill
                            className="object-cover object-top"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/40" />

                        {/* Static Hero Content if no carousel titles - Centered at bottom */}
                        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-20 items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-2xl text-center"
                            >
                                <h1 className="text-xl md:text-3xl lg:text-4xl font-medium text-white mb-6 tracking-wide drop-shadow-lg">
                                    Your Dream Home <span className="text-[#D4AF37]">Awaits</span>
                                </h1>
                                <div className="flex justify-center">
                                    <Link href="/projects">
                                        <Button size="sm" className="bg-white/90 backdrop-blur-sm text-gray-900 border-0 hover:bg-[#D4AF37] hover:text-white rounded-full font-medium uppercase tracking-widest text-xs px-8 py-3">
                                            Explore Units
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </div>

            {/* Mobile: Dynamic Carousel */}
            <div className="lg:hidden absolute inset-0 top-0 w-full h-full">
                <ImageCarousel
                    images={mobileCarouselImages.length > 0 ? mobileCarouselImages : [{ id: 0, url: projectImageUrl } as any]}
                    className="h-full w-full"
                    autoPlay
                    interval={4000}
                />
                {mobileCarouselImages.length === 0 && (
                    <div className="absolute inset-x-0 bottom-20 flex justify-center pointer-events-none z-10">
                        <div className="container mx-auto px-4 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-xs mx-auto text-center"
                            >
                                <h1 className="text-lg font-medium text-white mb-4 tracking-wide drop-shadow-lg">
                                    Your Dream Home <span className="text-[#D4AF37]">Awaits</span>
                                </h1>
                                <div className="flex justify-center">
                                    <Link href="/projects">
                                        <Button size="sm" className="bg-white/90 backdrop-blur-sm text-gray-900 border-0 hover:bg-[#D4AF37] hover:text-white rounded-full font-medium uppercase tracking-widest text-[10px] px-6 py-2.5">
                                            Explore Units
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default HeroSection;
