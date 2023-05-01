import React from 'react'
import NumericAttribute from './NumericAttribute'
import StringAttribute from './StringAttribute'

const AttributeInput = ({ type, values }) => {
	const input = (type) => {
		if (type === 'number') return <NumericAttribute values={values} />
		if (type == 'string') return <StringAttribute />
	}

	return <>{input(type)}</>
}

export default AttributeInput
