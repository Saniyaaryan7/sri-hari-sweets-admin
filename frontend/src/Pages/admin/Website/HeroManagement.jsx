import React, { useState } from "react";
import { Plus, Pencil, Trash2, Image as ImageIcon, ExternalLink, X, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useAppContext } from "../../../context/AppContext";
import ConfirmationModal from "../../../components/admin/ConfirmationModal";

export default function HeroManagement() {
  const { hero, addHero, updateHero, deleteHero } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState({ title: "", subtitle: "", image: "" });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState({ isOpen: false, id: null, title: "" }); 
  const [feedback, setFeedback] = useState(null); // { type: 'success'|'error', message: '' }
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
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.path) {
        setCurrentSlide({ ...currentSlide, image: data.path });
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
    setSubmitting(true);
    try {
      if (isEditing) {
        await updateHero(currentSlide.id, currentSlide);
        showFeedback("success", "Slide updated successfully!");
      } else {
        await addHero(currentSlide);
        showFeedback("success", "Slide added successfully!");
      }
      setIsEditing(false);
      setCurrentSlide({ title: "", subtitle: "", image: "" });
    } catch (err) {
      showFeedback("error", "Action failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (slide) => {
    setCurrentSlide(slide);
    setIsEditing(true);
  };

  const confirmDelete = async () => {
    if (!showDeleteConfirm.id) return;
    try {
      await deleteHero(showDeleteConfirm.id);
      showFeedback("success", "Slide deleted successfully!");
      setShowDeleteConfirm({ isOpen: false, id: null, title: "" });
    } catch (err) {
      showFeedback("error", "Delete failed.");
      setShowDeleteConfirm({ isOpen: false, id: null, title: "" });
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#EFE6E2] overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 lg:p-8 pb-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-[#4B2E39]">Hero Slider Management</h1>
          <div className="flex items-center gap-4">
            {feedback && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium animate-in fade-in slide-in-from-top-4 ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {feedback.message}
              </div>
            )}
            <div className="text-xs bg-[#1F4E5F]/10 text-[#1F4E5F] px-3 py-1 rounded-full font-medium">
              {hero.length} Slides Set
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pt-0 custom-scrollbar">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* STICKY FORM PANEL */}
          <div className="lg:col-span-4 lg:sticky lg:top-0 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-4 text-[#1F4E5F] flex items-center gap-2">
                {isEditing ? <Pencil size={18} /> : <Plus size={18} />}
                {isEditing ? "Edit Slide" : "Add New Slide"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={currentSlide.title}
                    placeholder="e.g. Fresh Cakes Delivered"
                    onChange={(e) => setCurrentSlide({ ...currentSlide, title: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#1F4E5F] bg-gray-50 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={currentSlide.subtitle}
                    placeholder="e.g. Eggless • Designer • Birthday"
                    onChange={(e) => setCurrentSlide({ ...currentSlide, subtitle: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#1F4E5F] bg-gray-50 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Slide Image</label>
                  <div className="space-y-3">
                    {/* Image Preview */}
                    <div className="relative aspect-video rounded-xl bg-gray-100 border-2 border-dashed border-gray-200 overflow-hidden group">
                      {currentSlide.image ? (
                        <>
                          <img src={currentSlide.image} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => setCurrentSlide({ ...currentSlide, image: "" })}
                              className="bg-white text-red-600 p-2 rounded-full shadow-lg"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                          <ImageIcon size={32} />
                          <span className="text-xs font-medium">No Image Selected</span>
                        </div>
                      )}

                      {uploading && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                          <div className="w-8 h-8 border-4 border-[#1F4E5F] border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-xs font-bold text-[#1F4E5F]">UPLOADING...</span>
                        </div>
                      )}
                    </div>

                    {/* Upload Buttons */}
                    <div className="flex gap-2">
                      <label className="flex-1 cursor-pointer">
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                        <div className="w-full bg-gray-100 text-[#1F4E5F] py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors border border-gray-200">
                          <ImageIcon size={16} />
                          CHOOSE FROM THIS PC
                        </div>
                      </label>
                    </div>

                  </div>
                </div>



                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-[#1F4E5F] text-white py-2.5 rounded-xl font-bold hover:bg-[#163a47] transition shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        {isEditing ? <Pencil size={18} /> : <Plus size={18} />}
                        {isEditing ? "Update Slide" : "Add Slide"}
                      </>
                    )}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setCurrentSlide({ title: "", subtitle: "", image: "" });
                      }}
                      className="px-4 py-2.5 border rounded-xl font-medium hover:bg-gray-50 transition text-gray-500"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-[#1F4E5F] p-5 rounded-2xl text-white shadow-lg overflow-hidden relative group">
              <div className="relative z-10 transition-transform group-hover:translate-x-1">
                <h3 className="font-bold flex items-center gap-2 mb-2 text-sm">
                  <ExternalLink size={16} />
                  Live Preview Info
                </h3>
                <p className="text-[11px] opacity-80 leading-relaxed font-medium">
                  Changes reflect immediately on the home page. For best results, use high-resolution landscape images.
                </p>
              </div>
              <ImageIcon size={100} className="absolute -bottom-6 -right-6 opacity-10 rotate-12 transition-transform group-hover:scale-110 group-hover:rotate-0" />
            </div>
          </div>

          {/* LIST OF DATA - SCROLLABLE */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/80 flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-gray-500 tracking-widest">Active Slider Content</span>
                <span className="text-[10px] text-[#1F4E5F] font-bold bg-[#1F4E5F]/5 px-2 py-0.5 rounded">AUTO-PLAY ENABLED</span>
              </div>

              <div className="divide-y divide-gray-50">
                {hero.length === 0 && (
                  <div className="p-20 text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-gray-200">
                      <ImageIcon size={32} className="text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium">Your hero slider is currently empty.</p>
                  </div>
                )}
                {hero.map((slide, idx) => (
                  <div key={slide.id} className="p-5 flex gap-6 items-center hover:bg-gray-50/50 transition-all group">
                    <div className="text-xl font-black text-gray-100 w-6 select-none group-hover:text-[#1F4E5F]/10 transition-colors">{idx + 1}</div>

                    <div className="w-48 h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-md border-2 border-white group-hover:border-[#1F4E5F]/20 transition-all">
                      {slide.image ? (
                        <img src={slide.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <ImageIcon size={32} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 py-2">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-extrabold text-[#4B2E39] truncate text-lg group-hover:text-[#1F4E5F] transition-colors">{slide.title}</h3>
                      </div>
                      <p className="text-xs text-gray-500 font-medium truncate mb-3 leading-relaxed">{slide.subtitle}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] bg-white border border-gray-200 text-gray-400 px-2.5 py-1 rounded-lg font-mono truncate max-w-[250px] shadow-sm">
                          {slide.image}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(slide)}
                        className="p-3 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-2xl transition-all shadow-sm active:scale-90"
                        title="Edit Slide"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm({ isOpen: true, id: slide.id, title: slide.title })}
                        className="p-3 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-2xl transition-all shadow-sm active:scale-90"
                        title="Delete Slide"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center py-4">
              <p className="text-[11px] text-gray-400 font-medium tracking-wide">
                Drag and Drop to reorder coming in next update
              </p>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirm.isOpen}
        onClose={() => setShowDeleteConfirm({ ...showDeleteConfirm, isOpen: false })}
        onConfirm={confirmDelete}
        title="Delete Slide"
        message={`Are you sure you want to remove the slide "${showDeleteConfirm.title}"? This action will instantly update the public website.`}
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
