import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiossecure from "../../../Hooks/useAxiossecure";

const AssignRiders = () => {
  const axiosSecure = useAxiossecure();
  const queryClient = useQueryClient();
  const [selectedParcel, setSelectedParcel] = useState(null);

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", "Parcel-paid"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=Parcel-paid"
      );
      return res.data;
    },
  });

  const { data: riders = [], isLoading: ridersLoading } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`
      );
      return res.data;
    },
  });

  const handleAssignRider = async (rider) => {
    try {
      const assignData = {
        riderId: rider._id,
        riderName: rider.name,
        riderEmail: rider.email,
        parcelId: selectedParcel._id,
        trackingId: selectedParcel.trackingId,
      };

      const res = await axiosSecure.patch(
        `/parcels/${selectedParcel._id}`,
        assignData
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Rider Assigned Successfully",
          text: `${rider.name} assigned to parcel`,
          timer: 2000,
          showConfirmButton: false,
        });

        queryClient.invalidateQueries({
          queryKey: ["parcels", "pending-Pickup"],
        });

        queryClient.invalidateQueries({
          queryKey: ["riders"],
        });

        setSelectedParcel(null);
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Assignment Failed",
        text: error.message,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-3xl font-bold mb-6">
        Assign Riders: {parcels.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Pickup District</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>

                <td>{parcel.parcelName}</td>

                <td>৳ {parcel.cost}</td>

                <td>
                  {new Date(parcel.createdAt).toLocaleDateString()}
                </td>

                <td>{parcel.senderDistrict}</td>

                <td>
                  <button
                    onClick={() => setSelectedParcel(parcel)}
                    className="btn btn-sm bg-blue-950 hover:bg-blue-800 text-white"
                  >
                    Find Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedParcel && (
        <dialog open className="modal">
          <div className="modal-box max-w-4xl">
            <h3 className="text-xl font-bold mb-2">
              Available Riders
            </h3>

            <p className="mb-4 text-gray-600">
              Pickup District:{" "}
              <span className="font-semibold">
                {selectedParcel.senderDistrict}
              </span>
            </p>

            <div className="badge bg-blue-200 text-black mb-4">
              Total Riders: {riders.length}
            </div>

            {ridersLoading ? (
              <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : riders.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  No available riders found.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>District</th>
                      <th>Work Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {riders.map((rider, index) => (
                      <tr key={rider._id}>
                        <td>{index + 1}</td>

                        <td>{rider.name}</td>

                        <td>{rider.email}</td>

                        <td>{rider.district}</td>

                        <td>
                          <span className="badge badge-success">
                            Available
                          </span>
                        </td>

                        <td>
                          <button
                            onClick={() => handleAssignRider(rider)}
                            className="btn btn-success btn-sm"
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="modal-action">
              <button
                onClick={() => setSelectedParcel(null)}
                className="btn"
              >
                Close
              </button>
            </div>
          </div>

          <div
            className="modal-backdrop"
            onClick={() => setSelectedParcel(null)}
          ></div>
        </dialog>
      )}
    </div>
  );
};

export default AssignRiders;