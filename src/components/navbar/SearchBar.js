import { useState } from 'react'
import Icon from '../utils/Icon'
import classnames from 'classnames'
import './searchBar.css'

function SearchBar({ onRepoLoad, onError, onShowError }) {
	const [loadingError, setLoadingError] = useState(false)
	const [repoLoaded, setRepoLoaded] = useState(false)

	const [repository, setRepository] = useState('')

	const performSearch = (e) => {
		e.preventDefault()
		fetch(repository)
			.then((response) => response.json())
			.then((json) => console.log(json))
	}

	const handleForChange = (event) => {
		const files = event.target.files
		const fileList = Object.values(files)
		setLoadingError(false)
		setRepoLoaded(false)

		const affordanceUpdater = (input, output) => {
			if (input === undefined) return

			Object.entries(input).forEach((entry) => {
				output.push({
					title: entry[0],
					value: entry[1],
				})
			})
		}

		fileList.forEach((file) => {
			const reader = new FileReader()
			reader.onload = (e) => {
				const fileContent = e.target.result
				try {
					const thingDescription = JSON.parse(fileContent)
					const properties = []
					const actions = []

					affordanceUpdater(thingDescription.properties, properties)
					affordanceUpdater(thingDescription.actions, actions)

					thingDescription.properties = properties
					thingDescription.actions = actions

					onRepoLoad(thingDescription)
				} catch (err) {
					setLoadingError(true)
					onError(err)
				}
			}

			if (!loadingError) {
				reader.readAsText(file)
			}

			setRepoLoaded(true)
		})
	}

	const getLoadingIcon = () => {
		const iconName = loadingError ? 'close' : 'tick-outline'
		const iconAlt = loadingError
			? 'Repository not loaded correctly'
			: 'Repository loaded'

		const iconJSX = (
			<Icon
				src={'../icons/' + iconName + '.svg'}
				alt={iconAlt}
				classname={classnames({ 'd-none': !loadingError && !repoLoaded })}
			/>
		)

		if (loadingError) {
			return (
				<button class='button transparent-btn' onClick={onShowError}>
					{iconJSX}
				</button>
			)
		}

		return iconJSX
	}

	return (
		<div
			id='search-bar'
			className='row m-3  mx-md-auto rounded-pill overflow-hidden'
		>
			<form className='col-9 col-md-10'>
				<div className='row'>
					<input
						className='px-3 py-2 border-0 col-10'
						type='search'
						placeholder='Search for a repository'
						aria-label='Search for a repository'
						onChange={(event) => setRepository(event.target.value)}
						// value={repository}
					/>
					<button
						className='button transparent-btn col-2 pe-3'
						onClick={performSearch}
					>
						<Icon src='./icons/search.svg' alt='Search repository' />
					</button>
				</div>
			</form>
			<div className='col-3 col-md-2 p-0'>
				<ul className='row m-0 w-100 h-100 p-0'>
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
