

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.",
    highlight: false,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district within 48–72 hours.",
    highlight: true, // center highlighted card
  },
  {
    title: "Fulfillment Solution",
    description:
      "We offer customized service with inventory management support, order processing, packaging, and after-sales support.",
    highlight: false,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    highlight: false,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    highlight: false,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to exchange their products with online business merchants.",
    highlight: false,
  },
];

const ServicesSection = () => {
  return (
    <section className="bg-[#063B3F] py-16 px-4">
      {/* ===== Container ===== */}
      <div className="max-w-6xl mx-auto">

        {/* ===== Section Title ===== */}
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl md:text-4xl font-bold">
            Our Services
          </h2>
          <p className="text-gray-300 mt-3 text-sm md:text-base">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          </p>
        </div>

        {/* ===== Cards Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((service, index) => (
            <div
              key={index}
              className={`
                rounded-xl p-6 shadow-lg transition duration-300
                hover:scale-[1.03] hover:shadow-2xl
                ${service.highlight
                  ? "bg-lime-300 text-gray-900"
                  : "bg-white text-gray-800"
                }
              `}
            >
              {/* ===== Icon Placeholder (DaisyUI style avatar) ===== */}
              <div className="flex justify-center mb-4">
                <div className="avatar">
                  <div className="w-14 rounded-full bg-gray-100 flex items-center justify-center">
                    🚚
                  </div>
                </div>
              </div>

              {/* ===== Title ===== */}
              <h3 className="text-lg font-bold text-center mb-2">
                {service.title}
              </h3>

              {/* ===== Description ===== */}
              <p className="text-sm text-center opacity-80">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;