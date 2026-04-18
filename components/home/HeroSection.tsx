'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import ImageCarousel from '@/components/ui/ImageCarousel';

export const HeroSection = ({ desktopCarouselImages, mobileCarouselImages, projectImageUrl }: any) => {
    // Determine the fallback or primary construction image if carousel is empty
    const fallbackImage = "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop";
    const resolvedProjectImage = (desktopCarouselImages && desktopCarouselImages.length > 0) ? projectImageUrl : fallbackImage;

    return (
        <section className="relative min-h-screen lg:h-[100vh] flex items-end justify-center pt-20 transition-colors duration-300 overflow-hidden bg-slate-900">
            {/* Desktop: Carousel or Static Image */}
            <div className="hidden lg:block absolute inset-0 top-0">
                {desktopCarouselImages && desktopCarouselImages.length > 0 ? (
                    <>
                        <ImageCarousel
                            images={desktopCarouselImages}
                            className="h-full w-full"
                            autoPlay
                            interval={6000}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </>
                ) : (
                    <>
                        <Image
                            src={resolvedProjectImage}
                            alt="AGK Infrastructures Construction"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

                        {/* Static Hero Content */}
                        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-4xl text-center"
                            >
                                <p className="text-[#FCA311] font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base drop-shadow-md">
                                  Trusted by clients for durable infrastructure solutions.
                                </p>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-2xl">
                                    Building Reliable Infrastructure <br/>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCA311] to-yellow-600 drop-shadow-lg">For Tomorrow</span>
                                </h1>
                                <p className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg">
                                   AGK Infrastructures delivers high-quality construction, engineering, and project management solutions with precision, safety, and long-term value.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Link href="#contact">
                                        <Button className="bg-[#FCA311] text-slate-900 border-0 hover:bg-yellow-600 hover:text-white rounded-full font-bold uppercase tracking-widest text-sm px-8 py-4 shadow-[0_0_20px_rgba(252,163,17,0.4)]">
                                            Get a Free Consultation
                                        </Button>
                                    </Link>
                                    <Link href="#projects">
                                        <Button className="bg-black/50 backdrop-blur-md border-2 border-white text-white hover:border-[#FCA311] hover:text-[#FCA311] rounded-full font-bold uppercase tracking-widest text-sm px-8 py-4">
                                            View Our Projects
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </div>

            {/* Mobile: Dynamic Carousel */}
            <div className="lg:hidden absolute inset-0 top-0 w-full h-full bg-slate-900">
                {mobileCarouselImages && mobileCarouselImages.length > 0 ? (
                   <>
                       <ImageCarousel
                           images={mobileCarouselImages}
                           className="h-full w-full"
                           autoPlay
                           interval={4000}
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                   </>
                ) : (
                   <>
                        <Image
                            src={resolvedProjectImage}
                            alt="AGK Infrastructures Construction"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                   </>
                )}
                
                <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-center items-center z-10 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-sm mx-auto text-center"
                    >
                        <p className="text-[#FCA311] font-bold tracking-wider uppercase mb-3 text-[10px]">
                            Durability & Efficiency
                        </p>
                        <h1 className="text-3xl font-black text-white mb-4 tracking-tight drop-shadow-2xl leading-tight">
                            Building Reliable <br/><span className="text-[#FCA311]">Infrastructure</span>
                        </h1>
                        <p className="text-sm text-slate-300 mb-8 font-light leading-relaxed">
                            Delivering high-quality construction and engineering with precision and safety.
                        </p>
                        <div className="flex flex-col gap-3">
                            <Link href="#contact" className="w-full">
                                <Button className="w-full bg-[#FCA311] text-slate-900 border-0 hover:bg-yellow-600 rounded-full font-bold uppercase tracking-wider text-xs px-6 py-3 shadow-[0_0_15px_rgba(252,163,17,0.3)]">
                                    Free Consultation
                                </Button>
                            </Link>
                            <Link href="#projects" className="w-full">
                                <Button className="w-full bg-transparent border-2 border-slate-600 text-white hover:border-[#FCA311] rounded-full font-bold uppercase tracking-wider text-xs px-6 py-3">
                                    View Projects
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
