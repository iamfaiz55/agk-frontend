'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminLink {
  href: string;
  label: string;
  icon: string;
  badge?: number;
}

const links: AdminLink[] = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/projects', label: 'All Projects', icon: '🏗️' },
  { href: '/admin/carousel', label: 'Home Carousel', icon: '🖼️' },
  { href: '/admin/units', label: 'Unit Management', icon: '🏬' },
  { href: '/admin/floors', label: 'Floor Management', icon: '🏢' },
  { href: '/admin/users', label: 'All Registered Users', icon: '👥' },
  { href: '/admin/amenities', label: 'Amenities', icon: '✨' },
  { href: '/admin/leads', label: 'Inquiry Leads', icon: '📋' },
  { href: '/admin/gallery', label: 'Gallery Management', icon: '📷' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-[10001] bg-white p-2 rounded-lg shadow-lg border border-gray-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <motion.svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </motion.svg>
      </button>


      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white z-[10000] transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        style={{ width: 256 }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center font-bold text-gray-900 text-xl">
                A
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Admin Panel</h2>
                <p className="text-xs text-gray-400">AGK Infrastructures</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {links.map((link, index) => {
              const active = isActive(link.href);
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`group relative flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${active
                      ? 'bg-[#D4AF37] text-gray-900 font-semibold shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-[#D4AF37]'
                      }`}
                  >
                    <span className="text-xl flex-shrink-0">{link.icon}</span>
                    <span className="font-medium flex-1">{link.label}</span>
                    {link.badge && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                    {active && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gray-900 rounded-r"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="text-center text-xs text-gray-400">
              <p>Version 1.0.0</p>
              <p className="mt-1">© 2024 AGK Infrastructures</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

