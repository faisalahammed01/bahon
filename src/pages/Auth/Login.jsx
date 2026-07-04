
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Login = () => {
    const {singInUser} = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleLogin =(data)=>{
    // console.log('Login data:', data);
    singInUser(data.email, data.password)
    .then((result)=>{
        console.log('User logged in:', result.user);
    })
    .catch((error)=>{
        console.error('Login error:', error);
    })
    
}
  return (
    <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome Back</h3>
      <p className="text-center">Login with GoParcel</p>
      
      <form onSubmit={handleSubmit(handleLogin)} className="card-body">
        {/* LOGIN FORM */}
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && <p className="text-red-500">{errors.email.message}</p>}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && <p className="text-red-500">{errors.password.message}</p>}
          {errors.password?.type === "minLength" && <p className="text-red-500">{errors.password.message}</p>}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn bg-[#ACC857] hover:bg-[#579011] text-white mt-4">Login</button>
        </fieldset>
        <p className="">
          Don't have an account? <a className="link link-hover underline text-blue-500" href="/register">Register</a>
        </p>
      </form>
      {/* SOCIAL LOGIN */}
      <SocialLogin />
    </div>
  );
};

export default Login;
