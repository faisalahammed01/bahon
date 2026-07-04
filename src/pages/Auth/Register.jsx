import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "./SocialLogin";
import axios from "axios";

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();

  const handleRegister = (data) => {
  // console.log(data);
  const profileImg = data.photo[0];

  registerUser(data.email, data.password)
    .then((result) => {
      console.log(result.user);

      // store the image in form data
      const formData = new FormData();
      formData.append("image", profileImg);

      // send the photo store and get the photo url
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

      axios.post(image_API_URL, formData).then((res) => {
        console.log("after img upload", res.data.data.url);

        // Update user Profile to firebase
        const userProfile = {
          displayName: data.name,
          photoURL: res.data.data.url,
        };

        updateUserProfile(userProfile)
          .then(() => {
            console.log("user profile Updated");
          })
          .catch((error) => console.log(error));
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
  return (
    <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome to GoParcel</h3>
      <p className="text-center">Register with GoParcel</p>
      <form className="card-body" onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          {/* Name */}

          <label className="label">Name</label>

          <input
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
            className="input"
            placeholder="Name"
          />

          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}

          {/* EMAIL */}
          <label className="label">Email</label>

          <input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            className="input"
            placeholder="Email"
          />

          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          {/* photo*/}
          <label className="label">Photo</label>

          <input
            type="file"
            {...register("photo", {
              required: "photo is required",
            })}
            className="file-input"
            placeholder="Photo"
          />

          {errors.photo && (
            <span className="text-red-500">{errors.photo.message}</span>
          )}

          {/* PASSWORD */}
          <label className="label">Password</label>

          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="input"
            placeholder="Password"
          />

          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <button className="btn bg-[#ACC857] hover:bg-[#579011] text-white mt-4">
            Register
          </button>
        </fieldset>
        <p className="">
          Already have an account?{" "}
          <a className="link link-hover underline text-blue-500" href="/login">
            Login
          </a>
        </p>
      </form>
      {/* SOCIAL LOGIN */}
      <SocialLogin />
    </div>
  );
};

export default Register;
