import './App.css'
import Navbar from './components/navbar/Navbar'
import TdPanel from './components/panels/TdPanel'
import PropDescription from './components/panels/DescriptionPanel'
import OutputPanel from './components/panels/OutputPanel'
import SearchBar from './components/navbar/SearchBar'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import AffordancesPanel from './components/panels/AffordancesPanel'

const chosenInteraction = {
	interaction: 'angle',
	address: 'address/thing/wheat/angle',
	attributes: [
		{
			name: 'id',
			description: 'The id of the angle to move',
			type: 'number',
			minimum: 0,
			maximum: 100,
			values: [1, 2, 3, 4, 5, 6],
		},
		{
			name: 'Shopping list',
			description: 'The shopping list',
			type: 'array',
		},
		{
			name: 'color',
			description: 'The color of the matrix led',
			type: 'object',
			properties: {
				r: {
					type: 'number',
					minimum: 0,
					maximum: 100,
				},
				g: {
					type: 'number',
					minimum: 0,
					maximum: 100,
				},
				b: {
					type: 'number',
					minimum: 0,
					maximum: 100,
				},
			},
		},
	],
}

function App() {
	const [thingDescriptions, setThingDescriptions] = useState([])

	const [activeThingDescription, setActiveThingDescription] = useState()
	const [activeAffordance, setActiveAffordance] = useState()

	const handleRepoLoad = (thingDescription) => {
		setThingDescriptions((arr) => {
			thingDescription = { ...thingDescription, key: uuidv4() }

			if (arr.length === 0) {
				if (thingDescription.properties.length !== 0) {
					thingDescription.properties[0] = {
						...thingDescription.properties[0],
						active: true,
					}
				} else {
					thingDescription.actions[0] = {
						...thingDescription.actions[0],
						active: true,
					}
				}

				thingDescription = { ...thingDescription, active: true }
				console.log(thingDescription)
			}

			if (arr.filter((td) => td.title === thingDescription.title).length === 0)
				return [...arr, thingDescription]
			return arr
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
