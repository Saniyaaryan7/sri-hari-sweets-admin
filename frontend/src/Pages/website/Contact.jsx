import React, { useState } from "react";
import {
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaInstagram,
  FaHome,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useAppContext, getImageUrl } from "../../context/AppContext";

export default function Contact() {
  const { contactInfo, addMessage } = useAppContext();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addMessage({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      });
      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = contactInfo?.socials || {};

  return (
    <div className="w-full bg-[#FAFAFA] text-gray-800">

      {/* ===== TOP BANNER ===== */}
      <section className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        <img
          src={getImageUrl(contactInfo?.banner) || "/assets/images/contact-img/contact-bg.webp"}
          alt="Contact Banner"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-white/50" />

        <div
          className="
            absolute inset-0
            flex flex-col items-center justify-center
            text-center px-4
            translate-y-20 sm:translate-y-16 md:translate-y-10
          "
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-red-600">
            CONTACT US
          </h1>

          <p className="mt-4 text-sm md:text-base text-amber-700 font-serif font-medium leading-relaxed max-w-md">
            Need an expert? You are more than welcomed to leave your contact
            info and we will be in touch shortly.
          </p>
        </div>
      </section>

      {/* ===================== CONTACT CARDS ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

          <div className="border rounded-xl p-8 bg-white hover:shadow-xl transition">
            <FaHome className="text-3xl text-[#E6B873] mx-auto mb-4" />
            <h3 className="font-semibold tracking-widest mb-3 uppercase">VISIT US</h3>
            <p className="text-sm text-gray-600 mb-2">
              Visit our bakery store and enjoy the fresh taste of sweets.
            </p>
            <p className="text-sm text-[#E6B873] font-medium whitespace-pre-wrap">
              {contactInfo?.address || "Loading address..."}
            </p>
          </div>

          <div className="border rounded-xl p-8 bg-white hover:shadow-xl transition">
            <FaPhoneAlt className="text-3xl text-[#E6B873] mx-auto mb-4" />
            <h3 className="font-semibold tracking-widest mb-3 uppercase">CALL US</h3>
            <p className="text-sm text-gray-600 mb-2">
              Feel free to call us anytime for orders & queries.
            </p>
            <p className="text-sm text-[#E6B873] font-medium">
              {contactInfo?.phone || "Loading phone..."}
            </p>
          </div>

          <div className="border rounded-xl p-8 bg-white hover:shadow-xl transition">
            <FaEnvelope className="text-3xl text-[#E6B873] mx-auto mb-4" />
            <h3 className="font-semibold tracking-widest mb-3 uppercase">CONTACT US</h3>
            <p className="text-sm text-gray-600 mb-2">
              Drop us an email and we’ll respond shortly.
            </p>
            <p className="text-sm text-[#E6B873] font-medium text-break">
              {contactInfo?.email || "Loading email..."}
            </p>
          </div>
        </div>
      </section>

      {/* ================== MESSAGE + INFO ================= */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT FORM */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-12 border shadow-lg">
            <p className="text-sm tracking-widest text-[#E6B873] mb-2 uppercase">
              CONTACT US
            </p>

            <h2 className="text-3xl font-serif mb-10">
              Get in Touch with Us
            </h2>

            {submitted ? (
              <div className="bg-green-100 text-green-700 p-8 rounded-2xl text-center border border-green-200">
                <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p>Thank you for reaching out. We will get back to you shortly.</p>
              </div>
            ) : (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <input
                  required
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#E6B873]"
                />
                <input
                  required
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#E6B873]"
                />
                <input
                  required
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#E6B873]"
                />
                <input
                  placeholder="Phone *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#E6B873]"
                />
                <input
                  required
                  placeholder="Subject *"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="md:col-span-2 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#E6B873]"
                />
                <textarea
                  required
                  rows="4"
                  placeholder="Your Message *"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="md:col-span-2 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#E6B873] resize-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="md:col-span-2 w-fit bg-[#E6B873] text-black px-12 py-3 rounded-full hover:bg-[#d4a95f] transition shadow disabled:opacity-50 font-bold"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT CONTACT DETAILS */}
          <div className="rounded-3xl p-10 bg-white border shadow-lg">
            <span className="text-xs tracking-widest uppercase text-[#E6B873] font-bold">
              Contact Details
            </span>
            <h2 className="text-2xl font-semibold mt-1 mb-8">
              Visit & Reach Us
            </h2>

            <div className="space-y-6">
              <ContactDetail 
                icon={<MapPin />} 
                title="Address" 
                text={contactInfo?.address || "Loading..."} 
              />
              <ContactDetail 
                icon={<Phone />} 
                title="Phone" 
                text={contactInfo?.phone || "Loading..."} 
              />
              <ContactDetail 
                icon={<Mail />} 
                title="Email" 
                text={contactInfo?.email || "Loading..."} 
              />
              <ContactDetail 
                icon={<Clock />} 
                title="Working Hours" 
                text="Mon – Sat : 9:00 AM – 9:00 PM" 
              />
            </div>

            <div className="flex gap-4 mt-10">
              {socialLinks.facebook && (
                <SocialIcon href={socialLinks.facebook} icon={<FaFacebookF />} />
              )}
              {socialLinks.pinterest && (
                <SocialIcon href={socialLinks.pinterest} icon={<FaPinterestP />} />
              )}
              {socialLinks.twitter && (
                <SocialIcon href={socialLinks.twitter} icon={<FaTwitter />} />
              )}
              {socialLinks.instagram && (
                <SocialIcon href={socialLinks.instagram} icon={<FaInstagram />} />
              )}
              {socialLinks.whatsapp && (
                <SocialIcon href={socialLinks.whatsapp} icon={<FaWhatsapp />} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactDetail({ icon, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="p-3 rounded-xl bg-[#FFF7E8] text-[#E6B873] h-fit">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-600 whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="p-3 rounded-full bg-[#FFF7E8] text-[#E6B873] hover:bg-[#E6B873] hover:text-black transition cursor-pointer"
    >
      {icon}
    </a>
  );
}

function CheckCircle({ size, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}
