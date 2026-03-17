import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import MessageModal from "../../components/admin/MessageModal";
import {
  User,
  Mail,
  Shield,
  Camera,
  X,
  Lock,
  Loader2
} from "lucide-react";


export default function AdminProfile() {
  const { user, updateProfile } = useAuth();
  const { uploadImage } = useAppContext();
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [loading, setLoading] = useState(false);
  
  const [modal, setModal] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: ""
  });

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    image: user?.image || ""
  });

  // Keep form in sync with user context
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image
      }));
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    
    let finalImageUrl = formData.image;

    if (imageFile) {
      try {
        finalImageUrl = await uploadImage(imageFile);
      } catch (error) {
        setModal({
          isOpen: true,
          type: "error",
          title: "Upload Failed",
          message: "Could not upload profile picture. Please try again."
        });
        setLoading(false);
        return;
      }
    }

    const updateData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      image: finalImageUrl
    };

    const result = await updateProfile(user.id, updateData);
    
    if (result.success) {
      setModal({
        isOpen: true,
        type: "success",
        title: "Success",
        message: "Profile updated successfully!"
      });
      setEdit(false);
      setImageFile(null);
      setFileName("No file chosen");
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
                  className="w-full mt-1 border rounded-lg px-3 py-2 bg-white"
                >
                  <option>admin</option>
                  <option>manager</option>
                  <option>staff</option>
                </select>
              ) : (
                <div className="flex items-center gap-2 mt-1 bg-gray-50 border rounded-lg px-3 py-2">
                  <Shield size={16} />
                  {formData.role}
                </div>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="px-5 py-4 border-t flex flex-wrap gap-3">
            {edit ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-2 rounded-xl bg-[#1F4E5F] text-white flex items-center gap-2 hover:bg-[#163a47] transition-all font-semibold shadow-lg shadow-[#1F4E5F]/20 disabled:opacity-70"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => setEdit(false)}
                  className="px-6 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all font-semibold"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEdit(true)}
                  className="px-6 py-2 rounded-xl bg-[#1F4E5F] text-white font-semibold hover:bg-[#163a47] transition-all shadow-lg shadow-[#1F4E5F]/20"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate("/admin/change-password")}
                  className="px-6 py-2 rounded-xl border border-[#1F4E5F] text-[#1F4E5F] font-semibold hover:bg-[#1F4E5F]/5 transition-all flex items-center gap-2"
                >
                  <Lock size={16} />
                  Change Password
                </button>
              </>
            )}
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
