import React from 'react'
import Dropdown from '../Dropdown'

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

	if (list) {
		return <Dropdown name={title} elements={list} onChange={onChange} />
	}

	return (
		<input
			type='number'
			onChange={(e) => onChange(title, e.target.value)}
			name={title}
			id={title.toLowerCase()}
			min={min}
			max={max}
		/>
	)
}

export default NumberAttribute
