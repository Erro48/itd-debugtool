import Navbar from './components/navbar/Navbar'
import TdPanel from './components/panels/TdPanel'
import SearchBar from './components/navbar/SearchBar'
import { useEffect, useState } from 'react'
import AffordancesPanel from './components/panels/AffordancesPanel'
import AttributesPanel from './components/panels/AttributesPanel'
import Modal from './components/utils/Modal'

function App() {
	const [thingDescriptions, setThingDescriptions] = useState([])

	const [activeThingDescription, setActiveThingDescription] = useState()
	const [activeAffordance, setActiveAffordance] = useState()
	const [repoError, setRepoError] = useState()
	const [showRepoError, setShowRepoError] = useState(false)

	/**
	 * Add the thing description passed in the current list of thing descriptions
	 * @param {*} thingDescription to be added to the list
	 */
	const handleRepoLoad = (thingDescription) => {
		setThingDescriptions((state) => {
			// If it is the first thing description
			if (state.length === 0) {
				// Set the first affordance as active
				if (thingDescription.properties.length !== 0) {
					thingDescription.properties[0] = {
						...thingDescription.properties[0],
						active: true,
					}
				} else if (thingDescription.actions.length !== 0) {
					thingDescription.actions[0] = {
						...thingDescription.actions[0],
						active: true,
					}
				}

				// Set td as active
				thingDescription = { ...thingDescription, active: true }
			}

			// If not already in, add to the list
			if (
				state.filter((td) => td.title === thingDescription.title).length === 0
			) {
				return [...state, thingDescription]
			}

			// If already in, replace it
			state = state
				.filter((td) => td.title === thingDescription.title)
				.map((td) => thingDescription)

			return state
		})
	}

	const handleRepoError = (error) => {
		setRepoError(error)
		setShowRepoError(true)
	}

	// on repo load
	useEffect(() => {
		const activeTd = thingDescriptions[0]

		if (activeTd === undefined) return

		activeTd.active = true
		setActiveThingDescription(activeTd)

		let activeAff = [...activeTd.properties, ...activeTd.actions].filter(
			(affordance) => affordance.active
		)[0]

		if (activeAff === undefined) {
			activeAff = [...activeTd.properties, ...activeTd.actions][0]
		}

		activeAff.active = true
		setActiveAffordance(activeAff)
	}, [thingDescriptions])

	useEffect(() => {
		if (activeThingDescription === undefined) return

		const activeAff = [
			...activeThingDescription.properties,
			...activeThingDescription.actions,
		].filter((affordance) => affordance.active)[0]

		setActiveAffordance(activeAff)
	}, [activeThingDescription])

	const handleThingDescriptionChange = (newThingDescription) => {
		setActiveThingDescription(newThingDescription)
		document
			.querySelector('[data-panel="affordances-panel"]')
			.scrollIntoView({ behavior: 'smooth' })
	}

	const handleAffordanceChange = (newAffordance) => {
		setActiveAffordance(newAffordance)
		document
			.querySelector('[data-panel="attributes-panel"]')
			.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<main className='App'>
			<Navbar
				onRepoLoad={handleRepoLoad}
				onError={handleRepoError}
				onShowError={() => setShowRepoError(true)}
			/>
			<div className='container-fluid p-0'>
				<div className='row w-100 m-auto'>
					<Modal
						type='danger'
						show={showRepoError}
						onClose={() => setShowRepoError(false)}
					>
						{new Error(repoError).message}
					</Modal>

					<div className='col-12 d-lg-none'>
						<SearchBar
							onRepoLoad={handleRepoLoad}
							onError={handleRepoError}
							onShowError={() => setShowRepoError(true)}
						/>
					</div>

					{/* Side panel */}
					<aside class='col-12 col-lg-3 px-0 aside-panel pt-2 pt-md-0 mt-4 mt-md-0'>
						<div class='row w-100 m-auto'>
							<TdPanel
								thingDescriptions={thingDescriptions}
								onChange={handleThingDescriptionChange}
							/>

							<AffordancesPanel
								activeThingDescription={activeThingDescription}
								onChange={handleAffordanceChange}
							/>
						</div>
					</aside>
					<div className='col-1'></div>
					<div className='col-12 col-lg-7 d-sm-block'>
						<div className='row m-auto'>
							<AttributesPanel activeAffordance={activeAffordance} />
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default App
