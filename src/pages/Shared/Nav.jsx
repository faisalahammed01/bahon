import { Link, NavLink } from "react-router";
import Logo from "../../Componets/Logo/Logo";
import useAuth from "../../Hooks/useAuth";

const Nav = () => {
  const { user,logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        // Logout successful
      })
      .catch((error) => {
        // Handle logout error
        console.error(error);
      });
  };



const links =
<>
<li><NavLink className='uppercase hover:bg-[#ACC857] hover:text-white' to='/services'>Services</NavLink></li>
<li><NavLink className='uppercase hover:bg-[#ACC857] hover:text-white' to='/coverage'>Coverage</NavLink></li>
<li><NavLink className='uppercase hover:bg-[#ACC857] hover:text-white' to='/about'>About Us</NavLink></li>
<li><NavLink className='uppercase hover:bg-[#ACC857] hover:text-white' to='/pricing'>Pricing</NavLink></li>
<li><NavLink className='uppercase hover:bg-[#ACC857] hover:text-white' to='/blog'>Blog</NavLink></li>
<li><NavLink className='uppercase hover:bg-[#ACC857] hover:text-white' to='/contact'>Contact</NavLink></li>
  
</>

return (
  <div className="navbar bg-base-100 shadow-sm">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
        </div>
        <ul
          tabIndex="-1"
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          {/* Links */}
          {links}
        </ul>
      </div>
      <Logo />
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        {/* Links */}
        {links}
      </ul>
    </div>
    <div className="navbar-end">
      {
        user? <a   onClick={handleLogout} className="btn  hover:bg-[#ACC857] hover:text-white">
          Log Out
        </a> : <Link to="/login" className="btn  hover:bg-[#ACC857]text-white">
          Login
        </Link>
      }
      <Link to="/beARider" className="btn bg-[#E8F6BB] hover:bg-[#ACC857] hover:text-white">
         BE a Rider
        </Link>
    </div>
  </div>

)}

export default Nav;