
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, color, bg }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
    <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
      <Icon size={28} />
    </div>
    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-3xl font-black text-slate-900">{value}</p>
  </div>
);
