import './App.css'
import Navbar from './components/navbar'
import TdContainer from './components/td-container'
import PropContainer from './components/prop-container'
import PropDescription from './components/prop-description'
import Terminal from './components/terminal'

function App() {
	return (
		<div className='App'>
			<Navbar />
			<div className='container'>
				<div className='row'>
					<TdContainer />
					<div className='col col-sm-9'>
						<div className='row'>
							<PropContainer />
							<PropDescription />
							<Terminal />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
