import { use } from "react";


const Review = ({ reviewsPromise }) => {
    const reviews = use(reviewsPromise);
    console.log(reviews);
    
    return (
        <div>
            
        </div>
    );
};

export default Review;