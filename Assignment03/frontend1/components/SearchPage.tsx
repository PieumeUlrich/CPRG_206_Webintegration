
import React, { useState } from 'react';
import { Search, Loader2, Globe, Sparkles } from 'lucide-react';
import { searchDestination } from '../services/geminiService';
import { SearchResult } from '../types';

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await searchDestination(query);
      setResult(res);
    } catch (e) {
      alert("Search encountered an issue. Please try a different query.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-right-6 duration-700">
      <header className="text-center space-y-3">
        <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-2xl mb-2">
          <Sparkles size={32} />
        </div>
        <h1 className="text-4xl font-black text-slate-900">AI Trip Discovery</h1>
        <p className="text-slate-500 text-lg font-medium">Describe your dream vacation and let Lumina build it for you.</p>
      </header>

      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
          <Search size={24} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. 'Adventure and wine in South Africa'"
          className="w-full pl-16 pr-40 py-6 rounded-[2rem] border-2 border-slate-100 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 shadow-xl transition-all text-xl font-medium placeholder:text-slate-300"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-3 top-3 bottom-3 px-8 bg-blue-600 text-white rounded-[1.5rem] font-black text-lg hover:bg-blue-700 disabled:bg-slate-200 transition-all flex items-center space-x-2"
        >
          {loading ? <Loader2 className="animate-spin" size={24} /> : 'Imagine'}
        </button>
      </form>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-100 rounded-full animate-pulse" />
            <Loader2 className="absolute inset-0 animate-spin text-blue-600 m-auto" size={40} />
          </div>
          <p className="text-xl font-bold text-slate-400 animate-pulse text-center">
            Orchestrating your global escape...
          </p>
        </div>
      )}

      {result && !loading && (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 py-16 px-10 text-white relative">
            <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" size={300} />
            <div className="relative z-10">
              <h2 className="text-5xl font-black mb-4 tracking-tight">{result.name}</h2>
              <div className="flex flex-wrap gap-4">
                <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold border border-white/20">
                  Best in {result.bestTimeToVisit}
                </span>
                <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold border border-white/20">
                  Est. {result.priceEstimate}
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-10 grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-10">
              <section>
                <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center space-x-2">
                  <span className="w-2 h-8 bg-blue-600 rounded-full" />
                  <span>The Vision</span>
                </h3>
                <p className="text-slate-600 leading-relaxed text-xl font-medium">{result.description}</p>
              </section>
              <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center space-x-2">
                  <span className="w-2 h-8 bg-indigo-600 rounded-full" />
                  <span>Exclusive Itinerary</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.topActivities.map((act, i) => (
                    <div key={i} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 hover:bg-blue-50 transition-all">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-black shrink-0 mt-1">
                        {i + 1}
                      </div>
                      <span className="font-bold text-slate-700">{act}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className="space-y-6">
              <div className="bg-slate-900 p-8 rounded-[2rem] text-white space-y-8 shadow-xl">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Package Value</p>
                  <p className="text-4xl font-black text-white">{result.priceEstimate}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold border-b border-white/10 pb-4">
                    <span className="text-slate-400">Duration</span>
                    <span>14 Days</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold border-b border-white/10 pb-4">
                    <span className="text-slate-400">Flexibility</span>
                    <span className="text-emerald-400">High</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-lg hover:-translate-y-1 active:scale-95">
                  Book This Journey
                </button>
                <p className="text-center text-slate-500 text-xs font-bold">24/7 Dedicated Concierge Included</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
