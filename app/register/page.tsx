'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/redux/api/authApi';

interface ApiError {
    data?: {
        message?: string;
    };
}

export default function RegisterPage() {
    const [register] = useRegisterMutation();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const passwordsMatch = formData.password === formData.confirmPassword;
    const isFormValid = formData.name && formData.email && formData.phone &&
        formData.password && formData.confirmPassword && passwordsMatch;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!passwordsMatch) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');
        try {
            console.log('Registering user:', formData.email);
            const { confirmPassword, ...registrationData } = formData;
            const res = await register(registrationData).unwrap();
            console.log('Registration success:', res);
            router.push('/login?registered=true');
        } catch (err: unknown) {
            const error = err as ApiError;
            console.error('Registration error detail:', error);
            setError(error.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200 w-full max-w-md border border-gray-100"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-normal text-gray-900 mb-2 tracking-tighter">Create <span className="text-[#D4AF37]">Account</span></h1>
                    <p className="text-gray-500 font-medium">Join our premium real estate community</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-medium uppercase tracking-widest text-gray-400 mb-2 ml-4">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all font-medium text-gray-900"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

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
                        <label className="block text-xs font-medium uppercase tracking-widest text-gray-400 mb-2 ml-4">Mobile Number</label>
                        <input
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all font-medium text-gray-900"
                            placeholder="9876543210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium uppercase tracking-widest text-gray-400 mb-2 ml-4">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                minLength={6}
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

                    <div>
                        <label className="block text-xs font-medium uppercase tracking-widest text-gray-400 mb-2 ml-4">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                minLength={6}
                                className={`w-full bg-gray-50 border rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 transition-all font-medium text-gray-900 pr-14 ${formData.confirmPassword && !passwordsMatch
                                        ? 'border-red-300 focus:ring-red-400'
                                        : formData.confirmPassword && passwordsMatch
                                            ? 'border-green-300 focus:ring-green-400'
                                            : 'border-gray-100 focus:ring-[#D4AF37]'
                                    }`}
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37] transition-colors p-2"
                            >
                                {showConfirmPassword ? (
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
                        {formData.confirmPassword && !passwordsMatch && (
                            <p className="text-red-500 text-xs mt-2 ml-4">Passwords do not match</p>
                        )}
                        {formData.confirmPassword && passwordsMatch && (
                            <p className="text-green-500 text-xs mt-2 ml-4 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Passwords match
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !isFormValid}
                        className="w-full bg-gray-900 text-white rounded-2xl py-5 font-medium uppercase tracking-[0.2em] hover:bg-[#D4AF37] transition-all transform active:scale-[0.98] shadow-xl shadow-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating Profile...' : 'Unlock Membership'}
                    </button>
                </form>

                <p className="text-center mt-10 text-gray-500 font-medium">
                    Already an elite member? <Link href="/login" className="text-[#D4AF37] font-medium hover:underline underline-offset-4">Log in here</Link>
                </p>
            </motion.div>
        </div>
    );
}
