import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import { FaTruckFast } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#06082f] border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Logo */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-1">
              <span className="text-4xl font-extrabold text-white">
                G
              </span>

              <GiCarWheel className="text-4xl text-blue-400 animate-spin" />

              <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Parcel
              </span>
            </div>

            <p className="text-gray-400 text-sm mt-3 max-w-xs">
              Fast, secure and reliable parcel delivery across Bangladesh.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-400">64+</h3>
              <p className="text-sm text-gray-400">Districts</p>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-400">10K+</h3>
              <p className="text-sm text-gray-400">Deliveries</p>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-400">24/7</h3>
              <p className="text-sm text-gray-400">Support</p>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-blue-400">
              <FaTruckFast className="text-2xl animate-bounce" />
             ______
            </div>

            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 hover:scale-110 duration-300"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-700 hover:scale-110 duration-300"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 hover:scale-110 duration-300"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-5 border-t border-white/10 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} GoParcel. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;