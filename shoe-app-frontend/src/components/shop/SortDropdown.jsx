// src/components/shop/SortDropdown.jsx
import React from 'react';
import { FaSortAmountDown } from 'react-icons/fa';

const SortDropdown = ({ sortOption, onSortChange }) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'name_asc', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' },
  ];

  return (
    <div className="flex items-center">
      <FaSortAmountDown className="text-gray-500 mr-2" />
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
