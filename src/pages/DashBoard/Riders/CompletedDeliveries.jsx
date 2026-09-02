import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiossecure from "../../../Hooks/useAxiossecure";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiossecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["completedParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=delivered`
      );
      return res.data;
    },
  });

  // Rider Commission
  const calculateEarning = (parcel) => {
    const isSameDistrict =
      parcel.senderDistrict === parcel.receiverDistrict;

    // Same District = 40%
    // Outside District = 30%
    return isSameDistrict
      ? parcel.cost * 0.4
      : parcel.cost * 0.3;
  };

  // Total Earnings
  const totalEarning = parcels.reduce(
    (sum, parcel) => sum + calculateEarning(parcel),
    0
  );

  const handleCashOut = () => {
    Swal.fire({
      title: "Cash Out Request",
      text: `Withdraw ৳${totalEarning.toFixed(2)} ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Cash Out",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Request Sent",
          text: "Cash out request submitted successfully.",
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            Completed Deliveries ({parcels.length})
          </h2>

          <p className="text-green-600 font-bold text-lg mt-2">
            Total Earnings: ৳ {totalEarning.toFixed(2)}
          </p>
        </div>

        <button
          onClick={handleCashOut}
          className="btn btn-success"
          disabled={totalEarning === 0}
        >
          Cash Out
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Parcel Name</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Cost</th>
              <th>Earning</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>

                <td>{parcel.trackingId}</td>

                <td>{parcel.parcelName}</td>

                <td>
                  <div>
                    <p className="font-medium">
                      {parcel.senderName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {parcel.senderPhone}
                    </p>
                    <p className="text-xs text-blue-500">
                      {parcel.senderDistrict}
                    </p>
                  </div>
                </td>

                <td>
                  <div>
                    <p className="font-medium">
                      {parcel.receiverName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {parcel.receiverPhone}
                    </p>
                    <p className="text-xs text-blue-500">
                      {parcel.receiverDistrict}
                    </p>
                  </div>
                </td>

                <td>
                  <span className="font-semibold">
                    ৳ {parcel.cost}
                  </span>
                </td>

                <td>
                  <span className="font-bold text-green-600">
                    ৳ {calculateEarning(parcel).toFixed(2)}
                  </span>
                </td>

                <td>
                  <span className="badge badge-success">
                    {parcel.deliveryStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {parcels.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No completed deliveries found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedDeliveries;