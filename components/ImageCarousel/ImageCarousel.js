import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import "./ImageCarousel.css"

export default function ImageCarousel() {
  const images = [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=714&q=80",
    "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
  ];

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
