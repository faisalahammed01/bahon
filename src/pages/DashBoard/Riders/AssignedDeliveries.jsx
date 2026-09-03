import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiossecure from "../../../Hooks/useAxiossecure";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiossecure();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assigned-deliveries", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}`,
      );

      return res.data;
    },
  });

  const updateStatus = async (parcelId, status, successMessage) => {
    try {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/status`, {
        deliveryStatus: status,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: successMessage,
          timer: 1500,
          showConfirmButton: false,
        });

        refetch();
      }
    } catch (error) {
      console.log(error);

      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  const handlePickedUp = (parcel) => {
    Swal.fire({
      title: "Parcel Picked Up?",
      text: "Confirm parcel pickup.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus(parcel._id, "picked_up", "Parcel Picked Up Successfully");
      }
    });
  };

  const handleInTransit = (parcel) => {
    Swal.fire({
      title: "Move to In Transit?",
      text: "Parcel is on the way.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus(parcel._id, "in_transit", "Parcel is now In Transit");
      }
    });
  };

  const handleDelivered = (parcel) => {
    Swal.fire({
      title: "Mark as Delivered?",
      text: "Confirm successful delivery.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Delivered",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus(parcel._id, "delivered", "Parcel Delivered Successfully");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        {" "}
        <span className="loading loading-spinner loading-lg"></span>{" "}
      </div>
    );
  }

  return (
    <div>
      {" "}
      <h2 className="text-3xl font-bold mb-5">
        My Deliveries ({parcels.length}){" "}
      </h2>
      ```
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Receiver</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.trackingId}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.receiverPhone}</td>
                <td>{parcel.receiverAddress}</td>

                <td>
                  <span className="badge badge-warning">
                    {parcel.deliveryStatus}
                  </span>
                </td>

                <td>
                  {parcel.deliveryStatus === "driver_assigned" && (
                    <button
                      onClick={() => handlePickedUp(parcel)}
                      className="btn btn-info btn-sm text-white"
                    >
                      Picked Up
                    </button>
                  )}

                  {parcel.deliveryStatus === "picked_up" && (
                    <button
                      onClick={() => handleInTransit(parcel)}
                      className="btn btn-warning btn-sm text-white"
                    >
                      In Transit
                    </button>
                  )}

                  {parcel.deliveryStatus === "in_transit" && (
                    <button
                      onClick={() => handleDelivered(parcel)}
                      className="btn btn-success btn-sm text-white"
                    >
                      Deliver
                    </button>
                  )}

                  {parcel.deliveryStatus === "delivered" && (
                    <span className="badge badge-success">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {parcels.length === 0 && (
          <div className="text-center py-10">No deliveries found.</div>
        )}
      </div>
    </div>
  );
};

export default AssignedDeliveries;
