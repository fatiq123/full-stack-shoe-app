// src/components/admin/Analytics.jsx
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Analytics = ({ statistics }) => {
    const {
        totalRevenue,
        totalOrders,
        pendingOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,
        ordersByDate,
    } = statistics;

    // Prepare data for the line chart
    const chartData = {
        labels: Object.keys(ordersByDate),
        datasets: [
            {
                label: 'Orders',
                data: Object.values(ordersByDate),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Orders Over Time',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Revenue</h3>
                    <p className="text-3xl font-bold text-green-600">
                        ${totalRevenue.toFixed(2)}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Orders</h3>
                    <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Average Order Value
                    </h3>
                    <p className="text-3xl font-bold text-purple-600">
                        ${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'}
                    </p>
                </div>
            </div>

            {/* Order Status Breakdown */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Processing</p>
                        <p className="text-2xl font-bold text-blue-600">{processingOrders}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Shipped</p>
                        <p className="text-2xl font-bold text-purple-600">{shippedOrders}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Delivered</p>
                        <p className="text-2xl font-bold text-green-600">{deliveredOrders}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Cancelled</p>
                        <p className="text-2xl font-bold text-red-600">{cancelledOrders}</p>
                    </div>
                </div>
            </div>

            {/* Orders Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default Analytics;