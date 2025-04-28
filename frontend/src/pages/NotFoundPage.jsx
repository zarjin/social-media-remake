import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4'>
      <div className='bg-white rounded-xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center'>
        <div className='w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6'>
          <span className='text-5xl font-bold text-red-500'>404</span>
        </div>

        <h1 className='text-3xl font-bold text-gray-800 mb-4'>Page Not Found</h1>

        <p className='text-gray-600 mb-8'>
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            to='/'
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-2'
          >
            <Home size={20} />
            <span>Go Home</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center space-x-2'
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </main>
  )
}
