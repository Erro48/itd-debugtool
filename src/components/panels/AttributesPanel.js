import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../utils/Breadcrumbs'
import Attribute from '../utils/Attribute/Attribute'
import Banner from '../utils/Banner'
import './attributesPanel.css'
import CodePanel from './CodePanel'
import Icon from '../utils/Icon'

const getInitialValue = (attribute) => {
	if (attribute.value !== undefined) {
		return attribute.value
	}

	if (attribute.enum !== undefined) {
		return attribute.enum[0]
	}

	if (attribute.type === undefined) {
		return getInitialValue(attribute.input)
	}

	if (attribute.type === 'string') {
		return ''
	}

	if (attribute.type === 'array') {
		return [getInitialValue(attribute.items)]
	}

	if (attribute.minimum !== undefined) {
		return attribute.minimum
	}

	if (attribute.maximum !== undefined) {
		return attribute.maximum
	}

	return 0
}

/**
 * attribute:
 *
 * Nella sezione 'actions':
 * - Senza 'input': non ha parametri (mostrare schermata "niente parametri" o simili).
 * - 'input' di tipo oggetto:
 * 		- Senza 'properties': non ha senso.
 * 		- 'properties': va gestita come 'actions', quindi chiamare ricorsivamente.
 * 		- ha un attributo 'summary', che sarà una mappa "nome attributo di properties" --> "valore"
 * - 'input' di un altro tipo: ha un attributo "value" che:
 * 		- inizialmente sarà impostato con un valore di default (per esempio il minimo).
 * 		- successivamente avrà il valore impostato dall'utente.
 * 		- per il tipo array il valore di "value" sarà uguale per ogni elemento dell'array
 */

const AttributesPanel = ({ activeAffordance }) => {
	const [affordance, setAffordance] = useState(activeAffordance)

	const refreshPage = (activeAffordance) => {
		if (activeAffordance === undefined) return

		if (activeAffordance.affordanceType === 'actions') {
			// If not has input and properties
			if (
				activeAffordance.input === undefined &&
				activeAffordance.attributes === undefined
			) {
				setAffordance({
					...activeAffordance,
					address: `address/${activeAffordance.title}`,
					attributes: [],
				})
				return
			}

			// Remove input from activeAffordance fields
			const { input, ...affordanceFields } = activeAffordance
			const attributes =
				activeAffordance.attributes === undefined
					? [{ ...activeAffordance.input }]
					: [...activeAffordance.attributes]

			// If input is an object
			if (
				activeAffordance.attributes !== undefined ||
				activeAffordance.input.type === 'object' ||
				activeAffordance.input.properties !== undefined
			) {
				// Bisogna aggiungere il campo 'summary'
				setAffordance({
					...activeAffordance,
					address: `address/${activeAffordance.title}`,
					// summary: ['init'],
					attributes: attributes.map((attribute) => {
						return {
							...attribute,
							summary: [],
						}
					}),
				})
				return
			}

			// For other types of input
			setAffordance({
				...affordanceFields,
				address: `address/${activeAffordance.title}`,
				value: getInitialValue(activeAffordance),
				attributes: attributes,
			})

			return
		}

		setAffordance({
			...activeAffordance,
			address: `address/${activeAffordance.title}`,
			attributes: [],
		})
	}

	// Update affordance on attribute change
	useEffect(() => refreshPage(activeAffordance), [activeAffordance])

	if (affordance === undefined)
		return (
			<section className='col col-sm-12 px-0' data-panel='attributes-panel'>
				<Banner classname='my-5 w-50'>No Thing Descriptions loaded...</Banner>
			</section>
		)

	const displayAttributesList = (attributes) => {
		if (attributes === undefined || attributes.length === 0) {
			return <Banner type='info'>No attributes</Banner>
		}

		return (
			<ul className='m-0 attributes-list overflow-auto'>
				{attributes.map((attribute) => (
					<li>
						<Attribute
							attribute={attribute}
							onChange={handleChange}
							onExpand={handleExpand}
						/>
					</li>
				))}
			</ul>
		)
	}

	const getAttributeValue = (summary, title, property) => {
		const filteredValues = summary.filter((prop) => prop.title === title)

		if (property.value !== undefined) {
			return property.value
		}

		if (filteredValues.length === 0) {
			return getInitialValue(property)
		}

		return filteredValues[0]
	}

	/*********************
	 *     Handlers      *
	 *********************/
	const handleSubmit = () => {
		console.log(affordance)
	}

	const handleChange = (title, value) => {
		/*
		Devo aggiornare i value dentro ad attributes
		affordance.attributes.map(element => {...element, value: value})
		*/
		setAffordance((currentState) => {
			const updatedAttribute = currentState.attributes
				.filter((attribute) => attribute.title === title)
				.map((attribute) => {
					return {
						...attribute,
						value: value,
					}
				})[0]

			const newAttributes = currentState.attributes.map((attribute) => {
				if (attribute.title === updatedAttribute.title) {
					return updatedAttribute
				}

				return attribute
			})
			return { ...currentState, attributes: newAttributes }
		})
	}

	const handleExpand = (newAffordance) => {
		const newProperties = (
			newAffordance.attributes === undefined
				? Object.entries(newAffordance.properties)
				: newAffordance.attributes.map((attribute) => [
						attribute.title,
						attribute,
				  ])
		).map((property) => {
			const [title, value] = property
			return {
				...value,
				value: getAttributeValue(newAffordance.summary, title, value),
			}
		})

		// const newProperties = Object.entries(newAffordance.properties).map(
		// 	(property) => {
		// 		const [title, value] = property
		// 		console.log({ property, title, value })
		// 		return {
		// 			...value,
		// 			value: getAttributeValue(newAffordance.summary, title, value),
		// 		}
		// 	}
		// )

		refreshPage({
			...newAffordance,
			address: affordance.address,
			affordanceType: affordance.affordanceType,
			attributes: newProperties,
			parent: affordance,
		})

		// activeAffordance = {
		// 	...newAffordance,
		// 	properties: newProperties,
		// }
		// setAffordance((currentState) => {
		// 	return {
		// 		...newAffordance,
		// 		address: affordance.address,
		// 		input: newProperties,
		// 	}
		// })
	}

	return (
		<section className='col col-sm-12 px-0' data-panel='attributes-panel'>
			<header className='px-2'>
				<h2>{affordance.title}</h2>
				<p className='subtitle mb-0'>{affordance.address}</p>
			</header>
			<Breadcrumbs path={[]} />
			<section className='row mb-1 w-100 m-auto ps-2'>
				<div className='col-12 col-sm-7 mb-3 mb-sm-0 ps-0'>
					{displayAttributesList(affordance.attributes)}
				</div>
				<div className='col-12 col-sm-5 p-0'>
					<div class='row gap-1'>
						<div class='col-12'>
							<CodePanel type='input' />
						</div>
						<div class='col-12'>
							<CodePanel type='output' />
						</div>
					</div>
				</div>
			</section>
			<footer className='row w-100 m-auto'>
				{affordance.parent !== undefined ? (
					<button
						className='col-1 button light-btn'
						onClick={() =>
							refreshPage({
								...affordance.parent,
								attributes: [affordance],
							})
						}
					>
						<Icon
							src={'./icons/left-arrow-dark.svg'}
							alt={`Go to ${affordance.parent.title} attribute`}
						/>
					</button>
				) : (
					<div className='col-1'></div>
				)}

				<div className='col-9'></div>

				<button
					type='button'
					className='button primary-btn col'
					onClick={handleSubmit}
				>
					Submit
				</button>
			</footer>
		</section>
	)
}

export default AttributesPanel
