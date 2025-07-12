'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TransactionForm from '@/components/TransactionForm';

const EditTransactionPage = () => {
  const { id } = useParams();
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/transactions/${id}`);
        if (!res.ok) throw new Error('Transaction not found');
        const data = await res.json();
        setEditData(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTransaction();
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Edit Transaction</h1>
          <p className="text-slate-300">Update your transaction details</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-lg">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-slate-400">
              Loading transaction...
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-400 text-lg mb-2">Error</div>
              <p className="text-slate-400">{error}</p>
              <button
                onClick={() => window.location.href = '/transactions'}
                className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
              >
                Back to Transactions
              </button>
            </div>
          ) : (
            <TransactionForm
              editData={editData}
              onSaved={() => window.location.href = '/transactions'}
              clearEdit={() => window.location.href = '/transactions'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTransactionPage;