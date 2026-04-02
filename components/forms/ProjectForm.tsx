'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Image from 'next/image';
import AmenitiesManager from '../AmenitiesManager';
import { Amenity } from '@/types';

export interface ProjectImageSection {
  title: string;
  images: string[];
}

export interface ProjectFormData {
  name: string;
  tagline?: string;
  location: string;
  description: string;
  status: 'active' | 'inactive' | 'completed';
  commercialFeatures?: string[];
  residentialFeatures?: string[];
  investmentPoints?: string[];
  images?: FileList;
  sections: ProjectImageSection[];
}

type ProjectFormArrayFields = 'commercialFeatures' | 'residentialFeatures' | 'investmentPoints';

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
  initialData?: Partial<ProjectFormData>;
  mode: 'add' | 'edit';
  projectId?: number;
  currentAmenities?: Amenity[];
}

export default function ProjectForm({ onSubmit, onCancel, initialData, mode, projectId, currentAmenities }: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: initialData || {
      name: '',
      tagline: '',
      location: '',
      description: '',
      status: 'active',
      commercialFeatures: [],
      residentialFeatures: [],
      investmentPoints: [],
      sections: [{ title: 'Main Gallery', images: [] }],
    },
  });

  const sections = watch('sections') || [];

  const addSection = () => {
    setValue('sections', [...sections, { title: 'New Section', images: [] }]);
  };

  const removeSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index);
    setValue('sections', newSections);
  };

  const updateSectionTitle = (index: number, title: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], title };
    setValue('sections', newSections);
  };

  const removeImageFromSection = (sectionIndex: number, imageIndex: number) => {
    const newSections = [...sections];
    const newImages = newSections[sectionIndex].images.filter((_, i) => i !== imageIndex);
    newSections[sectionIndex] = { ...newSections[sectionIndex], images: newImages };
    setValue('sections', newSections);
  };

  const handleAddItem = (field: ProjectFormArrayFields, value: string) => {
    if (!value.trim()) return;
    const currentItems = watch(field) || [];
    setValue(field, [...currentItems, value.trim()]);
  };

  const handleRemoveItem = (field: ProjectFormArrayFields, index: number) => {
    const currentItems = watch(field) || [];
    setValue(field, currentItems.filter((_, i) => i !== index));
  };

  const PointManager = ({ label, field }: { label: string, field: ProjectFormArrayFields }) => {
    const items = watch(field) || [];
    const [inputValue, setInputValue] = useState('');

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
            placeholder={`Add ${label.toLowerCase()}...`}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddItem(field, inputValue);
                setInputValue('');
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              handleAddItem(field, inputValue);
              setInputValue('');
            }}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
              <span className="text-sm text-gray-700">{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveItem(field, idx)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {mode === 'add' ? 'Add New Project' : 'Edit Project'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('name', { required: 'Project name is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              placeholder="e.g., AGK Developers Premium Building"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tagline
            </label>
            <input
              type="text"
              {...register('tagline')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              placeholder="e.g., Experience Luxury Living"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('location', { required: 'Location is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            placeholder="e.g., Prime Location, City Center"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            {...register('description')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            placeholder="Project description..."
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 border-y border-gray-100">
           <PointManager label="Commercial Features" field="commercialFeatures" />
           <PointManager label="Residential Features" field="residentialFeatures" />
        </div>

        <div className="py-2">
           <PointManager label="Investment Highlights" field="investmentPoints" />
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between">
             <label className="block text-sm font-medium text-gray-700">Project Image Sections</label>
             <button
               type="button"
               onClick={addSection}
               className="text-sm px-3 py-1 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
             >
               + Add Section
             </button>
           </div>
           
           <div className="space-y-6">
             {sections.map((section, sIdx) => (
               <div key={sIdx} className="p-4 border border-gray-200 rounded-xl bg-gray-50/50">
                 <div className="flex items-center gap-4 mb-4">
                   <input
                     type="text"
                     value={section.title}
                     onChange={(e) => updateSectionTitle(sIdx, e.target.value)}
                     className="flex-1 px-3 py-1 text-sm font-semibold bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                     placeholder="Section Title (e.g., Interior, Lobby)"
                   />
                   <button
                     type="button"
                     onClick={() => removeSection(sIdx)}
                     className="text-red-500 hover:text-red-700 p-1"
                     title="Remove Section"
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                       <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                     </svg>
                   </button>
                 </div>

                 {section.images.length > 0 ? (
                   <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                     {section.images.map((img, iIdx) => (
                       <div key={iIdx} className="relative aspect-square rounded-lg overflow-hidden group border border-gray-200 bg-white">
                         <Image 
                           src={img.startsWith('http') ? img : `https://api.agkinfrastructures.com${img}`} 
                           alt={`${section.title} image ${iIdx + 1}`} 
                           fill 
                           className="object-cover" 
                           sizes="150px"
                         />
                         <button
                           type="button"
                           onClick={() => removeImageFromSection(sIdx, iIdx)}
                           className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
                         >
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                             <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                           </svg>
                         </button>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <p className="text-xs text-gray-400 italic">No existing images in this section.</p>
                 )}
               </div>
             ))}
           </div>

           <div className="pt-2">
             <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Images</label>
             <p className="text-xs text-gray-500 mb-2 italic">Newly uploaded images will be added to the first section automatically.</p>
             <input
                 type="file"
                 multiple
                 accept="image/*"
                 {...register('images')}
                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#D4AF37] file:text-white hover:file:bg-[#B8941E]"
             />
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-[#D4AF37] text-white rounded-lg font-semibold hover:bg-[#B8941E] transition-colors"
          >
            {mode === 'add' ? 'Add Project' : 'Update Project'}
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

      {mode === 'edit' && projectId && (
        <AmenitiesManager projectId={projectId} amenities={currentAmenities || []} />
      )}
    </motion.div>
  );
}
