import heroImage from "../../assets/location-merchant.png";

const HeroSection = () => {
  return (
    <section className="bg-[#062b2f] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">

     
        <div className="flex-1">

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold leading-snug">
            Merchant and Customer Satisfaction <br />
            is Our First Priority
          </h1>

          {/* Description */}
          <p className="mt-4 text-sm text-gray-300 leading-relaxed max-w-xl">
            We offer the lowest delivery charge with the highest value along with
            100% safety of your product. Pathao courier delivers your parcels in
            every corner of Bangladesh right on time.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">

            {/* Button 1 */}
            <button className="btn bg-lime-400 text-black hover:bg-lime-500 border-none">
              Become a Merchant
            </button>

            {/* Button 2 */}
            <button className="btn btn-outline border-lime-400 text-lime-300 hover:bg-lime-400 hover:text-black">
              Earn with ZapShift Courier
            </button>

          </div>
        </div>

      
        <div className="flex-1 flex justify-center lg:justify-end">

         
          <div className="w-[320px] h-[260px] md:w-[400px] md:h-[300px] border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center text-gray-400">
            <img src={heroImage} alt="Hero Section Image" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;