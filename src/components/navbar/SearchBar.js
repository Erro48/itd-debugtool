function SearchBar(props) {
	return (
		<div
			id='search-bar'
			className='d-flex w-75 pt-2 pt-sm-0 mx-auto rounded-pill overflow-hidden'
		>
			<form>
				<input
					className='form-control me-2 border-0'
					type='search'
					placeholder='Search for a repository'
					aria-label='Search for a repository'
				/>
			</form>
			<ul className='d-flex m-0'>
				<li className='icon d-flex'>
					<button>L</button>
				</li>
				<li className='icon d-flex'>
					<button>D</button>
				</li>
			</ul>
		</div>
	)
}

export default SearchBar
