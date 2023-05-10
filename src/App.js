import './App.css'
import Navbar from './components/navbar/Navbar'
import TdPanel from './components/panels/TdPanel'
import PropertyPanel from './components/panels/PropertyPanel'
import ActionPanel from './components/panels/ActionPanel'
import PropDescription from './components/panels/DescriptionPanel'
import OutputPanel from './components/panels/OutputPanel'
import SearchBar from './components/navbar/SearchBar'

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
	return (
		<div className='App'>
			<Navbar />
			<div className='container mb-3'>
				<div className='row w-100 m-auto'>
					<div className='col-12 d-lg-none'>
						<SearchBar />
					</div>
					<TdPanel />
					<div className='col-12 col-lg-3'>
						<div className='row'>
							<PropertyPanel />
							<ActionPanel />
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
