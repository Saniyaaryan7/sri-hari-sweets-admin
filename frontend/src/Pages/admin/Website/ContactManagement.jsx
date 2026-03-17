import { useState, useEffect } from "react";
import { useAppContext } from "../../../context/AppContext";
import { 
    Save, MapPin, Phone, Mail, 
    Facebook, Twitter, Instagram, 
    CheckCircle2, AlertCircle, Share2,
    Globe, Clock
} from "lucide-react";
import { FaPinterestP, FaWhatsapp } from "react-icons/fa";

const ContactManagement = () => {
    const { contactInfo, updateContactInfo } = useAppContext();
    const [formData, setFormData] = useState({
        address: "",
        phone: "",
        email: "",
        socials: {
            facebook: "",
            pinterest: "",
            twitter: "",
            instagram: "",
            whatsapp: ""
        }
    });
    const [isSaving, setIsSaving] = useState(false);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        if (contactInfo) {
            setFormData(contactInfo);
        }
    }, [contactInfo]);

    const showFeedback = (type, message) => {
        setFeedback({ type, message });
        setTimeout(() => setFeedback(null), 3000);
    };

    const handleSocialChange = (platform, value) => {
        setFormData({
            ...formData,
            socials: {
                ...formData.socials,
                [platform]: value
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateContactInfo(formData);
            showFeedback("success", "Contact information updated successfully!");
        } catch (err) {
            showFeedback("error", "Failed to update contact information.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#EFE6E2] overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-6 lg:p-8 pb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-[#4B2E39]">Contact Information</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage your business address, phone, and social links</p>
                    </div>
                    {feedback && (
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium animate-in fade-in slide-in-from-top-4 ${
                            feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                            {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                            {feedback.message}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-4 sm:p-6 lg:p-8 pt-0">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Core Details */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                                <h2 className="text-lg font-bold text-[#4B2E39] flex items-center gap-2">
                                    <Globe size={18} className="text-[#1F4E5F]" />
                                    Business Details
                                </h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <MapPin size={12} /> Address
                                    </label>
                                    <textarea
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1F4E5F] transition-all font-medium text-[#4B2E39] resize-none"
                                        rows="3"
                                        placeholder="Full address..."
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Phone size={12} /> Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1F4E5F] transition-all font-medium text-[#4B2E39]"
                                            placeholder="(555) 000-0000"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Mail size={12} /> Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1F4E5F] transition-all font-medium text-[#4B2E39]"
                                            placeholder="info@sriharisweets.com"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                                <h2 className="text-lg font-bold text-[#4B2E39] flex items-center gap-2">
                                    <Share2 size={18} className="text-[#1F4E5F]" />
                                    Social Presence
                                </h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <SocialInput 
                                    label="Facebook"
                                    icon={<Facebook size={18} />}
                                    value={formData.socials.facebook}
                                    onChange={(v) => handleSocialChange('facebook', v)}
                                />
                                <SocialInput 
                                    label="Instagram"
                                    icon={<Instagram size={18} />}
                                    value={formData.socials.instagram}
                                    onChange={(v) => handleSocialChange('instagram', v)}
                                />
                                <SocialInput 
                                    label="Twitter / X"
                                    icon={<Twitter size={18} />}
                                    value={formData.socials.twitter}
                                    onChange={(v) => handleSocialChange('twitter', v)}
                                />
                                <SocialInput 
                                    label="Pinterest"
                                    icon={<FaPinterestP size={18} />}
                                    value={formData.socials.pinterest}
                                    onChange={(v) => handleSocialChange('pinterest', v)}
                                />
                                <SocialInput 
                                    label="WhatsApp"
                                    icon={<FaWhatsapp size={18} />}
                                    value={formData.socials.whatsapp}
                                    onChange={(v) => handleSocialChange('whatsapp', v)}
                                />
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="lg:col-span-2 flex justify-end pb-8">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="bg-[#1F4E5F] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#163a47] transition shadow-xl shadow-[#1F4E5F]/30 active:scale-95 disabled:opacity-50"
                            >
                                {isSaving ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    <Save size={20} />
                                )}
                                Save All Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const SocialInput = ({ label, icon, value, onChange }) => (
    <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#1F4E5F]">
            {icon}
        </div>
        <div className="flex-1">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`${label} URL / Handle`}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1F4E5F] transition-all font-medium text-[#4B2E39] text-sm"
            />
        </div>
    </div>
);

export default ContactManagement;
