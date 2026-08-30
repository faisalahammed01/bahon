import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import {
  FaMoneyBillWave,
  FaReceipt,
  FaCheckCircle,
} from "react-icons/fa";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiossecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  const totalAmount = payments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0
  );

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-lg text-blue-600"></span>
          <p className="text-sm text-gray-500">Loading payment history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <FaMoneyBillWave className="text-xl text-blue-600" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Payment History
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  View and track all your parcel payments
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
            <p className="text-xs text-gray-500">Total Payments</p>
            <p className="text-xl font-bold text-gray-800">
              {payments.length}
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Total Payment */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Paid
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-2">
                  ৳ {totalAmount.toLocaleString()}
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <FaMoneyBillWave className="text-xl text-green-600" />
              </div>
            </div>
          </div>

          {/* Successful Payments */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Successful Payments
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-2">
                  {payments.length}
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <FaCheckCircle className="text-xl text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Table Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Table Header */}
          <div className="px-5 sm:px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <FaReceipt className="text-gray-600" />
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800">
                Transaction Records
              </h3>

              <p className="text-sm text-gray-500">
                Your recent payment transactions
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">

              <thead>
                <tr className="bg-slate-50 text-left text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-4 font-semibold">
                    #
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Transaction ID
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Amount
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Status
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {payments.length > 0 ? (
                  payments.map((payment, index) => (
                    <tr
                      key={payment._id}
                      className="hover:bg-slate-50 transition-colors duration-200"
                    >
                      {/* Number */}
                      <td className="px-5 py-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-sm font-semibold text-gray-600">
                          {index + 1}
                        </span>
                      </td>

                      {/* Transaction ID */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-700 text-sm">
                            {payment.transactionId || "N/A"}
                          </span>

                          <span className="text-xs text-gray-400 mt-1">
                            Payment transaction
                          </span>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-4">
                        <span className="font-bold text-gray-800">
                          ৳ {Number(payment.amount || 0).toLocaleString()}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
                          <FaCheckCircle className="text-[11px]" />
                          Paid
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-600">
                          {payment.createdAt
                            ? new Date(
                                payment.createdAt
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-5 py-16">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                          <FaReceipt className="text-2xl text-gray-400" />
                        </div>

                        <h3 className="text-lg font-semibold text-gray-700">
                          No Payment History
                        </h3>

                        <p className="text-sm text-gray-500 mt-1 max-w-sm">
                          You haven't made any payments yet. Your payment
                          transactions will appear here.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {payments.length > 0 && (
            <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-700">
                    {payments.length}
                  </span>{" "}
                  payment{payments.length !== 1 ? "s" : ""}
                </p>

                <p className="text-sm text-gray-500">
                  Total:{" "}
                  <span className="font-bold text-gray-800">
                    ৳ {totalAmount.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;