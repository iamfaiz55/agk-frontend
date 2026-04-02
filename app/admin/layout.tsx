'use client';

import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminTopbar from '@/components/layout/AdminTopbar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <AdminTopbar />
        <div className="flex-1 flex flex-row relative">
          {/* Sidebar - Fixed on the left side */}
          <AdminSidebar />
          {/* Main content area - Takes remaining space with left margin for sidebar */}
          <main className="flex-1 min-w-0 p-4 lg:p-8 transition-all duration-300 lg:ml-64">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

