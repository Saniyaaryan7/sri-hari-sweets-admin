import React, { useState } from "react";
import { Plus, Trash2, Image as ImageIcon, CheckCircle2, AlertCircle, X, Loader2 } from "lucide-react";
import { useAppContext } from "../../../context/AppContext";
import ConfirmationModal from "../../../components/admin/ConfirmationModal";

export default function GalleryManagement() {
  const { gallery, addGalleryImage, deleteGalleryImage } = useAppContext();
  const [newImage, setNewImage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState({ isOpen: false, id: null });
  const [feedback, setFeedback] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.path) {
        setNewImage(data.path);
        showFeedback("success", "Image uploaded successfully!");
      } else {
        showFeedback("error", data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      showFeedback("error", "Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newImage) return;
    setSubmitting(true);
    try {
      await addGalleryImage({ image: newImage });
      setNewImage("");
      showFeedback("success", "Image added to gallery!");
    } catch (err) {
      showFeedback("error", "Failed to add image.");
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!showDeleteConfirm.id) return;
    try {
      await deleteGalleryImage(showDeleteConfirm.id);
      showFeedback("success", "Image removed from gallery!");
      setShowDeleteConfirm({ isOpen: false, id: null });
    } catch (err) {
      showFeedback("error", "Failed to delete image.");
      setShowDeleteConfirm({ isOpen: false, id: null });
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#EFE6E2] overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 lg:p-8 pb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-[#4B2E39]">Gallery Management</h1>
          {feedback && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium animate-in fade-in slide-in-from-top-4 ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
              {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {feedback.message}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pt-0 custom-scrollbar">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

          {/* STICKY ADD SECTION */}
          <div className="lg:col-span-1 lg:sticky lg:top-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-4 text-[#1F4E5F] flex items-center gap-2">
                <Plus size={18} />
                Add Image
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1 tracking-wider">Gallery Image</label>

                  {/* Preview Area */}
                  <div className="relative aspect-square rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden group">
                    {newImage ? (
                      <>
                        <img src={newImage} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => setNewImage("")}
                            className="bg-white text-red-600 p-2 rounded-xl shadow-lg"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                        <ImageIcon size={32} />
                        <span className="text-[10px] font-bold">PREVIEW</span>
                      </div>
                    )}

                    {uploading && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                        <div className="w-8 h-8 border-4 border-[#1F4E5F] border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-[10px] font-bold text-[#1F4E5F]">UPLOADING...</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Trigger */}
                  <label className="block cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                    <div className="w-full bg-[#1F4E5F]/5 text-[#1F4E5F] py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#1F4E5F]/10 transition-colors border border-[#1F4E5F]/10">
                      <ImageIcon size={18} />
                      CHOOSE FROM PC
                    </div>
                  </label>


                </div>
                <button
                  type="submit"
                  disabled={!newImage || uploading || submitting}
                  className="w-full bg-[#1F4E5F] text-white py-3 rounded-xl font-bold hover:bg-[#163a47] transition shadow-md active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus size={20} />
                      Add to Gallery
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* GALLERY GRID - SCROLLABLE */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {gallery.length === 0 && (
                  <div className="col-span-full py-20 text-center text-gray-400 font-medium">
                    No gallery images yet.
                  </div>
                )}
                {gallery.map((item) => (
                  <div key={item.id} className="group relative aspect-square bg-gray-50 rounded-2xl shadow-sm overflow-hidden border-2 border-white hover:border-[#1F4E5F]/20 transition-all text-center">
                    {item.image ? (
                      <img src={item.image} alt="" className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-300">
                        <ImageIcon size={32} />
                        <span className="text-[10px]">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                      <button
                        onClick={() => setShowDeleteConfirm({ isOpen: true, id: item.id })}
                        className="bg-white text-red-600 p-3 rounded-2xl hover:bg-red-600 hover:text-white transition-all transform hover:scale-110 active:scale-90 shadow-lg"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirm.isOpen}
        onClose={() => setShowDeleteConfirm({ ...showDeleteConfirm, isOpen: false })}
        onConfirm={confirmDelete}
        title="Remove Image"
        message="Are you sure you want to remove this image from the footer gallery?"
        type="danger"
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(31, 78, 95, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(31, 78, 95, 0.2); }
      `}} />
    </div>
  );
}
