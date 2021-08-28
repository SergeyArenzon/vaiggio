import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import "./ImageCarousel.css"

export default function ImageCarousel({images}) {

  const imagesForm = images.map((image) => {
    return (
      <dev style={{height: "300px"}}>
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
