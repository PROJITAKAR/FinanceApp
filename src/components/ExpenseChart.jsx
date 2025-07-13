'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ExpenseChart = ({ transactions }) => {
  const monthlyTotals = transactions.reduce((acc, tx) => {
    const date = new Date(tx.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`; // example: "2024-6" for July
    acc[key] = (acc[key] || 0) + tx.amount;
    return acc;
  }, {});

  const data = Object.entries(monthlyTotals)
    .map(([key, total]) => {
      const [year, monthIndex] = key.split('-');
      const date = new Date(year, monthIndex);
      const label = date.toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      });
      return { month: label, total, sortKey: date.getTime() };
    })
    .sort((a, b) => a.sortKey - b.sortKey); // sort chronologically

  return (
    <div className="h-64 sm:h-80 pb-2">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ 
            top: 20, 
            right: 10, 
            left: 10, 
            bottom: 5 
          }}
        >
          <XAxis
            dataKey="month"
            tick={{ fill: '#cbd5e1', fontSize: 10 }}
            axisLine={{ stroke: '#475569' }}
            tickLine={{ stroke: '#475569' }}
            interval={0}
            height={40}
          />
          <YAxis
            tick={{ fill: '#cbd5e1', fontSize: 10 }}
            axisLine={{ stroke: '#475569' }}
            tickLine={{ stroke: '#475569' }}
            width={40}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '12px'
            }}
            formatter={(value) => [`₹${value.toFixed(2)}`, 'Amount']}
          />
          <Bar dataKey="total" fill="#9333ea" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;