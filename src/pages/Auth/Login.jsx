import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "./SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Truck,
} from "lucide-react";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { singInUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    setLoginError("");

    singInUser(data.email, data.password)
      .then((result) => {
        console.log("User logged in:", result.user);

        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.error("Login error:", error);

        setLoginError(
          "Invalid email or password. Please check your information."
        );
      });
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* ================= BRAND ================= */}
        <div className="text-center mb-7">

          {/* Logo */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/25 mb-4">
            <Truck className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue with{" "}
            <span className="font-semibold text-blue-600">
              GoParcel
            </span>
          </p>
        </div>

        {/* ================= CARD ================= */}
        <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/60 border border-blue-100 overflow-hidden">

          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="p-6 sm:p-8"
          >

            {/* Login Error */}
            {loginError && (
              <div className="mb-5 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
                <p className="text-sm text-red-600">
                  {loginError}
                </p>
              </div>
            )}

            {/* ================= EMAIL ================= */}
            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div
                className={`
                  flex items-center rounded-xl border bg-gray-50
                  transition-all duration-200
                  ${
                    errors.email
                      ? "border-red-400 focus-within:ring-2 focus-within:ring-red-100"
                      : "border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20"
                  }
                `}
              >
                <Mail className="ml-4 w-5 h-5 text-gray-400" />

                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="w-full bg-transparent px-3 py-3.5 outline-none text-gray-800 placeholder:text-gray-400"
                  placeholder="Enter your email"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* ================= PASSWORD ================= */}
            <div className="mb-4">

              <div className="flex items-center justify-between mb-2">

                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Forgot Password?
                </button>

              </div>

              <div
                className={`
                  flex items-center rounded-xl border bg-gray-50
                  transition-all duration-200
                  ${
                    errors.password
                      ? "border-red-400 focus-within:ring-2 focus-within:ring-red-100"
                      : "border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20"
                  }
                `}
              >

                <Lock className="ml-4 w-5 h-5 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message:
                        "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full bg-transparent px-3 py-3.5 outline-none text-gray-800 placeholder:text-gray-400"
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
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

            {/* ================= REMEMBER ================= */}
            <div className="flex items-center gap-2 mb-6">

              <input
                type="checkbox"
                className="checkbox checkbox-sm border-gray-300 checked:bg-blue-600 checked:border-blue-600"
              />

              <span className="text-sm text-gray-500">
                Remember me
              </span>

            </div>

            {/* ================= LOGIN BUTTON ================= */}
            <button
              type="submit"
              className="
                group w-full
                flex items-center justify-center gap-2
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                py-3.5
                rounded-xl
                transition-all duration-300
                shadow-md shadow-blue-600/20
                hover:shadow-lg hover:shadow-blue-700/25
                active:scale-[0.98]
              "
            >
              Login to GoParcel

              <ArrowRight
                className="
                  w-5 h-5
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              />
            </button>

            {/* ================= REGISTER ================= */}
            <p className="text-center text-sm text-gray-500 mt-6">

              Don't have an account?{" "}

              <Link
                to="/register"
                state={location.state}
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Create an account
              </Link>

            </p>

          </form>

        

          {/* ================= SOCIAL LOGIN ================= */}
          <div className="p-6 sm:p-8 pt-5">
            <SocialLogin />
          </div>

        </div>

        {/* ================= FOOTER TEXT ================= */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Fast & reliable parcel delivery with{" "}
          <span className="text-blue-600 font-medium">
            GoParcel
          </span>
        </p>

      </div>

    </div>
  );
};

export default Login;