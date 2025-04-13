import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchSuggestions = ({ results, onSelect }) => {
  const navigate = useNavigate();

  if (!results || results.length === 0) {
    return null;
  }

  const handleClick = (shoeId) => {
    navigate(`/shoes/${shoeId}`);
    if (onSelect) onSelect();
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg overflow-hidden z-50">
      {results.map(shoe => (
        <div 
          key={shoe.id} 
          className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition duration-150"
          onClick={() => handleClick(shoe.id)}
        >
          <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
            {shoe.imageUrl && (
              <img src={shoe.imageUrl} alt={shoe.name} className="w-full h-full object-cover" />
            )}
          </div>
          <div className="ml-3 flex-grow">
            <p className="text-sm font-medium text-gray-900">{shoe.name}</p>
            <p className="text-xs text-gray-500">{shoe.brand} · ${shoe.price}</p>
          </div>
          <div className="text-sm font-medium text-indigo-600">
            View
          </div>
        </div>
      ))}
      <div 
        className="p-2 bg-gray-50 text-center text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer hover:bg-gray-100 transition duration-150"
        onClick={() => navigate(`/shop?search=${results[0]?.name || ''}`)}
      >
        See all results
      </div>
    </div>
  );
};

export default SearchSuggestions;
