import CardList from '../utils/CardList'
import './propertyPanel.css'

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

function PropertyPanel() {
	return (
		<section className='prop-container col-12'>
			<header className='pt-3'>
				<h2>Properties</h2>
				<hr />
			</header>
			<CardList cards={cards} className={'prop-card-list'} />
		</section>
	)
}

export default PropertyPanel
