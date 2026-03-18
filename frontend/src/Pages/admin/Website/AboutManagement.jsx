import React, { useState, useEffect } from "react";
import { Save, Image as ImageIcon, Plus, Trash2, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useAppContext, getImageUrl } from "../../../context/AppContext";
import axios from "axios";

export default function AboutManagement() {
  const { aboutContent, updateAboutContent } = useAppContext();
  const [formData, setFormData] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [uploading, setUploading] = useState({ section: null, index: null });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (aboutContent) {
      setFormData(JSON.parse(JSON.stringify(aboutContent)));
    }
  }, [aboutContent]);

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleFileUpload = async (e, section, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("image", file);

    setUploading({ section, index });
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/upload`, formDataUpload);
      const newPath = res.data.path;

      const updated = { ...formData };
      if (index !== null) {
        updated[section][index].image = newPath;
      } else {
        updated[section].image = newPath;
      }
      setFormData(updated);
      showFeedback("success", "Image uploaded successfully!");
    } catch (err) {
      showFeedback("error", "Failed to upload image.");
    } finally {
      setUploading({ section: null, index: null });
    }
  };

  const handleChange = (section, field, value) => {
    const updated = { ...formData };
    updated[section][field] = value;
    setFormData(updated);
  };

  const handleValueChange = (index, field, value) => {
    const updated = { ...formData };
    updated.values[index][field] = value;
    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateAboutContent(formData);
      showFeedback("success", "About page updated successfully!");
    } catch (error) {
      showFeedback("error", "Failed to update About page.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!formData) return <div className="p-10 text-center text-gray-500">Loading...</div>;

  return (
    <div className="h-full bg-[#EFE6E2] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-8 pb-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#4B2E39]">About Page Management</h1>
          {feedback && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium animate-in fade-in slide-in-from-top-4 ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {feedback.message}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 pt-0 custom-scrollbar">
        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8 pb-10">
          
          {/* BANNER SECTION */}
          <SectionCard title="Top Banner">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Banner Title</label>
                    <input 
                      type="text" 
                      value={formData.banner.title} 
                      onChange={(e) => handleChange('banner', 'title', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#1F4E5F] bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Banner Subtitle</label>
                    <textarea 
                      rows="3"
                      value={formData.banner.subtitle} 
                      onChange={(e) => handleChange('banner', 'subtitle', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#1F4E5F] bg-gray-50 resize-none"
                    />
                  </div>
                </div>
                <div>
                   <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Banner Background Image</label>
                   <ImageUploadField 
                      image={formData.banner.image} 
                      onUpload={(e) => handleFileUpload(e, 'banner')}
                      isUploading={uploading.section === 'banner'}
                   />
                </div>
             </div>
          </SectionCard>

          {/* STORY SECTION */}
          <SectionCard title="Our Story">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Story Title</label>
                    <input 
                      type="text" 
                      value={formData.story.title} 
                      onChange={(e) => handleChange('story', 'title', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#1F4E5F] bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Story Content</label>
                    <textarea 
                      rows="6"
                      value={formData.story.content} 
                      onChange={(e) => handleChange('story', 'content', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#1F4E5F] bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                   <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Story Image</label>
                   <ImageUploadField 
                      image={formData.story.image} 
                      onUpload={(e) => handleFileUpload(e, 'story')}
                      isUploading={uploading.section === 'story'}
                   />
                </div>
             </div>
          </SectionCard>

          {/* MISSION SECTION */}
          <SectionCard title="Our Mission">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Mission Title</label>
                    <input 
                      type="text" 
                      value={formData.mission.title} 
                      onChange={(e) => handleChange('mission', 'title', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#1F4E5F] bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Mission Content</label>
                    <textarea 
                      rows="6"
                      value={formData.mission.content} 
                      onChange={(e) => handleChange('mission', 'content', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#1F4E5F] bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                   <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Mission Background Image</label>
                   <ImageUploadField 
                      image={formData.mission.image} 
                      onUpload={(e) => handleFileUpload(e, 'mission')}
                      isUploading={uploading.section === 'mission'}
                   />
                </div>
             </div>
          </SectionCard>

          {/* BAKERY SECTION */}
          <SectionCard title="Our Bakery">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Bakery Title</label>
                    <input 
                      type="text" 
                      value={formData.bakery.title} 
                      onChange={(e) => handleChange('bakery', 'title', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#1F4E5F] bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Bakery Content</label>
                    <textarea 
                      rows="6"
                      value={formData.bakery.content} 
                      onChange={(e) => handleChange('bakery', 'content', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#1F4E5F] bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                   <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Bakery Background Image</label>
                   <ImageUploadField 
                      image={formData.bakery.image} 
                      onUpload={(e) => handleFileUpload(e, 'bakery')}
                      isUploading={uploading.section === 'bakery'}
                   />
                </div>
             </div>
          </SectionCard>

          {/* VALUES SECTION */}
          <SectionCard title="Our Values">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {formData.values.map((val, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                    <h4 className="text-xs font-bold text-amber-700 uppercase">Value {idx + 1}</h4>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Title</label>
                      <input 
                        type="text" 
                        value={val.title} 
                        onChange={(e) => handleValueChange(idx, 'title', e.target.value)}
                        className="w-full border rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-[#1F4E5F] bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Description</label>
                      <textarea 
                        rows="2"
                        value={val.text} 
                        onChange={(e) => handleValueChange(idx, 'text', e.target.value)}
                        className="w-full border rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-[#1F4E5F] bg-white resize-none"
                      />
                    </div>
                  </div>
                ))}
             </div>
          </SectionCard>

          <div className="fixed bottom-8 right-8">
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#1F4E5F] text-white px-8 py-3 rounded-full font-bold hover:bg-[#163a47] transition shadow-xl flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save All Changes
                </>
              )}
            </button>
          </div>

        </form>
      </div>

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

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-8 py-4 bg-gray-50/80 border-b border-gray-100">
        <h2 className="text-sm font-bold uppercase text-[#1F4E5F] tracking-wider">{title}</h2>
      </div>
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}

function ImageUploadField({ image, onUpload, isUploading }) {
  return (
    <div className="space-y-3">
      <div className="relative aspect-video rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden group">
        {image ? (
          <img src={getImageUrl(image)} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
            <ImageIcon size={32} />
            <span className="text-xs font-medium">No Image</span>
          </div>
        )}
        
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-[#1F4E5F] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[10px] font-bold text-[#1F4E5F]">UPLOADING...</span>
          </div>
        )}
      </div>
      
      <label className="flex-1 cursor-pointer">
        <input type="file" accept="image/*" className="hidden" onChange={onUpload} disabled={isUploading} />
        <div className="w-full bg-[#1F4E5F]/5 text-[#1F4E5F] py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#1F4E5F]/10 transition-colors border border-[#1F4E5F]/10">
          <ImageIcon size={16} />
          CHOOSE FROM THIS PC
        </div>
      </label>
    </div>
  );
}
