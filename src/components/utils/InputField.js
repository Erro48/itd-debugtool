import React from 'react'

const InputField = ({ type, name, onChange, properties = new Map() }) => {
	return (
		<input
			type={type}
			name={name}
			id={name}
			onChange={(e) => onChange(name, e.target.value)}
			min={properties.get('min')}
			max={properties.get('max')}
			placeholder={properties.get('placeholder')}
		/>
	)
}

export default InputField
