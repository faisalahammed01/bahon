import { NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { GiCarWheel } from "react-icons/gi";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Existing Logo Image */}
      <img width="35" src={logo} alt="GoParcel Logo" />

      <NavLink
        to="/"
        className="text-3xl font-bold flex items-center"
      >
        G
        <GiCarWheel className="text-black text-[32px] animate-spin" />
        Parcel
      </NavLink>
    </div>
  );
};

export default Logo;