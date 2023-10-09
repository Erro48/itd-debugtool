import './navbar.css'

function Navbar({ children }) {
	return (
		<nav className='navbar navbar-expand-lg'>
			<div className='container'>
				<h1>
					MashupTd <span>Nexus</span>
				</h1>
				<div
					className='collapse navbar-collapse d-none'
					id='navbarSupportedContent'
				>
					{children}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
