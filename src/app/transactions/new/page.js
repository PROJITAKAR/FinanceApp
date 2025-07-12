'use client';

import TransactionForm from '@/components/TransactionForm';

const AddTransactionPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Add Transaction</h1>
          <p className="text-slate-300">Record a new financial transaction</p>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-lg">
          <TransactionForm
            onSaved={() => window.location.href = '/transactions'}
            clearEdit={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTransactionPage;