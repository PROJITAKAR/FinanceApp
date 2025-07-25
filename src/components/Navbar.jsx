'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/transactions?search=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-700/50">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-semibold text-white text-sm">FinanceApp</span>
        </div>

        <div className="hidden md:flex gap-6">
          <Link 
            href="/" 
            className="text-slate-300 hover:text-white px-3 py-2 rounded-md transition-colors duration-200 font-medium text-sm"
          >
            Dashboard
          </Link>
          <Link 
            href="/transactions" 
            className="text-slate-300 hover:text-white px-3 py-2 rounded-md transition-colors duration-200 font-medium text-sm"
          >
            Transactions
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <input 
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search keyword here..." 
            className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2 text-sm text-slate-300 placeholder-slate-500 w-64 focus:outline-none focus:border-purple-600"
          />
          <svg className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <Link 
          href="/transactions/new" 
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm"
        >
          <span className="hidden sm:inline">Add Transaction</span>
          <span className="sm:hidden">Add</span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-700/50 md:hidden z-50">
          <div className="px-6 py-4 space-y-4">
            <div className="flex gap-6 flex-col">
              <Link 
                href="/" 
                className="text-slate-300 hover:text-white px-3 py-2 rounded-md transition-colors duration-200 font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/transactions" 
                className="text-slate-300 hover:text-white px-3 py-2 rounded-md transition-colors duration-200 font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Transactions
              </Link>
            </div>
            
            <div className="relative">
              <input 
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search keyword here..." 
                className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2 text-sm text-slate-300 placeholder-slate-500 w-full focus:outline-none focus:border-purple-600"
              />
              <svg className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;