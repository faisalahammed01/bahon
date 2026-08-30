
import { FaMotorcycle, FaRegCreditCard } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-[#FF6B35] text-white shadow-md"
        : "text-gray-600 hover:bg-orange-50 hover:text-[#FF6B35]"
    }`;

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-100">
      {/* Drawer Toggle */}
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= MAIN CONTENT ================= */}
      <div className="drawer-content flex min-h-screen flex-col">
        {/* Navbar */}
        <nav className="sticky top-0 z-40 flex h-16 items-center border-b border-gray-200 bg-white px-4 shadow-sm lg:px-6">
          {/* Mobile Menu Button */}
          <label
            htmlFor="my-drawer-4"
            className="btn btn-square btn-ghost mr-3 lg:hidden"
            aria-label="Open sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </label>

          {/* Logo / Title */}
          <div>
            <h1 className="text-lg font-bold text-gray-800">
              Go<span className="text-[#FF6B35]">Parcel</span>
            </h1>
            <p className="hidden text-xs text-gray-400 sm:block">
              Dashboard
            </p>
          </div>

          {/* Right Side */}
          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/"
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-orange-50 hover:text-[#FF6B35] sm:block"
            >
              Home
            </Link>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 bg-gray-50 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-4"
          aria-label="Close sidebar"
          className="drawer-overlay"
        ></label>

        <aside className="flex min-h-full w-72 flex-col border-r border-gray-200 bg-white shadow-xl">
          {/* Sidebar Header */}
          <div className="flex h-16 items-center border-b border-gray-200 px-5">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B35] text-lg font-bold text-white shadow-md">
                G
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Go<span className="text-[#FF6B35]">Parcel</span>
                </h2>

                <p className="text-xs text-gray-400">
                  Delivery Management
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Dashboard Menu
            </p>

            <ul className="space-y-2">
              {/* Home */}
              <li>
                <Link to="/" className={navLinkClass({ isActive: false })}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M3 10.5L12 3l9 7.5" />
                    <path d="M5 9.5V21h14V9.5" />
                    <path d="M9 21v-7h6v7" />
                  </svg>

                  <span>Homepage</span>
                </Link>
              </li>

              {/* My Parcels */}
              <li>
                <NavLink
                  to="/dashboard/myParcels"
                  className={navLinkClass}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>

                  <span>My Parcels</span>
                </NavLink>
              </li>

              {/* Riders */}
              <li>
                <NavLink
                  to="/dashboard/approve-riders"
                  className={navLinkClass}
                >
                  <FaMotorcycle className="h-5 w-5" />

                  <span>Riders</span>
                </NavLink>
              </li>

              {/* Payment History */}
              <li>
                <NavLink
                  to="/dashboard/payment-history"
                  className={navLinkClass}
                >
                  <FaRegCreditCard className="h-5 w-5" />

                  <span>Payment History</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Sidebar Bottom */}
          <div className="border-t border-gray-200 p-4">
            <div className="rounded-xl bg-orange-50 p-4">
              <p className="text-sm font-semibold text-gray-800">
                Need Help?
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Contact GoParcel support
              </p>

              <Link
                to="/"
                className="mt-3 inline-block text-xs font-semibold text-[#FF6B35] hover:underline"
              >
                Go to Homepage →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;

