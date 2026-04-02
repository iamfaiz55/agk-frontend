'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { 
  useGetMyDocumentsQuery, 
  useUploadAadhaarMutation, 
  useUploadPanMutation,
  useUploadAddressProofMutation,
  useUploadIncomeProofMutation
} from '@/redux/api/documentsApi';
import DocumentUploadModal from '@/components/forms/DocumentUploadModal';
import { UserDocument } from '@/types';
import { toast } from 'react-hot-toast';

// Define the required document types
const REQUIRED_DOCUMENTS = [
  { id: 'aadhaar', name: 'Aadhar Card', description: 'Front and back side combined or clearly visible front.' },
  { id: 'pan', name: 'PAN Card', description: 'Clear photo of your PAN card.' },
  { id: 'address_proof', name: 'Address Proof', description: 'Utility bill, Rent agreement, or Driving License.' },
  { id: 'income_proof', name: 'Income Proof', description: 'Salary slips, ITR, or Bank statement.' },
];

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export default function DocumentsPage() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const { data: userDocuments = [], isLoading: isFetching } = useGetMyDocumentsQuery(undefined, {
    skip: !user?.id
  });

  const [uploadAadhaar, { isLoading: isUploadingAadhaar }] = useUploadAadhaarMutation();
  const [uploadPan, { isLoading: isUploadingPan }] = useUploadPanMutation();
  const [uploadAddressProof, { isLoading: isUploadingAddress }] = useUploadAddressProofMutation();
  const [uploadIncomeProof, { isLoading: isUploadingIncome }] = useUploadIncomeProofMutation();

  const [activeUpload, setActiveUpload] = useState<{ id: string, name: string } | null>(null);

  const getDocStatus = (type: string) => {
    const doc = userDocuments.find((d: UserDocument) => {
        if (d.type === type) return true;
        // Handle snake_case vs camelCase mismatch
        if (type === 'address_proof' && d.type === 'addressProof') return true;
        if (type === 'income_proof' && d.type === 'incomeProof') return true;
        return false;
    });
    return doc ? { status: 'uploaded', date: doc.createdAt, url: doc.url, docId: doc.id } : { status: 'pending', date: null, url: null, docId: null };
  };

  const handleUpload = async (file: File) => {
    if (!activeUpload || !user?.id) return;

    try {
        const formData = new FormData();
        formData.append('image', file); // Backend expects 'image' field

        if (activeUpload.id === 'aadhaar') {
             await uploadAadhaar(formData).unwrap();
        } else if (activeUpload.id === 'pan') {
             await uploadPan(formData).unwrap();
        } else if (activeUpload.id === 'address_proof') {
             await uploadAddressProof(formData).unwrap();
        } else if (activeUpload.id === 'income_proof') {
             await uploadIncomeProof(formData).unwrap();
        }
        
        setActiveUpload(null);
        toast.success('Document uploaded successfully!');
    } catch (error) {
        console.error('Upload failed:', error);
        toast.error('Failed to upload document. Please try again.');
    }
  };

  const isUploading = isUploadingAadhaar || isUploadingPan || isUploadingAddress || isUploadingIncome;

  if (isFetching) {
    return <div className="p-8 text-center animate-pulse text-gray-400">Loading documents...</div>;
  }

  return (
    <div className="w-full pt-4 md:pt-6">
      <AnimatePresence>
        {activeUpload && (
            <DocumentUploadModal
                type={activeUpload.id}
                title={activeUpload.name}
                onUpload={handleUpload}
                onClose={() => setActiveUpload(null)}
                uploading={isUploading}
            />
        )}
      </AnimatePresence>
      
      {/* Header with Back Button */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm md:text-base font-medium">Back</span>
        </button>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900">
          Upload Documents
        </h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 lg:p-8">
        <p className="text-sm md:text-base text-gray-600 mb-6">
          Please upload your Aadhar Card, PAN Card, Address Proof, and Income Proof to complete your verification process.
        </p>

        <div className="space-y-3 md:space-y-4">
          {REQUIRED_DOCUMENTS.map((doc, index) => {
            const { status, date } = getDocStatus(doc.id);
            
            return (
                <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                <div className="flex items-center gap-3 md:gap-4 flex-1">
                    <div className="text-2xl md:text-3xl">
                        {doc.id === 'aadhaar' ? '🆔' : doc.id === 'pan' ? '💳' : doc.id === 'address_proof' ? '🏠' : '💰'}
                    </div>
                    <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1">{doc.name}</h3>
                    <p className="text-xs text-gray-500 mb-1">{doc.description}</p>
                    {status === 'uploaded' && date && (
                        <p className="text-xs md:text-sm text-green-600 font-medium">
                        ✓ Uploaded on {formatDate(date)}
                        </p>
                    )}
                    </div>
                </div>
                <div className="flex items-center gap-3 sm:flex-shrink-0">
                    {status === 'uploaded' ? (
                        <button 
                            disabled 
                            className="px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm font-medium cursor-default"
                        >
                            Verified
                        </button>
                    ) : (
                        <button
                            onClick={() => setActiveUpload({ id: doc.id, name: doc.name })}
                            className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 rounded-xl hover:bg-[#D4AF37] transition-all shadow-lg active:scale-95"
                        >
                            Upload
                        </button>
                    )}
                </div>
                </motion.div>
            );
          })}
        </div>

        <div className="mt-6 md:mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs md:text-sm text-blue-800">
            <strong className="font-semibold">Note:</strong> Please ensure all documents are clear and readable. Accepted formats: JPG, PNG, PDF (Max 5MB)
          </p>
        </div>
      </div>
    </div>
  );
}

