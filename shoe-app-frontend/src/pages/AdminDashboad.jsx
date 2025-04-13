// src/pages/AdminDashboard.jsx
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ShoeService from '../services/shoe.service';
import OrderService from '../services/order.service';
import ShoeForm from '../components/admin/ShoeForm';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [shoes, setShoes] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                if (activeTab === 'products') {
                    const shoesData = await ShoeService.getAllShoes();
                    setShoes(shoesData);
                } else if (activeTab === 'orders') {
                    const ordersData = await OrderService.getUserOrders();
                    setOrders(ordersData);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activeTab]);

    const handleDeleteShoe = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            await ShoeService.deleteShoe(id);
            setShoes(shoes.filter(shoe => shoe.id !== id));
            toast.success('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting shoe:', error);
            toast.error('Failed to delete product');
        }
    };

    const handleUpdateOrderStatus = async (id, status) => {
        try {
            await OrderService.updateOrderStatus(id, status);
            setOrders(orders.map(order =>
                order.id === id ? {...order, status} : order
            ));
            toast.success('Order status updated');
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Failed to update order status');
        }
    };

    const handleAddShoe = async (shoeData, imageFile) => {
        try {
            await ShoeService.createShoe(shoeData, imageFile);
            toast.success('Product added successfully');
            setShowAddForm(false);

            // Refresh products
            const shoesData = await ShoeService.getAllShoes();
            setShoes(shoesData);
        } catch (error) {
            console.error('Error adding shoe:', error);
            toast.error('Failed to add product');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>

            <main className="flex-grow py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 mb-8">
                        <button
                            className={`py-4 px-6 text-center ${
                                activeTab === 'products'
                                    ? 'border-b-2 border-black font-medium text-black'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab('products')}
                        >
                            Products
                        </button>
                        <button
                            className={`py-4 px-6 text-center ${
                                activeTab === 'orders'
                                    ? 'border-b-2 border-black font-medium text-black'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab('orders')}
                        >
                            Orders
                        </button>
                    </div>

                    {/* Content */}
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    ) : (
                        <>
                            {/* Products Tab */}
                            {activeTab === 'products' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold">All Products</h2>
                                        <button
                                            onClick={() => setShowAddForm(!showAddForm)}
                                            className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
                                        >
                                            {showAddForm ? 'Cancel' : 'Add New Product'}
                                        </button>
                                    </div>

                                    {showAddForm && (
                                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                                            <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
                                            <ShoeForm onSubmit={handleAddShoe}/>
                                        </div>
                                    )}

                                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Product
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Price
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Category
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
                                                {shoes.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="5"
                                                            className="px-6 py-4 text-center text-sm text-gray-500">
                                                            No products found.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    shoes.map((shoe) => (
                                                        <tr key={shoe.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="h-10 w-10 flex-shrink-0">
                                                                        {shoe.imageUrl ? (
                                                                            <img
                                                                                className="h-10 w-10 rounded-full object-cover"
                                                                                src={shoe.imageUrl}
                                                                                alt={shoe.name}
                                                                            />
                                                                        ) : (
                                                                            <div
                                                                                className="h-10 w-10 rounded-full bg-gray-200"></div>
                                                                        )}
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <div
                                                                            className="text-sm font-medium text-gray-900">
                                                                            {shoe.name}
                                                                        </div>
                                                                        <div className="text-sm text-gray-500">
                                                                            {shoe.brand}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                ${shoe.price.toFixed(2)}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {shoe.category}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                          shoe.stock > 0
                                              ? shoe.stock < 5
                                                  ? 'bg-yellow-100 text-yellow-800'
                                                  : 'bg-green-100 text-green-800'
                                              : 'bg-red-100 text-red-800'
                                      }`}>
                                    {shoe.stock}
                                  </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <Link
                                                                    to={`/shoes/${shoe.id}`}
                                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                                >
                                                                    View
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleDeleteShoe(shoe.id)}
                                                                    className="text-red-600 hover:text-red-900"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Orders Tab */}
                            {activeTab === 'orders' && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-6">All Orders</h2>

                                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div className="overflow-x-auto">
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
                                                        Date
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Total
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                {orders.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="6"
                                                            className="px-6 py-4 text-center text-sm text-gray-500">
                                                            No orders found.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    orders.map((order) => (
                                                        <tr key={order.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                #{order.id}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {order.username}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {new Date(order.orderDate).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                ${order.totalAmount.toFixed(2)}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                          order.status === 'DELIVERED'
                                              ? 'bg-green-100 text-green-800'
                                              : order.status === 'CANCELLED'
                                                  ? 'bg-red-100 text-red-800'
                                                  : 'bg-yellow-100 text-yellow-800'
                                      }`}>
                                    {order.status}
                                  </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <select
                                                                    value={order.status}
                                                                    onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                                                    className="block w-full px-2 py-1 text-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                                                                >
                                                                    <option value="PENDING">PENDING</option>
                                                                    <option value="PROCESSING">PROCESSING</option>
                                                                    <option value="SHIPPED">SHIPPED</option>
                                                                    <option value="DELIVERED">DELIVERED</option>
                                                                    <option value="CANCELLED">CANCELLED</option>
                                                                </select>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default AdminDashboard;