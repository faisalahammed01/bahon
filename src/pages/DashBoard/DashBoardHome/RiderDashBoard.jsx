import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiossecure from "../../../Hooks/useAxiossecure";

import { FaTruck, FaBoxOpen, FaClock, FaRegCheckCircle } from "react-icons/fa";
import { FaMotorcycle, FaArrowTrendUp } from "react-icons/fa6";

const RiderDashBoard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiossecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["rider-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}`,
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        {" "}
        <span className="loading loading-spinner loading-lg text-blue-600"></span>{" "}
      </div>
    );
  }

  const totalAssigned = parcels.length;

  const delivered = parcels.filter(
    (item) => item.deliveryStatus === "delivered",
  ).length;

  const inDelivery = parcels.filter(
    (item) =>
      item.deliveryStatus === "in_transit" ||
      item.deliveryStatus === "driver_assigned",
  ).length;

  const cancelled = parcels.filter(
    (item) => item.deliveryStatus === "cancelled",
  ).length;

  const stats = [
    {
      title: "Assigned Parcels",
      value: totalAssigned,
      icon: <FaBoxOpen />,
      color: "text-violet-600",
      bg: "bg-violet-100",
    },
    {
      title: "Delivered",
      value: delivered,
      icon: <FaRegCheckCircle />,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      title: "In Delivery",
      value: inDelivery,
      icon: <FaTruck />,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Cancelled",
      value: cancelled,
      icon: <FaClock />,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="space-y-7">
      {/* Hero */}{" "}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF6B35] via-[#FF7F50] to-[#FF8C42] p-8 text-white shadow-2xl">
        {" "}
        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10"></div>
        ```
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={user?.photoURL}
              alt=""
              className="h-20 w-20 rounded-2xl border-4 border-white/30 object-cover"
            />

            <div>
              <p className="text-blue-100">Welcome Rider</p>

              <h2 className="text-3xl font-bold">{user?.displayName}</h2>

              <p className="text-sm text-blue-100">
                Manage your assigned deliveries and track performance.
              </p>
            </div>
          </div>

          <FaMotorcycle className="hidden text-5xl sm:block" />
        </div>
      </section>
      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
              >
                {stat.icon}
              </div>

              <FaArrowTrendUp className="text-gray-400" />
            </div>

            <h3 className={`mt-4 text-4xl font-bold ${stat.color}`}>
              {stat.value}
            </h3>

            <p className="mt-2 text-sm text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>
      {/* Performance Summary */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-800">Delivery Summary</h3>

        <p className="mt-2 text-gray-500">
          You have completed {delivered} deliveries out of
          {totalAssigned} assigned parcels.
        </p>
      </div>
    </div>
  );
};

export default RiderDashBoard;
