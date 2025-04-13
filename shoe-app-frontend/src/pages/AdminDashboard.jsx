// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import OrderService from '../services/order.service';
import ShoeService from '../services/shoe.service';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [timeframe, setTimeframe] = useState('week');
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
      return;
    }
    fetchData();
  }, [isAdmin, navigate, timeframe]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'orders') {
        const ordersData = await OrderService.getUserOrders();
        setOrders(ordersData);
        const statsData = await OrderService.getOrderStatistics(timeframe);
        setStatistics(statsData);
      } else if (activeTab === 'products') {
        const shoesData = await ShoeService.getAllShoes();
        setShoes(shoesData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await OrderService.updateOrderStatus(orderId, status);
      toast.success('Order status updated successfully');
      fetchData();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const handleTrackingUpdate = async (orderId, trackingNumber) => {
    try {
      await OrderService.updateTrackingNumber(orderId, trackingNumber);
      toast.success('Tracking number updated successfully');
      fetchData();
    } catch (error) {
      console.error('Error updating tracking number:', error);
      toast.error('Failed to update tracking number');
    }
  };

  const handleDeleteShoe = async (shoeId) => {
    if (window.confirm('Are you sure you want to delete this shoe?')) {
      try {
        await ShoeService.deleteShoe(shoeId);
        toast.success('Shoe deleted successfully');
        fetchData();
      } catch (error) {
        console.error('Error deleting shoe:', error);
        toast.error('Failed to delete shoe');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'orders'
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'products'
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Products
            </button>
          </nav>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            {activeTab === 'orders' && (
              <div>
                {/* Statistics Section */}
                {statistics && (
                  <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
                      <p className="text-3xl font-bold">{statistics.totalOrders}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
                      <p className="text-3xl font-bold">${statistics.totalRevenue.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold mb-2">Average Order Value</h3>
                      <p className="text-3xl font-bold">${statistics.averageOrderValue.toFixed(2)}</p>
                    </div>
                  </div>
                )}

                {/* Orders Table */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{order.customerName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                              className="rounded border-gray-300 focus:border-black focus:ring-black"
                            >
                              <option value="PENDING">Pending</option>
                              <option value="PROCESSING">Processing</option>
                              <option value="SHIPPED">Shipped</option>
                              <option value="DELIVERED">Delivered</option>
                              <option value="CANCELLED">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              placeholder="Tracking #"
                              value={order.trackingNumber || ''}
                              onChange={(e) => handleTrackingUpdate(order.id, e.target.value)}
                              className="rounded border-gray-300 focus:border-black focus:ring-black mr-2"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <div className="mb-4">
                  <button
                    onClick={() => navigate('/admin/products/new')}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                  >
                    Add New Product
                  </button>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Image
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Brand
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {shoes.map((shoe) => (
                        <tr key={shoe.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <img
                              src={shoe.imageUrl}
                              alt={shoe.name}
                              className="h-12 w-12 object-cover rounded"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{shoe.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{shoe.brand}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ${shoe.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{shoe.stock}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => navigate(`/admin/products/${shoe.id}/edit`)}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteShoe(shoe.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;