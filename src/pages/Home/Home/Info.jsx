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
              <div className="flex-1 flex justify-center">
                <img
                  src={liveTrackingImage}
                  alt="Live Parcel Tracking"
                  className="w-72 md:w-96 hover:scale-105 transition duration-300"
                />
              </div>

              <div className="flex-1 space-y-5">
                <div className="badge badge-primary badge-outline">
                  Real-Time Tracking
                </div>

                <h2 className="text-3xl md:text-4xl font-bold">
                  Live Parcel Tracking
                </h2>

                <p className="text-base-content/70 text-lg leading-relaxed">
                  Stay updated in real-time with our live parcel tracking
                  feature. From pick-up to delivery, monitor your shipment's
                  journey and get instant status updates for complete peace of
                  mind.
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
              <div className="flex-1 space-y-5">
                <div className="badge badge-success badge-outline">
                  Secure Shipping
                </div>

                <h2 className="text-3xl md:text-4xl font-bold">
                  100% Safe Delivery
                </h2>

                <p className="text-base-content/70 text-lg leading-relaxed">
                  We ensure your parcels are handled with the utmost care and
                  delivered securely to their destination. Our reliable process
                  guarantees safe and damage-free delivery every time.
                </p>
              </div>

              <div className="flex-1 flex justify-center">
                <img
                  src={safeDeliveryImage}
                  alt="Safe Delivery"
                  className="w-72 md:w-96 hover:scale-105 transition duration-300"
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
              <div className="flex-1 flex justify-center">
                <img
                  src={callsupportImage}
                  alt="24/7 Call Center Support"
                  className="w-72 md:w-96 hover:scale-105 transition duration-300"
                />
              </div>

              <div className="flex-1 space-y-5">
                <div className="badge badge-warning badge-outline">
                  Always Available
                </div>

                <h2 className="text-3xl md:text-4xl font-bold">
                  24/7 Call Center Support
                </h2>

                <p className="text-base-content/70 text-lg leading-relaxed">
                  Our dedicated support team is available around the clock to
                  assist you with any questions, updates, or delivery
                  concerns—anytime you need us.
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