// src/components/common/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
  const sizeClasses = {
    small: 'h-6 w-6 border-2',
    medium: 'h-12 w-12 border-4',
    large: 'h-16 w-16 border-4'
  };
  
  const spinnerClass = `${sizeClasses[size]} rounded-full border-t-blue-600 animate-spin`;
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div className={spinnerClass}></div>
      </div>
    );
  }
  
  return <div className={spinnerClass}></div>;
};

export default LoadingSpinner;
