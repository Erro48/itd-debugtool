import CardList from '../utils/CardList'
import './asidePanels.css'

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
		<section
			className='td-container col-12 col-lg-6 px-4 px-md-0'
			data-panel='thing-descriptions-panel'
		>
			<header>
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
