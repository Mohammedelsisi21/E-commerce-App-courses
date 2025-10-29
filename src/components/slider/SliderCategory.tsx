import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Flex, Heading, IconButton, Image, Skeleton, SkeletonText, Text } from "@chakra-ui/react";
import { useGetCategoryListQuery } from "@/app/services/categoryApiSlice";
import type { ICategory } from "@/interfaces";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useColorMode } from "../ui/color-mode";
import { Link } from "react-router-dom";

interface IArrow {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}
const NextArrow = ({ onClick }: IArrow) => (
<IconButton
    aria-label="Next"
    onClick={onClick}
    position="absolute"
    right="-35px"
    top="40%"
    translateY={"-50%"}
    zIndex="2"
    borderRadius="full"
    bg="gray.700"
    color="white"
    _hover={{ bg: "teal.500" }}
    size="sm">
        <MdArrowForwardIos />
    </IconButton>
);

const PrevArrow = ({ onClick }: IArrow) => (
    <IconButton
        aria-label="Previous"
        onClick={onClick}
        position="absolute"
        left="-35px"
        top="40%"
        translateY={"-50%"}
        zIndex="2"
        borderRadius="full"
        bg="gray.700"
        color="white"
        _hover={{ bg: "teal.500" }}
        size="sm">
        <MdArrowBackIos />
    </IconButton>
);


const SliderCategory = () => {
    const { colorMode } = useColorMode()
    const isDark = colorMode === "dark"
    const { data, isLoading } = useGetCategoryListQuery({page: 1, pageSize: 30});
    const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    cssEase: "ease-in-out",
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 1 } },
        { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
};

    if(isLoading) {
        return (<>
        <Box className="slider-container" px={4} py={6}>
            <Slider {...settings}>
            {Array.from({length: 9}).map((_, indx) => (
                <Flex key={indx} direction="column" align="center" justify="space-between" borderRadius="lg" p={3} mx={2} minH="280px">
                    <Skeleton w="100%" h="200px" borderRadius="md"/>
                    <SkeletonText mt="4" noOfLines={1} p="2" h="4" w="60%"/>
                </Flex>
            ))}
        </Slider>
    </Box>
        </>)
    }

return (
    <Box className="slider-container" px={4} py={6}>
        <Heading color={isDark ? "teal.600" : "gray.700"} fontWeight={"bold"} size={"3xl"} mb={"5px"}>Category</Heading>
        <Slider {...settings}>
            {data?.data?.map((cate: ICategory) => (
                <Link to={`/categories/${cate.documentId}`}>
                    <Box
                    key={cate.documentId || cate.id}
                    textAlign="center"
                    px={3}
                    pb={2}
                    _hover={{ transform: "scale(1.05)", transition: "0.6s" }}>
                        <Image
                            src={`${import.meta.env.VITE_LOCAL_API}${cate.thumbnail[0].url}`}
                            alt={cate.title}
                            mx="auto"
                            borderRadius="lg"
                            boxSize="200px"
                            objectFit="cover"
                            mb={2}/>
                        <Text fontWeight="bold" fontSize="lg">
                            {cate.title}
                        </Text>
                    </Box>
                </Link>
            ))}
        </Slider>
    </Box>
)
};

export default SliderCategory;
