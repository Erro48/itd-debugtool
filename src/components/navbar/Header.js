import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import { ErrorBoundary } from 'react-error-boundary'

const Header = ({ onRepoLoad, onError, onShowError }) => {
	const [width, setWidth] = useState(window.innerWidth)
	const searchBarJsx = (
		<SearchBar
			onRepoLoad={onRepoLoad}
			onError={onError}
			onShowError={onShowError}
		/>
	)

	function handleWindowSizeChange() {
		setWidth(window.innerWidth)
	}
	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange)
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange)
		}
	}, [])

	const isMobile = width <= 992

	return (
		<>
			{isMobile ? (
				<>
					<Navbar />
					<div className='container'>{searchBarJsx}</div>
				</>
			) : (
				<Navbar>{searchBarJsx}</Navbar>
			)}
		</>
	)
}

export default Header
