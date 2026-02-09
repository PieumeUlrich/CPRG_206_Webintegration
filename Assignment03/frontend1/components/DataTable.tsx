
import React, { useState } from 'react';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  title: string;
}

export function DataTable<T extends { id: string }>({ 
  data, 
  columns, 
  pageSize = 5, 
  title 
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <span className="text-sm font-medium text-slate-500">
          Showing {paginatedData.length} of {data.length}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                {columns.map((col, idx) => (
                  <td key={idx} className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {typeof col.accessor === 'function' 
                      ? col.accessor(item) 
                      : (item[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 disabled:opacity-30 hover:bg-white hover:border-slate-300 transition-all shadow-sm"
          >
            Previous
          </button>
          <div className="text-sm font-bold text-slate-500">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 disabled:opacity-30 hover:bg-white hover:border-slate-300 transition-all shadow-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
