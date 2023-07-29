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
		setActiveThingDescription(activeTd)

		if (activeTd === undefined) return

		const activeAff = [...activeTd.properties, ...activeTd.actions].filter(
			(affordance) => affordance.active
		)[0]

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

	return (
		<main className='App'>
			<Navbar
				onRepoLoad={handleRepoLoad}
				onError={handleRepoError}
				onShowError={() => setShowRepoError(true)}
			/>
			<div className='container-fluid ps-0'>
				<div className='row w-100 m-auto'>
					<Modal
						type='danger'
						show={showRepoError}
						onClose={() => setShowRepoError(false)}
					>
						{new Error(repoError)}
					</Modal>

					<div className='col-12 d-lg-none'>
						<SearchBar
							onRepoLoad={handleRepoLoad}
							onError={handleRepoError}
							onShowError={() => setShowRepoError(true)}
						/>
					</div>

					{/* Side panel */}
					<aside class='col-12 col-lg-3 px-0 aside-panel'>
						<div class='row w-100 m-auto'>
							<TdPanel
								thingDescriptions={thingDescriptions}
								onChange={(newThingDescription) =>
									setActiveThingDescription(newThingDescription)
								}
							/>

							<AffordancesPanel
								activeThingDescription={activeThingDescription}
								onChange={(newAffordance) => setActiveAffordance(newAffordance)}
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
