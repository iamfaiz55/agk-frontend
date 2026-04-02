'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Button from '@/components/ui/Button';
import { useLoginMutation } from '@/redux/api/authApi';
import { setCredentials } from '@/redux/slices/authSlice';

interface AuthError {
    data?: {
        message?: string;
        error?: string;
    };
}

export default function LoginPage() {
    const [login] = useLoginMutation();
    const router = useRouter();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            console.log('Sending login request for:', formData.email);
            const res = await login(formData).unwrap();
            console.log('Login response received:', res);

            // Dispatch to Redux store
            dispatch(setCredentials({ user: res.user, token: res.token }));

            if (res.user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        } catch (err: unknown) {
            const error = err as AuthError;
            console.error('Login error detail:', error);
            setError(error.data?.error || error.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200 w-full max-w-md border border-gray-100"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-normal text-gray-900 mb-2 tracking-tighter">Welcome <span className="text-[#D4AF37]">Back</span></h1>
                    <p className="text-gray-500 font-medium">Please enter your details to sign in</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-medium uppercase tracking-widest text-gray-400 mb-2 ml-4">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all font-medium text-gray-900"
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium uppercase tracking-widest text-gray-400 mb-2 ml-4">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all font-medium text-gray-900 pr-14"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37] transition-colors p-2"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-900 text-white rounded-2xl py-5 font-medium uppercase tracking-[0.2em] hover:bg-[#D4AF37] transition-all transform active:scale-[0.98] shadow-xl shadow-gray-200 disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Sign In Now'}
                    </button>
                </form>

                <p className="text-center mt-10 text-gray-500 font-medium">
                    New here? <Link href="/register" className="text-[#D4AF37] font-medium hover:underline underline-offset-4">Create an account</Link>
                </p>
            </motion.div>
        </div>
    );
}
