// src/components/home/FeaturedProducts.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShoeService from '../../services/shoe.service';
import ShoeCard from '../shop/ShoeCard';
import LoadingSpinner from '../common/LoadingSpinner';

const FeaturedProducts = () => {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchFeaturedShoes = async () => {
      try {
        setLoading(true);
        const allShoes = await ShoeService.getAllShoes();
        
        // For demo purposes, we'll just take the first 4 shoes as "featured"
        // In a real app, you might have a "featured" flag in your API
        const featuredShoes = allShoes.slice(0, 4);
        setShoes(featuredShoes);
      } catch (error) {
        console.error('Error fetching featured shoes:', error);
        setError('Failed to load featured products');
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedShoes();
  }, []);
  
  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
            <p className="mt-4 text-lg text-gray-500">Check out our most popular shoes</p>
          </div>
          <div className="flex justify-center mt-8">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
            <p className="mt-4 text-lg text-gray-500">Check out our most popular shoes</p>
          </div>
          <div className="mt-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
          <p className="mt-4 text-lg text-gray-500">Check out our most popular shoes</p>
        </div>
        
        <div className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shoes.map((shoe) => (
              <ShoeCard key={shoe.id} shoe={shoe} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
