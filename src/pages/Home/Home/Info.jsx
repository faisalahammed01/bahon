import liveTrackingImage from "../../../assets/live-tracking.png";
import safeDeliveryImage from "../../../assets/safe-delivery.png";
import callsupportImage from "../../../assets/safe-delivery.png";


const Info = () => {
  return (
    <div className="py-10 space-y-8">

      {/* Section 1 - Live Parcel Tracking */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-3xl p-8 md:p-12 border border-base-300">

            <div className="flex flex-col md:flex-row items-center gap-10">

              {/* Image Box */}
              <div className="w-[320px] h-[260px] md:w-[400px] md:h-[300px] border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={liveTrackingImage}
                  alt="Live Parcel Tracking"
                  className="w-full h-full object-contain bg-base-100 transition duration-300 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-5">
                <div className="badge badge-primary badge-outline">
                  Real-Time Tracking
                </div>

                <h2 className="text-3xl md:text-4xl font-bold">
                  Live Parcel Tracking
                </h2>

                <p className="text-base-content/70 text-lg leading-relaxed">
                  Stay updated in real-time with our live parcel tracking feature.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Safe Delivery */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-3xl p-8 md:p-12 border border-base-300">

            <div className="flex flex-col-reverse md:flex-row items-center gap-10">

              {/* Content */}
              <div className="flex-1 space-y-5">
                <div className="badge badge-success badge-outline">
                  Secure Shipping
                </div>

                <h2 className="text-3xl md:text-4xl font-bold">
                  100% Safe Delivery
                </h2>

                <p className="text-base-content/70 text-lg leading-relaxed">
                  We ensure your parcels are handled with care and delivered securely.
                </p>
              </div>

              {/* Image Box */}
              <div className="w-[320px] h-[260px] md:w-[400px] md:h-[300px] border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={safeDeliveryImage}
                  alt="Safe Delivery"
                  className="w-full h-full object-contain bg-base-100 transition duration-300 hover:scale-105"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Call Center Support */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-3xl p-8 md:p-12 border border-base-300">

            <div className="flex flex-col md:flex-row items-center gap-10">

              {/* Image Box */}
              <div className="w-[320px] h-[260px] md:w-[400px] md:h-[300px] border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={callsupportImage}
                  alt="24/7 Call Center Support"
                  className="w-full h-full object-contain bg-base-100 transition duration-300 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-5">
                <div className="badge badge-warning badge-outline">
                  Always Available
                </div>

                <h2 className="text-3xl md:text-4xl font-bold">
                  24/7 Call Center Support
                </h2>

                <p className="text-base-content/70 text-lg leading-relaxed">
                  Our support team is available 24/7 to assist you anytime.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Info;