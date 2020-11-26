import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function CarouselCustom({ content, desktop, small_desktop, tablet, small_tablet, mobile }) {
  
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1220 },
          items: desktop,
          slidesToSlide: desktop // optional, default to 1.
        },
        small_desktop: {
          breakpoint: { max: 1220, min: 1024 },
          items: small_desktop,
          slidesToSlide: small_desktop // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 800 },
          items: tablet,
          slidesToSlide: tablet // optional, default to 1.
        },
        small_tablet: {
          breakpoint: { max: 800, min: 464 },
          items: small_tablet,
          slidesToSlide: small_tablet // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: mobile,
          slidesToSlide: mobile // optional, default to 1.
        }
      };

    return (
        <div>
            <Carousel
                responsive={responsive}
                draggable={false}
                swipeable={false}
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
