'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TransactionList from '@/components/TransactionList';
import { Button } from '@/components/ui/button'; // assuming you're using shadcn/ui

const TransactionListPage = () => {
  const [transactions, setTransactions] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions');
    const data = await res.json();

    const filtered = searchQuery
      ? data.filter((tx) =>
          tx.description.toLowerCase().includes(searchQuery)
        )
      : data;

    setTransactions(filtered);
  };

  useEffect(() => {
    fetchTransactions();
  }, [searchQuery]);

  const handleReset = () => {
    router.replace('/transactions'); // removes search param
    router.refresh(); // refetch transactions
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">All Transactions</h1>
              <p className="text-slate-300">
                {searchQuery
                  ? `Showing results for "${searchQuery}"`
                  : 'Manage your financial transactions'}
              </p>
            </div>

            {searchQuery && (
              <Button
                variant="ghost"
                className="text-sm text-purple-400 hover:underline"
                onClick={handleReset}
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-lg">
          {transactions.length > 0 ? (
            <TransactionList
              transactions={transactions}
              onDelete={fetchTransactions}
              onEdit={(tx) =>
                (window.location.href = `/transactions/${tx._id}/edit`)
              }
            />
          ) : (
            <p className="text-slate-400 text-center py-12">
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

export default TransactionListPage;
