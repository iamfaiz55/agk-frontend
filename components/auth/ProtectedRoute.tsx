'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            if (!isAuthenticated) {
                router.push('/login');
            } else if (requireAdmin && user?.role !== 'admin') {
                router.push('/dashboard');
            }
        }
    }, [mounted, isAuthenticated, user, router, requireAdmin]);

    // During hydration, the server will see isAuthenticated as false
    // So we must render the same thing on the client's first pass
    if (!mounted || !isAuthenticated) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-xl text-gray-400 font-medium animate-pulse">
                    Redirecting to login...
                </div>
            </div>
        );
    }

    if (requireAdmin && user?.role !== 'admin') {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-xl text-gray-400 font-medium animate-pulse">Access denied. Redirecting...</div>
            </div>
        );
    }

    return <>{children}</>;
}
