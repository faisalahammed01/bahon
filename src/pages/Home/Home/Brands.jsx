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

const BrandsLogo = [
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
    <Swiper
      modules={[Autoplay]}
      loop={true}
      autoplay={{ delay: 1000, disableOnInteraction: false }}
      slidesPerView={4}
      centeredSlides={true}
      spaceBetween={30}
    >
      {BrandsLogo.map((logo, index) => (
        <SwiperSlide key={index}>
          <img src={logo} alt={`Brand ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Brands;
