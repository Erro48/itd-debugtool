import React from 'react'
import './dropdown.css'

const Dropdown = ({ elements }) => {
	return (
		<select className='dropdown'>
			{elements.map((element) => (
				<option>{element}</option>
			))}
		</select>
	)
}

export default Dropdown
