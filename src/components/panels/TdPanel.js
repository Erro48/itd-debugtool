import CardList from '../utils/CardList'
import './panel.css'

function TdPanel({ thingDescriptions, onChange }) {
	const handleCardClick = (cardId) => {
		thingDescriptions.map((td) => (td.active = false))
		thingDescriptions
			.filter((td) => td.title === cardId)
			.map((td) => {
				td.active = true

				td.properties.map((property) => (property.active = false))
				td.properties[0].active = true
			})

		const activeThingDescription = thingDescriptions.filter(
			(td) => td.active
		)[0]

		// Send to parent the new active thing description
		onChange(activeThingDescription)
	}

	return (
		<section className='td-container col-12 col-lg-3 px-0'>
			<header className='pt-3'>
				<h2>Thing Descriptions</h2>
			</header>
			<CardList
				cards={thingDescriptions}
				className={'td-card-list'}
				onCardClick={handleCardClick}
			/>
		</section>
	)
}

export default TdPanel
