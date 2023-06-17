import { useState } from 'react'
import CardList from '../utils/CardList'
import './tdPanel.css'

function TdPanel({ thingDescriptions, onChange }) {
	const handleCardClick = (id) => {
		const nextActive = thingDescriptions
			.map((thingDescription) => {
				if (thingDescription.active) {
					thingDescription.active = false
				}

				if (thingDescription.title === id) {
					thingDescription.active = true
					thingDescription.properties.map((property) => {
						if (property.active) {
							property.active = false
						}

						if (thingDescription.properties.indexOf(property) == 0) {
							property.active = true
						}
					})
				}
				return thingDescription
			})
			.filter((td) => td.active)[0]

		onChange(nextActive)
	}

	return (
		<section className='td-container col-12 col-lg-3 px-0'>
			<header className='pt-3'>
				<h2>Thing Descriptions</h2>
				<hr />
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
