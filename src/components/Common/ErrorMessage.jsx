import React from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

const ErrorMessage = ({ message, onRetry, fullPage = false }) => {
  const content = (
    <div className={`flex flex-col items-center justify-center ${fullPage ? 'min-h-screen' : 'py-12'}`}>
      <div className="bg-red-100 rounded-full p-4 mb-4">
        <FiAlertCircle className="text-red-600 text-5xl" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">
        {message || 'We encountered an error while loading your request. Please try again.'}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <FiRefreshCw size={18} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );

  if (fullPage) {
    return content;
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
      <div className="flex items-start space-x-3">
        <FiAlertCircle className="text-red-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-red-800">{message || 'An error occurred'}</p>
          {onRetry && (
            <button onClick={onRetry} className="text-red-600 text-sm mt-2 hover:underline">
              Click here to retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;