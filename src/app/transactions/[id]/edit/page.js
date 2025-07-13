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
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Edit Transaction</h1>
          <p className="text-slate-300 text-sm sm:text-base">Update your transaction details</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700 shadow-lg">
          {loading ? (
            <div className="flex items-center justify-center py-8 sm:py-12 text-slate-400">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-sm sm:text-base">Loading transaction...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-red-400 text-lg mb-2">Error</div>
              <p className="text-slate-400 text-sm sm:text-base mb-4">{error}</p>
              <button
                onClick={() => window.location.href = '/transactions'}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition text-sm sm:text-base"
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