// SliderPage.tsx
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
      <Slider {...settings}>
        <div><h3>Slide 1</h3></div>
        <div><h3>Slide 2</h3></div>
        <div><h3>Slide 3</h3></div>
      </Slider>
    </div>
  );
};

export default SliderPage;
