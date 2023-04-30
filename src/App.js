import './style/App.css'
import Navbar from './components/navbar/Navbar'
import TdContainer from './components/TdContainer'
import PropContainer from './components/PropContainer'
import PropDescription from './components/PropDescription'
import Terminal from './components/Terminal'

function App() {
	return (
		<div className='App'>
			<Navbar />
			<div className='container'>
				<div className='row'>
					<TdContainer />
					<div className='col-12 col-sm-3 d-none d-sm-block'>
						<div className='row'>
							<PropContainer />
							<PropContainer />
						</div>
					</div>
					<div className='col col-sm-6 d-none d-sm-block'>
						<div className='row'>
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
