import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiossecure from "../../Hooks/useAxiossecure";
// import { Link } from "react-router-dom";


const PaymentSuccess = () => {
    const axiosSecure = useAxiossecure();
    const [paymentInfo, setPaymentInfo] = useState({});
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get("session_id");
  console.log(sectionId);

  useEffect(() => {
    if (sectionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sectionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
            amount: res.data.amount,
          });
        });
    }
  }, [sectionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <CheckCircle className="mx-auto text-green-500 w-20 h-20 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-500 mb-6">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 text-left text-sm text-gray-900 mb-6 space-y-1">
          <p>
            <span className="font-medium">Transaction ID:</span> {paymentInfo?.transactionId}
          </p>
          <p>
            <span className="font-medium">Tracking ID:</span> {paymentInfo?.trackingId}
          </p>
          {/* <p>
            <span className="font-medium">Amount:</span> {paymentInfo?.amount}
          </p> */}
          {/* <p>
            <span className="font-medium">Date:</span>
            {new Date().toLocaleDateString()}
          </p> */}
        </div>

        {/* <Link
                    to="/"
                    className="inline-block w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition"
                >
                    Go to Home
                </Link> */}
      </div>
    </div>
  );
};

export default PaymentSuccess;
