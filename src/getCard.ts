import deck from './deck'

const getCard = () => {
	return deck[Math.floor(Math.random() * deck.length - 1)]
}

export default getCard