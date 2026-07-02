import { Outlet } from "react-router";
import Logo from "../Componets/Logo/Logo";
import AuthImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Logo></Logo>
      <div className="flex">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <div className="flex-1">
          <img src={AuthImage} alt="Auth" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
