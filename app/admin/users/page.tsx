'use client';

import { useGetUsersQuery, useDeleteUserMutation } from '@/redux/api/authApi';
import { motion } from 'framer-motion';

export default function AdminUsersPage() {
  const { data: users, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to remove this user from the system?')) {
      try {
        await deleteUser(id).unwrap();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  if (isLoading) return <div className="p-8 animate-pulse text-gray-400 font-medium uppercase tracking-widest text-center">Loading Members...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 md:mb-12">
        <h1 className="text-2xl md:text-4xl font-normal text-gray-900 mb-1 md:mb-2 tracking-tighter uppercase">Registered <span className="text-[#D4AF37]">Members</span></h1>
        <p className="text-sm md:text-base text-gray-500 font-medium italic leading-tight">Manage all users who have registered on your platform.</p>
      </div>

      {/* Mobile View: User Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users?.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-6 rounded-[2rem] shadow-lg shadow-gray-100 border border-gray-50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center font-medium text-gray-400 text-xl border border-gray-50">
                  {user.email[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 tracking-tight">{user.email}</h3>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-0.5">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[9px] font-medium uppercase tracking-widest ${user.role === 'admin' ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-gray-100 text-gray-500'}`}>
                {user.role}
              </span>
            </div>

            <button
              onClick={() => handleDelete(user.id)}
              className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-medium text-[10px] uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all border border-red-100/50"
            >
              Terminate Access
            </button>
          </motion.div>
        ))}
      </div>

      {/* Desktop View: Table */}
      <div className="hidden md:block bg-white rounded-[2.5rem] shadow-2xl shadow-gray-100 overflow-hidden border border-gray-50">
        <div className="overflow-x-auto thin-scrollbar">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900">
                <th className="px-8 py-6 text-left text-xs font-medium text-white uppercase tracking-[0.2em]">Member Identity</th>
                <th className="px-8 py-6 text-left text-xs font-medium text-white uppercase tracking-[0.2em]">Authorization Role</th>
                <th className="px-8 py-6 text-left text-xs font-medium text-white uppercase tracking-[0.2em]">Registration Date</th>
                <th className="px-8 py-6 text-right text-xs font-medium text-white uppercase tracking-[0.2em]">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users?.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center font-medium text-gray-300 text-xl border border-gray-100 group-hover:bg-[#D4AF37]/10 transition-colors">
                        {user.email[0].toUpperCase()}
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 tracking-tight">{user.email}</span>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-1">ID #{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-5 py-2 rounded-full text-[10px] font-medium uppercase tracking-widest border ${user.role === 'admin' ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-gray-400 font-medium text-sm tracking-tight">
                    {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-50 text-red-600 px-6 py-3 rounded-xl text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95 border border-red-100"
                    >
                      Terminate
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
