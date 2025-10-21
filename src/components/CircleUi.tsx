import { Box } from "@chakra-ui/react";

const CircleUi = () => {
  const circles = [
    { size: "250px", top: "10%", left: "5%", opacity: 0.2 },
    { size: "150px", top: "10%", left: "80%", opacity: 0.22 },
    { size: "180px", top: "70%", left: "20%", opacity: 0.16 },
    { size: "120px", top: "60%", left: "80%", opacity: 0.22 },
    { size: "300px", top: "80%", left: "10%", opacity: 0.008 },
  ];

  return (
    <Box position="absolute" w="100%" h="100%" overflow="hidden" zIndex={1} pointerEvents="none">
      {circles.map((circle, i) => (
        <Box key={i} position="absolute" borderRadius="50%" bg="teal.300" filter="blur(80px)" transition="all 3s ease-in-out" animation="float 8s ease-in-out infinite alternate" {...circle} w={circle.size} h={circle.size}/>
      ))}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) }
            100% { transform: translateY(-40px) }
          }
        `}
      </style>
    </Box>
  );
};

export default CircleUi;
