'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const mockDescriptions = [
  {
    id: '1',
    page: 'Home Page',
    section: 'Hero Section',
    content: 'Your Dream Home Awaits - Premium 3BHK flats, commercial spaces, and offices in the heart of the city.',
    lastUpdated: '2024-01-15',
  },
  {
    id: '2',
    page: 'Home Page',
    section: 'Project Overview',
    content: 'A modern, luxurious residential and commercial complex in the heart of the city. Featuring premium 3BHK flats, commercial shops, and office spaces.',
    lastUpdated: '2024-01-15',
  },
  {
    id: '3',
    page: 'Project Details',
    section: 'Overview',
    content: 'AGK Developers Premium Building offers the perfect blend of luxury and convenience. Located in a prime location with excellent connectivity.',
    lastUpdated: '2024-01-14',
  },
];

export default function DescriptionPage() {
  const [descriptions, setDescriptions] = useState(mockDescriptions);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleEdit = (id: string, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };

  const handleSave = (id: string) => {
    setDescriptions(descriptions.map(desc => 
      desc.id === id 
        ? { ...desc, content: editContent, lastUpdated: new Date().toISOString().split('T')[0] }
        : desc
    ));
    setEditingId(null);
    setEditContent('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditContent('');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Description Management</h1>
        <button
          onClick={() => alert('Add new description functionality would be implemented here')}
          className="bg-[#D4AF37] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B8941E] transition-colors"
        >
          + Add Description
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600 mb-6">
          Manage descriptions for different pages and sections of the website.
        </p>

        <div className="space-y-4">
          {descriptions.map((desc, index) => (
            <motion.div
              key={desc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{desc.page}</h3>
                  <p className="text-sm text-gray-500">{desc.section}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Last Updated: {desc.lastUpdated}</p>
                </div>
              </div>

              {editingId === desc.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(desc.id)}
                      className="px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8941E] transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 mb-4">{desc.content}</p>
                  <button
                    onClick={() => handleEdit(desc.id, desc.content)}
                    className="px-4 py-2 bg-[#F4E4BC] text-[#B8941E] rounded-lg hover:bg-[#D4AF37] hover:text-white transition-colors"
                  >
                    Edit
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

