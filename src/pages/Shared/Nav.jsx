import { Link, NavLink } from "react-router";
import {
  FaMapLocationDot,
  FaBoxOpen,
  FaTableColumns,
  FaMotorcycle,
  FaRightFromBracket,
} from "react-icons/fa6";
import Logo from "../../Componets/Logo/Logo";
import useAuth from "../../Hooks/useAuth";

const Nav = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const navLinkClass = ({ isActive }) =>
    `group relative flex items-center gap-2 px-4 py-2 text-[15px] font-semibold rounded-xl transition-all duration-300
    ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
        : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
    }`;

  const links = (
    <>
      <li>
        <NavLink className={navLinkClass} to="/coverage">
          <FaMapLocationDot className="text-sm" />
          Coverage
        </NavLink>
      </li>

      <li>
        <NavLink className={navLinkClass} to="/sendParcel">
          <FaBoxOpen className="text-sm" />
          Send Parcel
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink className={navLinkClass} to="/dashboard">
            <FaTableColumns className="text-sm" />
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="navbar max-w-7xl mx-auto px-4 lg:px-6 py-2">
          {/* Navbar Start */}
          <div className="navbar-start">
            {/* Mobile Menu */}
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-4 w-72 rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 z-[100]"
              >
                {links}
              </ul>
            </div>

            {/* Logo */}
            <Logo />
          </div>

          {/* Navbar Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-2">{links}</ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end gap-3">
            {user ? (
              <>
                {/* User Info */}
                <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-200 px-3 py-2 rounded-full">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 transition-all duration-300 hover:scale-110"
                  />

                  <div className="leading-tight">
                    <p className="font-semibold text-slate-800 text-sm">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs text-slate-500">
                      Welcome Back 👋
                    </p>
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="btn btn-sm bg-white border border-slate-300 text-slate-700 hover:bg-red-50 hover:border-red-200 hover:text-red-600 rounded-xl"
                >
                  <FaRightFromBracket />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn btn-sm bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                Login
              </Link>
            )}

            {/* Rider Button */}
            <Link
              to="/rider"
              className="btn btn-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none rounded-xl shadow-lg shadow-blue-200 hover:scale-105 transition-all duration-300"
            >
              <FaMotorcycle />
              Be a Rider
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;