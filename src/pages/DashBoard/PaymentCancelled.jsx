import { XCircle } from "lucide-react";
import { Link } from "react-router";

const PaymentCancelled = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
                <XCircle className="mx-auto text-red-500 w-20 h-20 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Payment Cancelled
                </h2>
                <p className="text-gray-500 mb-6">
                    Your payment was cancelled. Don't worry, no amount has been deducted.
                </p>

                <Link to="/dashboard/myParcels">
                    <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition">
                        Try Again
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentCancelled;