import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function CarouselCustom({ content }) {

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1220 },
          items: 5,
          slidesToSlide: 5 // optional, default to 1.
        },
        small_desktop: {
          breakpoint: { max: 1220, min: 1024 },
          items: 4,
          slidesToSlide: 4 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 800 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        small_tablet: {
          breakpoint: { max: 800, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        }
      };

    return (
        <div>
            <Carousel
                responsive={responsive}
                draggable
                swipeable
                ssr
                infinite={false}
                arrows
                containerClass="first-carousel-container container">
                
                {content}

            </Carousel>
        </div>
    )
}

export default CarouselCustom
