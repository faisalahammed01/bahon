import { useQuery } from "@tanstack/react-query";
import useAxiossecure from "../../../Hooks/useAxiossecure";

const AssignRiders = () => {
  const axiosSecure = useAxiossecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", "pending-Pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-Pickup"
      );
      return res.data;
    },
  });

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
              <th>Name</th>
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

                <td>{parcel.name}</td>

                <td>৳ {parcel.cost}</td>

                <td>
                  {new Date(parcel.createdAt).toLocaleDateString()}
                </td>

                <td>{parcel.senderDistrict}</td>

                <td>
                  <button className="btn btn-sm btn-primary">
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignRiders;