import heroImage from "../../../assets/map.png";

const HeroSection = () => {
  return (
    <section className="bg-[#06082f] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
           

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Merchant & Customer
              <span className="text-blue-400"> Satisfaction </span>
              Comes First
            </h1>

            <p className="mt-6 text-gray-300 text-lg leading-relaxed max-w-xl">
              Deliver parcels anywhere in Bangladesh with confidence.
              Fast delivery, real-time tracking, affordable pricing and
              secure parcel handling for businesses and individuals.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="btn bg-blue-600 hover:bg-blue-700 border-none text-white rounded-xl px-6">
                Become a Merchant
              </button>

              <button className="btn btn-outline border-blue-400 text-blue-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white rounded-xl px-6">
                Earn with ZapShift
              </button>
            </div>
            
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">

              {/* Glow */}
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>

              {/* Image */}
              <img
                src={heroImage}
                alt="Delivery Map"
                className="relative z-10 w-full max-w-lg object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;