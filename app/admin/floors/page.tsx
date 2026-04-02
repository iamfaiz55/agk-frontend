'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { useGetProjectsQuery } from '@/redux/api/projectsApi';
import {
  useGetFloorsQuery,
  useAddFloorMutation,
  useUpdateFloorMutation,
  useDeleteFloorMutation,
  Floor
} from '@/redux/api/floorsApi';
import { skipToken } from '@reduxjs/toolkit/query';

export default function FloorManagementPage() {
  const { data: projects, isLoading: isProjectsLoading } = useGetProjectsQuery();
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  // Fetch floors for the selected project
  const { data: floorsData, isLoading: isFloorsLoading } = useGetFloorsQuery(
    selectedProjectId ? { buildingId: selectedProjectId } : skipToken,
    { skip: !selectedProjectId }
  );

  const [addFloor] = useAddFloorMutation();
  const [updateFloor] = useUpdateFloorMutation();
  const [deleteFloor] = useDeleteFloorMutation();

  const [showForm, setShowForm] = useState(false);
  const [editingFloor, setEditingFloor] = useState<Floor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const building = useMemo(() => {
    if (!projects || !selectedProjectId) return null;
    return projects.find(p => p.id === selectedProjectId) || null;
  }, [projects, selectedProjectId]);

  const isLoading = isProjectsLoading || isFloorsLoading;

  const filteredFloors = useMemo(() => {
    const floors = floorsData || [];
    if (!searchQuery.trim()) return floors;
    const query = searchQuery.toLowerCase();
    return floors.filter(floor =>
      floor.name.toLowerCase().includes(query) ||
      floor.description?.toLowerCase().includes(query)
    );
  }, [floorsData, searchQuery]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      buildingId: selectedProjectId!,
    };

    try {
      if (editingFloor) {
        await updateFloor({ id: editingFloor.id, data }).unwrap();
      } else {
        await addFloor(data).unwrap();
      }
      setShowForm(false);
      setEditingFloor(null);
    } catch (error) {
      console.error('Failed to save floor:', error);
      alert('Error saving floor. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this floor?')) {
      try {
        await deleteFloor(id).unwrap();
      } catch (error) {
        console.error('Failed to delete floor:', error);
      }
    }
  };

  if (isLoading && !selectedProjectId) {
    return <div className="p-8 text-center animate-pulse text-gray-400 font-medium tracking-widest uppercase text-xs">Calibrating Project Data...</div>;
  }

  if (!isProjectsLoading && (!projects || projects.length === 0)) {
    return (
      <div className="p-12 text-center bg-red-50 rounded-[3rem] border border-red-100 max-w-2xl mx-auto mt-12">
        <div className="text-4xl mb-4">🏗️</div>
        <h3 className="text-xl font-bold text-red-900 mb-2">No Projects Detected</h3>
        <p className="text-red-600 font-medium mb-6">You need to create a project first.</p>
        <Button onClick={() => window.location.href = '/admin/projects'} variant="primary">Create Project</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-normal text-gray-900 mb-2">Floor Management</h1>
          {building ? (
            <p className="text-gray-500 font-medium font-bold text-[#D4AF37]">Managing floors for {building.name}</p>
          ) : (
            <p className="text-gray-500 font-medium italic">Select a project to manage its floors.</p>
          )}
        </div>
        {building && !showForm && (
          <button
            onClick={() => { setEditingFloor(null); setShowForm(true); }}
            className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-medium hover:bg-[#D4AF37] transition-all transform active:scale-95 shadow-xl flex items-center gap-3"
          >
            <span className="text-xl">+</span> Add New Floor
          </button>
        )}
      </div>

      {!selectedProjectId && !showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects?.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProjectId(p.id)}
              className="bg-white p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all border border-gray-100 group text-center flex flex-col items-center justify-center"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform group-hover:bg-[#D4AF37]/10">
                🏢
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{p.name}</h3>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Manage Floors →</p>
            </button>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-[3rem] shadow-2xl p-10 mb-12 border border-gray-100"
          >
            <h2 className="text-2xl font-bold mb-8">{editingFloor ? 'Edit Floor' : 'Add New Floor'}</h2>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Floor Name</label>
                <input
                  name="name"
                  defaultValue={editingFloor?.name}
                  required
                  placeholder="e.g. Ground Floor, 1st Floor"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingFloor?.description}
                  placeholder="Optional floor details..."
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-bold min-h-[120px]"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gray-900 text-white py-5 rounded-2xl font-bold hover:bg-[#D4AF37] transition-all"
                >
                  {editingFloor ? 'Update Floor' : 'Create Floor'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingFloor(null); }}
                  className="px-10 py-5 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {building && !showForm && (
        <>
          <div className="mb-8 flex items-center justify-between bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Current Discovery Context:</label>
              <h2 className="text-xl font-bold text-gray-900">{building.name}</h2>
            </div>
            <button
              onClick={() => setSelectedProjectId(null)}
              className="px-6 py-2 bg-gray-50 text-gray-500 rounded-xl font-bold hover:bg-gray-100 transition-all text-xs uppercase tracking-widest"
            >
              Change Project
            </button>
          </div>

          <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-50">
            <div className="p-8 border-b border-gray-50">
              <input
                type="text"
                placeholder="Search floors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-bold"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="px-8 py-6 text-left text-xs font-medium uppercase tracking-widest">Floor Name</th>
                    <th className="px-8 py-6 text-left text-xs font-medium uppercase tracking-widest">Description</th>
                    <th className="px-8 py-6 text-right text-xs font-medium uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {isFloorsLoading ? (
                    <tr><td colSpan={3} className="p-12 text-center animate-pulse text-gray-400">Loading floors...</td></tr>
                  ) : filteredFloors.length === 0 ? (
                    <tr><td colSpan={3} className="p-12 text-center text-gray-400 italic">No floors found for this project.</td></tr>
                  ) : filteredFloors.map(floor => (
                    <tr key={floor.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6 font-bold text-gray-900">{floor.name}</td>
                      <td className="px-8 py-6 text-gray-500">{floor.description || '-'}</td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => { setEditingFloor(floor); setShowForm(true); }}
                            className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(floor.id)}
                            className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
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
        </>
      )}
    </div>
  );
}
