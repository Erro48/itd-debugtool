import React from 'react'
import Dropdown from '../Dropdown'
import InputField from '../InputField'

const StringAttribute = ({ title, list, onChange }) => {
	if (list) {
		return <Dropdown name={title} elements={list} onChange={onChange} />
	}

	return <InputField type='text' name={title} onChange={onChange} />
}

export default StringAttribute
