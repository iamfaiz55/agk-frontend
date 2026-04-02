'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DocumentUploadModalProps {
  type: string;
  title: string;
  onUpload: (file: File) => Promise<void>;
  onClose: () => void;
  uploading: boolean;
}

export default function DocumentUploadModal({ type, title, onUpload, onClose, uploading }: DocumentUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        setFile(selectedFile);
        if (selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
        }
    }
  };

  const handleSubmit = async () => {
    if (file) {
        await onUpload(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative"
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Upload {title}</h3>
            <button onClick={onClose} disabled={uploading} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        
        <div className="p-6">
            {!file ? (
                <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-500 mb-2 text-center">Choose an upload method:</p>
                    
                    <button 
                        onClick={() => cameraInputRef.current?.click()}
                        className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-blue-200 bg-blue-50 rounded-2xl hover:bg-blue-100 hover:border-blue-300 transition-colors group"
                    >
                        <span className="text-4xl group-hover:scale-110 transition-transform">📸</span>
                        <span className="font-bold text-blue-700">Use Camera</span>
                        <span className="text-xs text-blue-500">Take a photo directly</span>
                    </button>
                    
                    <button 
                         onClick={() => fileInputRef.current?.click()}
                         className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-gray-200 bg-gray-50 rounded-2xl hover:bg-gray-100 hover:border-gray-300 transition-colors group"
                    >
                        <span className="text-4xl group-hover:scale-110 transition-transform">📁</span>
                        <span className="font-bold text-gray-700">Choose from Device</span>
                        <span className="text-xs text-gray-500">Select PDF or Image</span>
                    </button>

                    {/* Hidden Inputs */}
                    <input
                        type="file"
                        accept="image/*"
                        capture="environment" // Forces use of rear camera on mobile
                        ref={cameraInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                     <input
                        type="file"
                        accept="image/*,application/pdf"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 min-h-[200px] flex items-center justify-center">
                        {preview ? (
                            <img src={preview} alt="Preview" className="w-full h-full object-contain max-h-[300px]" />
                        ) : (
                            <div className="text-center p-8">
                                <span className="text-4xl mb-2 block">📄</span>
                                <span className="font-bold text-gray-700">{file.name}</span>
                                <span className="block text-xs text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                        )}
                        <button 
                            onClick={() => setFile(null)}
                            className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex gap-3">
                        <button 
                            onClick={() => setFile(null)}
                            disabled={uploading}
                            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                        >
                            Retake
                        </button>
                        <button 
                            onClick={handleSubmit}
                            disabled={uploading}
                            className="flex-1 py-3 bg-[#D4AF37] text-white rounded-xl font-bold hover:bg-[#B8941E] transition-colors flex items-center justify-center gap-2"
                        >
                           {uploading ? (
                               <>
                                <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"/>
                                Uploading...
                               </>
                           ) : (
                               'Confirm Upload'
                           )}
                        </button>
                    </div>
                </div>
            )}
        </div>
      </motion.div>
    </div>
  );
}
