'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About Us' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#process', label: 'Our Process' },
  ];

  const services = [
    { href: '/#services', label: 'Construction Services' },
    { href: '/#services', label: 'Project Management' },
    { href: '/#services', label: 'Infrastructure Dev' },
    { href: '/#services', label: 'Renovation & Maintenance' },
  ];

  const socialLinks = [
    { href: '#', icon: '📘', label: 'Facebook' },
    { href: '#', icon: '📷', label: 'Instagram' },
    { href: '#', icon: '🐦', label: 'Twitter' },
    { href: '#', icon: '💼', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <div className="w-10 h-10 bg-[#FCA311] rounded-sm flex items-center justify-center font-bold text-slate-900 text-xl border-b-4 border-amber-600">
                A
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                AGK<span className="text-[#FCA311]">INFRA</span>
              </span>
            </div>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Building Reliable Infrastructure for Tomorrow. Expert construction, project management, and development services.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-[#FCA311] hover:bg-slate-800 transition-all shadow-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white tracking-widest uppercase mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-[#FCA311] transition-colors inline-block">
                     → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-white tracking-widest uppercase mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-500 hover:text-[#FCA311] transition-colors inline-block">
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white tracking-widest uppercase mb-6">Contact Info</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li className="flex items-start gap-3">
                <span className="text-[#FCA311] mt-0.5">📍</span> 
                <span>Mitmita, Chhatrapati Sambhajinagar</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#FCA311]">📞</span> 
                <span>+91 70205 15701</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#FCA311]">✉️</span> 
                <span>info@agkinfrastructures.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#FCA311]">✉️</span> 
                <span>career@agkinfrastructures.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
          <p>&copy; {currentYear} AGK Infrastructures. All rights reserved.</p>
          <p>
            Created, Designed and Developed by{' '}
            <a
              href="https://shaikhfaiz.top"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FCA311] hover:underline transition-colors font-semibold"
            >
              Shaikh Faiz
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
