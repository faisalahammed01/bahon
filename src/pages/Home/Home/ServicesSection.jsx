const services = [
  {
    icon: "🚀",
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in major cities across Bangladesh.",
  },
  {
    icon: "🌍",
    title: "Nationwide Delivery",
    description:
      "Home delivery service available in every district with reliable coverage.",
    highlight: true,
  },
  {
    icon: "📦",
    title: "Fulfillment Solution",
    description:
      "Inventory management, packaging, order processing and after-sales support.",
  },
  {
    icon: "💵",
    title: "Cash on Delivery",
    description:
      "Secure cash collection and timely payment settlement for merchants.",
  },
  {
    icon: "🏢",
    title: "Corporate Service",
    description:
      "Customized logistics support for businesses and enterprise clients.",
  },
  {
    icon: "🔄",
    title: "Parcel Return",
    description:
      "Easy reverse logistics and product return management.",
  },
];

const ServicesSection = () => {
  return (
    <section className="bg-[#06082f] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white">
            Our Services
          </h2>
          <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
            Reliable logistics solutions designed for individuals,
            businesses and e-commerce merchants.
          </p>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 bg-white transition-all duration-300
                hover:shadow-xl border
                ${
                  service.highlight
                    ? "border-blue-500"
                    : "border-gray-100"
                }`}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-4">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed">
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