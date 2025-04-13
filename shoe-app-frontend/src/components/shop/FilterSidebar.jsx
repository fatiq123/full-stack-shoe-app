// src/components/shop/FilterSidebar.jsx
import React, { useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

const FilterSidebar = ({ 
  brands, 
  categories, 
  selectedBrand, 
  selectedCategory, 
  priceRange, 
  onBrandChange, 
  onCategoryChange, 
  onPriceChange,
  onClearFilters 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const handlePriceChange = (e) => {
    const newValue = parseInt(e.target.value);
    setLocalPriceRange(newValue);
  };

  const handlePriceApply = () => {
    onPriceChange(localPriceRange);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button 
        className="md:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-10"
        onClick={toggleSidebar}
      >
        <FaFilter />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
        fixed md:relative top-0 left-0 h-full md:h-auto w-3/4 md:w-full 
        bg-white md:bg-transparent z-30 md:z-auto
        transform transition-transform duration-300 ease-in-out
        p-4 md:p-0 overflow-y-auto
      `}>
        <div className="md:sticky md:top-4">
          {/* Mobile Header */}
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={toggleSidebar} className="text-gray-500">
              <FaTimes size={24} />
            </button>
          </div>

          {/* Filter Content */}
          <div className="space-y-6">
            {/* Clear Filters */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button 
                onClick={onClearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            </div>

            {/* Brand Filter */}
            <div>
              <h4 className="font-medium mb-2">Brands</h4>
              <div className="space-y-2">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      checked={selectedBrand === brand}
                      onChange={() => onBrandChange(selectedBrand === brand ? null : brand)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-700">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="font-medium mb-2">Categories</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={selectedCategory === category}
                      onChange={() => onCategoryChange(selectedCategory === category ? null : category)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h4 className="font-medium mb-2">Price Range</h4>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={localPriceRange}
                  onChange={handlePriceChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">$0</span>
                  <span className="text-sm font-medium text-gray-800">
                    Up to ${localPriceRange}
                  </span>
                  <span className="text-sm text-gray-600">$1000</span>
                </div>
                <button
                  onClick={handlePriceApply}
                  className="w-full py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm rounded transition"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
