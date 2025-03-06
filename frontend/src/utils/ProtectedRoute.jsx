import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ProtectedRoute = () => {
    const user = window.localStorage.getItem("user");
    const token = window.localStorage.getItem("token");
    const sidebarOpen = useSelector((state) => state.user.sideBarStatus);

    return user && token ? (
        <div className="flex">
            <Sidebar />
            <div
                className={`transition-all duration-300 ${
                    sidebarOpen ? "ml-48 w-[calc(100%-12rem)]" : "w-full"
                }`}
            >
                <Navbar />
                <Outlet />
            </div>
        </div>
    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedRoute;
