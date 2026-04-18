'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CarouselItem } from '@/redux/api/carouselApi';

export interface CarouselFormData {
  title: string;
  link: string;
  displayOrder: number;
  isActive: boolean;
  imageDesktop: FileList;
  imageMobile: FileList;
}

interface CarouselFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  initialData?: CarouselItem;
  mode: 'add' | 'edit';
}

export default function CarouselForm({
  onSubmit,
  onCancel,
  initialData,
  mode,
}: CarouselFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CarouselFormData>({
    defaultValues: initialData ? {
      title: initialData.title || '',
      link: initialData.link || '',
      displayOrder: initialData.displayOrder || 0,
      isActive: initialData.isActive ?? true,
    } : {
      title: '',
      link: '',
      displayOrder: 0,
      isActive: true,
    },
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || 'http://localhost:3110';
  const [previewDesktop, setPreviewDesktop] = useState<string | null>(
    initialData?.imageDesktop 
      ? (initialData.imageDesktop.startsWith('http') ? initialData.imageDesktop : `${API_URL}${initialData.imageDesktop}`) 
      : null
  );
  const [previewMobile, setPreviewMobile] = useState<string | null>(
    initialData?.imageMobile 
      ? (initialData.imageMobile.startsWith('http') ? initialData.imageMobile : `${API_URL}${initialData.imageMobile}`) 
      : null
  );

  const onFormSubmit = (data: CarouselFormData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('link', data.link);
    formData.append('displayOrder', data.displayOrder.toString());
    formData.append('isActive', data.isActive.toString());

    if (data.imageDesktop && data.imageDesktop[0]) {
      formData.append('imageDesktop', data.imageDesktop[0]);
    }
    if (data.imageMobile && data.imageMobile[0]) {
      formData.append('imageMobile', data.imageMobile[0]);
    }

    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100"
    >
      <h2 className="text-2xl font-black text-gray-900 mb-8">
        {mode === 'add' ? '✨ Add Carousel Slide' : '📝 Edit Slide'}
      </h2>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Column: Text Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Slide Title</label>
              <input
                type="text"
                {...register('title')}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-semibold text-gray-700"
                placeholder="e.g. Luxury Villas"
              />
            </div>



            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Display Order</label>
              <input
                type="number"
                {...register('displayOrder', { valueAsNumber: true })}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-semibold text-gray-700"
              />
            </div>

             <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Link (Optional)</label>
              <input
                type="text"
                {...register('link')}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-semibold text-gray-700"
                placeholder="/projects/1"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Status</label>
                <input 
                    type="checkbox" 
                    {...register('isActive')}
                    className="w-5 h-5 accent-[#D4AF37]"
                />
            </div>
          </div>

          {/* Right Column: Image Uploads */}
          <div className="space-y-6">
            {/* Desktop Image */}
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Desktop Image (Required)</label>
                <input
                    type="file"
                    accept="image/*"
                    {...register('imageDesktop', { required: mode === 'add' ? 'Desktop image is required' : false })}
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                        setPreviewDesktop(URL.createObjectURL(e.target.files[0]));
                        }
                    }}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-semibold text-gray-700"
                />
                {errors.imageDesktop && <p className="mt-1 text-sm text-red-600">{errors.imageDesktop.message}</p>}
                
                {previewDesktop && (
                    <div className="mt-4 rounded-2xl overflow-hidden border border-gray-200 h-32 relative">
                        <img src={previewDesktop} alt="Desktop Preview" className="w-full h-full object-cover" />
                        <div className="absolute bottom-1 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded">Desktop</div>
                    </div>
                )}
            </div>

            {/* Mobile Image */}
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Mobile Image (Required)</label>
                <input
                    type="file"
                    accept="image/*"
                    {...register('imageMobile', { required: mode === 'add' ? 'Mobile image is required' : false })}
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                        setPreviewMobile(URL.createObjectURL(e.target.files[0]));
                        }
                    }}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-semibold text-gray-700"
                />
                {errors.imageMobile && <p className="mt-1 text-sm text-red-600">{errors.imageMobile.message}</p>}

                {previewMobile && (
                    <div className="mt-4 rounded-2xl overflow-hidden border border-gray-200 h-32 w-24 relative mx-auto bg-gray-100">
                        <img src={previewMobile} alt="Mobile Preview" className="w-full h-full object-cover" />
                         <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-2 py-1 rounded">Mobile</div>
                    </div>
                )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#D4AF37] transition-all transform active:scale-95 shadow-xl"
          >
            {mode === 'add' ? 'Create Slide' : 'Update Slide'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}
