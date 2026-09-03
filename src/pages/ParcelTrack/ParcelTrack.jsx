import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";

const ParcelTrack = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();

  const {
    data: trackings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tracking", trackingId],

    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}`);
      return res.data;
    },

    enabled: !!trackingId,
  });

  const getStatusIcon = (status) => {
    const lowerStatus = status.toLowerCase();

    if (lowerStatus.includes("created")) {
      return <FaBox className="text-white text-lg" />;
    }

    if (lowerStatus.includes("pickup")) {
      return <FaMapMarkerAlt className="text-white text-lg" />;
    }

    if (lowerStatus.includes("transit")) {
      return <FaTruck className="text-white text-lg" />;
    }

    if (lowerStatus.includes("deliver")) {
      return <FaCheckCircle className="text-white text-lg" />;
    }

    return <FaBox className="text-white text-lg" />;
  };

  const getStatusColor = (status) => {
    const lowerStatus = status.toLowerCase();

    if (lowerStatus.includes("deliver")) {
      return "from-green-500 to-emerald-600";
    }

    if (lowerStatus.includes("transit")) {
      return "from-purple-500 to-indigo-600";
    }

    if (lowerStatus.includes("pickup")) {
      return "from-blue-500 to-cyan-600";
    }

    return "from-orange-500 to-amber-600";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500">
          Something went wrong!
        </h2>
      </div>
    );
  }

  if (trackings.length === 0) {
    return (
      <div className="text-center py-20">
        <FaBox className="mx-auto text-6xl text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-600">
          No Tracking Information Found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
          Parcel Tracking
        </h1>

        <p className="text-slate-500 mt-3">
          Track every step of your parcel journey
        </p>

        <div className="mt-4 inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-medium">
          Tracking ID: {trackingId}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-5 top-0 h-full w-1 bg-gradient-to-b from-blue-500 via-cyan-500 to-green-500 rounded-full"></div>

        {trackings.map((tracking, index) => (
          <div
            key={tracking._id}
            className="relative flex gap-6 mb-8 group"
          >
            {/* Icon */}
            <div
              className={`relative z-10 w-11 h-11 rounded-full bg-gradient-to-r ${getStatusColor(
                tracking.status
              )} flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300`}
            >
              {getStatusIcon(tracking.status)}
            </div>

            {/* Card */}
            <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 p-5">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">
                      Step {index + 1}
                    </span>

                    <span className="text-lg font-bold text-slate-800">
                      {tracking.status}
                    </span>
                  </div>

                  <p className="text-slate-600 leading-relaxed">
                    {tracking.details}
                  </p>
                </div>

                <div className="text-sm text-slate-500 whitespace-nowrap">
                  {new Date(tracking.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParcelTrack;