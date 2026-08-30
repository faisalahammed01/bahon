import { FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    question: "How do I book a parcel pickup?",
    answer:
      "Simply create a delivery request, enter pickup and delivery details, and our rider will collect the parcel from your location.",
  },
  {
    question: "Do you offer Cash on Delivery (COD)?",
    answer:
      "Yes, we provide Cash on Delivery services and transfer the collected amount securely to your account.",
  },
  {
    question: "How can I track my parcel?",
    answer:
      "Every parcel receives a unique tracking ID that allows you to monitor its delivery status in real time.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery times vary by location, but most parcels are delivered within 24–72 hours.",
  },
  {
    question: "What happens if a parcel is lost or damaged?",
    answer:
      "Our support team investigates every case. Eligible shipments may receive compensation according to company policy.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
            FAQ
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Find answers to common questions about parcel booking,
            delivery tracking, cash on delivery, and more.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-500 hover:shadow-lg transition-all duration-300"
            >
              <input type="radio" name="faq-accordion" />

              <div className="collapse-title flex items-center gap-3 text-lg font-semibold text-slate-800">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaQuestionCircle className="text-blue-600 text-lg" />
                </div>

                {faq.question}
              </div>

              <div className="collapse-content">
                <p className="text-gray-600 leading-relaxed pl-13">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
       
      </div>
    </section>
  );
};

export default FAQSection;