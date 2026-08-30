const Works = () => {
  const services = [
    {
      icon: "📦",
      title: "Booking Pick & Drop",
      description:
        "Schedule parcel pickup and delivery with ease. Fast, secure, and reliable service for every shipment.",
    },
    {
      icon: "💳",
      title: "Cash On Delivery",
      description:
        "Collect payments from customers at the time of delivery with complete transparency and security.",
    },
    {
      icon: "🏢",
      title: "Delivery Hub",
      description:
        "Our delivery hubs ensure smooth parcel sorting and efficient distribution across locations.",
    },
    {
      icon: "🚚",
      title: "SME & Corporate Solutions",
      description:
        "Dedicated logistics support for businesses with bulk delivery and customized shipping services.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-4xl font-bold text-slate-900">
            How It Works
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Experience a seamless delivery process from booking to successful
            parcel delivery.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:border-blue-500 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl mb-6 transition-all duration-300">
                <span>{service.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;