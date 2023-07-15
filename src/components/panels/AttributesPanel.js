import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../utils/Breadcrumbs'
import Attribute from '../utils/Attribute/Attribute'
import './attributesPanel.css'

const AttributesPanel = ({ affordance }) => {
	const attributesValues = new Map()
	const [currentAffordance, setCurrentAffordance] = useState(affordance)

	useEffect(() => {
		if (affordance === undefined) return

		setCurrentAffordance({
			...affordance,
			address: `address/${affordance.title}`,
		})
	}, [affordance])

	if (currentAffordance === undefined) return <></>

	const getAttributes = () => {
		const attributes = []

		// Check for 'uriVariables'
		if (currentAffordance.uriVariables) {
			attributes.push(...Object.values(currentAffordance.uriVariables))
			return attributes
		}

		if (!currentAffordance.input) {
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
		attributesValues.set(title, value)
	}

	const submitRequest = (e) => {
		e.preventDefault()
		console.log(attributesValues)
	}

	return (
		<section className='col col-sm-12 px-0' data-panel='attributes-panel'>
			<header>
				<h2>{affordance.title}</h2>
				<p className='subtitle'>{affordance.address}</p>
			</header>
			<Breadcrumbs path={[affordance.title]} />
			<section className='row px-2'>
				<div className='col-12 col-sm-7 mb-3 mb-sm-0'>
					<ul className='m-0 attributes-list overflow-auto'>
						{getAttributes().map((attribute) => (
							<li key={attribute.title} data-type='attribute'>
								<Attribute
									attribute={attribute}
									onChange={handleAttributeChange}
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
