import AsidePanel from './AsidePanel'

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
		<AsidePanel
			sections={[
				{
					title: 'Thing Descriptions',
					list: thingDescriptions,
					handleElementClick: handleCardClick,
				},
			]}
			dataSection={'thing-descriptions-panel'}
		/>
	)
}

export default TdPanel
