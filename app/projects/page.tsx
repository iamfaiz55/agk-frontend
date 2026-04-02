
'use client';

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProjectCard from '@/components/cards/ProjectCard';
import { useGetProjectsQuery } from '@/redux/api/projectsApi';

export default function ProjectsListPage() {
    const { data: projects, isLoading, error } = useGetProjectsQuery({ includeUnits: true });

    return (
        <div className="min-h-screen bg-slate-50 text-gray-900">
            <Header />
            <div className="h-24"></div>

            <main className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <span className="text-[#D4AF37] font-medium text-[10px] uppercase tracking-[0.3em] mb-4 block">Our Portfolio</span>
                    <h1 className="text-4xl md:text-6xl font-normal text-gray-900 mb-6 tracking-tighter">
                        Discover Luxury <span className="text-[#D4AF37]">Properties</span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-normal">
                        Explore our architectural marvels and premium commercial spaces designed to redefine your lifestyle and business.
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-200/50 animate-pulse h-[400px] rounded-[2rem]" />
                        ))}
                    </div>
                ) : error || !projects || projects.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-[2rem] shadow-sm border border-gray-100">
                        <div className="text-6xl mb-6">🏗️</div>
                        <h2 className="text-2xl font-normal text-gray-800 mb-2">No Projects Found</h2>
                        <p className="text-gray-500 font-normal">We are currently preparing new exciting projects for you.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} delay={index * 0.1} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
