'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetProjectsQuery } from '@/redux/api/projectsApi';
import { useGetGalleriesQuery, useCreateGalleryMutation, useDeleteGalleryMutation } from '@/redux/api/galleryApi';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function GalleryManagementPage() {
    const { data: projects, isLoading: projectsLoading } = useGetProjectsQuery();
    const { data: allGalleries = [], isLoading: galleriesLoading } = useGetGalleriesQuery();
    const [createGallery, { isLoading: isUploading }] = useCreateGalleryMutation();
    const [deleteGallery] = useDeleteGalleryMutation();
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [description, setDescription] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const selectedProject = projects?.find(p => p.id === selectedProjectId);

    // Filter for gallery images only
    const projectImages = allGalleries.filter(img => img.buildingId === selectedProjectId);

    const handleFileUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        const files = fileInputRef.current?.files;
        if (!files?.length || !selectedProjectId) return;

        const file = files[0]; // Handle single file for now to associate description

        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('buildingId', selectedProjectId.toString());
            formData.append('description', description);
            
            await createGallery(formData).unwrap();

            toast.success('Image uploaded successfully!');
            setDescription(''); // Reset description
            if (fileInputRef.current) fileInputRef.current.value = ''; // Reset file input
        } catch (error) {
            console.error('Upload failed', error);
            toast.error('Failed to upload image.');
        }
    };

    const handleDelete = async (imageId: number) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            await deleteGallery(imageId).unwrap();
            toast.success('Image deleted successfully');
        } catch (error) {
            console.error('Delete failed', error);
            toast.error('Failed to delete image.');
        }
    };

    if (projectsLoading || galleriesLoading) return <div className="p-8 text-center animate-pulse text-gray-400">Loading gallery data...</div>;

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl md:text-4xl font-normal text-gray-900 mb-2 uppercase tracking-tighter">
                    Gallery Management
                </h1>
                <p className="text-sm md:text-base text-gray-500 font-medium italic">
                    Manage project-specific photo galleries.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Project Selector - Left Sidebar like */}
                <div className="md:col-span-1 space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 uppercase tracking-widest mb-4">Select Project</h3>
                    <div className="space-y-2">
                        {projects?.map((project) => {
                            const count = allGalleries.filter(g => g.buildingId === project.id).length;
                            return (
                                <button
                                    key={project.id}
                                    onClick={() => setSelectedProjectId(project.id)}
                                    className={`w-full text-left px-5 py-4 rounded-xl transition-all border ${selectedProjectId === project.id
                                            ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 font-bold'
                                            : 'bg-white text-gray-600 border-gray-100 hover:border-[#D4AF37]/50 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span>{project.name}</span>
                                        {count > 0 && (
                                            <span className={`px-2 py-0.5 rounded text-xs ${selectedProjectId === project.id ? 'bg-white/20' : 'bg-gray-100 text-gray-600'}`}>
                                                {count}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Selected Project Content */}
                <div className="md:col-span-2">
                    {!selectedProjectId ? (
                        <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                            <span className="text-6xl mb-4 opacity-20">📁</span>
                            <p className="text-gray-400 font-medium">Select a project from the left to manage its gallery.</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-gray-50 gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedProject?.name} Gallery</h2>
                                    <p className="text-gray-400 text-sm mt-1">{projectImages.length} images in gallery</p>
                                </div>
                            </div>
                            
                            {/* Upload Form */}
                            <form onSubmit={handleFileUpload} className="mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Image</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Image Description</label>
                                        <input
                                            type="text"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="e.g. Living Room View"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Select File</label>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            className="w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-[#D4AF37]/10 file:text-[#D4AF37]
                                                hover:file:bg-[#D4AF37]/20"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isUploading}
                                        className={`bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-[#D4AF37] transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {isUploading ? 'Uploading...' : 'Upload Image'}
                                    </button>
                                </div>
                            </form>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <AnimatePresence>
                                    {projectImages.map((img) => (
                                        <motion.div
                                            key={img.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            className="relative group aspect-square rounded-2xl overflow-hidden bg-gray-100"
                                        >
                                            <Image
                                                src={img.imageUrl}
                                                alt={img.description || "Gallery Image"}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            {/* Description Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-100 transition-opacity">
                                                <p className="text-white text-xs md:text-sm font-medium line-clamp-2">
                                                    {img.description}
                                                </p>
                                            </div>
                                            
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleDelete(img.id)}
                                                    className="bg-white/90 text-red-600 p-2 rounded-full hover:bg-white transition-colors shadow-sm"
                                                    title="Delete Image"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {projectImages.length === 0 && (
                                    <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                        No images in this gallery yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
