    import { FaQuestionCircle } from "react-icons/fa";

    const faqs = [
    {
        question: "How does this posture corrector work?",
        answer:
        "It gently aligns your shoulders, back, and spine to encourage natural posture correction throughout the day.",
    },
    {
        question: "Is it suitable for all ages and body types?",
        answer:
        "Yes, it is fully adjustable and designed to fit most body types comfortably, including teenagers and adults.",
    },
    {
        question: "Does it really help with back pain and posture improvement?",
        answer:
        "With consistent use, it can reduce back strain and train your body to maintain healthier posture habits.",
    },
    {
        question: "Does it have smart features like vibration alerts?",
        answer:
        "Advanced versions include smart sensors that gently vibrate when you slouch to remind you to correct posture.",
    },
    {
        question: "How will I be notified when the product is back in stock?",
        answer:
        "You will receive instant email or SMS alerts once the product becomes available again.",
    },
    ];

    const FAQSection = () => {
    return (
        <section className="relative py-20 px-4 bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 overflow-hidden">

        {/* Decorative Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/20 blur-3xl rounded-full"></div>

        <div className="max-w-4xl mx-auto relative z-10">

            {/* Header */}
            <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                Frequently Asked Questions
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
                Everything you need to know about posture support & smart correction
            </p>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div
                key={index}
                className="collapse collapse-arrow bg-white/70 backdrop-blur-md border border-gray-200 shadow-md rounded-2xl hover:shadow-xl transition-all duration-300"
                >
                <input type="radio" name="faq-accordion" />

                <div className="collapse-title flex items-center gap-3 text-lg font-semibold text-gray-800">
                    <FaQuestionCircle className="text-black text-xl" />
                    {faq.question}
                </div>

                <div className="collapse-content text-gray-600 pl-10">
                    <p className="pt-2 leading-relaxed">{faq.answer}</p>
                </div>
                </div>
            ))}
            </div>

            {/* CTA Button */}
               
            <div className="text-center mt-12">
             <button className="btn bg-[#062b2f] text-white  hover:bg-[#081c1e]  border-none">
               Explore More FAQs →
            </button>
            </div>
        </div>
        </section>
    );
    };

    export default FAQSection;