import { Outlet } from "react-router";
import Logo from "../Componets/Logo/Logo";
import AuthImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <section className="max-w-7xl mx-auto">
      <Logo></Logo>
      {/* input && image Container */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 ">
         <div className="flex-1">
          <img src={AuthImage} alt="Auth" />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
       
      </div>
    </section>
  );
};

export default AuthLayout;
