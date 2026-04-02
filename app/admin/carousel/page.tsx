'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Loader from '@/components/ui/Loader';
import CarouselForm from '@/components/forms/CarouselForm';
import { 
    useGetCarouselsQuery, 
    useAddCarouselMutation, 
    useUpdateCarouselMutation, 
    useDeleteCarouselMutation,
    CarouselItem 
} from '@/redux/api/carouselApi';

export default function CarouselPage() {
  const { data: carousels, isLoading } = useGetCarouselsQuery();
  const [addCarousel, { isLoading: isAdding }] = useAddCarouselMutation();
  const [updateCarousel, { isLoading: isUpdating }] = useUpdateCarouselMutation();
  const [deleteCarousel, { isLoading: isDeleting }] = useDeleteCarouselMutation();

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<CarouselItem | null>(null);

  const isProcessing = isAdding || isUpdating || isDeleting;

  if (isLoading) {
    return <div className="p-8 text-center animate-pulse text-gray-400">Loading carousel...</div>;
  }

  const sortedCarousels = [...(carousels || [])].sort((a, b) => a.displayOrder - b.displayOrder);

  const handleFormSubmit = async (formData: FormData) => {
    try {
      if (editingItem) {
        await updateCarousel({ id: editingItem.id, data: formData }).unwrap();
      } else {
        await addCarousel(formData).unwrap();
      }
      setShowForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Failed to save carousel slide:', error);
      alert('Error saving carousel slide.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this carousel slide?')) {
      try {
        await deleteCarousel(id).unwrap();
      } catch (error) {
        console.error('Failed to delete image:', error);
      }
    }
  };

  const handleEdit = (item: CarouselItem) => {
      setEditingItem(item);
      setShowForm(true);
  };

  const API_URL = 'https://api.agkinfrastructures.com';

  return (
    <div className="max-w-7xl mx-auto">
      {isProcessing && <Loader />}
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Home Carousel</h1>
          <p className="text-gray-500 font-medium">Manage the hero section slides for both Desktop and Mobile.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => { setEditingItem(null); setShowForm(true); }}
            className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#D4AF37] transition-all transform active:scale-95 shadow-xl flex items-center gap-3"
          >
            <span className="text-xl">+</span> Add New Slide
          </button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <CarouselForm
            onSubmit={handleFormSubmit}
            onCancel={() => { setShowForm(false); setEditingItem(null); }}
            mode={editingItem ? 'edit' : 'add'}
            initialData={editingItem || undefined}
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedCarousels.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border ${item.isActive ? 'border-gray-100' : 'border-red-200'}`}
          >
            <div className="relative h-48 bg-gray-100">
               {/* Show Desktop Image by default, maybe toggle or split view? */}
               {/* Let's show split view or overlay */}
               <div className="absolute inset-0 flex">
                   <div className="w-2/3 relative border-r border-white/20">
                        <Image
                            src={item.imageDesktop?.startsWith('http') ? item.imageDesktop : `${API_URL}${item.imageDesktop}`}
                            alt="Desktop"
                            fill
                            className="object-cover"
                            unoptimized // Since using external URL
                        />
                        <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-md">Desktop</span>
                   </div>
                   <div className="w-1/3 relative">
                        <Image
                            src={item.imageMobile?.startsWith('http') ? item.imageMobile : `${API_URL}${item.imageMobile}`}
                            alt="Mobile"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                         <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-md">Mobile</span>
                   </div>
               </div>

              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-300 text-xs font-medium uppercase tracking-widest">Order: {item.displayOrder}</p>
              </div>
            </div>
            
            <div className="p-6">
                 <div className="flex justify-between items-center mb-4">
                     <div>
                         <h4 className="font-bold text-gray-800">{item.title || 'Untitled Slide'}</h4>
                     </div>
                     <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                         {item.isActive ? 'Active' : 'Hidden'}
                     </span>
                 </div>

                 {item.link && (
                     <div className="mb-4 text-xs bg-gray-50 p-2 rounded-lg truncate text-gray-600">
                         🔗 {item.link}
                     </div>
                 )}

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm text-sm font-bold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm text-sm font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {sortedCarousels.length === 0 && !showForm && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[3rem] p-24 text-center">
          <div className="text-6xl mb-6">📸</div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">No Slides Yet</h3>
          <p className="text-gray-400 font-medium mb-8">Click the button above to add your first carousel slide.</p>
        </div>
      )}
    </div>
  );
}
