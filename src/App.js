import './App.css'
import Navbar from './components/navbar'
import TdContainer from './components/td-container'
import PropContainer from './components/prop-container'
import PropDescription from './components/prop-description'

function App() {
	return (
		<div className='App'>
			<Navbar />
			<div className='container'>
				<div class='row'>
					<TdContainer />
					<PropContainer />
					<PropDescription />
				</div>
			</div>
		</div>
	)
}

export default App
