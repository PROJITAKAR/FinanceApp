"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ExpenseChart from "@/components/ExpenseChart";
import { Skeleton } from "@/components/ui/skeleton";

const StatCard = ({ title, value }) => (
  <Card className="bg-slate-800/50 h-16 border-slate-700/50 shadow-lg text-white min-h-[120px] sm:min-h-[160px] hover:bg-slate-800/70 transition-all duration-200">
    <CardContent className="p-4 sm:p-6">
      <h3 className="text-xs sm:text-sm font-medium text-slate-400 mb-2">{title}</h3>
      <p className="text-xl sm:text-2xl font-bold text-white">{value}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .finally(() => setLoading(false));
  }, []);

  const total = transactions.length;
  const thisMonth = transactions
    .filter((tx) => new Date(tx.date).getMonth() === new Date().getMonth())
    .reduce((sum, tx) => sum + tx.amount, 0)
    .toFixed(2);

  const average =
    total > 0
      ? (transactions.reduce((sum, tx) => sum + tx.amount, 0) / total).toFixed(
          2
        )
      : "0.00";

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-slate-400 text-sm">
              This is your overview dashboard for this month
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-slate-300">
              Total Spent: ₹
              {transactions.reduce((sum, tx) => sum + tx.amount, 0).toFixed(2)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {loading ? (
            <>
              <Skeleton className="min-h-[120px] sm:min-h-[160px] w-full rounded-lg bg-slate-800/50" />
              <Skeleton className="min-h-[120px] sm:min-h-[160px] w-full rounded-lg bg-slate-800/50" />
              <Skeleton className="min-h-[120px] sm:min-h-[160px] w-full rounded-lg bg-slate-800/50" />
            </>
          ) : (
            <>
              <StatCard title="Total Transactions" value={total} />
              <StatCard title="This Month" value={`$${thisMonth}`} />
              <StatCard title="Average" value={`$${average}`} />
            </>
          )}
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 sm:p-6 border border-slate-700/50 shadow-lg">
          {loading ? (
            <Skeleton className="min-h-[250px] sm:min-h-[288px] w-full rounded-lg bg-slate-700/50" />
          ) : transactions.length > 0 ? (
            <ExpenseChart transactions={transactions} />
          ) : (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12">
              <div className="text-slate-500 mb-4">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 text-center">
                No Transactions Yet
              </h3>
              <p className="text-slate-400 text-center mb-4 sm:mb-6 text-sm sm:text-base max-w-md">
                Start tracking your expenses by adding your first transaction
              </p>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6 py-2 font-medium transition-colors text-sm sm:text-base"
                asChild
              >
                <Link href="/transactions/new">Add Transaction</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;