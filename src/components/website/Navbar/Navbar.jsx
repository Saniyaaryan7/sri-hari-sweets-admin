import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useRef, useEffect } from "react";

import { useAuth } from "../../../context/AuthContext";

import NavLinks from "./NavLink";


import {
  Home,
  Info,
  Phone,
  ShoppingBag,
  LogIn,
  LogOut,
} from "lucide-react";




function Navbar() {
  const [open, setOpen] = useState(false);          
  const [profileOpen, setProfileOpen] = useState(false); // profile dropdown

  const navigate = useNavigate();
  const { user, logout } = useAuth(); // auth state
  const dropdownRef = useRef(null);

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setProfileOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);



  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">

      {/* ================= TOP BAR ================= */}
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center relative">

        {/* LEFT LINKS (desktop) */}
        <div className="hidden md:flex gap-6 font-medium text-black">
          <NavLinks />
        </div>


        {/* CENTER LOGO */}
        <NavLink
          to="/app"
          className="absolute left-1/2 -translate-x-1/2 hidden md:block"
        >
          <img
            src="/assets/logo/logo.webp"
            alt="Sri Hari Sweets"
            className="max-h-16 lg:max-h-20 object-contain"
          />
        </NavLink>


        {/* RIGHT SIDE (desktop) */}
        <div className="hidden md:flex items-center gap-6 ml-auto">

     
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search cakes..."
              className="w-48 px-4 py-2 pr-10 rounded-full border border-black
                         focus:ring-2 focus:ring-gray-400 text-sm  "
            />
            <img
              src="/assets/icons/searchbar.svg"
              alt="Search"
              className="w-4 h-4 absolute right-4 top-1/2  opacity-60  -translate-y-1/2"
            />
          </div>

      
         {/* ================= AUTH UI ================= */}

{!user ? (
  <button
    onClick={() => navigate("/login")}
    className="px-5 py-2 rounded-full
               bg-red-600 text-white font-semibold
               hover:bg-red-700 transition"
  >
    Get Started
  </button>
) : (
 <div className="relative" ref={dropdownRef}>

  {/* PROFILE ICON */}
  <button
    onClick={() => setProfileOpen(!profileOpen)}
    className={`w-10 h-10 flex items-center justify-center
                rounded-full border transition-all
                ${
                  profileOpen
                    ? "bg-red-600 text-white border-red-600"
                    : "border-gray-300 hover:bg-red-600 hover:text-white"
                }`}
  >
    <User size={20} />
  </button>

  {/* DROPDOWN */}
  {profileOpen && (
    <div
      className="absolute right-0 mt-3 w-64
                 bg-white rounded-2xl shadow-xl
                 border border-gray-100
                 overflow-hidden z-50"
    >
      {/* USER INFO */}
      <div className="px-4 py-3 bg-gray-50">
        <p className="text-xs text-gray-500">Signed in as</p>
        <p className="font-semibold text-sm truncate">{user.name}</p>
        <p className="text-xs text-gray-500 truncate">{user.email}</p>
      </div>

      <div className="h-px bg-gray-200" />

      {/* ACTIONS */}
      <button
        onClick={() => {
          setProfileOpen(false);
          navigate("/app/profile");
        }}
        className="w-full px-4 py-3 text-left text-sm
                   hover:bg-red-50 hover:text-red-600 transition"
      >
        My Profile
      </button>

      <button
        onClick={() => {
          setProfileOpen(false);
          logout();
          navigate("/login");
        }}
        className="w-full px-4 py-3 text-left text-sm
                   text-red-600 hover:bg-red-50 transition"
      >
        Logout
      </button>
    </div>
  )}
</div>

)}

</div>

        {/* ================= MOBILE TOP BAR ================= */}
        <div className="flex md:hidden items-center w-full justify-between">

          {/* Hamburger */}
          <button onClick={() => setOpen(true)}>
            <img src="/assets/icons/hamburger.svg" alt="Menu" className="w-7 h-7" />
          </button>

          {/* Logo */}
          <NavLink to="/app">
            <img src="/assets/logo/logo.webp" alt="Logo" className="h-14" />
          </NavLink>

          {/* Shop */}
<button
  onClick={() => navigate("/app/shop")}
  className="p-2 rounded-full hover:bg-gray-100 transition"
>
  <ShoppingBag size={24} className="text-black" />
</button>

        </div>
      </div>

      {/* ================= MOBILE SEARCH ================= */}
      <div className="md:hidden px-4 pb-3 bg-white">
        <div className="flex items-center h-10 border border-gray-800 rounded-xl overflow-hidden">
          <input
            type="text"
            placeholder="Search cakes..."
            className="flex-1 px-4 text-sm outline-none"
          />
          <button className="px-4 bg-red-600 h-full flex items-center">
            <img src="/assets/icons/searchbar.svg" alt="Search" className="w-4 h-4 invert" />
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          open ? "visible" : "invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/30"
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute left-0 top-0 h-full w-72 bg-white
                      transform transition-transform duration-300
                      ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-center py-6 border-b">
            <img src="/assets/logo/logo.webp" alt="Logo" className="h-14" />
          </div>

          {/* ===== MOBILE PROFILE  ===== */}
        
<div className="p-4">

<div className="px-5 py-4 border-b">
  {user ? (
    <>
      {/* LOGGED IN UI */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
          <User size={18} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{user.name}</p>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => {
            setOpen(false);
            navigate("/app/profile");
          }}
          className="flex-1 py-2 text-sm rounded-lg bg-gray-100"
        >
          My Profile
        </button>

        <button
          onClick={() => {
            setOpen(false);
            logout();
            navigate("/login");
          }}
          className="flex-1 py-2 text-sm rounded-lg bg-red-600 text-white"
        >
          Logout
        </button>
      </div>
    </>
  ) : (
    <>
      {/* LOGGED OUT UI */}
      <button
        onClick={() => {
          setOpen(false);
          navigate("/login");
        }}
        className="w-full py-2 rounded-lg bg-red-600 text-white text-sm"
      >
        Login
      </button>
    </>
  )}
</div>


</div>


{/* ================= NAV LINKS ================= */}
<div className="flex flex-col gap-1 px-4 font-medium">
 {[
  { name: "Home", path: "/app", icon: Home, end: true },
  { name: "About", path: "/app/about", icon: Info },
  { name: "Contact", path: "/app/contact", icon: Phone },
  { name: "Shop", path: "/app/shop", icon: ShoppingBag },
].map((item) => {
  const Icon = item.icon;
  return (
    <NavLink
      key={item.path}
      to={item.path}
      end={item.end}   
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition
        ${
          isActive
            ? "bg-red-600 text-white shadow"
            : "text-gray-700 hover:bg-red-50 hover:text-red-600"
        }`
      }
    >
      <Icon size={20} />
      <span>{item.name}</span>
    </NavLink>
  );
})}

</div>

{/* ================= FOOTER ================= */}
<div className="mt-auto px-6 py-4 text-center text-xs text-gray-400">
 @ Sri Hari Sweets
</div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
