import React from 'react'
import Dropdown from '../Dropdown'
import InputField from '../InputField'

const StringAttribute = ({ title, list, value, onChange }) => {
	if (list) {
		return (
			<Dropdown
				name={title}
				elements={list}
				defaultValue={value}
				onChange={onChange}
			/>
		)
	}

	return (
		<InputField
			type='text'
			name={title}
			defaultValue={value}
			onChange={onChange}
		/>
	)
}

export default StringAttribute
