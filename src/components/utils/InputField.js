import React from 'react'

const InputField = ({ type, name, onChange, properties = new Map() }) => {
	const castType = (type) => {
		switch (type) {
			case 'integer':
			case 'number': {
				return 'number'
			}

			default:
				return 'text'
		}
	}

	return (
		<input
			type={castType(type)}
			name={name}
			id={name}
			onChange={(e) => onChange(name, e.target.value)}
			min={properties.get('minimum')}
			max={properties.get('maximum')}
			placeholder={properties.get('placeholder')}
		/>
	)
}

export default InputField
