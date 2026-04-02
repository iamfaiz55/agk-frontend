'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import BuildingForm, { BuildingFormData } from '@/components/forms/BuildingForm';

const buildings = [
  { id: '1', name: 'AGK Building', project: 'AGK Developers Premium Building', projectId: '1', floors: 7, status: 'active' },
];

const projects = [
  { id: '1', name: 'AGK Developers Premium Building' },
];

export default function ManageBuildingsPage() {
  const [buildingsList, setBuildingsList] = useState(buildings);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (building: typeof buildings[0]) => {
    setEditingId(building.id);
    setShowForm(true);
  };

  const handleFormSubmit = (data: BuildingFormData) => {
    if (editingId) {
      setBuildingsList(buildingsList.map(b =>
        b.id === editingId ? { ...b, ...data, floors: data.totalFloors, project: projects.find(p => p.id === data.projectId)?.name || '' } : b
      ));
    } else {
      const newBuilding = {
        id: `building-${Date.now()}`,
        name: data.name,
        project: projects.find(p => p.id === data.projectId)?.name || '',
        projectId: data.projectId,
        floors: data.totalFloors,
        status: 'active' as const,
      };
      setBuildingsList([...buildingsList, newBuilding]);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const currentBuilding = editingId ? buildingsList.find(b => b.id === editingId) : undefined;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Manage Buildings</h1>
        {!showForm && (
          <Button onClick={handleAdd}>+ Add New Building</Button>
        )}
      </div>

      {showForm && (
        <BuildingForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          initialData={currentBuilding ? {
            name: currentBuilding.name,
            address: '',
            city: '',
            state: '',
            pincode: '',
            totalFloors: currentBuilding.floors,
            totalUnits: 0,
            projectId: currentBuilding.projectId,
          } : undefined}
          mode={editingId ? 'edit' : 'add'}
          projects={projects}
        />
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Building Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Project</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Floors</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {buildingsList.map((building, index) => (
                <motion.tr
                  key={building.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{building.name}</td>
                  <td className="px-6 py-4 text-gray-600">{building.project}</td>
                  <td className="px-6 py-4 text-gray-600">{building.floors}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      {building.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(building)}>Edit</Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this building?')) {
                            setBuildingsList(buildingsList.filter(b => b.id !== building.id));
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

