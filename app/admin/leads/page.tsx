'use client';

import { useGetLeadsQuery, useUpdateLeadStatusMutation, useDeleteLeadMutation } from '@/redux/api/projectsApi';
import { motion } from 'framer-motion';

export default function AdminLeadsPage() {
  const { data: leads, isLoading } = useGetLeadsQuery();
  const [updateStatus] = useUpdateLeadStatusMutation();
  const [deleteLead] = useDeleteLeadMutation();

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateStatus({ id, status }).unwrap();
    } catch (error) {
      console.error('Failed to update lead status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to dismiss this lead?')) {
      try {
        await deleteLead(id).unwrap();
      } catch (error) {
        console.error('Failed to delete lead:', error);
      }
    }
  };

  if (isLoading) return <div className="p-8 animate-pulse text-gray-400 font-medium uppercase tracking-widest text-center">Harvesting Leads...</div>;

  const statusColors: any = {
    new: 'bg-blue-50 text-blue-600',
    contacted: 'bg-yellow-50 text-yellow-600',
    closed: 'bg-green-50 text-green-600',
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 md:mb-12">
        <h1 className="text-2xl md:text-4xl font-normal text-gray-900 mb-1 md:mb-2 tracking-tighter uppercase">Business <span className="text-[#D4AF37]">Leads</span></h1>
        <p className="text-sm md:text-base text-gray-500 font-medium italic leading-tight">Track every inquiry that arrives through your platform.</p>
      </div>

      {/* Mobile View: Lead Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {leads?.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-6 rounded-[2rem] shadow-lg shadow-gray-100 border border-gray-50"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-normal text-gray-900 tracking-tight">{lead.name}</h3>
                <p className="text-xs text-gray-400 font-medium uppercase mt-1">Lead ID #{lead.id}</p>
              </div>
              <select
                value={lead.status}
                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                className={`px-3 py-1.5 rounded-full text-[9px] font-medium uppercase tracking-widest outline-none border-none cursor-pointer shadow-sm ${statusColors[lead.status]}`}
              >
                <option value="new">New</option>
                <option value="contacted">Follow Up</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-sm text-gray-900 font-medium flex items-center gap-2">
                <span className="text-xs opacity-50">📧</span> {lead.email}
              </p>
              <p className="text-sm text-gray-900 font-medium flex items-center gap-2">
                <span className="text-xs opacity-50">📞</span> {lead.phone}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-xs text-black font-black uppercase tracking-[0.2em] mb-2 opacity-30">Inquiry Interests</p>
              <p className="text-sm text-gray-600 italic leading-relaxed">"{lead.message}"</p>
              {lead.building && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <p className="text-[10px] font-medium uppercase tracking-widest text-[#D4AF37]">Project: {lead.building.name}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => handleDelete(lead.id)}
              className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-medium text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all border border-red-100/50"
            >
              Dismiss Inquiry
            </button>
          </motion.div>
        ))}
      </div>

      {/* Desktop View: Table */}
      <div className="hidden md:block bg-white rounded-[2.5rem] shadow-2xl shadow-gray-100 overflow-hidden border border-gray-50">
        <div className="overflow-x-auto thin-scrollbar">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="px-8 py-6 text-left text-xs font-medium uppercase tracking-[0.2em]">Contact Identity</th>
                <th className="px-8 py-6 text-left text-xs font-medium uppercase tracking-[0.2em]">Communication</th>
                <th className="px-8 py-6 text-left text-xs font-medium uppercase tracking-[0.2em]">Message / Interest Detail</th>
                <th className="px-8 py-6 text-left text-xs font-medium uppercase tracking-[0.2em]">Pipeline Status</th>
                <th className="px-8 py-6 text-right text-xs font-medium uppercase tracking-[0.2em]">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads?.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-8 py-6">
                    <p className="font-normal text-gray-900 text-lg tracking-tight">{lead.name}</p>
                    <p className="text-[10px] text-gray-300 font-medium uppercase mt-1 tracking-widest">Inquiry ID #{lead.id}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1.5">
                      <p className="text-gray-900 font-black text-xs tracking-tight">📧 {lead.email}</p>
                      <p className="text-[#D4AF37] font-black text-xs tracking-tight">📞 {lead.phone}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="max-w-xs">
                      <p className="text-gray-500 font-bold text-sm italic leading-relaxed line-clamp-2">"{lead.message}"</p>
                      {lead.building && (
                        <div className="mt-3 inline-flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                          <span className="text-[10px]">🏢</span>
                          <span className="text-[9px] text-gray-900 font-medium uppercase tracking-widest">
                            {lead.building.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className={`px-5 py-2.5 rounded-xl text-[10px] font-medium uppercase tracking-widest outline-none border border-transparent shadow-sm focus:border-[#D4AF37]/50 cursor-pointer ${statusColors[lead.status]}`}
                    >
                      <option value="new">New Inquiry</option>
                      <option value="contacted">Followed Up</option>
                      <option value="closed">Closed Deal</option>
                    </select>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="p-3.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95 border border-red-100"
                    >
                      🗑️
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
