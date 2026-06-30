import Banner from "../Banner";
import Brands from "./Brands";
import Info from "./Info";
import Review from "./Review";
import ServicesSection from "./ServicesSection";
import Works from "./Works";

const reviewsPromise = fetch('/reviews.json').then(res=> res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Works></Works>
      <ServicesSection></ServicesSection>
      {/* Brands Section */}
      <div className="mt-10 mb-10">
        <h2 className="text-2xl text-center pb-12 font-bold">
          We've helped thousands of sales teams
        </h2>
        <Brands></Brands>
      </div>
      {/* Info Section */}
      <Info></Info>

      <Review reviewsPromise={reviewsPromise}></Review>
    </div>
  );
};

export default Home;
