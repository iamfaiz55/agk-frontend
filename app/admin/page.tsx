'use client';

import { motion } from 'framer-motion';
import { useGetAdminStatsQuery } from '@/redux/api/projectsApi';

export default function AdminDashboard() {
  const { data: statsData, isLoading } = useGetAdminStatsQuery();

  const stats = [
    { label: 'Total Projects', value: statsData?.totalProjects || 0, icon: '🏗️', color: 'bg-blue-500' },
    { label: 'Total Buildings', value: statsData?.totalBuildings || 0, icon: '🏢', color: 'bg-green-500' },
    { label: 'Total Units', value: statsData?.totalUnits || 0, icon: '🏬', color: 'bg-purple-500' },
    { label: 'Available Units', value: statsData?.availableUnits || 0, icon: '✅', color: 'bg-green-500' },
    { label: 'Reserved Units', value: statsData?.reservedUnits || 0, icon: '📋', color: 'bg-yellow-500' },
    { label: 'Sold Units', value: statsData?.soldUnits || 0, icon: '💰', color: 'bg-red-500' },
    { label: 'Total Leads', value: statsData?.totalLeads || 0, icon: '📞', color: 'bg-indigo-500' },
    { label: 'New Leads', value: statsData?.newLeads || 0, icon: '🆕', color: 'bg-pink-500' },
    { label: 'Total Users', value: statsData?.totalUsers || 0, icon: '👥', color: 'bg-teal-500' },
    { label: 'Active Users', value: statsData?.activeUsers || 0, icon: '🟢', color: 'bg-emerald-500' },
  ];

  if (isLoading) return <div className="p-8 animate-pulse text-gray-400 font-medium uppercase tracking-widest text-center">Calibrating Real-Time Data...</div>;

  return (
    <div>
      <div className="mb-8 md:mb-12">
        <h1 className="text-2xl md:text-4xl font-normal text-gray-900 mb-2 tracking-tighter">Dashboard <span className="text-[#D4AF37]">Overview</span></h1>
        <p className="text-sm md:text-base text-gray-500 font-medium italic leading-tight">Live performance metrics of your real estate empire.</p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -3, scale: 1.02 }}
            className="bg-white rounded-[1.2rem] md:rounded-[2rem] shadow-sm md:shadow-xl shadow-gray-100 p-3 md:p-8 border border-gray-50 group hover:border-[#D4AF37]/30 transition-all flex flex-col items-center text-center"
          >
            <div className={`${stat.color} w-8 h-8 md:w-14 md:h-14 rounded-lg md:rounded-2xl flex items-center justify-center text-base md:text-3xl mb-2 md:mb-6 shadow-md md:shadow-lg shadow-gray-200 group-hover:rotate-6 transition-transform`}>
              {stat.icon}
            </div>
            <h3 className="text-lg md:text-4xl font-normal text-gray-900 mb-0.5 md:mb-2 tracking-tight">
              {stat.value}
            </h3>
            <p className="text-black font-medium text-[7px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] line-clamp-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 p-10 border border-gray-50"
        >
          <h2 className="text-2xl font-normal text-gray-900 mb-8 tracking-tight uppercase">Recent Pulse</h2>
          <div className="space-y-6">
            {[
              { action: 'Database Synchronized', time: 'Just now', type: 'system' },
              { action: 'New membership recorded', time: 'Recently', type: 'user' },
              { action: 'Project status healthy', time: 'Permanent', type: 'status' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-6 p-4 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-100">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                  {activity.type === 'system' && '⚡'}
                  {activity.type === 'user' && '👤'}
                  {activity.type === 'status' && '🛡️'}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-lg tracking-tight">{activity.action}</p>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-900 rounded-[2.5rem] shadow-xl p-10 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-10 blur-[100px] -mr-32 -mt-32" />
          <h2 className="text-2xl font-normal text-white mb-8 tracking-tight uppercase relative z-10">Strategic Commands</h2>
          <div className="space-y-4 relative z-10">
            <button className="w-full text-left p-6 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 hover:border-[#D4AF37]/50 group/btn">
              <span className="font-medium text-white uppercase tracking-widest text-xs group-hover/btn:text-[#D4AF37] transition-colors">Deploy New Project →</span>
            </button>
            <button className="w-full text-left p-6 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 hover:border-[#D4AF37]/50 group/btn">
              <span className="font-medium text-white uppercase tracking-widest text-xs group-hover/btn:text-[#D4AF37] transition-colors">Audit Inquiry Leads →</span>
            </button>
            <button className="w-full text-left p-6 bg-[#D4AF37] hover:bg-[#B8941E] rounded-2xl transition-all shadow-lg active:scale-95 group/btn">
              <span className="font-medium text-gray-900 uppercase tracking-widest text-xs">Generate System Intelligence</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

