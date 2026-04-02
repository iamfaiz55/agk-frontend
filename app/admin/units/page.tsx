'use client';

import Loader from '@/components/ui/Loader';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import UnitForm, { UnitFormData } from '@/components/forms/UnitForm';
import {
  useGetProjectsQuery,
} from '@/redux/api/projectsApi';
import {
  useGetBuildingUnitsQuery,
  useAddUnitMutation,
  useUpdateUnitMutation,
  useDeleteUnitMutation
} from '@/redux/api/unitsApi';
import { useGetFloorsQuery } from '@/redux/api/floorsApi';
import { Unit } from '@/types';

const statusColors = {
  available: 'bg-green-100 text-green-800',
  reserved: 'bg-yellow-100 text-yellow-800',
  sold: 'bg-red-100 text-red-800',
};

const iconMap = {
  shop: '🏪',
  office: '🏢',
  flat: '🏠',
};

import { skipToken } from '@reduxjs/toolkit/query';

export default function UnitManagementPage() {
  const { data: projects, isLoading: isProjectsLoading } = useGetProjectsQuery();
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  
  // Explicitly fetch units for the selected project
  const { data: unitsData, isLoading: isUnitsLoading } = useGetBuildingUnitsQuery(
    selectedProjectId || skipToken,
    { skip: !selectedProjectId }
  );

  const { data: floorsData } = useGetFloorsQuery(
    selectedProjectId ? { buildingId: selectedProjectId } : skipToken,
    { skip: !selectedProjectId }
  );

  const [addUnit, { isLoading: isAdding }] = useAddUnitMutation();
  const [updateUnit, { isLoading: isUpdating }] = useUpdateUnitMutation();
  const [deleteUnit, { isLoading: isDeleting }] = useDeleteUnitMutation();

  const [showForm, setShowForm] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'shop' | 'office' | 'flat'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'reserved' | 'sold'>('all');

  const isProcessing = isAdding || isUpdating || isDeleting;

  const building = useMemo(() => {
    if (!projects || !selectedProjectId) return null;
    return projects.find(p => p.id === selectedProjectId) || null;
  }, [projects, selectedProjectId]);

  const isLoading = isProjectsLoading || isUnitsLoading;

  // Filter and search units - MUST be before any conditional returns
  const filteredUnits = useMemo(() => {
    const units = unitsData || [];

    let filtered = [...units];

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(u => u.type === filterType);
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(u => u.status === filterStatus);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(unit =>
        unit.name?.toLowerCase().includes(query) ||
        unit.id.toString().includes(query) ||
        unit.type.toLowerCase().includes(query) ||
        unit.size?.toLowerCase().includes(query) ||
        unit.floorNumber?.toString().includes(query)
      );
    }

    return filtered;
  }, [unitsData, filterType, filterStatus, searchQuery]);

  const handleFormSubmit = async (data: UnitFormData) => {
    try {
      const formData = new FormData();
      
      // Append all non-image fields
      (Object.keys(data) as Array<keyof UnitFormData>).forEach((key) => {
        if (key !== 'images' && key !== 'keptImages' && data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key].toString());
        }
      });

      // Append kept images (existing ones that weren't deleted)
      if (data.keptImages && data.keptImages.length > 0) {
        data.keptImages.forEach((img) => {
            formData.append('images', img);
        });
      }

      // Append new images
      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => {
          formData.append('images', file);
        });
      }

      if (editingUnit) {
        await updateUnit({ id: editingUnit.id, data: formData }).unwrap();
      } else {
        await addUnit(formData).unwrap();
      }
      setShowForm(false);
      setEditingUnit(null);
    } catch (error) {
      console.error('Failed to save unit:', error);
      alert('Error saving unit. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this unit?')) {
      try {
        await deleteUnit(id).unwrap();
      } catch (error) {
        console.error('Failed to delete unit:', error);
      }
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterType('all');
    setFilterStatus('all');
  };

  // Conditional returns AFTER all hooks
  if (isLoading) {
    return <div className="p-8 text-center animate-pulse text-gray-400 font-medium tracking-widest uppercase text-xs">Calibrating Unit Data...</div>;
  }

  // Only show "No Project Found" if the actual project list is empty
  if (!isProjectsLoading && (!projects || projects.length === 0)) {
    return (
      <div className="p-12 text-center bg-red-50 rounded-[3rem] border border-red-100 max-w-2xl mx-auto mt-12">
        <div className="text-4xl mb-4">🏗️</div>
        <h3 className="text-xl font-bold text-red-900 mb-2">No Projects Detected</h3>
        <p className="text-red-600 font-medium mb-6">You need to create a project before you can manage its units.</p>
        <Button onClick={() => window.location.href = '/admin/projects'} variant="primary">Create Your First Project</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {isProcessing && <Loader />}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-normal text-gray-900 mb-2">Unit Management</h1>
          {building ? (
            <p className="text-gray-500 font-medium">Manage all shops, offices, and flats for <span className="text-[#D4AF37] font-bold">{building.name}</span></p>
          ) : (
            <p className="text-gray-500 font-medium italic">Please select a project from below to start managing units.</p>
          )}
        </div>
        {building && !showForm && (
          <button
            onClick={() => { setEditingUnit(null); setShowForm(true); }}
            className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-medium hover:bg-[#D4AF37] transition-all transform active:scale-95 shadow-xl flex items-center gap-3"
          >
            <span className="text-xl">+</span> Add New Unit
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
                    className="bg-white p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all border border-gray-100 group text-left flex flex-col items-center justify-center text-center"
                >
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform group-hover:bg-[#D4AF37]/10">
                        🏗️
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{p.name}</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Manage units →</p>
                </button>
            ))}
        </motion.div>
      )}

      <AnimatePresence>
        {showForm && (
          <UnitForm
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
            mode={editingUnit ? 'edit' : 'add'}
            buildingId={building?.id || 0}
            initialData={editingUnit ? (() => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { images: _images, ...rest } = editingUnit;
              return rest;
            })() : undefined}
            savedImages={Array.isArray(editingUnit?.images) ? editingUnit.images.map((img) => typeof img === 'string' ? img : img.url) : []}
          />
        )}
      </AnimatePresence>

      {/* Project Selector (Switching context) */}
      {!showForm && building && projects && projects.length > 1 && (
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
      )}

      {/* Search and Filters */}
      {building && !showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <div className="flex flex-col gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by unit name (G1, F1), ID, type, floor, or size..."
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

            {/* Type Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="flex gap-2">
                {(['all', 'shop', 'office', 'flat'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-6 py-3 rounded-xl font-medium text-sm transition-all ${filterType === type
                      ? 'bg-[#D4AF37] text-white shadow-lg'
                      : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
                      }`}
                  >
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1) + 's'}
                  </button>
                ))}
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'available' | 'reserved' | 'sold')}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-gray-900 font-medium cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>

              {(searchQuery || filterType !== 'all' || filterStatus !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all font-medium text-sm"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing <span className="font-bold text-[#D4AF37]">{filteredUnits.length}</span> of <span className="font-bold">{unitsData?.length || 0}</span> units
          </div>
        </motion.div>
      )}

      {/* Units Table */}
      {building && !showForm && (
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 overflow-hidden border border-gray-50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-8 py-6 text-left text-xs font-medium uppercase tracking-widest">Unit Name</th>
                  <th className="px-8 py-6 text-left text-xs font-medium uppercase tracking-widest">Type</th>
                  <th className="px-8 py-6 text-left text-xs font-medium uppercase tracking-widest">ID</th>
                  <th className="px-8 py-6 text-left text-xs font-medium uppercase tracking-widest">Floor</th>
                  <th className="px-8 py-6 text-left text-xs font-medium uppercase tracking-widest">Area</th>
                  <th className="px-8 py-6 text-left text-xs font-medium uppercase tracking-widest">Price</th>
                  <th className="px-8 py-6 text-left text-xs font-medium uppercase tracking-widest">Status</th>
                  <th className="px-8 py-6 text-left text-xs font-medium uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUnits.map((unit) => (
                  <tr key={unit.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <span className="font-bold text-lg text-[#D4AF37]">{unit.name || '-'}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{iconMap[unit.type]}</span>
                        <span className="font-medium text-gray-900 capitalize">{unit.type}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-medium text-gray-500">#{unit.id}</td>
                    <td className="px-8 py-6">
                      <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm font-medium text-gray-600">
                        {floorsData?.find(f => f.id === unit.floorNumber)?.name || `Floor ${unit.floorNumber}`}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-semibold text-gray-700">{unit.size}</td>
                    <td className="px-8 py-6 font-black text-[#D4AF37]">₹{(unit.price / 100000).toFixed(2)}L</td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-medium uppercase tracking-tighter ${statusColors[unit.status]}`}>
                        {unit.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingUnit(unit); setShowForm(true); }}
                          className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(unit.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUnits.length === 0 && (
              <div className="p-12 text-center">
                <div className="text-4xl mb-4">🏜️</div>
                <p className="text-gray-400 font-medium mb-4">No units found matching your filters.</p>
                {(searchQuery || filterType !== 'all' || filterStatus !== 'all') && (
                  <button
                    onClick={clearFilters}
                    className="bg-[#D4AF37] text-white px-6 py-3 rounded-xl hover:bg-[#B8941E] transition-all"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
