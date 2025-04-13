// src/components/common/EmptyState.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ 
  title = 'No items found', 
  message = 'There are no items to display at this time.', 
  actionText = 'Browse Products', 
  actionLink = '/shop',
  icon = null 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon && <div className="text-gray-400 mb-4">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md">{message}</p>
      <Link
        to={actionLink}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {actionText}
      </Link>
    </div>
  );
};

export default EmptyState;
