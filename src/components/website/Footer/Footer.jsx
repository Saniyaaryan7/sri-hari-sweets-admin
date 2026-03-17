

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

              <p className="text-sm leading-7 text-gray-300">
                250 Biscayne Blvd. (North) 11st Floor <br />
                New World Tower Miami, Florida 33148
              </p>

             <div className="mt-4 space-y-3 text-sm text-gray-300">
  <div className="flex items-center gap-3">
    <FaPhoneAlt className="text-[#e6c17a]" />
    <span>(305) 333-5522</span>
  </div>

  <div className="flex items-center gap-3">
    <FaEnvelope className="text-[#e6c17a]" />
    <span>info@your-site.com</span>
  </div>
</div>

              <div className="flex gap-4 mt-8">
                <Icon><FaFacebookF /></Icon>
                <Icon><FaPinterestP /></Icon>
                <Icon><FaTwitter /></Icon>
                <Icon><FaInstagram /></Icon>
                <Icon><FaWhatsapp /></Icon>
              </div>
            </div>

            {/* GALLERY */}
            <div>
              <h2 className="text-3xl font-serif mb-6 text-center text-[#e6c17a]">
                Crafted With Love
              </h2>

              <div className="grid grid-cols-3 gap-4">
               {[
  "/assets/images/footer-img/foot1.webp",
  "/assets/images/footer-img/foot2.webp",
  "/assets/images/footer-img/foot3.webp",
  "/assets/images/footer-img/foot4.webp",
  "/assets/images/footer-img/foot5.webp",
  "/assets/images/footer-img/foot6.webp",
].map((img, i) => (
  <div key={i} className="overflow-hidden rounded-md">
    <img
      src={img}
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

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 bg-white/10 backdrop-blur placeholder:text-gray-400 outline-none"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 bg-white/10 backdrop-blur placeholder:text-gray-400 outline-none"
                />

                <textarea
                  rows="4"
                  placeholder="Message"
                  className="w-full p-3 bg-white/10 backdrop-blur placeholder:text-gray-400 outline-none resize-none"
                />

                <button className="bg-[#e6c17a] text-black px-8 py-3 font-semibold hover:opacity-90 transition">
                  Send Message
                </button>
              </form>
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
