import { Link, useNavigate } from "react-router";
import { FaMotorcycle } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-6 overflow-hidden">
      <div className="text-center relative">
        {/* Floating Circles */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>

        {/* Rider Animation */}
        <div className="relative flex justify-center mb-8">
          <div className="animate-bounce">
            <FaMotorcycle className="text-[120px] text-[#2563EB]" />
          </div>

          <div className="absolute -bottom-3 w-32 h-3 bg-black/20 rounded-full blur-md animate-pulse"></div>
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-[#2563EB] drop-shadow-lg">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">
          Oops! Parcel Lost on the Way
        </h2>

        <p className="text-gray-600 max-w-md mx-auto mt-4 text-lg">
          The page you're looking for seems to have taken a wrong delivery route.
          Let&apos;s get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/"
            className="px-8 py-3 rounded-xl bg-[#2563EB] text-white font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            Go Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 rounded-xl border-2 border-[#2563EB] text-[#2563EB] font-semibold hover:bg-[#2563EB] hover:text-white transition duration-300"
          >
            Go Back
          </button>
        </div>

        {/* Delivery Status */}
        <div className="mt-10 flex justify-center">
          <div className="bg-white shadow-xl rounded-2xl px-6 py-4 border border-blue-100">
            <p className="text-sm text-gray-500">
              Delivery Status
            </p>
            <p className="font-bold text-[#2563EB] animate-pulse">
              Route Not Found 🚚
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;