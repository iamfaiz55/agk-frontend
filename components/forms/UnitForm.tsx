'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useGetFloorsQuery } from '@/redux/api/floorsApi';
import { skipToken } from '@reduxjs/toolkit/query';

export interface UnitFormData {
    buildingId: number;
    name?: string; // Unit name like G1, F1, etc.
    type: 'shop' | 'office' | 'flat';
    price: number;
    size: string;
    status: 'available' | 'sold' | 'reserved';
    floorNumber: number;
    bedrooms?: number;
    bathrooms?: number;
    extraAmenities?: string;
    images?: FileList;
    keptImages?: string[];
}

interface UnitFormProps {
    onSubmit: (data: UnitFormData) => void;
    onCancel: () => void;
    initialData?: Partial<UnitFormData>;
    mode: 'add' | 'edit';
    buildingId: number;
    savedImages?: string | string[];
}

export default function UnitForm({ onSubmit, onCancel, initialData, mode, buildingId, savedImages }: UnitFormProps) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
    } = useForm<UnitFormData>({
        defaultValues: initialData || {
            buildingId: buildingId,
            name: '',
            type: 'flat',
            price: 0,
            size: '',
            status: 'available',
            floorNumber: 2,
            bedrooms: 3,
            bathrooms: 3,
            extraAmenities: '',
        },
    });
    
    const { data: floors } = useGetFloorsQuery(buildingId ? { buildingId } : skipToken, { skip: !buildingId });

    const unitType = watch('type');
    const keptImages = watch('keptImages') || [];

    useEffect(() => {
        if (savedImages) {
            let parsed: string[] = [];
            if (Array.isArray(savedImages)) {
                parsed = savedImages;
            } else if (typeof savedImages === 'string') {
                try {
                    parsed = JSON.parse(savedImages);
                } catch (e) {
                    console.error('Failed to parse saved images', e);
                    parsed = [];
                }
            }
            // Ensure parsed is really an array
            if (!Array.isArray(parsed)) parsed = [];
            
            setValue('keptImages', parsed);
        }
    }, [savedImages, setValue]);

    const removeImage = (indexToRemove: number) => {
        const newImages = keptImages.filter((_, idx) => idx !== indexToRemove);
        setValue('keptImages', newImages);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100"
        >
            <h2 className="text-3xl font-black text-gray-900 mb-8">
                {mode === 'add' ? '✨ Add New Unit' : '📝 Edit Unit'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Unit Name Field */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Unit Name <span className="text-[#D4AF37]">(e.g., G1, F1, S2)</span>
                    </label>
                    <input
                        type="text"
                        {...register('name')}
                        placeholder="G1, F1, S2, etc."
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all outline-none font-semibold text-gray-700"
                    />
                    <p className="text-xs text-gray-500 mt-2 ml-2">
                        Give this unit a unique identifier (e.g., G1 for Ground Floor Unit 1, F1 for First Floor Unit 1)
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Unit Type</label>
                        <select
                            {...register('type', { required: true })}
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all outline-none font-semibold text-gray-700"
                        >
                            <option value="shop">Shop (Ground Floor)</option>
                            <option value="office">Office (1st Floor)</option>
                            <option value="flat">Flat (2nd Floor+)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Floor</label>
                        {floors && floors.length > 0 ? (
                            <select
                                {...register('floorNumber', { required: true, valueAsNumber: true })}
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all outline-none font-semibold text-gray-700"
                            >
                                <option value="">Select Floor</option>
                                {floors.map(f => (
                                    <option key={f.id} value={f.id}>{f.name}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="number"
                                {...register('floorNumber', { required: true, valueAsNumber: true })}
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all outline-none font-semibold text-gray-700"
                            />
                        )}
                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">Number of floor</p>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Status</label>
                        <select
                            {...register('status', { required: true })}
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all outline-none font-semibold text-gray-700"
                        >
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                            <option value="reserved">Reserved</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Price (INR)</label>
                        <input
                            type="number"
                            {...register('price', { required: true, valueAsNumber: true })}
                            placeholder="e.g., 5500000"
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all outline-none font-semibold text-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Size (e.g., 1200 sqft)</label>
                        <input
                            type="text"
                            {...register('size', { required: true })}
                            placeholder="1200 sqft"
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all outline-none font-semibold text-gray-700"
                        />
                    </div>
                </div>

                {unitType === 'flat' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[#FDF8E7]/50 rounded-3xl border border-[#D4AF37]/10">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Bedrooms (BHK)</label>
                            <input
                                type="number"
                                {...register('bedrooms', { valueAsNumber: true })}
                                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] transition-all outline-none font-semibold text-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Bathrooms</label>
                            <input
                                type="number"
                                {...register('bathrooms', { valueAsNumber: true })}
                                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] transition-all outline-none font-semibold text-gray-700"
                            />
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Extra Amenities (Comma separated)</label>
                    <input
                        type="text"
                        {...register('extraAmenities')}
                        placeholder="Lift, Backup, Parking, etc."
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all outline-none font-semibold text-gray-700"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Unit Images</label>
                    
                    {/* Existing Images */}
                    {keptImages.length > 0 && (
                        <div className="mb-4 grid grid-cols-4 gap-4">
                            {keptImages.map((img, idx) => (
                                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-200">
                                    <Image 
                                        src={img.startsWith('http') ? img : `https://api.agkinfrastructures.com${img}`} 
                                        alt={`Unit image ${idx + 1}`} 
                                        fill 
                                        className="object-cover" 
                                        sizes="100px"
                                        unoptimized
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        {...register('images')}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all outline-none font-semibold text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#D4AF37] file:text-white hover:file:bg-[#B8941E]"
                    />
                    <p className="text-xs text-gray-500 mt-2 ml-2">
                        Upload images for this unit (max 5MB per image)
                    </p>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="flex-1 bg-gray-900 text-white px-8 py-5 rounded-2xl font-bold hover:bg-[#D4AF37] transition-all transform active:scale-95 shadow-xl"
                    >
                        {mode === 'add' ? 'Create Unit' : 'Save Changes'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-8 py-5 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all transform active:scale-95"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
