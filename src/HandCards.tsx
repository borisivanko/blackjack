import { chakra, HStack } from '@chakra-ui/react'
import { Card } from './deck'
import { isValidMotionProp, motion } from 'framer-motion'

const ChakraBox = chakra(motion.div, {
	/**
	 * Allow motion props and the children prop to be forwarded.
	 * All other chakra props not matching the motion props will still be forwarded.
	 */
	shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children'
})


const HandCards = ({hand}: { hand: Card[] }) => {
	return (
		<HStack spacing='-92px' h='250px'>
			{hand.map((card, i) => {
				return (
					<ChakraBox key={i} bg='white' w='150px' h='100%' borderRadius='md' boxShadow='lg'
						p='3'
						color={['♦', '♥'].includes(card.suit) ? 'red.500' : 'black'} fontSize='1.75rem'
						animate={{
							y: [-100, 0],
							x: [50, 0],
							scale: [0, 1],
							rotate: [730, 0],
						}}
						// @ts-ignore no problem in operation, although type error appears.
						transition={{
							duration: .7,
							ease: "easeInOut",
						}}>
						<span>{card.value}</span>
						<span>{card.suit}</span>
					</ChakraBox>
				)
			})}
		</HStack>

	)
}

export default HandCards