'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

export interface FlatFormData {
  flatNumber: string;
  area: string;
  price: string;
  floor: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  status: 'available' | 'booked' | 'sold';
  description: string;
}

interface FlatFormProps {
  onSubmit: (data: FlatFormData) => void;
  onCancel: () => void;
  initialData?: Partial<FlatFormData>;
  mode: 'add' | 'edit';
  availableFloors?: number[];
}

export default function FlatForm({ onSubmit, onCancel, initialData, mode, availableFloors = [2, 3, 4, 5, 6] }: FlatFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FlatFormData>({
    defaultValues: initialData || {
      flatNumber: '',
      area: '',
      price: '',
      floor: 2,
      type: '3BHK',
      bedrooms: 3,
      bathrooms: 2,
      status: 'available',
      description: '',
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {mode === 'add' ? 'Add New Flat' : 'Edit Flat'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flat Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('flatNumber', { required: 'Flat number is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              placeholder="e.g., 201, 302"
            />
            {errors.flatNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.flatNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Floor <span className="text-red-500">*</span>
            </label>
            <select
              {...register('floor', { required: 'Floor is required', valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            >
              {availableFloors.map(floor => (
                <option key={floor} value={floor}>Floor {floor}</option>
              ))}
            </select>
            {errors.floor && (
              <p className="mt-1 text-sm text-red-600">{errors.floor.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('area', { required: 'Area is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              placeholder="e.g., 1200 sq ft"
            />
            {errors.area && (
              <p className="mt-1 text-sm text-red-600">{errors.area.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('price', { required: 'Price is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              placeholder="e.g., ₹45,00,000"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('type', { required: 'Type is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              placeholder="e.g., 3BHK"
            />
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bedrooms <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('bedrooms', { 
                required: 'Bedrooms is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Must be at least 1' }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            />
            {errors.bedrooms && (
              <p className="mt-1 text-sm text-red-600">{errors.bedrooms.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bathrooms <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('bathrooms', { 
                required: 'Bathrooms is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Must be at least 1' }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            />
            {errors.bathrooms && (
              <p className="mt-1 text-sm text-red-600">{errors.bathrooms.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            {...register('status', { required: 'Status is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
          >
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="sold">Sold</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            placeholder="Enter flat description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-[#D4AF37] text-white rounded-lg font-semibold hover:bg-[#B8941E] transition-colors"
          >
            {mode === 'add' ? 'Add Flat' : 'Update Flat'}
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




