import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiossecure from "../../Hooks/useAxiossecure";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Camera,
  ArrowRight,
  Truck,
  Loader2,
} from "lucide-react";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiossecure();

  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();

  const handleRegister = async (data) => {
    if (loading) return;

    setRegisterError("");
    setLoading(true);

    try {
      // ==========================================
      // 1. CHECK PROFILE IMAGE
      // ==========================================
      const profileImg = data.photo?.[0];

      if (!profileImg) {
        throw new Error("Please select a profile photo.");
      }

      // ==========================================
      // 2. CREATE FIREBASE ACCOUNT
      // ==========================================
      await registerUser(data.email, data.password);

      console.log("Firebase account created successfully");

      // ==========================================
      // 3. UPLOAD IMAGE TO IMGBB
      // ==========================================
      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imageResponse = await axios.post(image_API_URL, formData);

      const photoURL = imageResponse?.data?.data?.url;

      if (!photoURL) {
        throw new Error("Profile image upload failed.");
      }

      console.log("Image uploaded successfully:", photoURL);

      // ==========================================
      // 4. UPDATE FIREBASE PROFILE
      // ==========================================
      const userProfile = {
        displayName: data.name,
        photoURL: photoURL,
      };

      await updateUserProfile(userProfile);

      console.log("Firebase profile updated successfully");

      // ==========================================
      // 5. CREATE USER IN MONGODB
      // ==========================================
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL: photoURL,
      };

      const dbResponse = await axiosSecure.post("/users", userInfo);

      console.log("Database response:", dbResponse.data);

      // ==========================================
      // 6. SUCCESS
      // ==========================================

      // If backend successfully responded,
      // registration is complete.
      if (dbResponse.status === 200 || dbResponse.status === 201) {
        console.log("User successfully created in database");

        // Previous requested page থাকলে সেখানে যাবে,
        // otherwise Home page
        const redirectPath =
          location?.state?.from?.pathname || location?.state?.from || "/";

        navigate(redirectPath, { replace: true });
      } else {
        // Fallback
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Registration error:", error);

      // ==========================================
      // FIREBASE ERRORS
      // ==========================================

      if (error?.code === "auth/email-already-in-use") {
        setRegisterError(
          "This email is already registered. Please login instead.",
        );
      } else if (error?.code === "auth/invalid-email") {
        setRegisterError("Please enter a valid email address.");
      } else if (error?.code === "auth/weak-password") {
        setRegisterError("Password must be at least 6 characters.");
      } else if (error?.code === "auth/network-request-failed") {
        setRegisterError(
          "Firebase network error. Please check your internet connection.",
        );
      }

      // ==========================================
      // AXIOS ERRORS
      // ==========================================
      else if (error?.response) {
        setRegisterError(
          error?.response?.data?.message ||
            `Server error: ${error.response.status}`,
        );
      } else if (error?.request) {
        setRegisterError(
          "Network Error. Please make sure your backend server is running.",
        );
      }

      // ==========================================
      // OTHER ERRORS
      // ==========================================
      else {
        setRegisterError(
          error?.message || "Registration failed. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* ==========================================
            BRAND
        ========================================== */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/25 mb-4">
            <Truck className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join <span className="font-semibold text-blue-600">GoParcel</span>{" "}
            today
          </p>
        </div>

        {/* ==========================================
            REGISTER CARD
        ========================================== */}
        <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/60 border border-blue-100 overflow-hidden">
          {/* ==========================================
              FORM
          ========================================== */}
          <form onSubmit={handleSubmit(handleRegister)} className="p-6 sm:p-8">
            {/* ==========================================
                ERROR MESSAGE
            ========================================== */}
            {registerError && (
              <div className="mb-5 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
                <p className="text-sm text-red-600">{registerError}</p>
              </div>
            )}

            {/* ==========================================
                NAME
            ========================================== */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <div
                className={`flex items-center rounded-xl border bg-gray-50 transition-all duration-200 ${
                  errors.name
                    ? "border-red-400"
                    : "border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20"
                }`}
              >
                <User className="ml-4 w-5 h-5 text-gray-400" />

                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  className="w-full bg-transparent px-3 py-3.5 outline-none text-gray-800 placeholder:text-gray-400"
                  placeholder="Enter your full name"
                  disabled={loading}
                />
              </div>

              {errors.name && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* ==========================================
                EMAIL
            ========================================== */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div
                className={`flex items-center rounded-xl border bg-gray-50 transition-all duration-200 ${
                  errors.email
                    ? "border-red-400"
                    : "border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20"
                }`}
              >
                <Mail className="ml-4 w-5 h-5 text-gray-400" />

                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="w-full bg-transparent px-3 py-3.5 outline-none text-gray-800 placeholder:text-gray-400"
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* ==========================================
                PHOTO
            ========================================== */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Profile Photo
              </label>

              <div
                className={`relative flex items-center rounded-xl border bg-gray-50 transition-all duration-200 ${
                  errors.photo
                    ? "border-red-400"
                    : "border-gray-200 hover:border-blue-400"
                }`}
              >
                <Camera className="ml-4 w-5 h-5 text-gray-400" />

                <input
                  type="file"
                  accept="image/*"
                  {...register("photo", {
                    required: "Profile photo is required",
                  })}
                  className="file-input file-input-ghost w-full text-sm text-gray-500 bg-transparent border-0 focus:outline-none"
                  disabled={loading}
                />
              </div>

              <p className="text-xs text-gray-400 mt-1.5">
                JPG, PNG or JPEG image
              </p>

              {errors.photo && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.photo.message}
                </p>
              )}
            </div>

            {/* ==========================================
                PASSWORD
            ========================================== */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div
                className={`flex items-center rounded-xl border bg-gray-50 transition-all duration-200 ${
                  errors.password
                    ? "border-red-400"
                    : "border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20"
                }`}
              >
                <Lock className="ml-4 w-5 h-5 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full bg-transparent px-3 py-3.5 outline-none text-gray-800 placeholder:text-gray-400"
                  placeholder="Create a password"
                  disabled={loading}
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-4 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* ==========================================
                REGISTER BUTTON
            ========================================== */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-700/25 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>

            {/* ==========================================
                LOGIN
            ========================================== */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                state={location.state}
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>

          {/* ==========================================
              SOCIAL LOGIN
          ========================================== */}
          <div className="p-6 sm:p-8 pt-5">
            <SocialLogin />
          </div>
        </div>

        {/* ==========================================
            FOOTER
        ========================================== */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Fast & reliable parcel delivery with{" "}
          <span className="text-blue-600 font-medium">GoParcel</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
