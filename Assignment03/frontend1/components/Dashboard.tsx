
import React from 'react';
import { DollarSign, MapPin, TrendingUp, Globe, Plane, ChevronRight } from 'lucide-react';
import { StatCard } from './StatCard';
import { DataTable, Column } from './DataTable';
import { Booking, Transaction } from '../types';

interface DashboardProps {
  bookings: Booking[];
  transactions: Transaction[];
  onExplore: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ bookings, transactions, onExplore }) => {
  const stats = [
    { label: 'Total Invested', value: '$8,450', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Trips', value: '03', icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Travel Points', value: '12.4K', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'World Score', value: '18', icon: Globe, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const bookingCols: Column<Booking>[] = [
    { header: 'Trip', accessor: 'tripName' },
    { header: 'Date', accessor: 'date' },
    { header: 'Status', accessor: (b) => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
        b.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 
        b.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
      }`}>
        {b.status}
      </span>
    )}
  ];

  const activityCols: Column<Transaction>[] = [
    { header: 'Description', accessor: 'description' },
    { header: 'Amount', accessor: (t) => `$${t.amount.toLocaleString()}` },
    { header: 'Status', accessor: (t) => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
        t.status === 'Completed' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
      }`}>
        {t.status}
      </span>
    )}
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Bonjour, John!</h1>
          <p className="text-slate-500 font-medium text-lg">Where will Lumina take you today?</p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => <StatCard key={idx} {...stat} />)}
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-xl">
          <div className="bg-white/10 backdrop-blur-md inline-flex px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-white/20">
            Featured Experience
          </div>
          <h2 className="text-4xl font-black mb-6 leading-tight">Kyoto's Sacred Cherry Blossoms 2024</h2>
          <p className="text-slate-300 mb-10 text-xl font-medium">A curated 12-day odyssey through the spiritual heart of Japan, featuring private temple stays and traditional tea ceremonies.</p>
          <button 
            onClick={onExplore}
            className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black flex items-center space-x-3 hover:bg-blue-50 transition-all shadow-lg hover:shadow-white/10 hover:-translate-y-1"
          >
            <span>Start Discovery</span>
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 scale-150 pointer-events-none">
          <Plane size={400} className="rotate-45" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DataTable 
          title="Recent Bookings" 
          data={bookings.slice(0, 4)} 
          columns={bookingCols}
        />
        <DataTable 
          title="Recent Activity" 
          data={transactions.slice(0, 4)} 
          columns={activityCols}
        />
      </div>
    </div>
  );
};
