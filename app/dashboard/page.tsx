'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const navLinks = [
    { href: '/dashboard', label: 'Profile', icon: '👤' },
    { href: '/dashboard/requests', label: 'My Requests', icon: '📋' },
    { href: '/dashboard/bookings', label: 'My Bookings', icon: '🏠' },
    { href: '/dashboard/documents', label: 'Documents', icon: '📄' },
  ];

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Simple Profile Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-medium text-gray-900">
                  {user.name || 'User Profile'}
                </h1>
                <p className="text-gray-600 text-sm md:text-base mt-1">{user.email}</p>
                {user.phone && (
                  <p className="text-gray-600 text-sm md:text-base">{user.phone}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-20 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 md:gap-4 overflow-x-auto hide-scrollbar">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === '/dashboard' && pathname === '/dashboard');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium whitespace-nowrap border-b-2 transition-colors ${
                    isActive
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">Welcome Back</h2>
              <p className="text-gray-600 leading-relaxed">
                Manage your property inquiries, bookings, and documents from your dashboard.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <Link href="/dashboard/requests" className="block p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="text-3xl mb-3">📋</div>
                <h3 className="font-medium text-gray-900 mb-2">My Requests</h3>
                <p className="text-sm text-gray-600">Track your property inquiries</p>
              </Link>
              <Link href="/dashboard/bookings" className="block p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="text-3xl mb-3">🏠</div>
                <h3 className="font-medium text-gray-900 mb-2">My Bookings</h3>
                <p className="text-sm text-gray-600">View your confirmed bookings</p>
              </Link>
              <Link href="/dashboard/documents" className="block p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="text-3xl mb-3">📄</div>
                <h3 className="font-medium text-gray-900 mb-2">Documents</h3>
                <p className="text-sm text-gray-600">Manage your documents</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
