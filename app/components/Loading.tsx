import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-20">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500 border-solid"></div>
    </div>
  );
};

export default LoadingSpinner;