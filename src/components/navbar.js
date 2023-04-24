function Navbar() {
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container'>
				<a className='navbar-brand' href='#'>
					<span>WoT</span> Dashboard
				</a>
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
					<form className='d-flex w-75 pt-2 pt-sm-0 mx-auto'>
						<input
							className='form-control me-2 rounded-pill border-none'
							type='search'
							placeholder='Search for a repository'
							aria-label='Search for a repository'
						/>
					</form>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
