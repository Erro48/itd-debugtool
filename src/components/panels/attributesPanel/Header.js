import React from 'react'

const Header = ({ affordance }) => {
	return (
		<header className='pb-1'>
			<h2>{affordance.title}</h2>
			<p className='subtitle mb-0'>{affordance.address}</p>
		</header>
	)
}

export default Header
