import Icon from '../utils/Icon'
import './searchBar.css'

function SearchBar({ onRepoLoad }) {
	const handleForChange = (event) => {
		const files = event.target.files
		const fileList = Object.values(files)

		fileList.forEach((file) => {
			const reader = new FileReader()
			reader.onload = (e) => {
				const fileContent = e.target.result
				const thingDescription = JSON.parse(fileContent)
				onRepoLoad(thingDescription)
			}

			reader.readAsText(file)
		})
	}

	return (
		<div
			id='search-bar'
			className='row pt-lg-0 mt-3 mt-lg-0 mx-auto rounded-pill overflow-hidden'
		>
			<form className='col-9'>
				<input
					className='form-control px-3 py-2 me-2 border-0'
					type='search'
					placeholder='Search for a repository'
					aria-label='Search for a repository'
				/>
			</form>
			<ul className='d-flex flex-row m-0 col-3'>
				<li>
					<button className='button transparent-btn'>
						<Icon src='../icons/tick-outline.svg' alt='Repository loaded' />
					</button>
				</li>
				<li>
					<button className='button transparent-btn'>
						<label for='open-repo'>
							<Icon
								src='../icons/baseline-folder-open.svg'
								alt='Choose repository'
							/>

							<input
								className='d-none'
								id='open-repo'
								type='file'
								webkitdirectory=''
								directory=''
								multiple=''
								onChange={handleForChange}
							/>
						</label>
					</button>
				</li>
			</ul>
		</div>
	)
}

export default SearchBar
