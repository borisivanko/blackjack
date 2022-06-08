import { Card } from './deck'

const getHandValue = (hand: Card[]) => {
	return hand.reduce((prev, current) => {
		let currentValue = 0

		if (typeof current.value === 'string') {
			if (current.value === 'A') currentValue = 11
			else if (['J', 'Q', 'K'].includes(current.value)) currentValue = 10
		} else currentValue = current.value

		return prev + currentValue
	}, 0)
}

export default getHandValue