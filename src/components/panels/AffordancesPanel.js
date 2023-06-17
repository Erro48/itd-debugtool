import React, { useState, useEffect } from 'react'
import CardList from '../utils/CardList'

const AffordancesPanel = ({ activeThingDescription, onChange }) => {
	const updateAffordance = (type) => {
		if (activeThingDescription === undefined) return []

		const affordances =
			type === 'properties'
				? activeThingDescription.properties
				: activeThingDescription.actions

		return affordances.map((affordance) => {
			return {
				...affordance.value,
				title: affordance.name,
				active: affordance.active == true,
			}
		})
	}

	const [properties, setProperties] = useState(updateAffordance('properties'))
	const [actions, setActions] = useState(updateAffordance('actions'))

	// console.log('Prop', properties)

	useEffect(() => {
		setProperties(updateAffordance('properties'))
		setActions(updateAffordance('actions'))
	}, [activeThingDescription])

	const handleCardClick = (id) => {
		const affordances = [...properties, ...actions]

		const nextActive = affordances
			.map((affordance) => {
				if (affordance.title === id) {
					affordance.active = true
					return affordance
				}

				if (affordance.active) {
					affordance.active = false
				}
				return affordance
			})
			.filter((affordance) => affordance.active)[0]

		if (properties.includes(nextActive))
			setProperties((currentState) => {
				const n = currentState.indexOf(nextActive)
				return [
					...currentState.slice(0, n),
					nextActive,
					...currentState.slice(n + 1),
				]
			})

		if (actions.includes(nextActive))
			setActions((currentState) => {
				const n = currentState.indexOf(nextActive)
				return [
					...currentState.slice(0, n),
					nextActive,
					...currentState.slice(n + 1),
				]
			})

		onChange(nextActive)
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
