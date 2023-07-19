import React, { useState } from 'react'
import './inputField.css'
import classNames from 'classnames'

const InputField = ({
	type,
	name,
	defaultValue,
	onChange,
	properties = new Map(),
	className,
}) => {
	const [value, setValue] = useState(defaultValue)
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

	const handleChange = (e) => {
		setValue(e.target.value)
		onChange(name, e.target.value)
	}

	return (
		<input
			type={castType(type)}
			name={name}
			id={name}
			value={value}
			onChange={handleChange}
			min={properties.get('minimum')}
			max={properties.get('maximum')}
			placeholder={properties.get('placeholder')}
			className={classNames('input-field', className)}
		/>
	)
}

export default InputField
