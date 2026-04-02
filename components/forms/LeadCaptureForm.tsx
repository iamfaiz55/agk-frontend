'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCreateLeadMutation } from '@/redux/api/projectsApi';

interface LeadCaptureFormProps {
  buildingId?: number;
}

export default function LeadCaptureForm({ buildingId }: LeadCaptureFormProps) {
  const [createLead] = useCreateLeadMutation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createLead({ ...formData, buildingId }).unwrap();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', phone: '', email: '', message: '' });
      }, 5000);
    } catch (err: any) {
      alert('Failed to send request. please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 border-2 border-[#D4AF37] rounded-xl md:rounded-[2.5rem] p-6 md:p-12 text-center"
      >
        <div className="text-4xl md:text-6xl mb-4 md:mb-6">✨</div>
        <h3 className="text-xl md:text-3xl font-normal text-white mb-3 md:mb-4 tracking-tight uppercase">Inquiry Successful</h3>
        <p className="text-sm md:text-base text-[#D4AF37] font-medium">Our experts will contact you shortly.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4 md:space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-2 ml-2 md:ml-4">Full Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className="w-full bg-white border border-gray-100 rounded-xl md:rounded-2xl px-4 py-2.5 md:px-6 md:py-4 focus:ring-2 focus:ring-[#D4AF37] transition-all outline-none font-medium text-sm md:text-base text-gray-900"
          />
        </div>
        <div>
          <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-2 ml-2 md:ml-4">Phone Number</label>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+91"
            className="w-full bg-white border border-gray-100 rounded-xl md:rounded-2xl px-4 py-2.5 md:px-6 md:py-4 focus:ring-2 focus:ring-[#D4AF37] transition-all outline-none font-medium md:font-bold text-sm md:text-base text-gray-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-2 ml-2 md:ml-4">Email Address</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
          className="w-full bg-white border border-gray-100 rounded-xl md:rounded-2xl px-4 py-2.5 md:px-6 md:py-4 focus:ring-2 focus:ring-[#D4AF37] transition-all outline-none font-medium md:font-bold text-sm md:text-base text-gray-900"
        />
      </div>

      <div>
        <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-2 ml-2 md:ml-4">Tell us about your interest</label>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="I am interested in..."
          className="w-full bg-white border border-gray-100 rounded-xl md:rounded-2xl px-4 py-2.5 md:px-6 md:py-4 focus:ring-2 focus:ring-[#D4AF37] transition-all outline-none font-medium text-sm md:text-base text-gray-900 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gray-900 text-white py-3 md:py-6 rounded-xl md:rounded-2xl font-medium uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm hover:bg-[#D4AF37] transition-all transform active:scale-95 shadow-lg md:shadow-xl shadow-gray-200 disabled:opacity-50"
      >
        {isSubmitting ? 'Transmitting...' : 'Request Consultation'}
      </button>
    </motion.form>
  );
}

