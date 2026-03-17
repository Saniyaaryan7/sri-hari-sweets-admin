import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MessageModal from "../../components/admin/MessageModal";
import {
  Lock,
  Eye,
  EyeOff,
  X,
  Loader2,
  ShieldCheck
} from "lucide-react";

export default function ChangePassword() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [modal, setModal] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: ""
  });

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.currentPassword) newErrors.currentPassword = "Required";
    if (!formData.newPassword) {
      newErrors.newPassword = "Required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Min 6 characters";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const result = await updateProfile(user.id, {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword
    });

    if (result.success) {
      setModal({
        isOpen: true,
        type: "success",
        title: "Success",
        message: "Your password has been changed successfully. You can continue using your new password."
      });
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      setModal({
        isOpen: true,
        type: "error",
        title: "Update Failed",
        message: result.message
      });
    }
    setLoading(false);
  };

  return (
    <main className="flex-1 bg-[#EFE6E2] p-4 flex items-center justify-center min-h-[calc(100vh-64px)] overflow-y-auto">
      <div className="w-full max-w-md animate-in slide-in-from-bottom-4 duration-500">
        
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-white/20">
          
          <div className="bg-[#1f4e5f] p-8 text-white relative">
            <button
               onClick={() => navigate("/admin/profile")}
               className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <Lock size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center">Security</h1>
            <p className="text-center text-white/70 text-sm mt-1">Change your account password</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* Current Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Current Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1F4E5F] transition-colors">
                  <ShieldCheck size={18} />
                </div>
                <input
                  type={showCurrent ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full bg-gray-50 border-2 rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:bg-white transition-all ${
                    errors.currentPassword ? "border-red-300 focus:border-red-500" : "border-transparent focus:border-[#1F4E5F]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.currentPassword && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.currentPassword}</p>}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                New Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1F4E5F] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showNew ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  className={`w-full bg-gray-50 border-2 rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:bg-white transition-all ${
                    errors.newPassword ? "border-red-300 focus:border-red-500" : "border-transparent focus:border-[#1F4E5F]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.newPassword}</p>}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Confirm New Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1F4E5F] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  className={`w-full bg-gray-50 border-2 rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:bg-white transition-all ${
                    errors.confirmPassword ? "border-red-300 focus:border-red-500" : "border-transparent focus:border-[#1F4E5F]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1F4E5F] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#1F4E5F]/30 hover:bg-[#163a47] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {loading && <Loader2 size={20} className="animate-spin" />}
              {loading ? "Updating..." : "Change Password"}
            </button>
          </form>

          <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-center">
            <button
              onClick={() => navigate("/admin/profile")}
              className="text-sm font-bold text-[#1F4E5F] hover:underline"
            >
              Back to Profile
            </button>
          </div>
        </div>
      </div>

      <MessageModal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={() => setModal({ ...modal, isOpen: false })}
      />
    </main>
  );
}
