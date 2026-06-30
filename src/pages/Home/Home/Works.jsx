
const Works = () => {
    const services = [
  {
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },]
    return (
        <div>
            <h1 className="text-5xl text-center font-bold my-10">How it Works</h1>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition"
            >
              <div className="mb-6">
                <svg
                  className="w-12 h-12 text-teal-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7h8M8 11h8m-8 4h4M3 6l2-2h14l2 2v10l-2 2H5l-2-2V6z"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {service.title}
              </h3>

              <p className="text-gray-500 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}

           </div>
        </div>
    );
};

export default Works;