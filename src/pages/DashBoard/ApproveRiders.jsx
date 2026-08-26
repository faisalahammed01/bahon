import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Check, X, Trash2, MapPin, Mail } from "lucide-react";
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

        // Page change হবে না, শুধু data update হবে
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

        // Page change হবে না
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

  // শুধু pending rider count করার জন্য
  const pendingRiders = riders.filter(
    (rider) => rider.status === "pending"
  );

  // সব rider UI-তে দেখানোর জন্য
  const displayedRiders = riders;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Approve Riders
        </h2>

        <span className="badge badge-warning badge-lg font-semibold">
          {pendingRiders.length} Pending
        </span>
      </div>

      {/* No Riders */}
      {displayedRiders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16">
          <p className="text-gray-500">
            No riders found.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="table w-full">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>District</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {displayedRiders.map((rider, index) => (
                <tr
                  key={rider._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Number */}
                  <td className="text-gray-500">
                    {index + 1}
                  </td>

                  {/* Name */}
                  <td className="font-medium text-gray-800">
                    {rider.name}
                  </td>

                  {/* Email */}
                  <td>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Mail size={14} />
                      {rider.email}
                    </div>
                  </td>

                  {/* District */}
                  <td>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin size={14} />
                      {rider.district}
                    </div>
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`badge badge-outline ${
                        rider.status === "approved"
                          ? "badge-success"
                          : rider.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {rider.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td>
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
                          title="Approve"
                          className="btn btn-circle btn-sm bg-green-100 text-green-600 border-none hover:bg-green-500 hover:text-white"
                        >
                          <Check size={16} />
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
                          title="Reject"
                          className="btn btn-circle btn-sm bg-red-100 text-red-600 border-none hover:bg-red-500 hover:text-white"
                        >
                          <X size={16} />
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
                        title="Delete"
                        className="btn btn-circle btn-sm bg-gray-100 text-gray-600 border-none hover:bg-gray-700 hover:text-white"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApproveRiders;