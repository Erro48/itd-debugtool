import { useState } from 'react'
import Icon from '../utils/Icon'
import classnames from 'classnames'
import './searchBar.css'

function SearchBar({ onRepoLoad }) {
	const [loadingError, setLoadingError] = useState(false)
	const [repoLoaded, setRepoLoaded] = useState(false)

	const [repository, setRepository] = useState('')

	const handleForChange = (event) => {
		const files = event.target.files
		const fileList = Object.values(files)
		setLoadingError(false)
		setRepoLoaded(false)

		fileList.forEach((file) => {
			const reader = new FileReader()
			reader.onload = (e) => {
				const fileContent = e.target.result
				try {
					const thingDescription = JSON.parse(fileContent)
					const properties = []
					const actions = []

					Object.entries(thingDescription.properties).forEach((entry) => {
						properties.push({
							name: entry[0],
							value: entry[1],
						})
					})

					Object.entries(thingDescription.actions).forEach((entry) => {
						actions.push({
							name: entry[0],
							value: entry[1],
						})
					})

					thingDescription.properties = properties
					thingDescription.actions = actions

					onRepoLoad(thingDescription)
				} catch (err) {
					setLoadingError(true)
				}
			}

			if (!loadingError) {
				reader.readAsText(file)
			}

			setRepoLoaded(true)
		})
	}

	const handleChange = (event) => {
		const content = event.target.value
		setRepository(content)
	}

	const getLoadingIcon = () => {
		const iconName = loadingError ? 'close' : 'tick-outline'
		const iconAlt = loadingError ? 'Repository not loaded' : 'Repository loaded'
		return (
			<Icon
				src={'../icons/' + iconName + '.svg'}
				alt={iconAlt}
				classname={classnames({ 'd-none': !loadingError && !repoLoaded })}
			/>
		)
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
					onChange={handleChange}
					// value={repository}
				/>
			</form>
			<div className='col-3'>
				<ul className='row m-0 w-100 h-100'>
					<li className='col-6 d-flex align-items-center justify-content-center'>
						{getLoadingIcon()}
					</li>
					<li className='col-6 d-flex align-items-center justify-content-center'>
						<button className='button transparent-btn'>
							<label htmlFor='open-repo'>
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
		</div>
	)
}

export default SearchBar
