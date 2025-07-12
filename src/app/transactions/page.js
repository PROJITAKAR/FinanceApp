import { Suspense } from 'react';
import TransactionListWithSearch from '@/components/TransactionListWithSearch';

export default function TransactionPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Suspense fallback={<div className="text-slate-300">Loading transactions...</div>}>
          <TransactionListWithSearch />
        </Suspense>
      </div>
    </div>
  );
}
