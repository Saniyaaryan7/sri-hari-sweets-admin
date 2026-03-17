
import { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  const { gallery, addMessage, contactInfo } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    await addMessage(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const socialLinks = contactInfo?.socials || {};

  return (
    <footer className="relative  text-white overflow-hidden">

      {/* TOP CURVE */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-24"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C240,20 480,80 720,60 960,40 1200,20 1440,60 L1440,0 L0,0 Z"
            fill="#0b0d1a"
          />
        </svg>
      </div>

      {/* BACKGROUND */}
      <div className="bg-gradient-to-br from-[#0b0d1a] via-[#1b1f3b] to-[#2a1454]">
        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

            {/* CONTACT */}
            <div>
              <h2 className="text-3xl font-serif mb-6 text-[#e6c17a]">
                Our Contacts
              </h2>

              <p className="text-sm leading-7 text-gray-300 whitespace-pre-wrap">
                {contactInfo?.address || "Loading address..."}
              </p>

             <div className="mt-4 space-y-3 text-sm text-gray-300">
  <div className="flex items-center gap-3">
    <FaPhoneAlt className="text-[#e6c17a]" />
    <span>{contactInfo?.phone || "Loading phone..."}</span>
  </div>

  <div className="flex items-center gap-3">
    <FaEnvelope className="text-[#e6c17a]" />
    <span>{contactInfo?.email || "Loading email..."}</span>
  </div>
</div>

              <div className="flex gap-4 mt-8">
                {socialLinks.facebook && <a href={socialLinks.facebook} target="_blank" rel="noreferrer"><Icon><FaFacebookF /></Icon></a>}
                {socialLinks.pinterest && <a href={socialLinks.pinterest} target="_blank" rel="noreferrer"><Icon><FaPinterestP /></Icon></a>}
                {socialLinks.twitter && <a href={socialLinks.twitter} target="_blank" rel="noreferrer"><Icon><FaTwitter /></Icon></a>}
                {socialLinks.instagram && <a href={socialLinks.instagram} target="_blank" rel="noreferrer"><Icon><FaInstagram /></Icon></a>}
                {socialLinks.whatsapp && <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer"><Icon><FaWhatsapp /></Icon></a>}
              </div>
            </div>

            {/* GALLERY */}
            <div>
              <h2 className="text-3xl font-serif mb-6 text-center text-[#e6c17a]">
                Crafted With Love
              </h2>

              <div className="grid grid-cols-3 gap-4">
               {gallery.map((item, i) => (
  <div key={item.id} className="overflow-hidden rounded-md">
    <img
      src={item.image}
      alt="sweet"
       loading="lazy"
      decoding="async"
      className="w-full h-24 object-cover hover:scale-110 transition"
    />
  </div>
))}

              </div>
            </div>

            {/* MESSAGE */}
            <div>
              <h2 className="text-3xl font-serif mb-6 text-[#e6c17a]">
                Leave a Message
              </h2>

              {submitted ? (
                <div className="bg-green-500/20 text-green-400 p-4 rounded-lg text-center">
                  Message sent successfully! We'll get back to you soon.
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-white/10 backdrop-blur placeholder:text-gray-400 outline-none"
                    required
                  />

                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-white/10 backdrop-blur placeholder:text-gray-400 outline-none"
                    required
                  />

                  <textarea
                    rows="4"
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-white/10 backdrop-blur placeholder:text-gray-400 outline-none resize-none"
                    required
                  />

                  <button 
                    type="submit"
                    className="bg-[#e6c17a] text-black px-8 py-3 font-semibold hover:opacity-90 transition w-full"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* BOTTOM */}
          <div className="text-center text-sm text-gray-400 mt-14">
            © 2026 Sri Hari Sweets · Luxury Crafted Desserts
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

function Icon({ children }) {
  return (
    <div className="w-10 h-10 border border-[#e6c17a] flex items-center justify-center rounded-full hover:bg-[#e6c17a] hover:text-black transition cursor-pointer">
      {children}
    </div>
  );
}
