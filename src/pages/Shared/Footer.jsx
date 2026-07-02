import Logo from "../../Componets/Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-[#062b2f] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Logo + Description */}
          <div>
            <Logo />

            <p className="mt-5 text-sm leading-relaxed text-gray-400">
              <span className="text-white font-medium">Fast Delivery</span> made simple.
              Real-time tracking, secure handling, and lightning-fast logistics for your business and personal needs.
            </p>

            <p className="mt-6 text-xs text-gray-500">
              © {new Date().getFullYear()} <span className="text-white">All rights reserved</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">
              Quick <span className="text-blue-500">Links</span>
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              {["Home", "Services", "Tracking", "Pricing", "Contact"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">
              Contact <span className="text-blue-500">Us</span>
            </h3>

            <p className="text-sm text-gray-400">
              Email: <span className="text-white">support@delivery.com</span>
            </p>

            <p className="text-sm text-gray-400 mt-2">
              Phone: <span className="text-white">+880 1XXX-XXXXXX</span>
            </p>

            {/* Social Icons */}
            <div className="flex gap-5 mt-6">

              {/* Twitter */}
              <a className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775..." />
                </svg>
              </a>

              {/* YouTube */}
              <a className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245..." />
                </svg>
              </a>

              {/* Facebook */}
              <a className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642..." />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">

          <p>
            Built with <span className="text-red-500">♥</span> for modern logistics system
          </p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <a className="hover:text-white transition">Privacy</a>
            <a className="hover:text-white transition">Terms</a>
            <a className="hover:text-white transition">Support</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;