import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import { FaLocationDot, FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiossecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            refetch();
          }
        });
    });
  };

  return (
    <div className="min-h-full bg-base-200 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-base-content">
          My Parcels
        </h2>
        <p className="mt-1 text-sm text-base-content/60">
          Manage and track all your parcels from one place.
        </p>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-base-300 bg-base-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Head */}
            <thead>
              <tr className="border-b border-base-300 bg-base-200/70">
                <th className="text-base-content/70 font-semibold">#</th>
                <th className="text-base-content/70 font-semibold">
                  Parcel Name
                </th>
                <th className="text-base-content/70 font-semibold">Cost</th>
                <th className="text-base-content/70 font-semibold">Payment</th>
                <th className="text-base-content/70 font-semibold">
                  Delivery Status
                </th>
                <th className="text-base-content/70 font-semibold">
                  Tracking ID
                </th>
                <th className="text-base-content/70 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {parcels.map((parcel, index) => (
                <tr
                  key={parcel._id}
                  className="border-b border-base-200 last:border-none hover:bg-base-200/40 transition-colors"
                >
                  {/* Number */}
                  <th className="text-base-content/60 font-medium">
                    {index + 1}
                  </th>

                  {/* Name */}
                  <td>
                    <div className="font-semibold text-base-content">
                      {parcel.parcelName}
                    </div>
                  </td>

                  {/* Cost */}
                  <td>
                    <span className="font-semibold text-base-content">
                      ৳{parcel.cost}
                    </span>
                  </td>

                  {/* Payment */}
                  <td>
                    {parcel.paymentStatus === "paid" ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
                        Paid
                      </span>
                    ) : (
                      <Link to={`/dashboard/payment/${parcel._id}`}>
                        <button className="btn btn-sm bg-blue-950 hover:bg-blue-800 text-white">
                          Pay
                        </button>
                      </Link>
                    )}
                  </td>

                  {/* Delivery Status */}
                  <td>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        parcel.deliveryStatus === "delivered"
                          ? "bg-emerald-100 text-emerald-700"
                          : parcel.deliveryStatus === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : parcel.deliveryStatus === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {parcel.deliveryStatus}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/trackParcel/${parcel.trackingId}`}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      title="Track Parcel"
                    >
                      <FaLocationDot />
                      <span className="text-sm">Track</span>
                    </Link>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex items-center gap-2">
                      {/* Edit */}

                      {/* Delete */}
                      <button
                        onClick={() => handleParcelDelete(parcel._id)}
                        className="btn btn-square btn-sm border border-red-200 bg-red-50 text-red-600 shadow-none hover:bg-red-100 hover:border-red-300"
                        title="Delete Parcel"
                      >
                        <FaTrashCan />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {parcels.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-base-200">
              <FaMagnifyingGlass className="text-xl text-base-content/40" />
            </div>

            <h3 className="text-lg font-semibold text-base-content">
              No parcels found
            </h3>

            <p className="mt-1 text-sm text-base-content/50">
              You haven't created any parcels yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyParcel;
