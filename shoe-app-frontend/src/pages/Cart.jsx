// src/pages/Cart.jsx
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {useCart} from '../hooks/useCart';
import toast from 'react-hot-toast';
const defaultShoeImage = 'https://placehold.co/400x400?text=Shoe+Image';

const Cart = () => {
    const {cart, loading, updateCartItem, removeFromCart, clearCart} = useCart();
    const navigate = useNavigate();

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        updateCartItem(itemId, newQuantity);
    };

    const handleRemoveItem = (itemId) => {
        removeFromCart(itemId);
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            clearCart();
        }
    };

    const handleCheckout = () => {
        if (cart.items.length === 0) {
            toast.error('Your cart is empty');
            return;
        }
        navigate('/checkout');
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header/>
                <main className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </main>
                <Footer/>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>

            <main className="flex-grow py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

                    {cart.items.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
                            <p className="text-gray-600 mb-6">
                                Looks like you haven't added any items to your cart yet.
                            </p>
                            <Link
                                to="/shop"
                                className="bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-md text-sm font-medium transition"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <ul className="divide-y divide-gray-200">
                                        {cart.items.map((item) => (
                                            <li key={item.id} className="px-6 py-4">
                                                <div className="flex flex-col sm:flex-row sm:items-center">
                                                    <div className="sm:flex-shrink-0">
                                                        <img
                                                            src={item.shoeImageUrl || defaultShoeImage}
                                                            alt={item.shoeName}
                                                            className="h-24 w-24 object-cover rounded-md"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = defaultShoeImage;
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                                                        <div className="flex flex-col sm:flex-row sm:justify-between">
                                                            <div>
                                                                <h3 className="text-lg font-medium text-gray-900">
                                                                    {item.shoeName}
                                                                </h3>
                                                                <p className="mt-1 text-sm text-gray-500">
                                                                    {item.shoeBrand}
                                                                </p>
                                                                <div
                                                                    className="mt-1 flex items-center text-sm text-gray-500">
                                                                    <span>Size: {item.shoeSize}</span>
                                                                    <span className="mx-2">•</span>
                                                                    <span>Color: {item.shoeColor}</span>
                                                                </div>
                                                            </div>

                                                            <div className="mt-4 sm:mt-0">
                                                                <p className="text-lg font-medium text-gray-900">
                                                                    ${(item.shoePrice * item.quantity).toFixed(2)}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    ${item.shoePrice.toFixed(2)} each
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 flex justify-between items-center">
                                                            <div className="flex items-center">
                                                                <button
                                                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                                    className="text-gray-500 focus:outline-none focus:text-gray-600"
                                                                >
                                                                    <svg className="h-5 w-5" fill="none"
                                                                         strokeLinecap="round" strokeLinejoin="round"
                                                                         strokeWidth="2" viewBox="0 0 24 24"
                                                                         stroke="currentColor">
                                                                        <path
                                                                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                                    </svg>
                                                                </button>
                                                                <span
                                                                    className="mx-2 text-gray-700">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                                    className="text-gray-500 focus:outline-none focus:text-gray-600"
                                                                >
                                                                    <svg className="h-5 w-5" fill="none"
                                                                         strokeLinecap="round" strokeLinejoin="round"
                                                                         strokeWidth="2" viewBox="0 0 24 24"
                                                                         stroke="currentColor">
                                                                        <path
                                                                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                                    </svg>
                                                                </button>
                                                            </div>

                                                            <button
                                                                onClick={() => handleRemoveItem(item.id)}
                                                                className="text-sm font-medium text-red-600 hover:text-red-500"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="px-6 py-4 bg-gray-50">
                                        <button
                                            onClick={handleClearCart}
                                            className="text-sm font-medium text-red-600 hover:text-red-500"
                                        >
                                            Clear Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div>
                                <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                                    <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <p className="text-gray-600">Subtotal</p>
                                            <p className="text-gray-900">${cart.totalPrice.toFixed(2)}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <p className="text-gray-600">Shipping</p>
                                            <p className="text-gray-900">Free</p>
                                        </div>

                                        <div className="border-t border-gray-200 pt-4 flex justify-between">
                                            <p className="text-lg font-medium text-gray-900">Total</p>
                                            <p className="text-lg font-medium text-gray-900">${cart.totalPrice.toFixed(2)}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        className="mt-6 w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-md text-sm font-medium transition"
                                    >
                                        Proceed to Checkout
                                    </button>

                                    <div className="mt-4 text-center">
                                        <Link to="/shop" className="text-sm text-gray-600 hover:text-gray-900">
                                            or Continue Shopping
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default Cart;