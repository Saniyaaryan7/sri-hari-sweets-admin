import {
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaInstagram,
  FaHome,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import contactBanner from "../../assets/images/Contact-img/contact-bg.jpg";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="w-full bg-[#FAFAFA] text-gray-800">

      {/* ===== TOP BANNER ===== */}
      <section
        className="relative h-[40vh] md:h-[60vh] bg-center bg-cover overflow-hidden"
        style={{ backgroundImage: `url(${contactBanner})` }}
      >
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
            <h3 className="font-semibold tracking-widest mb-3">VISIT US</h3>
            <p className="text-sm text-gray-600 mb-2">
              Visit our bakery store and enjoy the fresh taste of sweets.
            </p>
            <p className="text-sm text-[#E6B873] font-medium">
              2 Elizabeth St, London, UK
            </p>
          </div>

          <div className="border rounded-xl p-8 bg-white hover:shadow-xl transition">
            <FaPhoneAlt className="text-3xl text-[#E6B873] mx-auto mb-4" />
            <h3 className="font-semibold tracking-widest mb-3">CALL US</h3>
            <p className="text-sm text-gray-600 mb-2">
              Feel free to call us anytime for orders & queries.
            </p>
            <p className="text-sm text-[#E6B873] font-medium">
              +44 (0) 203 116 7711
            </p>
          </div>

          <div className="border rounded-xl p-8 bg-white hover:shadow-xl transition">
            <FaEnvelope className="text-3xl text-[#E6B873] mx-auto mb-4" />
            <h3 className="font-semibold tracking-widest mb-3">CONTACT US</h3>
            <p className="text-sm text-gray-600 mb-2">
              Drop us an email and we’ll respond shortly.
            </p>
            <p className="text-sm text-[#E6B873] font-medium">
              noreply@domain.com
            </p>
          </div>
        </div>
      </section>

      {/* ================== MESSAGE + INFO ================= */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT FORM */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-12 border shadow-lg">
            <p className="text-sm tracking-widest text-[#E6B873] mb-2">
              CONTACT US
            </p>

            <h2 className="text-3xl font-serif mb-10">
              Get in Touch with Us
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["First Name *", "Last Name *", "Email *", "Phone *"].map(
                (ph, i) => (
                  <input
                    key={i}
                    placeholder={ph}
                    className="border border-gray-300 rounded-xl px-4 py-3
                    outline-none focus:ring-2 focus:ring-[#E6B873]"
                  />
                )
              )}

              <input
                placeholder="Subject *"
                className="md:col-span-2 border border-gray-300 rounded-xl px-4 py-3
                outline-none focus:ring-2 focus:ring-[#E6B873]"
              />

              <textarea
                rows="4"
                placeholder="Your Message *"
                className="md:col-span-2 border border-gray-300 rounded-xl px-4 py-3
                outline-none focus:ring-2 focus:ring-[#E6B873]"
              />

              <button
                className="md:col-span-2 w-fit bg-[#E6B873] text-black
                px-12 py-3 rounded-full hover:bg-[#d4a95f] transition shadow"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT CONTACT DETAILS */}
          <div className="rounded-3xl p-10 bg-white border shadow-lg">
            <span className="text-xs tracking-widest uppercase text-[#E6B873]">
              Contact Details
            </span>
            <h2 className="text-2xl font-semibold mt-1 mb-8">
              Visit & Reach Us
            </h2>

            {[
              {
                icon: <MapPin />,
                title: "Address",
                text: "785 Carriage Drive, Jacksonville Beach, FL",
              },
              {
                icon: <Phone />,
                title: "Phone",
                text: "+1 203-284-2818",
              },
              {
                icon: <Mail />,
                title: "Email",
                text: "noreply@domain.com",
              },
              {
                icon: <Clock />,
                title: "Working Hours",
                text: "Mon – Sat : 9:00 AM – 9:00 PM",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 mb-6">
                <div className="p-3 rounded-xl bg-[#FFF7E8] text-[#E6B873]">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-medium text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              </div>
            ))}

            <div className="flex gap-4 mt-8">
              {[FaFacebookF, FaPinterestP, FaTwitter, FaInstagram].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-full bg-[#FFF7E8] text-[#E6B873]
                    hover:bg-[#E6B873] hover:text-black transition cursor-pointer"
                  >
                    <Icon />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
