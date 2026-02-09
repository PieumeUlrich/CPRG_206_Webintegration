
import React from 'react';
import { DataTable, Column } from './DataTable';
import { Booking } from '../types';

interface BookingsPageProps {
  data: Booking[];
}

export const BookingsPage: React.FC<BookingsPageProps> = ({ data }) => {
  const columns: Column<Booking>[] = [
    { header: 'Booking ID', accessor: (b) => <span className="text-blue-600 font-bold font-mono">#{b.id}</span> },
    { header: 'Trip Destination', accessor: 'tripName' },
    { header: 'Traveler Name', accessor: 'customerName' },
    { header: 'Departure Date', accessor: (b) => new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
    { header: 'Amount Paid', accessor: (b) => `$${b.amount.toLocaleString()}` },
    { header: 'Status', accessor: (b) => (
      <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
        b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 
        b.status === 'Pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 
        'bg-rose-100 text-rose-700 border border-rose-200'
      }`}>
        {b.status}
      </span>
    )}
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header>
        <h1 className="text-4xl font-black text-slate-900">Manage Your Adventures</h1>
        <p className="text-slate-500 text-lg font-medium">Real-time tracking of all your upcoming and past travel arrangements.</p>
      </header>
      <DataTable 
        title="Global Reservations"
        pageSize={7}
        data={data}
        columns={columns}
      />
    </div>
  );
};
