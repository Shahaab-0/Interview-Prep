import React from 'react';
import { useAuth } from '../context/AuthContext';

const Unauthorized: React.FC = () => {
     const {login, loading} = useAuth();
    return (
        <div>
            <h1>Unauthorized</h1>
            <p>You do not have permission to access this page.</p>
        </div>
    );
};

export default Unauthorized;