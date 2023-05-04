import './App.css'
import Navbar from './components/navbar/Navbar'
import TdContainer from './components/panels/TdPanel'
import PropContainer from './components/panels/PropertyPanel'
import ActionContainer from './components/panels/ActionPanel'
import PropDescription from './components/panels/DescriptionPanel'
import Terminal from './components/panels/OutputPanel'
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
			<div className='container'>
				<div className='row'>
					<div className='col-12 d-sm-none'>
						<SearchBar />
					</div>
					<TdContainer />
					<div className='col-12 col-sm-3 px-2'>
						<PropContainer />
						<ActionContainer />
					</div>

					<div className='col col-sm-6 d-none d-sm-block'>
						<div className='row'>
							<PropDescription {...chosenInteraction} />
							<Terminal />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
