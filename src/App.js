import Navbar from './components/navbar/Navbar'
import TdPanel from './components/panels/TdPanel'
import SearchBar from './components/navbar/SearchBar'
import { useEffect, useState } from 'react'
import AffordancesPanel from './components/panels/AffordancesPanel'
import AttributesPanel from './components/panels/AttributesPanel'

// const chosenInteraction = {
// 	interaction: 'angle',
// 	address: 'address/thing/wheat/angle',
// 	attributes: [
// 		{
// 			name: 'id',
// 			description: 'The id of the angle to move',
// 			type: 'number',
// 			minimum: 0,
// 			maximum: 100,
// 			values: [1, 2, 3, 4, 5, 6],
// 		},
// 		{
// 			name: 'Shopping list',
// 			description: 'The shopping list',
// 			type: 'array',
// 		},
// 		{
// 			name: 'color',
// 			description: 'The color of the matrix led',
// 			type: 'object',
// 			properties: {
// 				r: {
// 					type: 'number',
// 					minimum: 0,
// 					maximum: 100,
// 				},
// 				g: {
// 					type: 'number',
// 					minimum: 0,
// 					maximum: 100,
// 				},
// 				b: {
// 					type: 'number',
// 					minimum: 0,
// 					maximum: 100,
// 				},
// 			},
// 		},
// 	],
// }

function App() {
	const [thingDescriptions, setThingDescriptions] = useState([])

	const [activeThingDescription, setActiveThingDescription] = useState()
	const [activeAffordance, setActiveAffordance] = useState()

	/**
	 * Add the thing description passed in the current list of thing descriptions
	 * @param {*} thingDescription to be added to the list
	 */
	const handleRepoLoad = (thingDescription) => {
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
			}

			// If not already in, add to the list
			if (
				state.filter((td) => td.title === thingDescription.title).length === 0
			) {
				return [...state, thingDescription]
			}

			return state
		})
	}

	useEffect(() => {
		const activeTd = thingDescriptions[0]
		setActiveThingDescription(activeTd)

		if (activeTd === undefined) return

		const activeAff = [...activeTd.properties, ...activeTd.actions].filter(
			(affordance) => affordance.active
		)[0]

		setActiveAffordance(activeAff)
	}, [thingDescriptions])

	useEffect(() => {
		if (activeThingDescription === undefined) return

		const activeAff = [
			...activeThingDescription.properties,
			...activeThingDescription.actions,
		].filter((affordance) => affordance.active)[0]

		setActiveAffordance(activeAff)
	}, [activeThingDescription])

	return (
		<div className='App'>
			<Navbar onRepoLoad={handleRepoLoad} />
			<div className='container mb-3'>
				<div className='row w-100 m-auto'>
					<div className='col-12 d-lg-none'>
						<SearchBar onRepoLoad={handleRepoLoad} />
					</div>
					<TdPanel
						thingDescriptions={thingDescriptions}
						onChange={(newThingDescription) =>
							setActiveThingDescription(newThingDescription)
						}
					/>

					<AffordancesPanel
						activeThingDescription={activeThingDescription}
						onChange={(newAffordance) => setActiveAffordance(newAffordance)}
					/>
					<div className='col-12 col-lg-6 d-sm-block'>
						<div className='row m-auto'>
							<AttributesPanel affordance={activeAffordance} />
							{/* <PropDescription
								activeAffordance={activeAffordance}
								{...chosenInteraction}
							/>
							<OutputPanel /> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
