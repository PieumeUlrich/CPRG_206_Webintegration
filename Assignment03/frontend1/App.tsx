
import React, { useState } from 'react';
import { User } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { SearchPage } from './components/SearchPage';
import { BookingsPage } from './components/BookingsPage';
import { TransactionsPage } from './components/TransactionsPage';
import { Booking, Transaction } from './types';

// Central Mock Data Store
const MOCK_BOOKINGS: Booking[] = [
  { id: '1021', tripName: 'Tokyo Explorer', customerName: 'John Doe', date: '2024-10-15', status: 'Confirmed', amount: 1250 },
  { id: '1022', tripName: 'Paris Romance', customerName: 'John Doe', date: '2024-11-02', status: 'Pending', amount: 2100 },
  { id: '1023', tripName: 'Swiss Alps Ski', customerName: 'John Doe', date: '2024-12-20', status: 'Confirmed', amount: 3400 },
  { id: '1024', tripName: 'Bali Retreat', customerName: 'John Doe', date: '2024-09-12', status: 'Cancelled', amount: 850 },
  { id: '1025', tripName: 'NYC Skyline', customerName: 'John Doe', date: '2024-10-25', status: 'Confirmed', amount: 1500 },
  { id: '1026', tripName: 'Rome Ancient', customerName: 'John Doe', date: '2024-11-15', status: 'Pending', amount: 1800 },
  { id: '1027', tripName: 'Kenya Safari', customerName: 'John Doe', date: '2025-01-05', status: 'Confirmed', amount: 4200 },
  { id: '1028', tripName: 'London Bridge', customerName: 'John Doe', date: '2024-08-22', status: 'Confirmed', amount: 1100 },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TRX-1', date: '2024-08-01', description: 'Tokyo Trip Payment', amount: 1250, type: 'Payment', status: 'Completed' },
  { id: 'TRX-2', date: '2024-08-05', description: 'Bali Trip Refund', amount: 850, type: 'Refund', status: 'Completed' },
  { id: 'TRX-3', date: '2024-08-10', description: 'Paris Deposit', amount: 500, type: 'Payment', status: 'Processing' },
  { id: 'TRX-4', date: '2024-08-12', description: 'Alps Full Payment', amount: 3400, type: 'Payment', status: 'Completed' },
  { id: 'TRX-5', date: '2024-08-15', description: 'NYC Booking Fee', amount: 1500, type: 'Payment', status: 'Completed' },
  { id: 'TRX-6', date: '2024-08-20', description: 'Lumina Plus Sub', amount: 29.99, type: 'Payment', status: 'Completed' },
  { id: 'TRX-7', date: '2024-08-25', description: 'Flight Upgrade (LHR)', amount: 450, type: 'Payment', status: 'Completed' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'bookings' | 'transactions'>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Dashboard 
            bookings={MOCK_BOOKINGS} 
            transactions={MOCK_TRANSACTIONS} 
            onExplore={() => setActiveTab('search')}
          />
        );
      case 'search':
        return <SearchPage />;
      case 'bookings':
        return <BookingsPage data={MOCK_BOOKINGS} />;
      case 'transactions':
        return <TransactionsPage data={MOCK_TRANSACTIONS} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-6 md:p-12 max-w-[1400px] mx-auto w-full">
        {/* Top Header Row */}
        <div className="flex justify-between items-center mb-10">
          <div className="md:hidden flex items-center space-x-2 text-blue-600">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <User size={18} />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">LUMINA</span>
          </div>
          
          <div className="hidden md:flex ml-auto items-center space-x-6">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Status</span>
              <span className="text-sm font-bold text-emerald-500 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span>Operational</span>
              </span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <button className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-20 group-hover:opacity-100 blur transition duration-300"></div>
              <div className="relative p-3 bg-white border border-slate-200 rounded-full shadow-sm hover:border-slate-300 transition-colors">
                <User size={22} className="text-slate-600" />
              </div>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
