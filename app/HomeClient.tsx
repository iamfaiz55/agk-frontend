'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import { projectData } from '@/data/mockData';
import { useGetProjectsQuery } from '@/redux/api/projectsApi';
import { useGetCarouselsQuery } from '@/redux/api/carouselApi';

// Dynamically import sections for performance optimization
const AboutSection = dynamic(() => import('@/components/home/AboutSection'), { ssr: false });
const ServicesSection = dynamic(() => import('@/components/home/ServicesSection'), { ssr: false });
const WhyChooseUs = dynamic(() => import('@/components/home/WhyChooseUs'), { ssr: false });
const ProjectsSection = dynamic(() => import('@/components/home/ProjectsSection'), { ssr: false });
const ProcessSection = dynamic(() => import('@/components/home/ProcessSection'), { ssr: false });
const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/home/ContactSection'), { ssr: false });

export default function HomeClient() {
  const { data: projectsData, isLoading: isProjectsLoading } = useGetProjectsQuery({ includeUnits: true });
  const { data: carouselsData, isLoading: isCarouselsLoading } = useGetCarouselsQuery();
  const [isLoaded, setIsLoaded] = useState(false);

  const projects = projectsData || [];
  const project = projects?.[0]; 

  useEffect(() => {
    const timer = setTimeout(() => {
        setIsLoaded(true);
    }, 100); 
    return () => clearTimeout(timer);
  }, []);

  const projectImageUrl = useMemo(() => project?.images?.[0]?.images?.[0] || projectData.heroImage, [project]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || 'http://localhost:3110';

  // Process Carousels from API
  const activeCarousels = useMemo(() => (carouselsData || []).filter((c: any) => c.isActive), [carouselsData]);
  
  const desktopCarouselImages = useMemo(() => activeCarousels.map((c: any) => ({
      id: c.id,
      url: c.imageDesktop?.startsWith('http') ? c.imageDesktop : `${API_URL}${c.imageDesktop}`,
      title: c.title,
      buttonText: c.title ? 'View Details' : undefined,
      buttonLink: c.link
  })), [activeCarousels]);

  const mobileCarouselImages = useMemo(() => activeCarousels.map((c: any) => ({
    id: c.id,
    url: c.imageMobile?.startsWith('http') ? c.imageMobile : `${API_URL}${c.imageMobile}`,
    title: c.title,
    buttonText: c.title ? 'View Details' : undefined,
    buttonLink: c.link
  })), [activeCarousels]);

  if (isCarouselsLoading) {
      return (
          <div className="min-h-screen bg-slate-900 flex items-center justify-center">
              <div className="animate-pulse text-[#FCA311] font-bold tracking-widest uppercase text-xs md:text-sm">Loading Experience...</div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Critical: Load immediately */}
      <HeroSection 
        desktopCarouselImages={desktopCarouselImages}
        mobileCarouselImages={mobileCarouselImages}
        projectImageUrl={projectImageUrl}
      />

      {/* Defer loading of non-critical sections until client mount */}
      {isLoaded && (
            <>
                <AboutSection />
                <ServicesSection />
                <WhyChooseUs />
                <ProjectsSection projects={projects} />
                <ProcessSection />
                <TestimonialsSection />
                <ContactSection />
                <Footer />
            </>
      )}
    </div>
  );
}
