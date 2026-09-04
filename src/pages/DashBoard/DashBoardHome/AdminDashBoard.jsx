import { useQuery } from "@tanstack/react-query";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import useAuth from "../../../Hooks/useAuth";

import {
  FaBox,
  
  FaTruck,
  FaClock,
  FaBoxOpen,
  FaArrowTrendUp,
  FaShieldHalved,
} from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";

const AdminDashBoard = () => {
  const axiosSecure = useAxiossecure();
  const { user } = useAuth();

  const {
    data: stats = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcel/delivery-status/stats");
      return res.data;
    },
  });

  // Status অনুযায়ী icon ও style
  const getStatusStyle = (status) => {
    const value = status?.toLowerCase();

    if (
      value?.includes("delivered") ||
      value?.includes("complete") ||
      value?.includes("success")
    ) {
      return {
        icon: <FaRegCheckCircle />,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
        numberColor: "text-emerald-600",
      };
    }

    if (
      value?.includes("transit") ||
      value?.includes("delivery") ||
      value?.includes("assigned")
    ) {
      return {
        icon: <FaTruck />,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        numberColor: "text-blue-600",
      };
    }

    if (value?.includes("pending") || value?.includes("pickup")) {
      return {
        icon: <FaClock />,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
        numberColor: "text-amber-600",
      };
    }

    return {
      icon: <FaBoxOpen />,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      numberColor: "text-violet-600",
    };
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="rounded-2xl bg-red-50 px-8 py-6 text-center">
          <p className="font-semibold text-red-600">
            Failed to load dashboard data.
          </p>
          <p className="mt-1 text-sm text-red-400">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      {/* ================= WELCOME SECTION ================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF6B35] via-[#FF7F50] to-[#FF8C42] p-8 text-white shadow-2xl">
        {/* Background decoration */}
        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-20 right-20 h-56 w-56 rounded-full bg-white/5"></div>

        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Admin info */}
          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <div className="relative shrink-0">
              <img
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt={user?.displayName || "Admin"}
                className="h-20 w-20 rounded-2xl border-4 border-white/30 object-cover shadow-lg sm:h-24 sm:w-24"
              />

              {/* Online indicator */}
              <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-blue-600 bg-emerald-400"></span>
            </div>

            {/* Welcome Text */}
            <div>
              <div className="mb-1 flex items-center gap-2">
                <p className="text-sm font-medium text-blue-100">
                  Welcome back
                </p>

                <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm">
                  <FaShieldHalved className="mr-1 inline" />
                  Admin
                </span>
              </div>

              <h1 className="text-2xl font-bold sm:text-3xl">
                {user?.displayName || "Administrator"} 👋
              </h1>

              <p className="mt-1 max-w-xl text-sm text-blue-100 sm:text-base">
                Great to see you again! Here's what's happening with your parcel
                delivery system today.
              </p>
            </div>
          </div>

          {/* Dashboard icon */}
          <div className="hidden rounded-2xl bg-white/10 p-5 backdrop-blur-sm sm:block">
            <FaArrowTrendUp className="text-4xl text-white" />
          </div>
        </div>
      </section>

      {/* ================= PAGE TITLE ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Delivery Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Monitor your parcel delivery activities at a glance.
          </p>
        </div>

        <div className="hidden rounded-xl bg-blue-50 p-3 text-blue-600 sm:block">
          <FaBox className="text-xl" />
        </div>
      </div>

      {/* ================= STATISTICS CARDS ================= */}
      {stats.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center shadow-sm">
          <FaBoxOpen className="mx-auto text-4xl text-gray-300" />

          <h3 className="mt-4 font-semibold text-gray-600">
            No parcel statistics available
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            Parcel data will appear here once available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const style = getStatusStyle(stat._id);

            return (
              <div
                key={stat._id}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Top section */}
                <div className="flex items-start justify-between">
                  {/* Icon */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.iconBg} ${style.iconColor} text-xl transition-transform duration-300 group-hover:scale-110`}
                  >
                    {style.icon}
                  </div>

                  {/* Small icon */}
                  <div className="rounded-lg bg-gray-50 p-2 text-gray-400">
                    <FaArrowTrendUp className="text-sm" />
                  </div>
                </div>

                {/* Status */}
                <div className="mt-5">
                  <p className="text-sm font-medium capitalize text-gray-500">
                    {stat._id?.replaceAll("-", " ")}
                  </p>

                  <h3
                    className={`mt-1 text-4xl font-bold ${style.numberColor}`}
                  >
                    {stat.count}
                  </h3>

                  <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                    Total Parcels
                  </p>
                </div>

                {/* Bottom line */}
                <div
                  className={`absolute bottom-0 left-0 h-1 w-0 ${style.iconColor.replace(
                    "text-",
                    "bg-",
                  )} transition-all duration-300 group-hover:w-full`}
                ></div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= QUICK SUMMARY ================= */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <FaBox />
          </div>

          <div>
            <h3 className="font-bold text-gray-800">Parcel Management</h3>

            <p className="text-sm text-gray-500">
              Keep an eye on your delivery operations and parcel status.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
