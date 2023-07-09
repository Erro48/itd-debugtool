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
}) => {
	const min = exclusiveMinimum !== undefined ? exclusiveMinimum - 1 : minimum
	const max = exclusiveMaximum !== undefined ? exclusiveMaximum - 1 : maximum

	if (list) {
		return <Dropdown elements={list} />
	}

	return (
		<input
			type='number'
			name={title.toLowerCase()}
			id={title.toLowerCase()}
			min={min}
			max={max}
		/>
	)
}

export default NumberAttribute
