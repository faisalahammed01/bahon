import { Link, NavLink } from "react-router";
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
    `uppercase text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    }`;

  const links = (
    <>
      <li>
        <NavLink className={navLinkClass} to="/services">
          Services
        </NavLink>
      </li>

      <li>
        <NavLink className={navLinkClass} to="/coverage">
          Coverage
        </NavLink>
      </li>

      <li>
        <NavLink className={navLinkClass} to="/about">
          About Us
        </NavLink>
      </li>

      <li>
        <NavLink className={navLinkClass} to="/pricing">
          Pricing
        </NavLink>
      </li>

      <li>
        <NavLink className={navLinkClass} to="/sendParcel">
          Send Parcel
        </NavLink>
      </li>

      <li>
        <NavLink className={navLinkClass} to="/rider">
          Be a Rider
        </NavLink>
      </li>

      <li>
        <NavLink className={navLinkClass} to="/contact">
          Contact
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            className={navLinkClass}
            to="/dashboard/myParcels"
          >
            My Parcels
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-100">
      <div className="navbar max-w-7xl mx-auto px-4">

        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
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
              className="menu menu-sm dropdown-content mt-3 w-64 rounded-2xl bg-white border border-blue-100 shadow-xl p-3 z-[100]"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <Logo />
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1">
            {links}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-3">

          {user ? (
            <>
              {/* User Avatar */}
              <div className="hidden md:flex items-center">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                />
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="btn btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full"
            >
              Login
            </Link>
          )}

          {/* CTA Button */}
          <Link
            to="/rider"
            className="btn bg-blue-600 text-white border-none rounded-full hover:bg-blue-700"
          >
            Be a Rider
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;