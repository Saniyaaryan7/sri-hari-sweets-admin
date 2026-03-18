import { useState, useRef } from "react";
import { useAppContext, getImageUrl } from "../../../context/AppContext";
import {
    Plus, Trash2, Edit3, Save, X,
    Image as ImageIcon, Upload, CheckCircle2,
    AlertCircle, Link as LinkIcon, Star,
    ChevronRight, Calendar, Loader2
} from "lucide-react";
import axios from "axios";
import ConfirmationModal from "../../../components/admin/ConfirmationModal";

const SpecialitiesManagement = () => {
    const { specialities, addSpeciality, updateSpeciality, deleteSpeciality } = useAppContext();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: "", image: "", link: "" });
    const [isUploading, setIsUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState({ isOpen: false, id: null, title: "" });
    const fileInputRef = useRef(null);

    const showFeedback = (type, message) => {
        setFeedback({ type, message });
        setTimeout(() => setFeedback(null), 3000);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataUpload = new FormData();
        formDataUpload.append("image", file);

        setIsUploading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/upload`, formDataUpload);
            setFormData({ ...formData, image: res.data.path });
            showFeedback("success", "Image uploaded successfully!");
        } catch (err) {
            showFeedback("error", "Failed to upload image.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title) {
            showFeedback("error", "Please enter a title.");
            return;
        }
        if (!formData.image) {
            showFeedback("error", "Please upload an image.");
            return;
        }

        setSubmitting(true);
        try {
            if (editingId) {
                await updateSpeciality(editingId, formData);
                showFeedback("success", "Speciality updated successfully!");
                setEditingId(null);
            } else {
                await addSpeciality(formData);
                showFeedback("success", "Speciality added successfully!");
                setIsAdding(false);
            }
            setFormData({ title: "", image: "", link: "" });
        } catch (err) {
            showFeedback("error", "Failed to save speciality.");
        } finally {
            setSubmitting(false);
        }
    };

    const startEdit = (item) => {
        setEditingId(item.id);
        setFormData({ title: item.title, image: item.image, link: item.link || "" });
        setIsAdding(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setIsAdding(false);
        setFormData({ title: "", image: "", link: "" });
    };

    const confirmDelete = async () => {
        if (!showDeleteConfirm.id) return;
        try {
            await deleteSpeciality(showDeleteConfirm.id);
            showFeedback("success", "Speciality deleted successfully!");
            setShowDeleteConfirm({ isOpen: false, id: null, title: "" });
        } catch (err) {
            showFeedback("error", "Failed to delete speciality.");
            setShowDeleteConfirm({ isOpen: false, id: null, title: "" });
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#EFE6E2] overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-6 lg:p-8 pb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-[#4B2E39]">Our Specialities</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage the spotlight categories on your home page</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {feedback && (
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium animate-in fade-in slide-in-from-top-4 ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                {feedback.message}
                            </div>
                        )}
                        <button
                            onClick={() => setIsAdding(!isAdding)}
                            className="bg-[#1F4E5F] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#163a47] transition shadow-lg shadow-[#1F4E5F]/20 active:scale-95"
                        >
                            {isAdding ? <X size={20} /> : <Plus size={20} />}
                            {isAdding ? "Cancel" : "Add Speciality"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-4 sm:p-6 lg:p-8 pt-0 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Form Section */}
                    {isAdding && (
                        <div className="lg:col-span-4 lg:sticky lg:top-0 h-fit animate-in fade-in slide-in-from-left-4 duration-300">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                                    <h2 className="text-lg font-bold text-[#4B2E39] flex items-center gap-2">
                                        {editingId ? <Edit3 size={18} /> : <Plus size={18} />}
                                        {editingId ? "Edit Speciality" : "New Speciality"}
                                    </h2>
                                </div>
                                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1F4E5F] transition-all font-medium text-[#4B2E39]"
                                            placeholder="e.g., Premium Cakes"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Image</label>
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="group relative cursor-pointer"
                                        >
                                            <div className="w-full aspect-video rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-[#1F4E5F] group-hover:bg-[#1F4E5F]/5">
                                                {formData.image ? (
                                                    <>
                                                        <img src={getImageUrl(formData.image)} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Preview" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <Upload className="text-white" size={32} />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        {isUploading ? (
                                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1F4E5F]"></div>
                                                        ) : (
                                                            <>
                                                                <Upload className="text-gray-300 group-hover:text-[#1F4E5F] transition-colors mb-2" size={32} />
                                                                <span className="text-xs font-bold text-gray-400 group-hover:text-[#1F4E5F]">Choose from PC</span>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Link Path (Optional)</label>
                                        <div className="relative">
                                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input
                                                type="text"
                                                value={formData.link}
                                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1F4E5F] transition-all font-medium text-[#4B2E39]"
                                                placeholder="/shop/category/cakes"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            type="submit"
                                            disabled={isUploading || submitting}
                                            className="flex-1 bg-[#1F4E5F] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#163a47] transition shadow-lg shadow-[#1F4E5F]/20 active:scale-95 disabled:opacity-50"
                                        >
                                            {submitting ? (
                                                <>
                                                    <Loader2 size={20} className="animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={20} />
                                                    {editingId ? "Update" : "Save"}
                                                </>
                                            )}
                                        </button>
                                        {editingId && (
                                            <button
                                                type="button"
                                                onClick={cancelEdit}
                                                className="px-4 py-3 rounded-2xl bg-gray-100 text-gray-500 font-bold hover:bg-gray-200 transition active:scale-95"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* List Section */}
                    <div className={`${isAdding ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-4`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {specialities.map((item) => (
                                <div key={item.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 group transition-all hover:shadow-md h-fit">
                                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                                        <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute top-3 right-3 flex gap-2">
                                            <button
                                                onClick={() => startEdit(item)}
                                                className="p-2 bg-white/90 backdrop-blur rounded-xl text-[#1F4E5F] hover:bg-white transition shadow-sm active:scale-90"
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                            <button
                                                onClick={() => setShowDeleteConfirm({ isOpen: true, id: item.id, title: item.title })}
                                                className="p-2 bg-white/90 backdrop-blur rounded-xl text-red-500 hover:bg-white transition shadow-sm active:scale-90"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
                                            <div className="flex items-center gap-2">
                                                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                                                <span className="text-white font-bold text-sm tracking-wide">SPECIALITY ITEM</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-2 pb-2">
                                        <h3 className="text-lg font-black text-[#4B2E39] mb-1">{item.title}</h3>
                                        {item.link && (
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                                                <LinkIcon size={12} />
                                                <span className="truncate">{item.link}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {specialities.length === 0 && (
                            <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-100">
                                <ImageIcon size={48} className="text-gray-200 mx-auto mb-4" />
                                <p className="text-gray-400 font-bold">No specialities found. Start by adding one!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showDeleteConfirm.isOpen}
                onClose={() => setShowDeleteConfirm({ ...showDeleteConfirm, isOpen: false })}
                onConfirm={confirmDelete}
                title="Delete Speciality"
                message={`Are you sure you want to remove the speciality "${showDeleteConfirm.title}"? This action will permanently remove it from your home page.`}
                type="danger"
            />
        </div>
    );
};

export default SpecialitiesManagement;
