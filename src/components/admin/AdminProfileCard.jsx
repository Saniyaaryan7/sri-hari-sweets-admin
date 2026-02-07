import React from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

export default function AdminProfileCard({ user }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/admin/profile")}
      className="px-6 pt-8 pb-6 flex flex-col items-center
                 border-b border-white/20
                 cursor-pointer hover:bg-white/10 transition"
    >
      {/* Avatar Wrapper */}
      <div className="relative">

        {/* Profile avatar image (auto-generated using user name) */}
        <img
          src={`https://ui-avatars.com/api/?name=${user?.name || "Admin"}&background=ffffff&color=1F4E5F`}
          alt="profile"
          className="w-20 h-20 rounded-full border-4 border-white"  // Fixed size, circular shape, and white border
        />

        {/* Edit Pencil  */}
        <div
          className="absolute bottom-0 right-0
                     w-7 h-7 rounded-full
                     bg-black/80
                     flex items-center justify-center
                     border-2 border-white
                     shadow-md"
        >
          <Pencil size={14} className="text-white" />
        </div>
      </div>

      <h3 className="mt-3 font-semibold text-white">
       Admin
      </h3>

      <p className="text-xs text-white/70">
        Administrator
      </p>
    </div>
  );
}
