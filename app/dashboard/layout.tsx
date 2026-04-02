'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="h-20"></div> {/* Spacer for fixed navbar */}
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}

