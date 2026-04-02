'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetUserUnitRequestsQuery } from '@/redux/api/unitsApi';
import { UnitRequest } from '@/types';
import { useRouter } from 'next/navigation';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
  reserved: 'bg-blue-100 text-blue-800 border-blue-200',
};

export default function BookingsPage() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: bookings = [], isLoading } = useGetUserUnitRequestsQuery(user?.id || '', {
    skip: !user?.id,
  });

  // Filter only confirmed/reserved bookings
  const confirmedBookings = bookings.filter(
    (booking: UnitRequest) => booking.status === 'confirmed' || booking.status === 'reserved'
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

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
          My Bookings
        </h1>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : confirmedBookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-lg p-8 md:p-12 text-center"
        >
          <div className="text-5xl md:text-6xl mb-4">🏠</div>
          <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">No Bookings Yet</h3>
          <p className="text-sm md:text-base text-gray-600 mb-6">Start exploring our premium properties</p>
          <Link href="/projects">
            <button className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm md:text-base font-medium hover:bg-gray-800 transition-colors">
              View Properties
            </button>
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {confirmedBookings.map((booking: UnitRequest, index: number) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                      <h3 className="text-lg md:text-xl font-medium text-gray-900">
                        {booking.unit?.flatNumber || booking.unit?.unitNumber || `Unit ${booking.unitId}`}
                      </h3>
                      <span className={`px-2.5 py-1 rounded-full text-xs md:text-sm font-medium border ${statusColors[booking.status as keyof typeof statusColors] || statusColors.pending}`}>
                        {booking.status?.toUpperCase() || 'PENDING'}
                      </span>
                    </div>
                    {booking.unit?.building && (
                      <p className="text-sm text-gray-600 mb-2">
                        {booking.unit.building.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {booking.unit?.type && (
                    <div>
                      <span className="text-gray-500 text-xs md:text-sm block mb-1">Type</span>
                      <p className="font-medium text-gray-900 text-sm md:text-base">{booking.unit.type.toUpperCase()}</p>
                    </div>
                  )}
                  {booking.unit?.area && (
                    <div>
                      <span className="text-gray-500 text-xs md:text-sm block mb-1">Area</span>
                      <p className="font-medium text-gray-900 text-sm md:text-base">{booking.unit.area} sq ft</p>
                    </div>
                  )}
                  {booking.unit?.price && (
                    <div>
                      <span className="text-gray-500 text-xs md:text-sm block mb-1">Price</span>
                      <p className="font-medium text-gray-900 text-sm md:text-base">{formatPrice(booking.unit.price)}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-500 text-xs md:text-sm block mb-1">Booked On</span>
                    <p className="font-medium text-gray-900 text-sm md:text-base">{formatDate(booking.createdAt)}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-gray-100">
                  {booking.unitId && (
                    <Link 
                      href={`/projects/${booking.unit?.buildingId || 1}/unit/${booking.unitId}`}
                      className="flex-1 sm:flex-initial"
                    >
                      <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        View Details
                      </button>
                    </Link>
                  )}
                  {booking.status === 'pending' && (
                    <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

