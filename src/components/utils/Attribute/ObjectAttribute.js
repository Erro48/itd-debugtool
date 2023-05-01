import React from 'react'
import AttributeInput from './AttributeInput'

const ObjectAttribute = ({ name, description, type, values }) => {
	return (
		<>
			<p className='attribute-name'>{name}</p>
			<p>{description}</p>
			<button className='attribute-object-expand w-100'>Expand</button>
		</>
	)
}

export default ObjectAttribute
