import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Picture from "./Picture";
import { logout } from "../redux/authSlice";
import { House, User, FileText, MessageSquare, Bell, BarChart2, LogOut, KeyRound  } from 'lucide-react';

const links = [
    { name: 'Home', icon: <House />, url: '/' },
    { name: 'Profile', icon: <User />, url: '/profile' },
    { name: 'File', icon: <FileText />, url: '/' },
    { name: 'Message', icon: <MessageSquare />, url: '/' },
    { name: 'Notification', icon: <Bell />, url: '/' },
    { name: 'Graph', icon: <BarChart2 />, url: '/' },
    { name: 'Chage Password', icon: <KeyRound />, url: '/change/password' }
];

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sidebarOpen = useSelector((state) => state.user.sideBarStatus);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logged out successfully!");
        navigate("/login"); // Redirect to login page
    };

    return (
        <motion.div
            initial={{ x: -250 }}
            animate={{ x: sidebarOpen ? 0 : -250 }}
            transition={{ type: "tween", duration: 0.3 }}
            className={`p-3 bg-[#1C3D64] text-white h-screen w-48 fixed left-0 top-0 transition-all duration-300 flex flex-col items-center gap-6 ${
                sidebarOpen ? "block" : "hidden"
            }`}
        >
            <Picture />
            <div className="text-center w-full break-words overflow-hidden">
                <h2 className="text-2xl uppercase ">{user?.name}</h2>
                <p className="text-gray-400 ">{user?.email}</p>
            </div>
            <ul className="flex flex-col gap-9">
                {links.map((link, index) => (
                    <Link key={index} to={link.url}>
                        <li className="flex items-center gap-5 cursor-pointer hover:font-semibold">
                            {link.icon}
                            <span>{link.name}</span>
                        </li>
                    </Link>
                ))}
                <li onClick={handleLogout} className="flex items-center gap-5 cursor-pointer hover:font-semibold">
                    <LogOut />
                    <span>Logout</span>
                </li>
            </ul>
        </motion.div>
    );
};

export default Sidebar;
