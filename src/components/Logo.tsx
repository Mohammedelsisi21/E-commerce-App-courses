import { animateLogo, lettersLogo } from '../constant'
import { Box } from '@chakra-ui/react'

interface IProps {
  style?: boolean
}

const Logo = ({ style }: IProps) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box as="span" textTransform="uppercase" color={style ? "black" : "white"} fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" fontSize={{ base: "3xl", md: "1xl" }} style={{   WebkitBoxReflect: "below -25px linear-gradient(transparent, rgba(0, 0, 0, 0.43))", }}>
        {lettersLogo.map((letter, i) => (
          <Box as="span" key={i} display="inline-block" position="relative" animation={`${animateLogo} 1s infinite`} animationDelay={`calc(${i + 1} * 0.1s)`}>
            {letter}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Logo
