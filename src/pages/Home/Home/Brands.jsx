import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";

import { Autoplay } from "swiper/modules";

const brandsLogo = [
  amazon,
  amazon_vector,
  casio,
  moonstar,
  randstad,
  star,
  start_people,
];

const Brands = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900">
            Trusted By Leading Brands
          </h2>
          <p className="mt-3 text-gray-500">
            Companies that trust our logistics and delivery solutions.
          </p>
        </div>

        {/* Logo Slider */}
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={2500}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          {brandsLogo.map((logo, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 h-28 flex items-center justify-center shadow-sm hover:shadow-lg transition-all duration-300">
                <img
                  src={logo}
                  alt={`Brand ${index + 1}`}
                  className="max-h-12 object-contain grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Brands;