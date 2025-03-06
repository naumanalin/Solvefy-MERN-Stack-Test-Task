import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const GuestRoute = () => {
    const user = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('token');

    return user && token ? <Navigate to='/' replace /> : <Outlet/>
}

export default GuestRoute