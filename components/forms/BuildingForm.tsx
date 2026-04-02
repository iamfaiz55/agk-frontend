'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

export interface BuildingFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  totalFloors: number;
  totalUnits: number;
  projectId: string;
}

interface BuildingFormProps {
  onSubmit: (data: BuildingFormData) => void;
  onCancel: () => void;
  initialData?: Partial<BuildingFormData>;
  mode: 'add' | 'edit';
  projects?: Array<{ id: string; name: string }>;
}

export default function BuildingForm({ onSubmit, onCancel, initialData, mode, projects = [] }: BuildingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BuildingFormData>({
    defaultValues: initialData || {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      totalFloors: 0,
      totalUnits: 0,
      projectId: '',
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {mode === 'add' ? 'Add New Building' : 'Edit Building'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Building Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('name', { required: 'Building name is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            placeholder="e.g., AGK Premium Tower"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {projects.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project <span className="text-red-500">*</span>
            </label>
            <select
              {...register('projectId', { required: 'Project is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
            {errors.projectId && (
              <p className="mt-1 text-sm text-red-600">{errors.projectId.message}</p>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('address', { required: 'Address is required' })}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            placeholder="Enter building address"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('city', { required: 'City is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              placeholder="City"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('state', { required: 'State is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              placeholder="State"
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('pincode', { 
                required: 'Pincode is required',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'Pincode must be 6 digits'
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              placeholder="123456"
            />
            {errors.pincode && (
              <p className="mt-1 text-sm text-red-600">{errors.pincode.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Floors <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('totalFloors', { 
                required: 'Total floors is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Must be at least 1' }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            />
            {errors.totalFloors && (
              <p className="mt-1 text-sm text-red-600">{errors.totalFloors.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Units <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('totalUnits', { 
                required: 'Total units is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Must be at least 1' }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            />
            {errors.totalUnits && (
              <p className="mt-1 text-sm text-red-600">{errors.totalUnits.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-[#D4AF37] text-white rounded-lg font-semibold hover:bg-[#B8941E] transition-colors"
          >
            {mode === 'add' ? 'Add Building' : 'Update Building'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}




