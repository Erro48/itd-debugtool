import React, { useEffect } from 'react'
import './dropdown.css'

const Dropdown = ({ name, elements, onChange }) => {
	// On first load, calls onChange with first element
	useEffect(() => {
		onChange(name, elements[0].toString())
	}, [])

	return (
		<select
			name={name}
			className='dropdown'
			onChange={(e) => onChange(name, e.target.value)}
		>
			{elements.map((element) => (
				<option>{element}</option>
			))}
		</select>
	)
}

export default Dropdown
