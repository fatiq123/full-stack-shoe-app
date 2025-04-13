// src/components/cart/CartItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../../hooks/useCart';

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItem(item.id, newQuantity);
  };
  
  const handleRemove = () => {
    removeFromCart(item.id);
  };
  
  return (
    <div className="flex flex-col sm:flex-row items-center py-4 border-b border-gray-200">
      {/* Product Image */}
      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0">
        <Link to={`/shoes/${item.shoe.id}`}>
          <img 
            src={item.shoe.imageUrl || 'https://via.placeholder.com/100x100?text=No+Image'} 
            alt={item.shoe.name} 
            className="w-full h-full object-cover object-center rounded"
          />
        </Link>
      </div>
      
      {/* Product Details */}
      <div className="flex-1 px-4">
        <Link to={`/shoes/${item.shoe.id}`} className="text-lg font-medium text-gray-800 hover:text-blue-600">
          {item.shoe.name}
        </Link>
        <p className="text-sm text-gray-500">{item.shoe.brand}</p>
        <p className="text-sm text-gray-500">Size: {item.size || 'Standard'}</p>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center space-x-2 my-4 sm:my-0">
        <button 
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
          disabled={item.quantity <= 1}
        >
          <FaMinus size={12} />
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button 
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          <FaPlus size={12} />
        </button>
      </div>
      
      {/* Price */}
      <div className="text-right sm:w-24 font-medium text-gray-900">
        ${(item.shoe.price * item.quantity).toFixed(2)}
      </div>
      
      {/* Remove Button */}
      <button 
        onClick={handleRemove}
        className="ml-4 p-2 text-gray-500 hover:text-red-500"
        aria-label="Remove item"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
