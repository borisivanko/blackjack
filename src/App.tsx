import { useEffect, useRef, useState } from 'react'
import { Card } from './deck'
import { Box, Button, Container, Flex } from '@chakra-ui/react'
import getHandValue from './getHandValue'
import getCard from './getCard'
import HandCards from './HandCards'
import BetChips, { Chip } from './BetChips'
import WinLoseModal from './WinLoseModal'

const App = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [bank, setBank] = useState(5000)
	const [opponentHandValue, setOpponentHandValue] = useState(0)
	const [hand, setHand] = useState<Card[]>([])
	const [bet, setBet] = useState(0)
	const [isWin, setIsWin] = useState<null | boolean>(null)

	const winTimeoutRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

	const handleGameStart = () => {
		setIsPlaying(true)
		setHand([getCard(), getCard()])
		setOpponentHandValue(0)
	}

	const handleHit = () => {
		const newHand = [...hand, getCard()]

		setHand(newHand)

		if (getHandValue(newHand) === 21) {
			setIsWin(true)
			setIsPlaying(false)
			setBank(bank + (bet * 2))
			setBet(0)
		}
		if (getHandValue(newHand) > 21) {
			setIsWin(false)
			setIsPlaying(false)
			setBet(0)
		}
	}

	const handleStand = () => {
		const numberOfCards = 2 + Math.floor(Math.random() * 2)
		const tmpOpponentHand: Card[] = []

		for (let i = 0; i < numberOfCards; i++) {
			tmpOpponentHand.push(getCard())
		}

		const opponentHandValue = getHandValue(tmpOpponentHand)

		setOpponentHandValue(opponentHandValue)
		setIsPlaying(false)


		if (opponentHandValue > 21) {
			setIsWin(true)
			setBank(bank + (bet * 2))
		} else if (opponentHandValue > getHandValue(hand)) {
			setIsWin(false)
		} else {
			setIsWin(true)
			setBank(bank + (bet * 2))
		}

		setBet(0)
	}

	const handleClearBet = () => {
		setBank(bank + bet)
		setBet(0)
	}

	useEffect(() => {
		winTimeoutRef.current = setTimeout(() => {
			setIsWin(null)
		}, 2000)

		return () => clearTimeout(winTimeoutRef.current)
	})

	return (
		<>
			<Box as='main' bg='green.500' minH='100vh'>
				<Container py='5'>
					<Flex align='center' justify='space-between' direction={{sm: 'row', base: 'column'}}>
						<Button onClick={handleStand} disabled={!isPlaying}>Stand</Button>

						<Box my={{sm: '0', base: '5'}}>
							{hand.length ? <HandCards hand={hand}/> : 'Click "Deal"'}
						</Box>


						<Button onClick={handleHit} disabled={!isPlaying}>Hit</Button>
					</Flex>

					<div>
						<Flex justify='space-between' mt='5'>
							<div>Your hand: {getHandValue(hand)}</div>
							<div>Opponent's hand: {opponentHandValue || '?'}</div>
						</Flex>

						<Flex justify='space-between' mt=''>
							<div>Bank: {bank || 'Refresh site to start again'}</div>
							<div>Your bet: {bet}</div>
						</Flex>
					</div>


					<Flex justify={{sm: 'space-between', base: 'space-evenly'}} wrap='wrap' mt='5'>
						<BetChips onClick={(chip: Chip) => {
							setBet(bet + chip.value)
							setBank(bank - chip.value)
						}}
							isPlaying={isPlaying}
							bank={bank}
						/>
					</Flex>


					<Flex justify='center' mt='5'>
						<Button onClick={handleClearBet} disabled={isPlaying} mr='5'>
							Clear bet
						</Button>
						<Button onClick={handleGameStart} disabled={isPlaying || !bet}>
							Deal
						</Button>
					</Flex>
				</Container>
			</Box>

			<WinLoseModal isOpen={typeof isWin === 'boolean'} isWin={isWin} onClose={() => setIsWin(null)}/>
		</>
	)
}

export default App