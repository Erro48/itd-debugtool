import SearchBar from './SearchBar'
import './navbar.css'

function Navbar() {
	return (
		<nav className='navbar navbar-expand-lg'>
			<div className='container'>
				<h1>
					<span>WoT</span> Dashboard
				</h1>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<SearchBar />
				</div>
			</div>
		</nav>
	)
}

export default Navbar
