import React from 'react'
import './inputField.css'
import classNames from 'classnames'

const InputField = ({
	type,
	name,
	onChange,
	properties = new Map(),
	className,
}) => {
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
			className={classNames('input-field', className)}
		/>
	)
}

export default InputField
