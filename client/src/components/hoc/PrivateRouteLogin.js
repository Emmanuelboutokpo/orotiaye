import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRouteLogin(props) {
    const token = localStorage.getItem("token");

    return   token ? <Navigate to="/" /> : <Outlet />
}

export default PrivateRouteLogin;