import Banner from "./Banner";
import HeroSection from "./HeroSection";
import Brands from "./Brands";
import FAQSection from "./FAQSection";
import Info from "./Info";
import Review from "./Review";
import ServicesSection from "./ServicesSection";
import Works from "./Works";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Works></Works>
      <ServicesSection></ServicesSection>
      {/* Brands Section */}
      <div>
        <Brands></Brands>
      </div>
      {/* Info Section */}
      <Info></Info>

      <HeroSection></HeroSection>

      <Review reviewsPromise={reviewsPromise}></Review>

      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;
