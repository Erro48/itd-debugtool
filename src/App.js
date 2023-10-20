import { useEffect, useRef, useState } from 'react'
import Header from './components/navbar/Header'
import AffordancesPanel from './components/panels/AffordancesPanel'
import TdPanel from './components/panels/TdPanel'
import AttributesPanel from './components/panels/attributesPanel/AttributesPanel'
import {
	addIdentifierToChildAttribute,
	getAddress,
	getInitialValue,
	mobileCheck,
} from './js/utils'

window.mobileCheck = mobileCheck

function App() {
	// array with all the thing descriptions loaded
	const [thingDescriptions, setThingDescriptions] = useState([])

	// array with all the affordances of the tds loaded
	const affordances = useRef([])

	// object with the thing description in use
	const [activeThingDescription, setActiveThingDescription] = useState()

	// object with the affordance in use
	const [activeAffordance, setActiveAffordance] = useState()

	const [repoError, setRepoError] = useState()
	const [showRepoError, setShowRepoError] = useState(false)

	function getAffordancePath(affordance) {
		if (affordance.parent === undefined) return [affordance]
		return [...getAffordancePath(affordance.parent), affordance]
	}

	// Updates activeAffordance
	function updateActiveAffordance(affordance) {
		affordance = formatAffordance(affordance)

		/* If the affordance is not in affordances, it means that is a nested attribute */
		if (
			affordances.current.filter((aff) => aff.title === affordance?.title)
				.length === 0
		) {
			const affordancePath = getAffordancePath(affordance)
			// previousParent is the first affordance (the one in affordances)
			const firstParent = affordances.current.filter(
				(aff) => aff.title === affordancePath[0]?.title
			)[0]
			let tmpParent = firstParent

			// affordances.current.filter(aff => aff.title === firstParent.title)[0].attributes
			for (let i = 1; i < affordancePath.length; i++) {
				tmpParent = tmpParent.attributes.filter(
					(attr) => attr.title === affordancePath[i].title
				)[0]
				tmpParent = formatAffordance({
					...tmpParent,
					input: {
						type: 'object',
						properties: tmpParent?.properties,
					},
				})
			}
		}

		if (affordance?.title === activeAffordance?.title) {
			// sto aggiornando la stessa affordance
			setActiveAffordance(affordance)
		} else {
			const newAffordance = affordances.current.filter(
				(aff) => aff.title === affordance?.title
			)[0]

			if (newAffordance === undefined) {
				// cerco nelle properties di activeAffordance
				const tmp = affordance
				setActiveAffordance(tmp)
				return
			}

			setActiveAffordance(newAffordance)
		}

		updateAffordancesArray(activeAffordance)
	}

	function updateAffordancesArray(affordanceToUpdate) {
		// Save values of the modified active affordance
		affordances.current = affordances.current.map((affordance) =>
			affordance.title === affordanceToUpdate?.title
				? { ...affordance, ...affordanceToUpdate }
				: affordance
		)
	}

	/**
	 * Add the thing description passed in the current list of thing descriptions
	 * @param {*} thingDescription to be added to the list
	 */
	function handleRepoLoad(thingDescription) {
		setThingDescriptions((state) => {
			// If it is the first thing description
			if (state.length === 0) {
				// Set the first affordance as active
				if (thingDescription.properties.length !== 0) {
					thingDescription.properties[0] = {
						...thingDescription.properties[0],
						active: true,
					}
				} else if (thingDescription.actions.length !== 0) {
					thingDescription.actions[0] = {
						...thingDescription.actions[0],
						active: true,
					}
				}

				// Set td as active
				thingDescription = { ...thingDescription, active: true }
				return [thingDescription]
			}

			// If not already in, add to the list
			if (
				state.filter((td) => td.title === thingDescription.title).length === 0
			) {
				return [...state, thingDescription]
			}

			// If already in, replace it
			state = state
				.filter((td) => td.title === thingDescription.title)
				.map(() => thingDescription)

			return state
		})
	}

	const handleRepoError = (error) => {
		setRepoError(error)
		setShowRepoError(true)
	}

	// on repo load
	useEffect(() => {
		const activeTd =
			thingDescriptions.filter((td) => td.active).length === 0
				? thingDescriptions[0]
				: thingDescriptions.filter((td) => td.active)[0]

		if (activeTd === undefined) {
			setActiveThingDescription(undefined)
			setActiveAffordance(undefined)
			return
		}

		activeTd.active = true
		setActiveThingDescription(activeTd)

		// carico le affordance delle thing description caricate
		affordances.current = [
			...affordances.current,
			...thingDescriptions
				.filter(
					(td) =>
						!affordances.current
							.map((affordance) => affordance.thingDescription)
							.includes(td.title)
				)
				.map((td) => {
					return [...td.properties, ...td.actions].map((affordance) => {
						return { thingDescription: td.title, ...affordance }
					})
				})
				.reduce((prev, current) => [...prev, ...current], [])
				.map((affordance) => formatAffordance(affordance))
				.map((affordance) => {
					affordance.attributes = affordance.attributes.map((attribute) => {
						return {
							title:
								attribute.title ??
								addIdentifierToChildAttribute(affordance.title),
							...attribute,
						}
					})
					return affordance
				}),
		]

		// Filtro le affordances appartenenti a td ancora presenti (caso di eliminazione di TD)
		affordances.current = affordances.current.filter((affordance) =>
			thingDescriptions
				.map((td) => td.title)
				.includes(affordance.thingDescription)
		)

		setActiveAffordance(
			affordances.current.filter(
				(affordance) => affordance.thingDescription === activeTd.title
			)[0] ?? affordances.current[0]
		)
	}, [thingDescriptions])

	// on activeThingDescription change
	useEffect(() => {
		if (activeThingDescription === undefined) return

		// if is not present an active affordance, activeAff is the first in list
		let activeAff =
			affordances.current.filter((affordance) => affordance.active)[0] ??
			affordances.current[0]

		// se non è presente un'affordance attiva, prendo la prima di affordances.current
		if (
			affordances.current.filter((affordance) => affordance.active)[0] ===
			undefined
		) {
			activeAff = affordances.current[0]
		} else {
			// se è presente, devo prendere la prima di activeThingDescription
			activeAff = affordances.current.filter(
				(affordance) =>
					affordance.thingDescription === activeThingDescription.title
			)[0]
		}

		activeAff.active = true
		setActiveAffordance(activeAff)
	}, [activeThingDescription])

	const handleThingDescriptionChange = (newThingDescription) => {
		setActiveThingDescription(newThingDescription)

		if (window.mobileCheck()) {
			document
				.querySelector('[data-panel="affordances-panel"]')
				.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const handleAffordanceChange = (newAffordance) => {
		// If it's the same affordance, don't update it
		if (newAffordance.title !== activeAffordance?.title) {
			updateActiveAffordance(newAffordance)
		}

		if (window.mobileCheck()) {
			document
				.querySelector('[data-panel="attributes-panel"]')
				.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const handleRemoveThingDescription = (title) => {
		setThingDescriptions((state) => state.filter((td) => td.title !== title))
		setActiveAffordance(undefined)
		affordances.current = affordances.current.filter(
			(affordance) => affordance.thingDescription !== title
		)
	}

	function formatAffordance(affToFormat) {
		if (affToFormat === undefined) return undefined

		// Add 'value' field to attributes' items
		affToFormat.attributes = affToFormat.attributes?.map((attribute) => {
			return { ...attribute, value: getInitialValue(attribute) }
		})

		let attributes = []
		let affordanceFields = affToFormat

		// If are present 'uriVariables', attributes is an array of { uriVariable.title, uriVariable.value}
		if (affToFormat.uriVariables !== undefined) {
			attributes = Object.entries(affToFormat.uriVariables).map((entry) => {
				return {
					title: entry[0],
					...entry[1],
				}
			})
		}

		if (
			affToFormat.input !== undefined ||
			affToFormat.attributes !== undefined
		) {
			// Remove input from affToFormat fields
			const { input, ...tempAffordanceFields } = affToFormat
			attributes =
				affToFormat.attributes === undefined
					? [{ ...affToFormat.input }]
					: [...affToFormat.attributes]

			// If input is an object
			if (
				affToFormat.attributes === undefined &&
				affToFormat.input.type !== 'object' &&
				affToFormat.input.properties === undefined
			) {
				affordanceFields = tempAffordanceFields
			}
		}

		return {
			...affordanceFields,
			address: getAddress(
				affordanceFields,
				thingDescriptions.filter(
					(td) => td.title === affordanceFields.thingDescription
				)[0]
			),
			attributes,
			value: getInitialValue(affToFormat),
		}
	}

	return (
		<main className='App'>
			<Header onRepoLoad={handleRepoLoad} onError={handleRepoError} />

			<div className='container-fluid p-0'>
				<div className='row w-100 mx-auto'>
					<aside className='aside-panel col-12 col-lg-3'>
						<div className='row'>
							<div className='col-12 col-lg-6 p-0'>
								<TdPanel
									thingDescriptions={thingDescriptions}
									onChange={handleThingDescriptionChange}
									onRemoveThingDescription={handleRemoveThingDescription}
								/>
							</div>
							<div className='col-12 col-lg-6 p-0'>
								<AffordancesPanel
									activeThingDescription={activeThingDescription}
									onChange={handleAffordanceChange}
								/>
							</div>
						</div>
					</aside>

					<div className='col-12 col-lg-9 d-sm-block'>
						<div className='row mx-auto container px-0 h-100'>
							<div className='d-none d-lg-block col-lg-2'></div>
							<AttributesPanel
								activeAffordance={activeAffordance}
								formatAffordance={formatAffordance}
								onChangeValue={(affordance) =>
									updateActiveAffordance(affordance)
								}
								updateNestedAffordance={(affordance) => {
									affordances.current = affordances.current.map((aff) => {
										if (aff.title === affordance.title) return affordance
										return aff
									})
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default App
