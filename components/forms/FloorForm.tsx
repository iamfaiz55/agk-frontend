'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

export interface FloorFormData {
  name: string;
  description: string;
  type: 'parking' | 'shops' | 'offices' | 'flats';
  count?: number;
}

interface FloorFormProps {
  onSubmit: (data: FloorFormData) => void;
  onCancel: () => void;
  initialData?: Partial<FloorFormData>;
  mode: 'add' | 'edit';
}

export default function FloorForm({ onSubmit, onCancel, initialData, mode }: FloorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FloorFormData>({
    defaultValues: initialData || {
      name: '',
      description: '',
      type: 'flats',
      count: 0,
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {mode === 'add' ? 'Add New Floor' : 'Edit Floor'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Floor Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('name', { required: 'Floor name is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            placeholder="e.g., Ground Floor, 1st Floor"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            placeholder="Enter floor description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Floor Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register('type', { required: 'Floor type is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
          >
            <option value="parking">Parking</option>
            <option value="shops">Shops</option>
            <option value="offices">Offices</option>
            <option value="flats">Flats</option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unit Count (Optional)
          </label>
          <input
            type="number"
            {...register('count', { 
              valueAsNumber: true,
              min: { value: 0, message: 'Count must be 0 or greater' }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            placeholder="Number of units"
          />
          {errors.count && (
            <p className="mt-1 text-sm text-red-600">{errors.count.message}</p>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-[#D4AF37] text-white rounded-lg font-semibold hover:bg-[#B8941E] transition-colors"
          >
            {mode === 'add' ? 'Add Floor' : 'Update Floor'}
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




