import { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import ReviewCard from "./ReviewCard";

const Review = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Thousands of customers trust our delivery service for speed,
            reliability, and exceptional support.
          </p>
        </div>

        {/* Slider */}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 2,
            scale: 0.9,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1.5,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="pb-14"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="py-8">
                <ReviewCard review={review} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Review;