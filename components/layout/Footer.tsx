'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/#amenities', label: 'Amenities' },
    { href: '/#contact', label: 'Contact' },
  ];

  const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/about', label: 'About Us' },
  ];

  const socialLinks = [
    { href: '#', icon: '📘', label: 'Facebook' },
    { href: '#', icon: '📷', label: 'Instagram' },
    { href: '#', icon: '🐦', label: 'Twitter' },
    { href: '#', icon: '💼', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <div className="relative w-48 h-16">
                <Image
                  src="/logo/agk-final-new.png"
                  alt="AGK Infrastructures"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Building dreams, creating homes. Premium real-estate development with excellence and trust.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2 }}
                  className="text-2xl"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📍 Mitmita, Chhatrapati Sambhajinagar</li>
              <li>📞 +91 70205 15701</li>
              <li>✉️ agkinfrastructures@gmail.com</li>
              <li>🕒 Mon - Sat: 9:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="mb-2">&copy; {currentYear} AGK Infrastructures. All rights reserved.</p>
          <p className="text-sm">
            Created, Designed and Developed by{' '}
            <a
              href="https://shaikhfaiz.top"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:text-[#F4D03F] hover:underline transition-colors font-medium"
            >
              Shaikh Faiz
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

