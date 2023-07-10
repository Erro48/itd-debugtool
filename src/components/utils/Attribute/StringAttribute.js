import React from 'react'
import Dropdown from '../Dropdown'

const StringAttribute = ({ title, list, onChange }) => {
	if (list) {
		return <Dropdown name={title} elements={list} onChange={onChange} />
	}

	return (
		<input
			type='text'
			name={title}
			id={title.toLowerCase()}
			onChange={(e) => onChange(title, e.target.value)}
		/>
	)
}

export default StringAttribute
