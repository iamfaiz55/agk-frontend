'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectForm, { ProjectFormData } from '@/components/forms/ProjectForm';
import Loader from '@/components/ui/Loader';
import {
  useGetProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation
} from '@/redux/api/projectsApi';
import { Building } from '@/types';

export default function ManageProjectsPage() {
  const { data: projects, isLoading } = useGetProjectsQuery();
  const [addProject, { isLoading: isAdding }] = useAddProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Building | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'hasUnits' | 'noUnits'>('all');

  const isProcessing = isAdding || isUpdating || isDeleting;

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    let filtered = [...projects];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(query) ||
        project.address.toLowerCase().includes(query) ||
        project.id.toString().includes(query)
      );
    }

    // Apply unit count filter
    if (filterBy === 'hasUnits') {
      filtered = filtered.filter(project => (project.units?.length || 0) > 0);
    } else if (filterBy === 'noUnits') {
      filtered = filtered.filter(project => (project.units?.length || 0) === 0);
    }

    return filtered;
  }, [projects, searchQuery, filterBy]);

  const handleAdd = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEdit = (project: Building) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleFormSubmit = async (data: ProjectFormData) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.location);
      formData.append('status', data.status);
      if (data.tagline) formData.append('tagline', data.tagline);
      if (data.description) formData.append('description', data.description);

      // Append features as JSON strings
      formData.append('commercialFeatures', JSON.stringify(data.commercialFeatures || []));
      formData.append('residentialFeatures', JSON.stringify(data.residentialFeatures || []));
      formData.append('investmentPoints', JSON.stringify(data.investmentPoints || []));

      // Append structured image sections as a JSON string
      // The backend will process this to update existing image titles or remove them
      formData.append('images', JSON.stringify(data.sections));

      // Append new physical files to the 'images' key
      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => {
          formData.append('images', file);
        });
      }

      if (editingProject) {
        await updateProject({
          id: editingProject.id, 
          formData
        }).unwrap();
      } else {
        await addProject(formData).unwrap();
      }
      setShowForm(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('Error saving project.');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project and all its units?')) {
      try {
        await deleteProject(id).unwrap();
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilterBy('all');
  };

  if (isLoading) {
    return <div className="p-8 text-center animate-pulse text-gray-400">Loading projects...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {isProcessing && <Loader />}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-normal text-gray-900 mb-1 md:mb-2 uppercase tracking-tighter">Projects</h1>
          <p className="text-sm md:text-base text-gray-500 font-medium italic leading-tight">Create and manage your real estate developments</p>
        </div>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="bg-gray-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-medium uppercase tracking-widest text-xs md:text-sm hover:bg-[#D4AF37] transition-all transform active:scale-95 shadow-xl shadow-gray-200"
          >
            + Add Project
          </button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <ProjectForm
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
            initialData={editingProject ? {
              name: editingProject.name,
              tagline: editingProject.tagline,
              location: editingProject.address,
              description: editingProject.description,
              status: 'active',
              commercialFeatures: editingProject.commercialFeatures || [],
              residentialFeatures: editingProject.residentialFeatures || [],
              investmentPoints: editingProject.investmentPoints || [],
              sections: editingProject.images,
            } : undefined}
            mode={editingProject ? 'edit' : 'add'}
            projectId={editingProject?.id}
            currentAmenities={editingProject?.amenities}
          />
        )}
      </AnimatePresence>

      {/* Search and Filter Section */}
      {!showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name, location, ID, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Filter Dropdown */}
            <div className="flex gap-2">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as 'all' | 'hasUnits' | 'noUnits')}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-gray-900 font-medium cursor-pointer"
              >
                <option value="all">All Projects</option>
                <option value="hasUnits">With Units</option>
                <option value="noUnits">Empty Projects</option>
              </select>

              {(searchQuery || filterBy !== 'all') && (
                <button
                  onClick={clearSearch}
                  className="px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all font-medium text-sm"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <p className="text-gray-600">
              Showing <span className="font-bold text-[#D4AF37]">{filteredProjects.length}</span> of <span className="font-bold">{projects?.length || 0}</span> projects
            </p>
            {(searchQuery || filterBy !== 'all') && (
              <p className="text-gray-500 italic">
                {searchQuery && `Searching for "${searchQuery}"`}
                {searchQuery && filterBy !== 'all' && ' • '}
                {filterBy === 'hasUnits' && 'With units'}
                {filterBy === 'noUnits' && 'Empty projects'}
              </p>
            )}
          </div>
        </motion.div>
      )}

      {/* No Results Message */}
      {!showForm && filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white rounded-2xl shadow-lg"
        >
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Projects Found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery || filterBy !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first project'}
          </p>
          {(searchQuery || filterBy !== 'all') && (
            <button
              onClick={clearSearch}
              className="bg-[#D4AF37] text-white px-6 py-3 rounded-xl hover:bg-[#B8941E] transition-all"
            >
              Clear Filters
            </button>
          )}
        </motion.div>
      )}

      {/* Mobile View: Cards */}
      {!showForm && filteredProjects.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-6 rounded-[2rem] shadow-lg shadow-gray-100 border border-gray-50"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-normal text-gray-900 tracking-tight">{project.name}</h3>
                  <p className="text-xs text-gray-400 font-medium uppercase mt-1">ID #{project.id}</p>
                </div>
                <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest">
                  {project.units?.length || 0} Units
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <span className="text-sm">📍</span>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{project.address}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 bg-blue-50 text-blue-600 py-3 rounded-xl font-medium text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-4 bg-red-50 text-red-600 py-3 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                >
                  🗑️
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Desktop View: Table */}
      {!showForm && filteredProjects.length > 0 && (
        <div className="hidden md:block bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 overflow-hidden border border-gray-50">
          <div className="overflow-x-auto thin-scrollbar">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-8 py-6 text-left text-xs font-medium uppercase tracking-[0.2em]">Project Identity</th>
                  <th className="px-8 py-6 text-left text-xs font-medium uppercase tracking-[0.2em]">Deployment Location</th>
                  <th className="px-8 py-6 text-left text-xs font-medium uppercase tracking-[0.2em]">Inventory</th>
                  <th className="px-8 py-6 text-right text-xs font-medium uppercase tracking-[0.2em]">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6 font-normal text-gray-900 tracking-tight">{project.name}</td>
                    <td className="px-8 py-6 text-gray-500 font-medium text-sm leading-relaxed max-w-xs">{project.address}</td>
                    <td className="px-8 py-6">
                      <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-5 py-2 rounded-full text-[10px] font-medium uppercase tracking-widest border border-[#D4AF37]/20">
                        {project.units?.length || 0} Total Units
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex gap-3 justify-end">
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95 border border-blue-100"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95 border border-red-100"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
