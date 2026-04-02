'use client';

import { useState } from 'react';
import { useGetProjectsQuery } from '@/redux/api/projectsApi';
import { useGetAmenitiesQuery } from '@/redux/api/amenitiesApi';
import { skipToken } from '@reduxjs/toolkit/query';
import AmenitiesManager from '@/components/AmenitiesManager';
import { Building } from '@/types';
import { motion } from 'framer-motion';

export default function GlobalAmenitiesPage() {
    const { data: projects, isLoading } = useGetProjectsQuery();
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const { data: amenitiesData, isLoading: isAmenitiesLoading } = useGetAmenitiesQuery(
        selectedProjectId || skipToken,
        { skip: !selectedProjectId }
    );

    const selectedProject = projects?.find(p => p.id === selectedProjectId);

    if (isLoading) {
        return <div className="p-8 text-center animate-pulse text-gray-400">Loading projects...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Amenities Management</h1>
                <p className="text-gray-500">Manage amenities across all your projects centrally.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Project to Manage Amenities</label>
                <select
                    className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                    value={selectedProjectId || ''}
                    onChange={(e) => setSelectedProjectId(Number(e.target.value))}
                >
                    <option value="">-- Choose a Project --</option>
                    {projects?.map((project: Building) => (
                        <option key={project.id} value={project.id}>
                            {project.name} (ID: {project.id})
                        </option>
                    ))}
                </select>
            </div>

            {selectedProjectId && selectedProject ? (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🏢</span>
                        <h2 className="text-xl font-bold text-gray-900">{selectedProject.name}</h2>
                    </div>
                    <p className="text-gray-500 text-sm mb-6">{selectedProject.address}</p>

                    {isAmenitiesLoading ? (
                        <div className="py-12 text-center">
                            <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-500">Fetching project amenities...</p>
                        </div>
                    ) : (
                        <AmenitiesManager
                            projectId={selectedProjectId}
                            amenities={amenitiesData || selectedProject.amenities || []}
                        />
                    )}
                </motion.div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">Please select a project above to manage its amenities.</p>
                </div>
            )}
        </div>
    );
}
