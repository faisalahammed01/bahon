import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { registerUser } = useAuth();

  const handleRegister = (data) => {
    // console.log(data);
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
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
      </form>
    </div>
  );
};

export default Register;
