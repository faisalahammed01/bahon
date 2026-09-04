import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import {
  FaBox,
  FaTruck,
  FaLocationDot,
  FaMoneyBillWave,
  FaArrowTrendUp,
} from "react-icons/fa6";

const UserDashBoard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiossecure();

  const { data: parcels = [], isLoading: parcelLoading } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const { data: payments = [], isLoading: paymentLoading } = useQuery({
    queryKey: ["my-payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (parcelLoading || paymentLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#FF6B35]"></span>
      </div>
    );
  }

  const totalParcels = parcels.length;

  const deliveredParcels = parcels.filter(
    (parcel) => parcel.deliveryStatus === "delivered",
  ).length;

  const inTransitParcels = parcels.filter(
    (parcel) =>
      parcel.deliveryStatus === "driver_assigned" ||
      parcel.deliveryStatus === "in_transit",
  ).length;

  const totalSpent = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0,
  );

  const recentParcels = parcels.slice(0, 5);
  const recentPayments = payments.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF6B35] via-[#FF7F50] to-[#FF8C42] p-8 text-white shadow-2xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 animate-pulse"></div>

        <div className="absolute -bottom-10 left-20 h-32 w-32 rounded-full bg-white/10 animate-bounce"></div>

        <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <img
              src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt=""
              className="h-24 w-24 rounded-3xl border-4 border-white/30 object-cover shadow-xl"
            />

            <div>
              <h1 className="text-3xl font-bold">
                Welcome, {user?.displayName} 👋
              </h1>

              <p className="mt-2 text-orange-100">
                Track your parcels, manage deliveries and stay updated with
                every shipment.
              </p>
            </div>
          </div>

          <div className="hidden md:block">
            <FaArrowTrendUp className="text-6xl opacity-80" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="group rounded-3xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="rounded-2xl bg-orange-100 p-4 text-[#FF6B35] w-fit">
            <FaBox size={24} />
          </div>

          <h2 className="mt-5 text-4xl font-bold text-[#FF6B35]">
            {totalParcels}
          </h2>

          <p className="mt-2 text-gray-500">Total Parcels</p>
        </div>

        <div className="group rounded-3xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="rounded-2xl bg-green-100 p-4 text-green-600 w-fit">
            <FaTruck size={24} />
          </div>

          <h2 className="mt-5 text-4xl font-bold text-green-600">
            {inTransitParcels}
          </h2>

          <p className="mt-2 text-gray-500">In Transit</p>
        </div>

        <div className="group rounded-3xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="rounded-2xl bg-blue-100 p-4 text-blue-600 w-fit">
            <FaLocationDot size={24} />
          </div>

          <h2 className="mt-5 text-4xl font-bold text-blue-600">
            {deliveredParcels}
          </h2>

          <p className="mt-2 text-gray-500">Delivered</p>
        </div>

        <div className="group rounded-3xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="rounded-2xl bg-purple-100 p-4 text-purple-600 w-fit">
            <FaMoneyBillWave size={24} />
          </div>

          <h2 className="mt-5 text-4xl font-bold text-purple-600">
            ${totalSpent}
          </h2>

          <p className="mt-2 text-gray-500">Total Spent</p>
        </div>
      </div>

      {/* Profile */}
      <div className="rounded-3xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Profile Overview
        </h2>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt=""
            className="h-20 w-20 rounded-2xl object-cover"
          />

          <div>
            <h3 className="text-xl font-semibold">{user?.displayName}</h3>

            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Parcels */}
        <div className="rounded-3xl bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Recent Parcels
          </h2>

          <div className="space-y-4">
            {recentParcels.length === 0 ? (
              <div className="rounded-2xl bg-gray-50 p-4 text-center text-gray-500">
                No Parcel Found
              </div>
            ) : (
              recentParcels.map((parcel) => (
                <div
                  key={parcel._id}
                  className="flex items-center justify-between rounded-2xl bg-gray-50 p-4"
                >
                  <div>
                    <h4 className="font-semibold">{parcel.parcelName}</h4>

                    <p className="text-sm text-gray-500">{parcel.trackingId}</p>
                  </div>

                  <span className="badge badge-outline">
                    {parcel.deliveryStatus}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Payments */}
        <div className="rounded-3xl bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Recent Payments
          </h2>

          <div className="space-y-4">
            {recentPayments.length === 0 ? (
              <div className="rounded-2xl bg-gray-50 p-4 text-center text-gray-500">
                No Payment Found
              </div>
            ) : (
              recentPayments.map((payment) => (
                <div
                  key={payment._id}
                  className="flex items-center justify-between rounded-2xl bg-gray-50 p-4"
                >
                  <div>
                    <h4 className="font-semibold">{payment.parcelName}</h4>

                    <p className="text-xs text-gray-500">
                      {payment.transactionId}
                    </p>
                  </div>

                  <span className="font-bold text-green-600">
                    ${payment.amount}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
