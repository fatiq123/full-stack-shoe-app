// src/components/shop/ShoeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const ShoeCard = ({ shoe }) => {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) {
      toast.error('Please login to add items to cart');
      return;
    }
    
    addToCart(shoe.id, 1);
  };

  return (
    <Link to={`/shoes/${shoe.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={shoe.imageUrl || 'https://via.placeholder.com/300x300?text=No+Image'} 
            alt={shoe.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            {shoe.discount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {shoe.discount}% OFF
              </span>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {shoe.name}
            </h3>
            <span className="text-sm text-gray-500">{shoe.brand}</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{shoe.description}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {shoe.discount > 0 ? (
                <>
                  <span className="text-lg font-bold text-gray-900">
                    ${(shoe.price * (1 - shoe.discount / 100)).toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${shoe.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  ${shoe.price.toFixed(2)}
                </span>
              )}
            </div>
            
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
              aria-label="Add to cart"
            >
              <FaShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShoeCard;
