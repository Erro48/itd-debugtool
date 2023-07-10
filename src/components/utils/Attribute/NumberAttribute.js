import React from 'react'
import Dropdown from '../Dropdown'
import InputField from '../InputField'

const NumberAttribute = ({
	title,
	minimum,
	exclusiveMinimum,
	maximum,
	exclusiveMaximum,
	multipleOf,
	list,
	required,
	onChange,
}) => {
	const min = exclusiveMinimum !== undefined ? exclusiveMinimum - 1 : minimum
	const max = exclusiveMaximum !== undefined ? exclusiveMaximum - 1 : maximum

	const properties = new Map()
	properties.set('minimum', min)
	properties.set('maximum', max)

	if (list) {
		return <Dropdown name={title} elements={list} onChange={onChange} />
	}

	return (
		<InputField
			type='number'
			name={title}
			onChange={onChange}
			properties={properties}
		/>
	)
}

export default NumberAttribute
