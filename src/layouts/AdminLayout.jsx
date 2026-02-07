import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/sidebar";
import Topbar from "../components/admin/Topbar";
import { useState } from "react";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin flex h-screen bg-[#F6F8FA] overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Right Side */}
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar toggle={() => setOpen(true)} />

          {/* Main Content */}
        <Outlet />

      </div>
    </div>
  );
}
