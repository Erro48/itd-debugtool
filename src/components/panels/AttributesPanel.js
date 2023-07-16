import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../utils/Breadcrumbs'
import Attribute from '../utils/Attribute/Attribute'
import './attributesPanel.css'
import Icon from '../utils/Icon'

const AttributesPanel = ({ affordance }) => {
	const attributesValues = new Map()
	/* { title: title, attributes: [ { title, value } ] } */
	const [currentAffordance, setCurrentAffordance] = useState(affordance)
	const [breadcrumb, setBreadcrumb] = useState([])
	const [history, setHistory] = useState([])

	useEffect(() => {
		if (affordance === undefined) return

		setCurrentAffordance({
			...affordance,
			address: `address/${affordance.title}`,
			parents: [],
		})
		setBreadcrumb([affordance.title])
		setHistory((currentState) => {
			return [
				...currentState,
				{
					title: affordance.title,
					attributes: [],
					parent: null, // prendi quello prima
					children: [],
				},
			]
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
		const parents = [currentAffordance, ...currentAffordance.parents]

		parents.forEach((parent) => {
			const currentMap =
				attributesValues.get(parent.title) === undefined
					? new Map()
					: attributesValues.get(parent.title)
			currentMap.set(currentTitle, currentValue)

			currentTitle = parent.title
			currentValue = currentMap
		})

		attributesValues.set(currentTitle, currentValue)

		setHistory((currentHistory) => {
			currentHistory
				.filter((aff) => aff.title === currentAffordance.title)
				.forEach((item) => {
					if (
						item.attributes.filter((attr) => attr.title === title).length === 0
					) {
						// If the attribute is not present
						item.attributes.push({ title, value })
						return
					}

					// If it is already present, update the value
					item.attributes.filter((attr) => attr.title === title)[0].value =
						value
				})

			return currentHistory
		})
	}

	const handleObjectExpansion = (newAffordance) => {
		setBreadcrumb((currentState) => {
			return [...currentState, newAffordance.title]
		})

		/* Aggiungo newAffordance come figlio dell'affordance corrente */
		setHistory((currentState) => {
			return currentState
				.filter((aff) => aff.title === currentAffordance.title)
				.map((aff) => aff.children.push(newAffordance.title))
		})

		/* Aggiungo newAffordance nella history */
		setHistory((currentState) => {
			currentState.push({
				title: newAffordance.title,
				attributes: [],
				parent: currentAffordance.title,
				children: [],
			})
			return currentState
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

	const openParent = () => {
		setCurrentAffordance({
			...currentAffordance.parents[0],
			summary: attributesValues,
		})
		setBreadcrumb((currentState) => {
			return currentState.filter(
				(element) => element !== currentAffordance.title
			)
		})
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
									summary={
										history.filter(
											(aff) => aff.title === attribute.title
										)[0] !== undefined
											? history.filter(
													(aff) => aff.title === attribute.title
											  )[0].attributes
											: []
									}
									onChange={handleAttributeChange}
									onExpand={handleObjectExpansion}
								/>
							</li>
						))}
					</ul>
				</div>
			</section>
			<footer className='row w-100 m-auto'>
				{currentAffordance.parents.length > 0 ? (
					<button className='col-1 btn light-btn' onClick={openParent}>
						<Icon
							src={'./icons/left-arrow-dark.svg'}
							alt={'Go to previous attribute'}
						/>
					</button>
				) : (
					<div className='col-1'></div>
				)}

				<div className='col-9'></div>

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
