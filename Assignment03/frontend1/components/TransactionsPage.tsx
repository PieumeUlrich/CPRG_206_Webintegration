
import React from 'react';
import { DataTable, Column } from './DataTable';
import { Transaction } from '../types';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface TransactionsPageProps {
  data: Transaction[];
}

export const TransactionsPage: React.FC<TransactionsPageProps> = ({ data }) => {
  const columns: Column<Transaction>[] = [
    { header: 'Transaction Date', accessor: 'date' },
    { header: 'Description', accessor: 'description' },
    { header: 'Type', accessor: (t) => (
      <span className={`font-bold flex items-center space-x-2 ${t.type === 'Refund' ? 'text-rose-600' : 'text-emerald-600'}`}>
        <span className={`w-2 h-2 rounded-full ${t.type === 'Refund' ? 'bg-rose-600' : 'bg-emerald-600'}`} />
        <span>{t.type}</span>
      </span>
    )},
    { header: 'Value', accessor: (t) => <span className="font-black text-slate-900">${t.amount.toLocaleString()}</span> },
    { header: 'Status', accessor: (t) => {
      const StatusIcon = t.status === 'Completed' ? CheckCircle2 : t.status === 'Processing' ? Clock : AlertCircle;
      const statusColor = t.status === 'Completed' ? 'text-emerald-500' : t.status === 'Processing' ? 'text-amber-500' : 'text-rose-500';
      return (
        <div className={`flex items-center space-x-2 font-bold ${statusColor}`}>
          <StatusIcon size={16} strokeWidth={3} />
          <span>{t.status}</span>
        </div>
      );
    }}
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header>
        <h1 className="text-4xl font-black text-slate-900">Financial Insights</h1>
        <p className="text-slate-500 text-lg font-medium">Comprehensive record of your travel investments and account activity.</p>
      </header>
      <DataTable 
        title="Transaction Ledger"
        pageSize={7}
        data={data}
        columns={columns}
      />
    </div>
  );
};
