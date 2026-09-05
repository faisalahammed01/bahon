import heroImage from "../../../assets/map.png";

const HeroSection = () => {
  return (
    <section className="bg-[#06082f] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
           

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Merchant & Customer
              <span className="text-blue-400 "> Satisfaction </span>
              Comes First
            </h1>

            <p className="mt-6 text-gray-300 text-lg leading-relaxed max-w-xl">
              Deliver parcels anywhere in Bangladesh with confidence.
              Fast delivery, real-time tracking, affordable pricing and
              secure parcel handling for businesses and individuals.
            </p>

          
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