// src/components/shop/ShoeGrid.jsx
import React from 'react';
import ShoeCard from './ShoeCard';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';
import { FaSearch } from 'react-icons/fa';

const ShoeGrid = ({ shoes, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (!shoes || shoes.length === 0) {
    return (
      <EmptyState
        title="No shoes found"
        message="We couldn't find any shoes matching your criteria. Try adjusting your filters or search terms."
        actionText="Clear Filters"
        actionLink="/shop"
        icon={<FaSearch size={48} />}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {shoes.map((shoe) => (
        <ShoeCard key={shoe.id} shoe={shoe} />
      ))}
    </div>
  );
};

export default ShoeGrid;
