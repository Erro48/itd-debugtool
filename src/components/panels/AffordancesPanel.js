import React, { useState, useEffect } from 'react'
import CardList from '../utils/CardList'

const AffordancesPanel = ({ activeThingDescription, onChange }) => {
	const updateAffordance = (type) => {
		let affordances
		if (activeThingDescription === undefined) return []

		switch (type) {
			case 'properties':
				affordances = activeThingDescription.properties
				break

			case 'actions':
				affordances = activeThingDescription.actions
				break
		}

		return affordances.map((affordance) => {
			return {
				...affordance.value,
				title: affordance.title,
				active: affordance.active == true,
			}
		})
	}

	const [properties, setProperties] = useState(updateAffordance('properties'))
	const [actions, setActions] = useState(updateAffordance('actions'))

	useEffect(() => {
		setProperties(updateAffordance('properties'))
		setActions(updateAffordance('actions'))
	}, [activeThingDescription])

	const handleCardClick = (cardId) => {
		// Merge properties and actions to work with all affordances all at once
		const affordances = [...properties, ...actions]

		// Set as active all the affordance with title === cardId
		affordances.map((affordance) => (affordance.active = false))
		affordances
			.filter((affordance) => affordance.title === cardId)
			.map((affordance) => (affordance.active = true))

		const activeAffordance = affordances.filter(
			(affordance) => affordance.active
		)[0]

		// Define the handler used to update an affordance
		const setStateHandler = (state) => {
			const nextActiveIndex = state.indexOf(activeAffordance)

			return [
				...state.slice(0, nextActiveIndex),
				activeAffordance,
				...state.slice(nextActiveIndex + 1),
			]
		}

		// Update an affordance if the active affordance is of that type
		if (properties.includes(activeAffordance)) {
			setProperties((currentState) => setStateHandler(currentState))
		}

		if (actions.includes(activeAffordance)) {
			setActions((currentState) => setStateHandler(currentState))
		}

		onChange(activeAffordance)
	}

	return (
		<div className='col-12 col-lg-3'>
			<div className='row'>
				<section className='prop-container col-12 col-sm-6 col-lg-12'>
					<header className='pt-3'>
						<h2>Properties</h2>
					</header>
					<CardList
						cards={properties}
						className={'prop-card-list'}
						onCardClick={handleCardClick}
					/>
				</section>
				<section className='prop-container col-12 col-sm-6 col-lg-12'>
					<header className='pt-3'>
						<h2>Actions</h2>
					</header>
					<CardList
						cards={actions}
						className={'prop-card-list'}
						onCardClick={handleCardClick}
					/>
				</section>
			</div>
		</div>
	)
}

export default AffordancesPanel
