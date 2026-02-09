
import React from 'react';
import { 
  Home, 
  Search, 
  Calendar, 
  CreditCard, 
  Plane, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'home' | 'search' | 'bookings' | 'transactions';
  setActiveTab: (tab: 'home' | 'search' | 'bookings' | 'transactions') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Dashboard' },
    { id: 'search', icon: Search, label: 'Discover' },
    { id: 'bookings', icon: Calendar, label: 'Bookings' },
    { id: 'transactions', icon: CreditCard, label: 'Transactions' },
  ] as const;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex sticky top-0 h-screen z-20">
      <div className="p-6">
        <div className="flex items-center space-x-3 text-blue-600 mb-10">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
            <Plane size={24} className="rotate-45" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">LUMINA</span>
        </div>
        
        <nav className="space-y-1.5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-3 w-full px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 translate-x-1' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100">
        <div className="flex items-center space-x-3 p-2 mb-6 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
            JD
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-900 truncate">John Doe</p>
            <p className="text-xs font-medium text-slate-500 truncate">Premium Explorer</p>
          </div>
        </div>
        <button className="flex items-center justify-center space-x-2 w-full px-4 py-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold">
          <LogOut size={18} />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
