import './App.css'
import Navbar from './components/navbar/Navbar'
import TdPanel from './components/panels/TdPanel'
import PropertyPanel from './components/panels/PropertyPanel'
import ActionPanel from './components/panels/ActionPanel'
import PropDescription from './components/panels/DescriptionPanel'
import OutputPanel from './components/panels/OutputPanel'
import SearchBar from './components/navbar/SearchBar'
import { useState } from 'react'

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
	const [properties, setProperties] = useState([])
	const [actions, setActions] = useState([])

	const loadProperties = (thingDescription) => {
		setProperties(
			Object.entries(thingDescription.properties).map((k, v) => {
				const [key, value] = k
				return { ...value, title: key }
			})
		)
	}

	const loadActions = (thingDescription) => {
		setActions(
			Object.entries(thingDescription.actions).map((k, v) => {
				const [key, value] = k
				return { ...value, title: key }
			})
		)
	}

	const handleRepoLoad = (thingDescription) =>
		setThingDescriptions((arr) => {
			thingDescription = { ...thingDescription, key: thingDescription.title }
			if (arr.length === 0) {
				thingDescription = { ...thingDescription, active: true }

				loadProperties(thingDescription)
				loadActions(thingDescription)
			}

			if (arr.filter((td) => td.title === thingDescription.title).length === 0)
				return [...arr, thingDescription]
			return arr
		})

	const handleTdClick = (title) => {
		const nextActive = thingDescriptions.map((state, t) => {
			if (t === title) {
				state.active = true
				loadProperties(state)
				loadActions(state)
			} else {
				if (state.active) {
					state.active = false
				}
			}
			return state
		})

		setThingDescriptions(nextActive)
	}

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
						onTdClick={handleTdClick}
					/>
					<div className='col-12 col-lg-3'>
						<div className='row'>
							<PropertyPanel properties={properties} />
							<ActionPanel actions={actions} />
						</div>
					</div>

					<div className='col-12 col-lg-6 d-sm-block'>
						<div className='row m-auto'>
							<PropDescription {...chosenInteraction} />
							<OutputPanel />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
