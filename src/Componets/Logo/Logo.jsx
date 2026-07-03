import { NavLink } from "react-router";
import logo from "../../assets/logo.png";
const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <img width="30" src={logo} alt="Logo" />
            <NavLink to="/" className="text-3xl font-bold -ms-2">GoParcel</NavLink>
        </div>
    );
};

export default Logo;