import React from 'react'

const ObjectAttribute = ({ name, description, type, values }) => {
	return (
		<>
			<h3 className='attribute-name'>{name}</h3>
			<p>{description}</p>
			<button className='attribute-object-expand button secondary-btn w-100'>
				Expand
			</button>
		</>
	)
}

export default ObjectAttribute
