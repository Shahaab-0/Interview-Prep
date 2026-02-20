import React from 'react';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
    const {login, loading} = useAuth();
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-gray-600 text-sm font-medium">Total Users</h2>
                        <p className="text-3xl font-bold text-gray-900 mt-2">1,234</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-gray-600 text-sm font-medium">Total Orders</h2>
                        <p className="text-3xl font-bold text-gray-900 mt-2">567</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-gray-600 text-sm font-medium">Revenue</h2>
                        <p className="text-3xl font-bold text-gray-900 mt-2">$89,234</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                    </div>
                    <div className="p-6 text-gray-600">
                        <p>No recent activity</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin