import React from "react";
import { useNavigate, useLocation } from "react-router-dom";


export default function Topbar({ toggle }) {
  const navigate = useNavigate();
  const location = useLocation();

  const showBack = location.pathname !== "/admin/dashboard";

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-4 sm:px-6">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* Mobile menu */}
        <button
          onClick={toggle}
          className="md:hidden bg-transparent p-0 border-none"
        >
          <img
            src="/assets/icons/hamburger.svg"
            alt="menu"
            loading="eager"
            decoding="async"
            className="w-6 h-6"
          />
        </button>

        <h2 className="text-lg sm:text-xl font-semibold text-[#4B2E39]">
          Admin Dashboard
        </h2>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <span className="hidden sm:block">Admin</span>
        <div className="w-9 h-9 bg-[#1F4E5F] text-white rounded-full flex items-center justify-center">
          A
        </div>
      </div>
    </header>
  );
}
