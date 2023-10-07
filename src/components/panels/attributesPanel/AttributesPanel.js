import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import Breadcrumbs from '../../utils/Breadcrumbs'
import Banner from '../../utils/Banner'
import AttributesSection from './AttributesSection'
import CodePanelsSection from './CodePanelsSection'
import Footer from './Footer'

import './attributesPanel.css'

const AttributesPanel = ({
	activeAffordance,
	formatAffordance,
	onChangeValue,
	updateNestedAffordance,
}) => {
	// const [affordance, setAffordance] = useState({
	// 	...activeAffordance,
	// 	attributes:
	// 		activeAffordance?.attributes?.map((attribute) => {
	// 			return {
	// 				...attribute,
	// 				value: getInitialValue(attribute),
	// 			}
	// 		}) ?? [],
	// })
	const [affordance, setAffordance] = useState(activeAffordance)
	const mainAffordance = useRef(activeAffordance)

	/**
	 *
	 * @param {*} affToFormat
	 * @returns the formatted affordance
	 */
	// function formatAffordance(affToFormat) {
	// 	if (affToFormat === undefined) return undefined

	// 	// Add 'value' field to attributes' items
	// 	affToFormat.attributes = affToFormat.attributes?.map((attribute) => {
	// 		return { ...attribute, value: getInitialValue(attribute) }
	// 	})

	// 	let attributes = []
	// 	let affordanceFields = affToFormat

	// 	// If are present 'uriVariables', attributes is an array of { uriVariable.title, uriVariable.value}
	// 	if (affToFormat.uriVariables !== undefined) {
	// 		attributes = Object.entries(affToFormat.uriVariables).map((entry) => {
	// 			return {
	// 				title: entry[0],
	// 				...entry[1],
	// 			}
	// 		})
	// 	}

	// 	if (
	// 		affToFormat.input !== undefined ||
	// 		affToFormat.attributes !== undefined
	// 	) {
	// 		// Remove input from affToFormat fields
	// 		const { input, ...tempAffordanceFields } = affToFormat
	// 		attributes =
	// 			affToFormat.attributes === undefined
	// 				? [{ ...affToFormat.input }]
	// 				: [...affToFormat.attributes]

	// 		// If input is an object
	// 		if (
	// 			affToFormat.attributes === undefined &&
	// 			affToFormat.input.type !== 'object' &&
	// 			affToFormat.input.properties === undefined
	// 		) {
	// 			affordanceFields = tempAffordanceFields
	// 		}
	// 	}

	// 	return {
	// 		...affordanceFields,
	// 		address: '',
	// 		attributes,
	// 		value: getInitialValue(affToFormat),
	// 	}
	// }

	// function refreshPage(activeAffordance) {
	// 	// console.log(activeAffordance)
	// 	if (activeAffordance === undefined) return

	// 	activeAffordance.attributes = activeAffordance?.attributes?.map(
	// 		(attribute) => {
	// 			return {
	// 				...attribute,
	// 				value: getInitialValue(attribute),
	// 			}
	// 		}
	// 	)

	// 	let attributes = []
	// 	let affordanceFields = activeAffordance

	// 	if (activeAffordance === undefined) return setAffordance(undefined)

	// 	if (activeAffordance.uriVariables !== undefined) {
	// 		attributes = Object.entries(activeAffordance.uriVariables).map(
	// 			(entry) => {
	// 				return {
	// 					title: entry[0],
	// 					...entry[1],
	// 				}
	// 			}
	// 		)
	// 	}

	// 	if (
	// 		// activeAffordance.uriVariables === undefined &&
	// 		activeAffordance.input !== undefined ||
	// 		activeAffordance.attributes !== undefined
	// 	) {
	// 		// Remove input from activeAffordance fields
	// 		const { input, ...tempAffordanceFields } = activeAffordance
	// 		attributes =
	// 			activeAffordance.attributes === undefined
	// 				? [{ ...activeAffordance.input }]
	// 				: [...activeAffordance.attributes]

	// 		// If input is an object
	// 		if (
	// 			activeAffordance.attributes !== undefined ||
	// 			activeAffordance.input.type === 'object' ||
	// 			activeAffordance.input.properties !== undefined
	// 		) {
	// 			attributes = attributes.map((attribute) => {
	// 				return {
	// 					...attribute,
	// 				}
	// 			})
	// 		} else {
	// 			affordanceFields = tempAffordanceFields
	// 		}
	// 	}

	// 	// console.log(attributes)

	// 	setAffordance({
	// 		...affordanceFields,
	// 		address: '',
	// 		attributes,
	// 		value: getInitialValue(activeAffordance),
	// 	})
	// }

	// Update affordance on attribute change
	useEffect(
		() => setAffordance(formatAffordance(activeAffordance)),
		[activeAffordance]
	)

	/**
	 * Sets newAffordance as the current affordance.
	 * @param {Object} newAffordance the updated affordance
	 * @param {Object} previousAffordance the affordance which was the current before
	 */
	function loadPreviousAffordance(newAffordance, previousAffordance) {
		console.log(newAffordance, previousAffordance)
		const currentAffordance = formatAffordance({
			...newAffordance,
			attributes: newAffordance.attributes.map((attribute) =>
				attribute.title === previousAffordance?.title
					? previousAffordance
					: attribute
			),
		})

		setAffordance(currentAffordance)
		// onChangeValue(currentAffordance)
	}

	if (affordance === undefined) {
		return (
			<section className='col col-sm-12 px-0' data-panel='attributes-panel'>
				<Banner classname='my-5'>No Thing Descriptions loaded...</Banner>
			</section>
		)
	}

	function update(affordance, nestedAffordance) {
		if (affordance.title === nestedAffordance.title) return nestedAffordance

		if (affordance?.attributes === undefined) {
			return affordance
		}

		return {
			...affordance,
			attributes: [
				...affordance?.attributes?.map((attr) =>
					update(attr, nestedAffordance)
				),
			],
		}
		// }
	}

	return (
		<section className='col col-lg-8' data-panel='attributes-panel'>
			<Header affordance={affordance} />

			<Breadcrumbs
				affordance={affordance}
				handleAffordanceChange={loadPreviousAffordance}
			/>
			<section className='row w-100 mx-auto col'>
				<AttributesSection
					affordance={affordance}
					onChange={(newAffordance) => {
						onChangeValue(newAffordance)

						if (mainAffordance.current === undefined)
							mainAffordance.current = activeAffordance

						mainAffordance.current = update(
							mainAffordance.current,
							newAffordance
						)

						updateNestedAffordance(mainAffordance.current)
					}}
				/>

				<CodePanelsSection affordance={affordance} />
			</section>
			<Footer
				affordance={affordance}
				handleAffordanceChange={loadPreviousAffordance}
			/>
		</section>
	)
}

export default AttributesPanel
