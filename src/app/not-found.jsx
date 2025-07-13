import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="text-center max-w-md">
        <div className="mb-6 sm:mb-8">
          <div className="text-6xl sm:text-8xl font-bold text-purple-400 mb-4">404</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Page Not Found</h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href="/"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/transactions"
            className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base border border-slate-600"
          >
            View Transactions
          </Link>
        </div>
      </div>
    </div>
  );
}