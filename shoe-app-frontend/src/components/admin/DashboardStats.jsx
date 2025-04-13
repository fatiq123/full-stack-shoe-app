// src/components/admin/DashboardStats.jsx
import React from 'react';
import { FaShoppingBag, FaUsers, FaMoneyBillWave, FaBoxOpen } from 'react-icons/fa';

const DashboardStats = ({ stats }) => {
  const { totalOrders, totalRevenue, totalProducts, totalCustomers } = stats;
  
  const statCards = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: <FaShoppingBag className="text-blue-500" size={24} />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: <FaMoneyBillWave className="text-green-500" size={24} />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Products',
      value: totalProducts,
      icon: <FaBoxOpen className="text-purple-500" size={24} />,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Total Customers',
      value: totalCustomers,
      icon: <FaUsers className="text-orange-500" size={24} />,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <div 
          key={index} 
          className={`${stat.bgColor} rounded-lg shadow-sm p-6 flex items-center`}
        >
          <div className="p-3 rounded-full mr-4">
            {stat.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
