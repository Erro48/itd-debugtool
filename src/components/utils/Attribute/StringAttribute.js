import React from 'react'
import Dropdown from '../Dropdown'

const StringAttribute = ({ title, list }) => {
	if (list) {
		return <Dropdown elements={list} />
	}

	return (
		<input type='text' name={title.toLowerCase()} id={title.toLowerCase()} />
	)
}

export default StringAttribute
