import CardList from '../CardList'
import './propContainer.css'

const cards = [
	{
		title: 'angle',
		description: 'A specified angle',
		address: 'address/thing/wheat/angle',
	},
	{
		title: 'color',
		description: 'LED matrix color',
		address: 'address/thing/wheat/color',
	},
	{
		title: 'coords',
		description: 'Coordinates of the robotic arm',
		address: 'address/thing/wheat/coords',
	},
]

function PropContainer() {
	return (
		<section className='prop-container col-12 col-sm-3'>
			<header className='pt-3 px-2'>
				<h2>Properties</h2>
				<hr />
			</header>
			<CardList cards={cards} />
		</section>
	)
}

export default PropContainer
