import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const {login, loading} = useAuth();
    const onclick = () => {
        login("admin");
        navigate("/admin", { replace: true });
    }
     const onSetRole = () => {
    }
    return (
        <div>
            <h1>Login</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={onSetRole}>Set Role</button>
            <button onClick={onclick}>Login</button>
        </div>
    );
};

export default Login;