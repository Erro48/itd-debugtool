import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../utils/Breadcrumbs'
import Attribute from '../utils/Attribute/Attribute'
import './attributesPanel.css'

const AttributesPanel = ({ affordance }) => {
	const attributesValues = new Map()
	const [currentAffordance, setCurrentAffordance] = useState(affordance)
	const [breadcrumb, setBreadcrumb] = useState([])

	useEffect(() => {
		if (affordance === undefined) return

		setCurrentAffordance({
			...affordance,
			address: `address/${affordance.title}`,
			parents: [],
		})
		setBreadcrumb([affordance.title])
	}, [affordance])

	if (currentAffordance === undefined) return <></>

	const getAttributes = () => {
		const attributes = []

		// Check for 'uriVariables'
		if (currentAffordance.uriVariables) {
			attributes.push(...Object.values(currentAffordance.uriVariables))
			return attributes
		}

		if (!currentAffordance.input && !currentAffordance.properties) {
			return attributes
		}

		if (currentAffordance.properties) {
			attributes.push(...Object.values(currentAffordance.properties))
			return attributes
		}

		// Check for 'input.properties'
		// if (currentAffordance.input.properties) {
		// 	// if (currentAffordance.input.required) {
		// 	// 	const required = currentAffordance.input.required
		// 	// 	currentAffordance.input.properties[required].required = true
		// 	// }

		// 	attributes.push(...Object.values(currentAffordance.input.properties))

		// 	return attributes
		// }

		attributes.push(currentAffordance.input)

		return attributes
	}

	const handleAttributeChange = (title, value) => {
		let currentTitle = title
		let currentValue = value

		currentAffordance.parents.forEach((parent) => {
			const currentMap =
				attributesValues.get(parent.title) === undefined
					? new Map()
					: attributesValues.get(parent.title)
			currentMap.set(currentTitle, currentValue)

			currentTitle = parent.title
			currentValue = currentMap
		})

		attributesValues.set(currentTitle, currentValue)
	}

	const handleObjectExpansion = (newAffordance) => {
		setBreadcrumb((currentState) => {
			return [...currentState, newAffordance.title]
		})

		setCurrentAffordance({
			...newAffordance,
			address: `address/${currentAffordance.title}`,
			parents: [currentAffordance, ...currentAffordance.parents],
		})
	}

	const submitRequest = (e) => {
		e.preventDefault()
		console.log(attributesValues)
	}

	return (
		<section className='col col-sm-12 px-0' data-panel='attributes-panel'>
			<header>
				<h2>{currentAffordance.title}</h2>
				<p className='subtitle mb-0'>{currentAffordance.address}</p>
			</header>
			<Breadcrumbs path={breadcrumb} />
			<section className='row px-2'>
				<div className='col-12 col-sm-7 mb-3 mb-sm-0'>
					<ul className='m-0 attributes-list overflow-auto'>
						{getAttributes().map((attribute) => (
							<li key={attribute.title} data-type='attribute'>
								<Attribute
									attribute={attribute}
									onChange={handleAttributeChange}
									onExpand={handleObjectExpansion}
								/>
							</li>
						))}
					</ul>
				</div>
			</section>
			<footer className='row w-100 m-auto'>
				<div className='col-10'></div>
				<button
					type='button'
					className='button primary-btn col-2'
					onClick={submitRequest}
				>
					Submit
				</button>
			</footer>
		</section>
	)
}

export default AttributesPanel
