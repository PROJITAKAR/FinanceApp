'use client';

import { Button } from '@/components/ui/button';

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  const handleDelete = async (id) => {
    await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
    onDelete();
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 text-lg mb-2">No transactions found</div>
        <p className="text-slate-500">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          Transactions ({transactions.length})
        </h2>
        <div className="text-sm text-slate-400">
          Total: ₹{transactions.reduce((sum, tx) => sum + tx.amount, 0).toFixed(2)}
        </div>
      </div>
      
      {transactions.map((tx) => (
        <div 
          key={tx._id} 
          className="bg-slate-700 border border-slate-600 p-4 rounded-lg hover:bg-slate-600 transition-colors duration-200 shadow-md"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="font-medium text-white text-lg mb-1">{tx.description}</p>
              <p className="text-sm text-slate-400">
                {new Date(tx.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="text-right ml-4">
              <p className="font-bold text-white text-xl mb-2">₹{tx.amount}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(tx)}
                  className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tx._id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;