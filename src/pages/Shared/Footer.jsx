import Logo from "../../Componets/Logo/Logo";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#06082f] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Logo />

            <p className="mt-5 text-gray-400 text-sm leading-7">
              Fast, secure and reliable parcel delivery service across
              Bangladesh. We help businesses and individuals deliver with
              confidence.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Company
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a className="hover:text-white transition">About Us</a></li>
              <li><a className="hover:text-white transition">Our Services</a></li>
              <li><a className="hover:text-white transition">Tracking</a></li>
              <li><a className="hover:text-white transition">Careers</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Support
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a className="hover:text-white transition">Help Center</a></li>
              <li><a className="hover:text-white transition">Privacy Policy</a></li>
              <li><a className="hover:text-white transition">Terms & Conditions</a></li>
              <li><a className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <MdEmail className="text-blue-400 text-lg" />
                support@delivery.com
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-blue-400 text-sm" />
                +880 1XXX-XXXXXX
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition">
                <FaFacebookF />
              </a>

              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition">
                <FaLinkedinIn />
              </a>

              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Delivery. All rights reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Made for modern logistics & parcel delivery.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;