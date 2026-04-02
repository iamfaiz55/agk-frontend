'use client';

import { useState } from 'react';
import { useAddAmenityMutation, useUpdateAmenityMutation, useDeleteAmenityMutation } from '@/redux/api/amenitiesApi';
import { projectsApi } from '@/redux/api/projectsApi';
import { Amenity } from '@/types';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

interface AmenitiesManagerProps {
    projectId: number;
    amenities: Amenity[];
}

interface AmenityFormData {
    name: string;
    icon: string;
    description: string;
}

export default function AmenitiesManager({ projectId, amenities }: AmenitiesManagerProps) {
    const [addAmenity, { isLoading: isAddingLoader }] = useAddAmenityMutation();
    const [updateAmenity, { isLoading: isUpdatingLoader }] = useUpdateAmenityMutation();
    const [deleteAmenity, { isLoading: isDeletingLoader }] = useDeleteAmenityMutation();

    const [isAdding, setIsAdding] = useState(false);
    const [editingAmenity, setEditingAmenity] = useState<Amenity | null>(null);
    const dispatch = useDispatch();

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<AmenityFormData>();
    const selectedIcon = watch('icon');

    const COMMON_ICONS = [
        // Building & Structures
        '🏢', '🏠', '🏦', '🏥', '🏫', '🏪', '🏭', '🏟️', '🕍', '🕌', '⛪', '⛩️',
        // Transport & Parking
        '🅿️', '🚗', '🚕', '🚌', '🏎️', '🚲', '🛴', '🛵', '🚤', '✈️', '🚁', '🚀', '⛽', 'EV',
        // Security & Safety
        '🛡️', '🔒', '🔑', '🚨', '🚒', '👮', '📹', '🔥', '🧯', '🩺',
        // Utilities & Services
        '⚡', '💧', '🔥', '❄️', '📶', '♻️', '🗑️', '🧹', '🧺', '🛠️', '⚙️', '💡', '🔦', '🛗',
        // Recreation & Sports
        '🏊', '🏋️', '🧘', '🏃', '🚴', '⛹️', '🤸', '🏌️', '🎾', '🏸', '🏓', '🎱', '🎳', '⚾', '🏈', '⚽',
        // Leisure & Entertainment
        '🎥', '🎮', '🎲', '🎭', '🎨', '🎬', '🎧', '🎤', '🎼', '🎹', '🎪', '🎫',
        // Food & Dining
        '🍽️', '🍴', '🥄', '🍹', '☕', '🍵', '🥂', '🍺', '🍕', '🍔', '🥗', '🍎', '🍇', '🥐', '🍦', '🍖',
        // Nature & Outdoors
        '🌳', '🌲', '🌴', '🌵', '🌷', '🌸', '🌹', '🌻', '🌞', '🌝', '🌤️', '🌧️', '⭐', '🔥', '🌊',
        // Wellness & Health
        '🛁', '🚿', '🧴', '🧖', '💆', '💅', '🧼', '💊', '🩹',
        // Kids
        '🧸', '🪁', '🎠', '🎡', '🎢', '👾', '🤖', '🧩',
        // Office & Business
        '💼', '💻', '🖥️', '🖨️', '📁', '📅', '📈', '📊', '📠', '📎',
        // Miscellaneous
        '🛒', '🛍️', '🎁', '📫', '📦', '🛎️', '🕰️', '⏰', '⏳', '👓', '☂️', '🐾'
    ];

    const startEditing = (amenity: Amenity) => {
        setEditingAmenity(amenity);
        setValue('name', amenity.name);
        setValue('icon', amenity.icon);
        setValue('description', amenity.description);
        setIsAdding(true);
    };

    const cancelEdit = () => {
        setEditingAmenity(null);
        setIsAdding(false);
        reset();
    };

    const onSubmit = async (data: AmenityFormData) => {
        try {
            if (editingAmenity) {
                await updateAmenity({ id: editingAmenity.id, data }).unwrap();
            } else {
                await addAmenity({ ...data, buildingId: projectId }).unwrap();
            }
            dispatch(projectsApi.util.invalidateTags(['Projects']));
            cancelEdit();
        } catch (error) {
            console.error('Failed to save amenity', error);
            alert('Failed to save amenity');
        }
    };

    const handleDelete = async (id: number | string) => {
        if (!confirm('Are you sure you want to delete this amenity?')) return;
        try {
            await deleteAmenity(id).unwrap();
            dispatch(projectsApi.util.invalidateTags(['Projects']));
        } catch (error) {
            console.error('Failed to delete amenity', error);
            alert('Failed to delete amenity');
        }
    };

    return (
        <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Project Amenities</h3>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800"
                    >
                        + Add Amenity
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl mb-6 border border-gray-100 shadow-lg">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">{editingAmenity ? 'Edit Amenity' : 'New Amenity'}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="md:col-span-1 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                <input
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full text-base p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all placeholder-gray-400"
                                    placeholder="e.g. Swimming Pool"
                                />
                                {errors.name && <span className="text-sm text-red-500 mt-1 block">{errors.name.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                <textarea
                                    {...register('description')}
                                    rows={4}
                                    className="w-full text-base p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all placeholder-gray-400 resize-none"
                                    placeholder="Describe the amenity..."
                                />
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Icon</label>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <div className="mb-3">
                                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm transition-all focus-within:ring-2 focus-within:ring-[#D4AF37]">
                                        <span className="text-2xl min-w-[32px] text-center">
                                            {selectedIcon || (editingAmenity?.icon) || '✨'}
                                        </span>
                                        <input
                                            {...register('icon', { required: 'Icon is required' })}
                                            className="w-full text-base bg-transparent border-none focus:ring-0 p-0 text-gray-800 placeholder-gray-400"
                                            placeholder="Type here or pick an emoji below"
                                        />
                                    </div>
                                    {errors.icon && <span className="text-sm text-red-500 mt-1 block">{errors.icon.message}</span>}
                                </div>

                                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Select Icon</label>
                                <div className="grid grid-cols-6 gap-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                                    {COMMON_ICONS.map((icon, index) => (
                                        <button
                                            key={`${icon}-${index}`}
                                            type="button"
                                            onClick={() => setValue('icon', icon)}
                                            className="text-2xl p-3 hover:bg-white hover:shadow-md hover:scale-110 active:scale-95 rounded-lg transition-all duration-200 text-center bg-gray-100/50 border border-transparent hover:border-gray-200"
                                        >
                                            {icon}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isAddingLoader || isUpdatingLoader}
                            className="bg-[#D4AF37] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#B8941E] disabled:opacity-50"
                        >
                            {isAddingLoader || isUpdatingLoader ? 'Saving...' : 'Save Amenity'}
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {amenities && amenities.length > 0 ? (
                    amenities.map((amenity) => (
                        <div key={amenity.id} className="relative group flex items-center p-3 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3 text-lg leading-none">
                                {amenity.icon}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900">{amenity.name}</h4>
                                <p className="text-xs text-gray-500">{amenity.description}</p>
                            </div>
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                <button
                                    onClick={() => startEditing(amenity)}
                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                    title="Edit"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => handleDelete(amenity.id)}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                                    title="Delete"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500 italic">No amenities added yet.</p>
                )}
            </div>
        </div>
    );
}
