import { use } from "react";
import review from "../../../assets/customer-top.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";

const Review = ({ reviewsPromise }) => {
    const reviews = use(reviewsPromise);
    
    
    return (
        <div className="my-24">
            <div>
                <img className="mx-auto" src={review} alt="Customer Review" />
                <h2 className="text-3xl  text-center">--What our customers are saying--</h2>
               
            </div>

             <div>
                {/* Swiper component for customer reviews */}
                <Swiper
                loop={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 30,
          stretch: '50%',
          depth: 100,
          modifier: 1,
          scale: 0.75   ,   
          slideShadows: true,
          
        }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
      slidesPerView={2}
      centeredSlides={true}
      spaceBetween={30}
        pagination={true}
        modules={[EffectCoverflow, Pagination,Autoplay]}
        className="mySwiper"
      >
      {reviews.map((review) => (
        <SwiperSlide key={review.id}>
          <ReviewCard review={review} />
        </SwiperSlide>
      ))}
      </Swiper> 
             </div>
        </div>
    );
};

export default Review;