'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { UnitRequest } from '@/types';
import { useGetUserUnitRequestsQuery, useDeleteUnitRequestMutation } from '@/redux/api/unitsApi';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RequestsPage() {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const { data: requests, isLoading } = useGetUserUnitRequestsQuery(user?.id || '', {
        skip: !user?.id,
    });
    const [deleteRequest] = useDeleteUnitRequestMutation();

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this request?')) {
            try {
                await deleteRequest(id).unwrap();
            } catch (error) {
                console.error('Error deleting request:', error);
            }
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'approved':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (isLoading) {
        return (
            <div className="w-full pt-4 md:pt-6">
                <div className="space-y-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 animate-pulse">
                            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full pt-4 md:pt-6">
            {/* Header with Back Button */}
            <div className="mb-6 flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm md:text-base font-medium">Back</span>
                </button>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900">
                    My Requests
                </h1>
            </div>

            {!requests || requests.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-gray-200 rounded-lg p-8 md:p-12 text-center"
                >
                    <div className="text-5xl md:text-6xl mb-4">📋</div>
                    <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">No Requests Yet</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-6">You haven&apos;t submitted any purchase requests.</p>
                    <Link href="/projects">
                        <button className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm md:text-base font-medium hover:bg-gray-800 transition-colors">
                            Browse Properties
                        </button>
                    </Link>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {requests.map((request: UnitRequest, index: number) => (
                        <motion.div
                            key={request.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-md transition-all"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1 truncate">
                                        {request.unit?.type?.toUpperCase()} - Unit #{request.unit?.id}
                                    </h3>
                                    <p className="text-xs md:text-sm text-gray-500 truncate">
                                        {request.unit?.building?.name}
                                    </p>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex-shrink-0 ml-2 ${getStatusColor(request.status)}`}>
                                    {request.status}
                                </span>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-xs md:text-sm text-gray-600">
                                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span>₹{request.unit?.price?.toLocaleString() || 'N/A'}</span>
                                </div>
                                <div className="flex items-center text-xs md:text-sm text-gray-600">
                                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{new Date(request.createdAt).toLocaleDateString('en-IN')}</span>
                                </div>
                            </div>

                            {request.message && (
                                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                    <p className="text-xs md:text-sm text-gray-600 italic line-clamp-2">&quot;{request.message}&quot;</p>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-2">
                                <Link href={`/projects/${request.unit?.buildingId}`} className="flex-1">
                                    <button className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-xs md:text-sm font-medium">
                                        View Unit
                                    </button>
                                </Link>
                                <button
                                    onClick={() => handleDelete(request.id)}
                                    className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs md:text-sm font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
