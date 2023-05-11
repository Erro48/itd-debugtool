import CardList from '../utils/CardList'
import './tdPanel.css'

// const cards = [
// 	{
// 		title: 'tractor',
// 		description: 'Is a tractor which goes vroom vroom',
// 		version: '1.4.0',
// 		address: 'address/thing/tractor',
// 	},
// 	{
// 		title: 'field',
// 		description: 'Boring land of dirt',
// 		version: '3.0.5',
// 		address: 'address/thing/field',
// 	},
// 	{
// 		title: 'wheat',
// 		description: 'Vibing in the wind 😎',
// 		version: '1.0.0',
// 		address: 'address/thing/wheat',
// 	},
// ]

function TdPanel({ thingDescriptions }) {
	return (
		<section className='td-container col-12 col-lg-3 px-0'>
			<header className='pt-3'>
				<h2>Thing Descriptions</h2>
				<hr />
			</header>
			<CardList cards={thingDescriptions} className={'td-card-list'} />
		</section>
	)
}

export default TdPanel
