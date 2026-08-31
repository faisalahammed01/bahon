import { FaTruck } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        {/* Logo Animation */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-blue-100"></div>

          <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <FaTruck className="text-3xl text-blue-600" />
          </div>
        </div>

        {/* Brand Name */}
        <h2 className="mt-6 text-3xl font-bold">
          <span className="text-blue-600">Go</span>
          <span className="text-gray-800">Parcel</span>
        </h2>

        {/* Loading Text */}
        <p className="mt-2 text-gray-500 text-sm tracking-wide">
          Delivering your experience...
        </p>

        {/* Dots Animation */}
        <div className="flex gap-2 mt-5">
          <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></span>
          <span
            className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.15s" }}
          ></span>
          <span
            className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;