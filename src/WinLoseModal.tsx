import { Flex, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'

interface Props {
	isOpen: boolean
	isWin: boolean | null
	onClose: () => void
}

const WinLoseModal = ({isOpen, isWin, onClose}: Props) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay/>

			{/*@ts-ignore onClick*/}
			<ModalContent minW='100vw' minH='100vh' m='0' bg='transparent' onClick='onClose'>
				<Flex w='100vw' h='100vh' justify='center' align='center' fontSize='3rem' color='black'>
					{isWin ? 'You won!' : 'You lost!'}
				</Flex>
			</ModalContent>
		</Modal>
	)
}

export default WinLoseModal