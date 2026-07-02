import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import image1 from "../../../assets/banner/banner1.png";
import image2 from "../../../assets/banner/banner2.png";
import image3 from "../../../assets/banner/banner3.png";


const Banner = () => {
    return (
        <div>
                        <Carousel autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src={image1} />
                    
                </div>
                <div>
                    <img src={image2} />
                 
                </div>
                <div>
                    <img src={image3} />
               
                </div>
            </Carousel>

        </div>
    );
};

export default Banner;