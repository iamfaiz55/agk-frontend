'use client';

import { motion } from 'framer-motion';
import ProjectDrawer from './ProjectDrawer';
import { useGetProjectsQuery } from '@/redux/api/projectsApi';

export default function InvestmentHighlights() {
    const { data: projects, isLoading } = useGetProjectsQuery();

    if (isLoading || !projects || projects.length === 0) return null;

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '400px' }}
                    className="text-center mb-16"
                >
                    <span className="text-[#D4AF37] font-medium uppercase tracking-[0.3em] text-[10px] mb-3 block">Market Growth & Investment</span>
                    <h2 className="text-4xl md:text-6xl font-normal text-gray-900 mb-6 tracking-tighter">
                        Building <span className="text-[#D4AF37] font-serif italic">Portfolio</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-normal">
                        Select a project below to view detailed commercial highlights, residential features, and early-entry investment advantages.
                    </p>
                </motion.div>

                <div className="space-y-6 max-w-5xl mx-auto">
                    {projects.map((project) => (
                        <ProjectDrawer key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
