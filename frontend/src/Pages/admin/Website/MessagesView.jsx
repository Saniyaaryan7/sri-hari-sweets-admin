import React, { useState } from "react";
import { Trash2, Mail, Calendar, User, CheckCircle2, AlertCircle, X, ChevronRight, Loader2 } from "lucide-react";
import { useAppContext } from "../../../context/AppContext";
import ConfirmationModal from "../../../components/admin/ConfirmationModal";

export default function MessagesView() {
  const { messages, deleteMessage, sendReply } = useAppContext();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState({ isOpen: false, id: null });
  const [showReplyModal, setShowReplyModal] = useState(null); // stores message object to reply to
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSending(true);
    try {
      await sendReply({
        id: showReplyModal.id,
        email: showReplyModal.email,
        name: showReplyModal.name,
        message: showReplyModal.message,
        replyMessage: replyText
      });
      showFeedback("success", "Reply sent successfully!");
      setShowReplyModal(null);
      setReplyText("");
    } catch (err) {
      showFeedback("error", err.response?.data?.message || "Failed to send reply.");
    } finally {
      setIsSending(false);
    }
  };

  const confirmDelete = async () => {
    if (!showDeleteConfirm.id) return;
    try {
      await deleteMessage(showDeleteConfirm.id);
      showFeedback("success", "Message deleted successfully!");
      setShowDeleteConfirm({ isOpen: false, id: null });
    } catch (err) {
      showFeedback("error", "Failed to delete message.");
      setShowDeleteConfirm({ isOpen: false, id: null });
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#EFE6E2] overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 lg:p-8 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-[#4B2E39]">User Messages</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and respond to customer inquiries</p>
          </div>
          <div className="flex items-center gap-4">
            {feedback && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium animate-in fade-in slide-in-from-top-4 ${
                feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {feedback.message}
              </div>
            )}
            <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/50 shadow-sm">
                <span className="text-xs font-bold text-[#1F4E5F] flex items-center gap-2">
                    <Mail size={14} />
                    {messages.length} TOTAL
                </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pt-0 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="bg-white p-20 text-center rounded-3xl shadow-sm border border-gray-100 mt-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={40} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Inbox is empty</h3>
            <p className="text-gray-500 max-w-xs mx-auto">When customers fill out the contact form, their messages will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {[...messages].reverse().map((msg) => (
              <div key={msg.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1F4E5F]/5 text-[#1F4E5F] rounded-2xl flex items-center justify-center font-bold text-lg select-none">
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-[#4B2E39] text-xl flex items-center gap-2">
                            {msg.name}
                            {msg.reply ? (
                                <span className="text-[10px] uppercase tracking-widest bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-black">REPLIED</span>
                            ) : (
                                <span className="text-[10px] uppercase tracking-widest bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-black">NEW</span>
                            )}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                            <a href={`mailto:${msg.email}`} className="text-sm text-gray-400 hover:text-[#1F4E5F] flex items-center gap-1.5 transition-colors">
                                <Mail size={14} />
                                {msg.email}
                            </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 ml-auto">
                        <div className="text-right">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-300 uppercase tracking-tighter">
                                <Calendar size={12} />
                                {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(msg.createdAt))}
                            </div>
                        </div>
                        <button
                            onClick={() => setShowDeleteConfirm({ isOpen: true, id: msg.id })}
                            className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all active:scale-90"
                            title="Delete Message"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                  </div>

                  <div className="bg-[#1F4E5F]/5 p-6 rounded-2xl relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#1F4E5F]/20 rounded-l-2xl"></div>
                    <p className="text-[#4B2E39] leading-relaxed whitespace-pre-wrap font-medium">
                      {msg.message}
                    </p>
                  </div>

                  {msg.reply && (
                    <div className="mt-4 bg-gray-50/50 p-6 rounded-2xl border border-dashed border-gray-200 relative">
                        <div className="absolute -top-3 left-6 bg-[#EFE6E2] px-3 py-1 rounded-full text-[10px] font-black text-[#1F4E5F] border border-gray-200">ADMIN REPLY</div>
                        <p className="text-gray-500 text-sm italic leading-relaxed">
                            "{msg.reply.message}"
                        </p>
                        <div className="mt-2 text-[10px] font-bold text-gray-300 uppercase flex items-center gap-1">
                            <Calendar size={10} />
                            Sent {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(msg.reply.sentAt))}
                        </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <button 
                        onClick={() => {
                            setReplyText(msg.reply ? msg.reply.message : "");
                            setShowReplyModal(msg);
                        }}
                        className={`${msg.reply ? 'bg-white border-2 border-[#1F4E5F] text-[#1F4E5F]' : 'bg-[#1F4E5F] text-white'} px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-[1.02] transition flex items-center gap-2 shadow-lg active:scale-95`}
                    >
                        {msg.reply ? 'Update Reply' : 'Reply via Email'}
                        <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* REPLY MODAL */}
      {showReplyModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200 border border-gray-100 overflow-hidden">
            <div className="px-8 py-6 border-b flex justify-between items-center bg-gray-50/50">
                <div>
                   <h3 className="text-xl font-bold text-gray-900">Reply to {showReplyModal.name}</h3>
                   <p className="text-xs text-gray-400 font-medium">To: {showReplyModal.email}</p>
                </div>
                <button 
                    onClick={() => {
                        setShowReplyModal(null);
                        setReplyText("");
                    }} 
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
            
            <form onSubmit={handleSendReply}>
                <div className="p-8 space-y-6">
                    <div className="bg-gray-50 p-4 rounded-2xl border-l-4 border-[#1F4E5F]/20">
                        <p className="text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-widest">Original Message</p>
                        <p className="text-sm text-gray-600 italic line-clamp-3">"{showReplyModal.message}"</p>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider">Your Response</label>
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type your reply here..."
                            className="w-full h-40 border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#1F4E5F] bg-gray-50 text-sm font-medium resize-none transition-all"
                            required
                        ></textarea>
                    </div>
                </div>

                <div className="p-8 pt-0 flex gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            setShowReplyModal(null);
                            setReplyText("");
                        }}
                        className="flex-1 px-4 py-3 rounded-2xl text-gray-600 font-bold hover:bg-gray-100 transition"
                    >
                        Discard
                    </button>
                    <button
                        type="submit"
                        disabled={isSending || !replyText.trim()}
                        className="flex-2 bg-[#1F4E5F] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#163a47] transition shadow-lg shadow-[#1F4E5F]/20 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale"
                    >
                        {isSending ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                SENDING...
                            </>
                        ) : (
                            <>
                                Send Reply
                                <ChevronRight size={18} />
                            </>
                        )}
                    </button>
                </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={showDeleteConfirm.isOpen}
        onClose={() => setShowDeleteConfirm({ ...showDeleteConfirm, isOpen: false })}
        onConfirm={confirmDelete}
        title="Delete Message"
        message="Are you sure you want to permanently remove this customer's inquiry? This action cannot be undone."
        type="danger"
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(31, 78, 95, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(31, 78, 95, 0.2); }
      `}} />
    </div>
  );
}
