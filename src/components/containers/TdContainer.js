import Card from '../Card'
import CardList from '../CardList'
import './tdContainer.css'

const cards = [
	{
		title: 'tractor',
		description: 'Is a tractor which goes vroom vroom',
		version: '1.4.0',
		address: 'address/thing/tractor',
	},
	{
		title: 'field',
		description: 'Boring land of dirt',
		version: '3.0.5',
		address: 'address/thing/field',
	},
	{
		title: 'wheat',
		description: 'Vibing in the wind 😎',
		version: '1.0.0',
		address: 'address/thing/wheat',
	},
]

function TdContainer() {
	return (
		<section className='td-container col-12 col-sm-3'>
			<header className='pt-3 px-2'>
				<h2>Thing Descriptions</h2>
				<hr />
			</header>
			<CardList cards={cards} />
		</section>
	)
}

export default TdContainer
