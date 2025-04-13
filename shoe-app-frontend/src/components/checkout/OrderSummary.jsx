// src/components/checkout/OrderSummary.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const OrderSummary = () => {
  const { cart } = useCart();
  
  // Calculate tax and total
  const tax = cart.totalPrice * 0.1;
  const total = cart.totalPrice + tax;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      {/* Items */}
      <div className="space-y-4 mb-6">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={item.shoe.imageUrl || 'https://via.placeholder.com/50x50?text=No+Image'}
                alt={item.shoe.name}
                className="w-12 h-12 object-cover rounded mr-3"
              />
              <div>
                <h3 className="text-sm font-medium">{item.shoe.name}</h3>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity} {item.size && `• Size: ${item.size}`}
                </p>
              </div>
            </div>
            <span className="text-sm font-medium">
              ${(item.shoe.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      
      {/* Price Breakdown */}
      <div className="space-y-2 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>${cart.totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-base pt-2 border-t border-gray-200 mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Back to Cart Link */}
      <div className="mt-6">
        <Link
          to="/cart"
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center"
        >
          ← Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
