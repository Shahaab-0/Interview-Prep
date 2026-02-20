import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Home() {
     const {login, loading} = useAuth();
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <header className="bg-white shadow">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">My App</h1>
                </nav>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <section className="text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Welcome Home
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        This is your home page
                    </p>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg">
                        Get Started
                    </button>
                </section>
            </main>
        </div>
    );
}