'use client';

import Link from 'next/link';
import Button from '../ui/Button';

export default function AdminTopbar() {
  return (
    <div className="bg-white shadow-md sticky top-0 z-[9999] lg:ml-64">
      <div className="px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="outline" size="sm">View Site</Button>
          </Link>
          <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold">
            A
          </div>
        </div>
      </div>
    </div>
  );
}

