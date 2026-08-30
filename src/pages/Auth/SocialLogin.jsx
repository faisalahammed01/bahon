import { useLocation, useNavigate } from "react-router";

import useAuth from "../../Hooks/useAuth";
import useAxiossecure from "../../Hooks/useAxiossecure";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const axiosSecure = useAxiossecure();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);

        // Created User in the Database
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("user Created in the dataBase", res.data);
          navigate(location?.state || "/");
        });
      })
      .catch((error) => {
        console.error("Google login error:", error);
      });
  };

  return (
    <div className="mb-2">

      {/* OR Divider */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-gray-200"></div>

        <span className="text-xs font-medium text-gray-400 uppercase">
          Or continue with
        </span>

        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Google Login Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="
          w-full
          flex items-center justify-center gap-3
          py-3.5
          px-5
          rounded-xl
          border border-gray-200
          bg-white
          text-gray-700
          font-semibold
          text-sm
          shadow-sm
          hover:border-blue-300
          hover:bg-blue-50
          hover:text-blue-700
          hover:shadow-md
          active:scale-[0.98]
          transition-all duration-300
        "
      >

        {/* Google Icon */}
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white">
          <svg
            aria-label="Google logo"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>

              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>

              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>

              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>

              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
        </div>

        <span>Continue with Google</span>
      </button>

      {/* Security Text */}
      <p className="text-center text-xs text-gray-400 mt-4">
        Secure login powered by Google
      </p>

    </div>
  );
};

export default SocialLogin;