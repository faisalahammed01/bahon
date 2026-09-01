import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiossecure from "../../../Hooks/useAxiossecure";

const Payment = () => {
  const { parcelId } = useParams();

  const axiosSecure = useAxiossecure();

  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentinfo = {
      cost: parcel?.cost,
      parcelId: parcel?._id,
      senderEmail: parcel?.senderEmail,
      parcelName: parcel?.parcelName,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentinfo);
    console.log(res.data);
    window.location.href = res.data.url; // Redirect to the Stripe checkout page
  };

  if (isLoading) {
    return <span className="loading loading-infinity loading-xl"></span>;
  }
  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Complete Your Payment
        </h2>
        <p className="text-gray-500 mb-6">
          for <span className="font-medium text-gray-700">{parcel?.parcelName}</span>
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500 mb-1">Amount to pay</p>
          <p className="text-3xl font-bold text-blue-950">৳{parcel?.cost}</p>
        </div>

        <button
          className="btn w-full bg-blue-950 hover:bg-blue-800 text-white"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
