import React from 'react'
import SetInput from './SetInput'
import StringInput from './StringInput'

const AttributeInput = ({ type, values }) => {
	const input = (type) => {
		if (type === 'number') return <SetInput values={values} />
		if (type == 'string') return <StringInput />
	}

	return <>{input(type)}</>
}

export default AttributeInput
