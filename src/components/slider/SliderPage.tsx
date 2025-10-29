// SliderPage.tsx
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Grid, GridItem, Image } from "@chakra-ui/react";
import img1  from "../../assets/slider-image-1.webp"
import img2 from "../../assets/slider-image-2.webp"
import img3 from "../../assets/slider-image-3.webp"
import img4 from "../../assets/slider-2.webp"
import img5 from "../../assets/grocery-banner-2.webp"
const SliderPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    customPaging: () => (
      <Box mt={2} w={7} h={2} bg={"teal.300"} rounded={"md"}></Box>
  ),
    dotsClass: "slick-dots custom-dots"
  };

  return (

    <Box w="100%" mx="auto">
      <Grid templateColumns={{ base: "1fr", md: "3fr 1fr" }}
        alignItems="self-start">
        <GridItem overflow="hidden" h={{ base: "200px", md: "400px" }}>
          <Slider {...settings}>
            {[img1, img2, img3].map((slide, index) => (
              <Image
                key={index}
                src={slide}
                alt={`Slide-${index + 1}`}
                w="full"
                h={{ base: "180px", md: "380px" }}
                objectFit="cover"
                objectPosition="center"
              />
            ))}
          </Slider>
        </GridItem>
        <GridItem display="flex" flexDir={{base: "row", md: "column"}} h={{ base: "250px", md: "380px" }}>
          <Image src={img4} alt="Grocery 1" h="50%" w={{base: "50%",md: 'full'}} objectFit="cover" objectPosition="right bottom"/>
          <Image src={img5} alt="Grocery 2" h="50%" w={{base: "50%",md: 'full'}} objectFit="cover" objectPosition="right bottom"/>
        </GridItem>
      </Grid>
    </Box>

  );
};

export default SliderPage;
