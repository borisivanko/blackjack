import { Button } from '@chakra-ui/react'

export interface Chip {
	value: number
	color: string
}

interface Props {
	onClick: (chip: Chip) => void
	isPlaying: boolean
	bank: number
}

const chips = [
	{value: 1, color: 'red'},
	{value: 5, color: 'blue'},
	{value: 10, color: 'yellow'},
	{value: 25, color: 'purple'},
	{value: 50, color: 'orange'},
	{value: 100, color: 'teal'},
	{value: 500, color: 'pink'}
]

const BetChips = ({onClick, isPlaying, bank}: Props) => {
	return (
		<>
			{
				chips.map((chip) =>
					<Button border='5px dashed white'
						color='white'
						onClick={() => onClick(chip)}
						w='60px'
						h='60px'
						m={{sm: '0', base: '3'}}
						borderRadius='full'
						bg={`${chip.color}.500`}
						_hover={{
							bg: `${chip.color}.600`
						}}
						disabled={chip.value > bank || isPlaying}
					>
						{chip.value}</Button>
				)
			}
		</>
	)
}

export default BetChips