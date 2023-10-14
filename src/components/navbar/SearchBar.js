import { useEffect, useRef, useState } from 'react'
import Icon from '../utils/Icon'
import classnames from 'classnames'
import Cookies from 'universal-cookie'
import './searchBar.css'

const cookies = new Cookies(null, { path: '/' })
const TdTools = window.Wot.Tools

function SearchBar({ onRepoLoad, onError, onShowError }) {
	const [loadingError, setLoadingError] = useState(false)
	const [repoLoaded, setRepoLoaded] = useState(false)
	const [repository, setRepository] = useState('')
	const repositoryDatalist = useRef(cookies.get('search-data-list') ?? [])

	useEffect(() => {
		cookies.set('search-data-list', repositoryDatalist.current, {
			maxAge: 3600,
		})
	}, [repositoryDatalist.current])

	const performSearch = (e) => {
		e.preventDefault()

		fetch(repository)
			.then((response) => response.json())
			.then(async (json) => {
				computeThingDescription(JSON.stringify(json))

				repositoryDatalist.current = [
					...repositoryDatalist.current.filter((item) => item !== repository),
					repository,
				]
			})
	}

	/**
	 * Change an object affordance in an array
	 * @param {*} input input affordance
	 * @returns object as array
	 */
	function affordanceUpdater(input) {
		if (input === undefined) return
		const output = []

		Object.entries(input).forEach((entry) => {
			output.push({
				title: entry[0],
				...entry[1],
			})
		})

		return output
	}

	function computeThingDescription(tdAsString) {
		try {
			const thingDescription = TdTools.parseTD(tdAsString)
			const properties = []
			const actions = []

			thingDescription.properties = affordanceUpdater(
				thingDescription.properties,
				properties
			)
			thingDescription.actions = affordanceUpdater(
				thingDescription.actions,
				actions
			)

			onRepoLoad(thingDescription)
		} catch (err) {
			alert(err)
		}
	}

	const handleForChange = (event) => {
		const files = event.target.files
		const fileList = Object.values(files)
		setLoadingError(false)
		setRepoLoaded(false)

		fileList.forEach((file) => {
			const reader = new FileReader()
			reader.onload = (e) => {
				try {
					computeThingDescription(e.target.result)
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

	return (
		<div
			id='search-bar'
			className='row m-3  mx-md-auto rounded-pill overflow-hidden'
		>
			<form className='col-10 col-md-11' onSubmit={performSearch}>
				<div className='row'>
					<button
						type='button'
						className='button transparent-btn col-2 col-sm-1 d-flex align-items-center justify-content-end'
						onClick={performSearch}
					>
						<Icon src='./icons/search.svg' alt='Search repository' />
					</button>
					<input
						className='px-3 py-2 border-0 col-10 col-sm-11'
						type='search'
						placeholder='Search for a repository'
						aria-label='Search for a repository'
						list='repository-history'
						onChange={(event) => setRepository(event.target.value)}
					/>
					<datalist id='repository-history'>
						{repositoryDatalist.current.map((link) => (
							<option value={link}></option>
						))}
					</datalist>
				</div>
			</form>
			<div className='col-2 col-md-1 p-0 d-flex justify-content-center'>
				<button type='button' className='button transparent-btn'>
					<label htmlFor='open-repo'>
						<Icon
							src='../icons/baseline-folder-open.svg'
							alt='Choose repository'
						/>

						<input
							className='d-none'
							id='open-repo'
							type='file'
							accept='.json'
							multiple={true}
							onChange={handleForChange}
						/>
					</label>
				</button>
			</div>
		</div>
	)
}

export default SearchBar
