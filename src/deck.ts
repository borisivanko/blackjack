type CardValueType = 'A' | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'J' | 'Q' | 'K'
type CardSuitType = '♣' | '♦' | '♥' | '♠'

export interface Card {
	value: CardValueType,
	suit: CardSuitType
}

let deck: Card[] = []
const suits: CardSuitType[] = ['♣', '♦', '♥', '♠']
const values: CardValueType[] = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']

for (const suit in suits) {
	for (const value in values) {
		deck.push({value: values[value], suit: suits[suit]})
	}
}

export default deck