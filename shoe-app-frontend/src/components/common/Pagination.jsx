// src/components/common/Pagination.jsx
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  
  // Create array of page numbers to display
  if (totalPages <= 5) {
    // If 5 or fewer pages, show all
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always include first page
    pages.push(1);
    
    // If current page is 1 or 2, show first 5 pages
    if (currentPage < 3) {
      pages.push(2, 3, 4, 5);
    } 
    // If current page is last or second last, show last 5 pages
    else if (currentPage >= totalPages - 2) {
      pages.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      // Remove duplicates
      const uniquePages = [...new Set(pages)];
      pages.length = 0;
      pages.push(...uniquePages);
    } 
    // Otherwise show current page and 2 pages before and after
    else {
      if (currentPage > 3) {
        pages.push('...');
      }
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
  }
  
  return (
    <div className="flex justify-center items-center space-x-1 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        <FaChevronLeft size={14} />
      </button>
      
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`px-3 py-1 rounded-md ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : page === '...'
                ? 'text-gray-700'
                : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        <FaChevronRight size={14} />
      </button>
    </div>
  );
};

export default Pagination;
