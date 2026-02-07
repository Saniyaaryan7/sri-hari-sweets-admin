import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AdminProfileCard from "./AdminProfileCard";


import {
  LayoutGrid,
  Cake,
  Layers,
  BarChart2,
  LogOut,
  Globe,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ open, setOpen }) {
  const closeSidebar = () => setOpen(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();               // clear auth context + localStorage
    closeSidebar();         // close sidebar (mobile only)
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/*------------------------ Sidebar ------------------------ */}
      <aside
        className={`fixed md:sticky md:top-0 left-0 z-40
        w-64 h-screen bg-[#1F4E5F] text-white text-sm font-semibold
        hover:font-bold hover:text-white
        flex flex-col transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* ================ Profile ==============*/}
      
<AdminProfileCard user={user} />

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          <MenuItem
            to="/admin/dashboard"
            icon={LayoutGrid}
            text="Dashboard"
            onClick={closeSidebar}
          />

          <MenuItem
            to="/admin/cakes"
            icon={Cake}
            text="Cakes"
            onClick={closeSidebar}
          />

          <MenuItem
            to="/admin/super-category"
            icon={Layers}
            text="Super Category"
            onClick={closeSidebar}
          />

          <MenuItem
            to="/admin/category"
            icon={BarChart2}
            text="Category"
            onClick={closeSidebar}
          />

          {/*  Website View */}
          <MenuItem
            to="/app"
            icon={Globe}
            text="Website View"
            onClick={closeSidebar}
          />
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-white/80 hover:text-white transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

/* Reusable Menu Item */
function MenuItem({ to, icon: Icon, text, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `relative flex items-center gap-3 px-5 py-3 text-sm rounded-lg
        transition-all duration-300
        ${
          isActive
            ? "bg-[#EAF4F6] text-[#1F4E5F] font-semibold shadow-md"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      <Icon size={18} />
      <span>{text}</span>
    </NavLink>
  );
}
