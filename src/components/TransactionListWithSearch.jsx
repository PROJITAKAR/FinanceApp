// TransactionListWithSearch.js - Mobile Responsive Version
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TransactionList from './TransactionList';
import { Button } from '@/components/ui/button';

const TransactionListWithSearch = () => {
  const [transactions, setTransactions] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/transactions');
      const data = await res.json();

      const filtered = searchQuery
        ? data.filter((tx) =>
            tx.description.toLowerCase().includes(searchQuery)
          )
        : data;

      setTransactions(filtered);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [searchQuery]);

  const handleReset = () => {
    router.replace('/transactions');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                All Transactions
              </h1>
              <p className="text-slate-300 text-sm sm:text-base">
                {searchQuery
                  ? `Showing results for "${searchQuery}"`
                  : 'Manage your financial transactions'}
              </p>
            </div>

            {searchQuery && (
              <Button
                variant="ghost"
                className="text-sm text-purple-400 hover:underline self-start sm:self-center"
                onClick={handleReset}
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-3 sm:p-6 border border-slate-700 shadow-lg">
          {transactions.length > 0 ? (
            <TransactionList
              transactions={transactions}
              onDelete={fetchTransactions}
              onEdit={(tx) =>
                (window.location.href = `/transactions/${tx._id}/edit`)
              }
            />
          ) : (
            <p className="text-slate-400 text-center py-8 sm:py-12 text-sm sm:text-base">
              {searchQuery
                ? `No results found for "${searchQuery}".`
                : 'No transactions found.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionListWithSearch;