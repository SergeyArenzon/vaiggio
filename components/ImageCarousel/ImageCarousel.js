import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import PropTypes from 'prop-types';
export default function ImageCarousel({images}) {

  ImageCarousel.propTypes = {
    images: PropTypes.array.isRequired,
  };
  const imagesForm = images.map((image, index) => {
    return (
      <dev key={index} style={{height: "300px"}}>
        <img src={image} style={{ height: "100%", width: "auto" }} />
      </dev>
    );
  });
  return (
    <div>
      <Carousel dynamicHeight={false} width={400}>
        {imagesForm}
      </Carousel>
    </div>
  );
}
