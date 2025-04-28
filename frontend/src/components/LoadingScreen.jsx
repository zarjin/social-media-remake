import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center">
        <div className="relative mb-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 absolute top-0 left-0"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading</h2>
        <p className="text-gray-500">Please wait while we set things up...</p>
      </div>
    </div>
  );
}
