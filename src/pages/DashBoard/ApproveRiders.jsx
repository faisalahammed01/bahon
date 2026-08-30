
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Check, X, Trash2, MapPin, Mail, Users } from "lucide-react";
import useAxiossecure from "../../Hooks/useAxiossecure";

const ApproveRiders = () => {
  const axiosSecure = useAxiossecure();

  const {
    data: riders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const handleStatusUpdate = async (id, status, name, email) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: `${status === "approved" ? "Approve" : "Reject"} this rider?`,
      text: `Are you sure you want to ${status} ${name}?`,
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
      cancelButtonText: "Cancel",
      confirmButtonColor:
        status === "approved" ? "#16a34a" : "#dc2626",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/riders/${id}`, {
        status,
        email,
      });

      if (res.data.success || res.data.modifiedCount > 0) {
        await Swal.fire({
          icon: "success",
          title: `Rider ${status}`,
          text: `Rider has been ${status}.`,
          timer: 1200,
          showConfirmButton: false,
        });

        refetch();
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Failed to update rider status.",
      });
    }
  };

  const handleDelete = async (id, name) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Delete this rider?",
      text: `Are you sure you want to delete ${name}?`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/riders/${id}`);

      if (res.data.deletedCount > 0) {
        await Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Rider has been deleted.",
          timer: 1200,
          showConfirmButton: false,
        });

        refetch();
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Failed to delete rider.",
      });
    }
  };

  const pendingRiders = riders.filter(
    (rider) => rider.status === "pending"
  );

  const displayedRiders = riders;

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-lg text-blue-600"></span>
          <p className="text-sm text-gray-500">
            Loading riders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Approve Riders
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Manage rider applications and approval status
              </p>
            </div>
          </div>

          {/* Pending Counter */}
          <div className="bg-white border border-gray-100 rounded-xl px-5 py-3 shadow-sm">
            <p className="text-xs text-gray-500 font-medium">
              Pending Applications
            </p>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold text-gray-800">
                {pendingRiders.length}
              </span>

              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Card Top */}
          <div className="px-5 sm:px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Rider Applications
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Review and manage all registered riders
              </p>
            </div>

            <div className="text-sm text-gray-500">
              Total Riders:{" "}
              <span className="font-bold text-gray-800">
                {displayedRiders.length}
              </span>
            </div>
          </div>

          {/* No Riders */}
          {displayedRiders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-5 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-gray-400" />
              </div>

              <h3 className="text-lg font-semibold text-gray-700">
                No Riders Found
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                There are currently no rider applications available.
              </p>
            </div>
          ) : (
            /* Table */
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">

                {/* Table Head */}
                <thead>
                  <tr className="bg-slate-50 text-left">
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      #
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Rider
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Email
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      District
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-100">
                  {displayedRiders.map((rider, index) => (
                    <tr
                      key={rider._id}
                      className="hover:bg-slate-50 transition-colors duration-200"
                    >
                      {/* Number */}
                      <td className="px-5 py-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-sm font-semibold text-gray-600">
                          {index + 1}
                        </span>
                      </td>

                      {/* Rider */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600">
                              {rider.name
                                ? rider.name.charAt(0).toUpperCase()
                                : "R"}
                            </span>
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {rider.name}
                            </p>

                            <p className="text-xs text-gray-400 mt-0.5">
                              Rider
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{rider.email}</span>
                        </div>
                      </td>

                      {/* District */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{rider.district}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${
                            rider.status === "approved"
                              ? "bg-green-50 text-green-700"
                              : rider.status === "rejected"
                              ? "bg-red-50 text-red-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-2 ${
                              rider.status === "approved"
                                ? "bg-green-500"
                                : rider.status === "rejected"
                                ? "bg-red-500"
                                : "bg-amber-500"
                            }`}
                          ></span>

                          {rider.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">

                          {/* Approve */}
                          {rider.status !== "approved" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  rider._id,
                                  "approved",
                                  rider.name,
                                  rider.email
                                )
                              }
                              title="Approve Rider"
                              className="w-9 h-9 rounded-lg flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}

                          {/* Reject */}
                          {rider.status !== "rejected" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  rider._id,
                                  "rejected",
                                  rider.name,
                                  rider.email
                                )
                              }
                              title="Reject Rider"
                              className="w-9 h-9 rounded-lg flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            onClick={() =>
                              handleDelete(
                                rider._id,
                                rider.name
                              )
                            }
                            title="Delete Rider"
                            className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-gray-700 hover:text-white transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Bottom */}
          {displayedRiders.length > 0 && (
            <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-700">
                    {displayedRiders.length}
                  </span>{" "}
                  rider{displayedRiders.length !== 1 ? "s" : ""}
                </p>

                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5 text-green-600">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Approved
                  </span>

                  <span className="flex items-center gap-1.5 text-amber-600">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Pending
                  </span>

                  <span className="flex items-center gap-1.5 text-red-600">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Rejected
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApproveRiders;

