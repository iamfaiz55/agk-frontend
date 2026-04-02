'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { logout } from '@/redux/slices/authSlice';
import Button from '../ui/Button';

import Image from 'next/image';

const emptySubscribe = () => () => {};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    ...(mounted && isAuthenticated ? [{ href: user?.role === 'admin' ? '/admin' : '/dashboard', name: 'Dashboard' }] : []),
  ];

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  // Close menu when route changes
  useEffect(() => {
    const timer = setTimeout(() => setIsMenuOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[10000]">
      <nav className="bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-[101]">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-32 h-10 md:w-40 md:h-12"
            >
              <Image
                src="/logo/agk-final-new.png"
                alt="AGK Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-sm font-medium transition-colors rounded-full ${isActive(link.href)
                    ? 'text-[#D4AF37]'
                    : 'text-gray-700 hover:text-[#D4AF37]'
                    }`}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#F4E4BC] rounded-full -z-10"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            {mounted && isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link href={user?.role === 'admin' ? '/admin' : '/dashboard'}>
                  <Button variant="outline" size="sm" className="text-xs px-3 py-1.5 flex items-center space-x-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Profile</span>
                  </Button>
                </Link>
                <Button onClick={handleLogout} variant="outline" size="sm" className="text-xs px-3 py-1.5 border-red-200 text-red-600 hover:bg-red-50">Logout</Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm" className="text-xs px-3 py-1.5">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="text-xs px-3 py-1.5">Register</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 z-[101] relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 bg-gray-900 mb-1.5 origin-center"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 bg-gray-900 mb-1.5"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 bg-gray-900 origin-center"
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Navigation - Portal */}
        {mounted && createPortal(
          <AnimatePresence>
            {isMenuOpen && (
              <>
                {/* Backdrop - Low opacity, behind header (z-9998 < header z-10000) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
                  onClick={() => setIsMenuOpen(false)}
                />

                {/* Centered Modal Container - Above header (z-10001 > header z-10000) */}
                <div className="fixed top-24 left-0 right-0 flex justify-center items-start z-[10001] px-4 pointer-events-none">
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.7
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.7
                    }}
                    transition={{
                      type: 'spring',
                      damping: 20,
                      stiffness: 300,
                      mass: 0.8
                    }}
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-xs pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      maxHeight: 'calc(100vh - 4rem)',
                      height: 'auto',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      margin: 'auto'
                    }}
                  >
                    {/* Modal Header */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                      className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-[#D4AF37]/10 via-[#F4E4BC]/20 to-[#D4AF37]/10"
                    >
                      <motion.h2
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="text-xl font-bold text-[#D4AF37]"
                      >
                        Menu
                      </motion.h2>
                      <motion.button
                        whileHover={{ scale: 1.15, rotate: 90 }}
                        whileTap={{ scale: 0.85 }}
                        onClick={() => setIsMenuOpen(false)}
                        className="p-1.5 rounded-full hover:bg-white/80 transition-colors"
                        aria-label="Close menu"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.button>
                    </motion.div>

                    {/* Menu Links - Scrollable */}
                    <nav className="p-4 overflow-y-auto flex-1" style={{ minHeight: 0 }}>
                      <div className="space-y-1.5">
                        {navLinks.map((link, index) => (
                          <motion.div
                            key={link.href}
                            initial={{ opacity: 0, x: -30, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{
                              delay: 0.2 + index * 0.06,
                              duration: 0.5,
                              type: 'spring',
                              stiffness: 150,
                              damping: 15
                            }}
                          >
                            <Link
                              href={link.href}
                              onClick={() => setIsMenuOpen(false)}
                              className={`block px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${isActive(link.href)
                                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-white shadow-lg shadow-[#D4AF37]/30'
                                : 'text-gray-700 hover:bg-[#F4E4BC] hover:text-[#B8941E] border border-transparent hover:border-[#D4AF37]/30 hover:shadow-md'
                                }`}
                            >
                              <motion.div
                                className="flex items-center justify-between"
                                whileHover={{ x: 5 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                              >
                                <span>{link.name}</span>
                                {isActive(link.href) && (
                                  <motion.span
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                                    className="text-white text-base"
                                  >
                                    ✓
                                  </motion.span>
                                )}
                              </motion.div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </nav>

                    {/* Auth Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, type: 'spring', stiffness: 150 }}
                      className="p-4 pt-3 space-y-2 border-t border-gray-200 bg-gray-50/50"
                    >
                      {mounted && isAuthenticated ? (
                        <div className="space-y-2">
                          <Link href={user?.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsMenuOpen(false)} className="block">
                            <Button variant="outline" size="sm" className="w-full flex items-center justify-center space-x-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span>Go to Profile</span>
                            </Button>
                          </Link>
                          <Button onClick={handleLogout} variant="outline" size="sm" className="w-full text-red-600 border-red-200">
                            Logout
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block">
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button variant="outline" size="sm" className="w-full">
                                Login
                              </Button>
                            </motion.div>
                          </Link>
                          <Link href="/register" onClick={() => setIsMenuOpen(false)} className="block">
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button size="sm" className="w-full">
                                Register
                              </Button>
                            </motion.div>
                          </Link>
                        </>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
      </nav>
    </header>
  );
}

