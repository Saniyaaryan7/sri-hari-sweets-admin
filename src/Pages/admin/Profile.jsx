import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  Mail,
  Shield,
  Camera,
  Eye,
  EyeOff,
  X,
} from "lucide-react";


export default function AdminProfile() {
  const { user } = useAuth();

  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "Admin",
    email: user?.email || "admin@gmail.com",
    role: user?.role || "Administrator",
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleSave = () => {
    alert("Profile updated (demo)");
    setEdit(false);
  };

  return (
   
    <main
      className={`
        flex-1 bg-[#EFE6E2] px-4 py-6
        ${edit ? "overflow-y-auto" : "flex justify-center"}
      `}
    >
      {/* wrapper to control centering */}
      <div
        className={`
          w-full max-w-2xl
          ${edit ? "mx-auto" : "my-auto"}
        `}
      >
        {/* PROFILE CARD */}
        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
          
          {/* CLOSE */}
          <button
            onClick={() => window.history.back()}
            className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full
                       bg-white flex items-center justify-center shadow"
          >
            <X size={16} />
          </button>

          {/* HEADER */}
          <div className="bg-[#1f4e5f] text-white flex flex-col items-center py-6">
            <div className="relative bg-white p-1.5 rounded-full">
              <img
                src={
                  image ||
                  `https://ui-avatars.com/api/?name=${formData.name}&background=ffffff&color=1F4E5F`
                }
                alt="profile"
                className="w-20 h-20 rounded-full"
              />

                  {/* CAMERA */}
              <label className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow cursor-pointer">
                <Camera size={12} className="text-[#1F4E5F]" />
                <input type="file" hidden onChange={handleImageChange} />
              </label>
            </div>

            <h2 className="mt-2 text-lg font-semibold">{formData.name}</h2>
            <p className="text-xs opacity-80">Administrator</p>
          </div>

          {/* BODY */}
          <div className="p-5 space-y-4">

            {/* NAME */}
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              {edit ? (
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              ) : (
                <div className="flex items-center gap-2 mt-1 bg-gray-50 border rounded-lg px-3 py-2">
                  <User size={16} />
                  {formData.name}
                </div>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-500">Email</label>
              {edit ? (
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              ) : (
                <div className="flex items-center gap-2 mt-1 bg-gray-50 border rounded-lg px-3 py-2">
                  <Mail size={16} />
                  {formData.email}
                </div>
              )}
            </div>

            {/* ROLE */}
            <div>
              <label className="text-sm text-gray-500">Role</label>
              {edit ? (
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                >
                  <option>Administrator</option>
                  <option>Manager</option>
                  <option>Staff</option>
                </select>
              ) : (
                <div className="flex items-center gap-2 mt-1 bg-gray-50 border rounded-lg px-3 py-2">
                  <Shield size={16} />
                  {formData.role}
                </div>
              )}
            </div>

            {/* PASSWORD*/}
            {edit && (
              <>
                <h3 className="text-sm font-semibold text-gray-600 mt-2">
                  Change Password
                </h3>

            {/* CURRENT PASSWORD  */}
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    name="currentPassword"
                    placeholder="Current Password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>


                {/* NEW PASSWORD  */}
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* ACTIONS */}
          <div className="px-5 py-4 border-t flex gap-3">
            {edit ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 rounded-lg bg-[#1F4E5F] text-white"
                >
                  Save
                </button>
                <button
                  onClick={() => setEdit(false)}
                  className="px-5 py-2 rounded-lg border"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEdit(true)}
                className="px-5 py-2 rounded-lg bg-[#1F4E5F] text-white"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
