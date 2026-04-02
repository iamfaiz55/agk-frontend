'use client';

import { use, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCreateUnitRequestMutation, useGetUnitByIdQuery } from '@/redux/api/unitsApi';
import { toast } from 'react-hot-toast';

interface PageProps {
    params: Promise<{ id: string; unitId: string }>;
}

export default function UnitDetailsClient({ params }: PageProps) {
    const resolvedParams = use(params);
    const router = useRouter();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const { data: unit, isLoading } = useGetUnitByIdQuery(resolvedParams.unitId);
    const [activeImage, setActiveImage] = useState(0);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [requestMessage, setRequestMessage] = useState('');
    const [createRequest, { isLoading: isSubmitting }] = useCreateUnitRequestMutation();
    const [kycError, setKycError] = useState<string | null>(null);

    const handleRequestToBuy = () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        setKycError(null);
        setShowRequestModal(true);
    };

    const handleSubmitRequest = async () => {
        if (!user?.id || !resolvedParams.unitId) return;

        try {
            await createRequest({
                userId: Number(user.id),
                unitId: parseInt(resolvedParams.unitId),
                message: requestMessage,
            }).unwrap();

            setShowRequestModal(false);
            setRequestMessage('');
            toast.success('Your request has been submitted successfully! We will contact you soon.');
        } catch (error) {
            const err = error as { data?: { message?: string } };
            // console.error('Error submitting request:', err);
            if (err?.data?.message && err.data.message.includes('KYC Incomplete')) {
                setKycError(err.data.message);
            } else if (err?.data?.message && (err.data.message.includes('You have already requested this unit') || err.data.message.includes('already requested'))) {
                setShowRequestModal(false);
                setTimeout(() => {
                    toast('You have already requested this unit.', {
                        icon: 'ℹ️',
                        duration: 5000,
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
                }, 100);
            } else {
                toast.error(err?.data?.message || 'Failed to submit request. Please try again.');
            }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-xl text-gray-400 font-medium animate-pulse">Loading unit details...</div>
            </div>
        );
    }

    const building = unit?.building;

    if (!unit || !building) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Unit Not Found</h2>
                    <p className="text-gray-500 mb-6">The requested unit could not be found.</p>
                    <Link href={`/projects/${resolvedParams.id}`} className="text-[#D4AF37] font-bold hover:underline">← Back to Project</Link>
                </div>
            </div>
        );
    }

    // Building images are transformed by sections in the API
    let buildingImages: string[] = [];
    if (Array.isArray(building.images)) {
        buildingImages = building.images.flatMap(section => section.images || []);
    }

    // Unit images are already transformed in the API
    const unitImages = Array.isArray(unit.images) ? (unit.images as any[]).map(img => typeof img === 'string' ? img : img.url) : [];

    const images = unitImages.length > 0 ? unitImages : (buildingImages.length > 0 ? buildingImages : ['/images/placeholder.jpg']);

    const iconMap = {
        shop: '🏪',
        office: '🏢',
        flat: '🏠',
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Header />
            <div className="h-20"></div>

            <main className="container mx-auto px-4 py-12">
                <div className="mb-8">
                    <Link href={`/projects/${building.id}`} className="text-gray-500 hover:text-[#D4AF37] flex items-center font-medium transition-colors">
                        <span className="mr-2">←</span> Back to {building.name}
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
                        >
                            <Image
                                src={images[activeImage]}
                                alt={`${unit.type} main view`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                                unoptimized
                            />
                        </motion.div>
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative h-24 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-[#D4AF37] scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <Image 
                                        src={img} 
                                        alt="Gallery item" 
                                        fill 
                                        className="object-cover" 
                                        sizes="(max-width: 768px) 25vw, 150px"
                                        unoptimized
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Unit Info */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <span className="text-4xl">{iconMap[unit.type]}</span>
                                <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                                    {unit.status}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 capitalize">
                                {unit.type} <span className="text-[#D4AF37]">#{unit.id}</span>
                            </h1>
                            <p className="text-gray-500 text-lg flex items-center">
                                <span className="mr-2">📍</span> {building.address} • Floor {unit.floorNumber}
                            </p>
                        </motion.div>

                        <div className="bg-gray-50 rounded-3xl p-8 flex justify-between items-center shadow-inner">
                            <div>
                                <p className="text-gray-400 font-bold uppercase text-xs mb-1 tracking-widest">Premium Offering</p>
                                <p className="text-3xl md:text-4xl font-black text-gray-900">Price on Request</p>
                            </div>
                            <button
                                onClick={handleRequestToBuy}
                                disabled={!isAuthenticated && unit.status !== 'available'}
                                className={`px-8 py-4 rounded-2xl font-bold transition-all transform active:scale-95 shadow-xl ${!isAuthenticated
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : unit.status === 'available'
                                        ? 'bg-gray-900 text-white hover:bg-[#D4AF37]'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {!isAuthenticated ? 'Login to Request' : unit.status === 'available' ? 'Request Price' : 'Not Available'}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm">
                                <p className="text-gray-400 text-xs font-bold uppercase mb-2">Total Area</p>
                                <p className="text-xl font-bold text-gray-800">{unit.size}</p>
                            </div>
                            {unit.bedrooms && (
                                <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm">
                                    <p className="text-gray-400 text-xs font-bold uppercase mb-2">Bedrooms</p>
                                    <p className="text-xl font-bold text-gray-800">{unit.bedrooms} BHK</p>
                                </div>
                            )}
                            {unit.bathrooms && (
                                <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm">
                                    <p className="text-gray-400 text-xs font-bold uppercase mb-2">Bathrooms</p>
                                    <p className="text-xl font-bold text-gray-800">{unit.bathrooms} Luxury</p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900">Overview</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {unit.details || "This premium space offers a perfect blend of luxury and functionality. Designed with high-quality materials and modern aesthetics, it provides an exceptional environment for living or business."}
                            </p>
                        </div>

                        {unit.extraAmenities && (
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-gray-900">Specifications</h3>
                                <div className="flex flex-wrap gap-3">
                                    {unit.extraAmenities.split(',').map((item, idx) => (
                                        <span key={idx} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold flex items-center">
                                            <span className="text-[#D4AF37] mr-2">✦</span> {item.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Request Modal */}
                <AnimatePresence>
                    {showRequestModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setShowRequestModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                            >
                                {kycError ? (
                                    <div className="text-center">
                                        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                            <span className="text-3xl">⚠️</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">KYC Verification Required</h2>
                                        <p className="text-gray-600 mb-6">
                                            {kycError}
                                        </p>
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => setShowRequestModal(false)}
                                                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-2xl font-medium hover:bg-gray-200 transition-colors"
                                            >
                                                Close
                                            </button>
                                            <button
                                                onClick={() => router.push('/dashboard/documents')}
                                                className="flex-1 bg-[#D4AF37] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#B8941E] transition-colors shadow-lg animate-pulse"
                                            >
                                                Upload Documents
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Price</h2>
                                        <p className="text-gray-600 mb-6">
                                            Submit your interest for {unit.type} #{unit.id}. Our team will contact you shortly.
                                        </p>

                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Additional Message (Optional)
                                            </label>
                                            <textarea
                                                value={requestMessage}
                                                onChange={(e) => setRequestMessage(e.target.value)}
                                                placeholder="Any specific requirements or questions..."
                                                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none"
                                                rows={4}
                                            />
                                        </div>

                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => setShowRequestModal(false)}
                                                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-2xl font-medium hover:bg-gray-200 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSubmitRequest}
                                                disabled={isSubmitting}
                                                className="flex-1 bg-[#D4AF37] text-white px-6 py-3 rounded-2xl font-medium hover:bg-[#B8941E] transition-colors disabled:opacity-50"
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Submit Request'}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
}
