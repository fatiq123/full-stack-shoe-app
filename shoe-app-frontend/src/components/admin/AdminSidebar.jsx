// src/components/admin/AdminSidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    ShoppingBagIcon,
    UsersIcon,
    ChartBarIcon,
    CogIcon,
} from '@heroicons/react/outline';

const AdminSidebar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const menuItems = [
        {
            name: 'Dashboard',
            path: '/admin',
            icon: HomeIcon,
        },
        {
            name: 'Products',
            path: '/admin/products',
            icon: ShoppingBagIcon,
        },
        {
            name: 'Orders',
            path: '/admin/orders',
            icon: ShoppingBagIcon,
        },
        {
            name: 'Users',
            path: '/admin/users',
            icon: UsersIcon,
        },
        {
            name: 'Analytics',
            path: '/admin/analytics',
            icon: ChartBarIcon,
        },
        {
            name: 'Settings',
            path: '/admin/settings',
            icon: CogIcon,
        },
    ];

    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen">
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                <nav>
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded transition ${
                                        isActive(item.path)
                                            ? 'bg-gray-700 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    <item.icon className="h-6 w-6" />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default AdminSidebar;