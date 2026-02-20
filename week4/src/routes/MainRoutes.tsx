import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Admin from '../pages/Admin';
import Login from '../pages/Login';
import Unauthorized from '../pages/Unauthorized';
import ProtectedRoute from './ProtectedRoutes';
import RoleRoute from './RoleRoute';


export const MainRoutes = () => {
    return (
        <Routes>
            {/* 🌐 Public */}
            <Route path="/" element={<Login />} />

            {/* 🔐 Auth required */}
            <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />

                {/* 👑 Admin only */}
                <Route element={<RoleRoute allowedRoles={["admin"]} />}>
                    <Route path="/admin" element={<Admin />} />
                </Route>
            </Route>
        </Routes>
    );
};