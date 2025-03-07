import React from "react";
import { useDispatch } from "react-redux";
import { sideBarStatus } from "../redux/authSlice.js";
import { Menu } from "lucide-react";

const Navbar = () => {
    const dispatch = useDispatch();

    return (
        <div className="flex justify-between items-center py-2 px-4 bg-slate-200 text-2xl z-50">
            <h1>Dashboard User 🎯</h1>
            <Menu className="cursor-pointer" onClick={() => dispatch(sideBarStatus())} />
        </div>
    );
};

export default Navbar;
