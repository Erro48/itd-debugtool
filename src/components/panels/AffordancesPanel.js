import React, { useState, useEffect } from 'react'
import CardList from '../utils/CardList'
import './asidePanels.css'

const AffordancesPanel = ({ activeThingDescription, onChange }) => {
	/**
	 * Returns an array of objects in the form (* are optional):
	 * { title, description, input*, active, affordanceType, type }
	 * @param {string} type of the affordance ("properties" or "actions")
	 * @returns an array of objects
	 */
	const getAffordancesByType = (type) => {
		let affordances

		// if no TD is set, return an empty array
		if (activeThingDescription === undefined) return []

		// get affordances of one type (properties or actions)
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
				title: affordance.title,
				...{ ...affordance.value },
				active: affordance.active == true,
				affordanceType: type,
			}
		})
	}

	const [properties, setProperties] = useState(
		getAffordancesByType('properties')
	)
	const [actions, setActions] = useState(getAffordancesByType('actions'))

	// when 'activeThingDescription' changes, update 'properties' and 'actions'
	useEffect(() => {
		setProperties(getAffordancesByType('properties'))
		setActions(getAffordancesByType('actions'))
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

			// Inserts 'activeAffordance' in the same position in was before
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
		<section className='col-12 col-lg-6 px-0' data-panel='affordances-panel'>
			<div className='row w-100 m-auto'>
				<section
					className='col-12 col-sm-6 col-lg-12 px-0'
					data-panel='affordance-panel'
				>
					<header>
						<h2>Properties</h2>
					</header>
					<CardList
						cards={properties}
						className={'affordance-card-list'}
						onCardClick={handleCardClick}
					/>
				</section>
				<section
					className='col-12 col-sm-6 col-lg-12 px-0'
					data-panel='affordance-panel'
				>
					<header>
						<h2>Actions</h2>
					</header>
					<CardList
						cards={actions}
						className={'affordance-card-list'}
						onCardClick={handleCardClick}
					/>
				</section>
			</div>
		</section>
	)
}

export default AffordancesPanel
