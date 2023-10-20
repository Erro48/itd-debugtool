import React from 'react'

const Header = ({ affordance }) => {
	function displayAddress() {
		if (affordance.address === undefined) {
			return <em>Affordance's address is not valid</em>
		}
		const address = affordance.address
		return (
			<a className='affordance-address' href={address}>
				{address}
			</a>
		)
	}

	return (
		<header className='pb-1'>
			<h2>{affordance.title}</h2>
			<p className='subtitle mb-0'>{displayAddress()}</p>
		</header>
	)
}

export default Header
