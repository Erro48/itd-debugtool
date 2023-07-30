import React, { useState } from 'react'
import './objectAttribute.css'

const ObjectAttribute = ({ attribute, onExpand }) => {
	const summary =
		attribute.attributes !== undefined
			? attribute.attributes.map((attr) => {
					return {
						title: attr.title,
						value: attr.value,
					}
			  })
			: []
	const [objectAttributes, setObjectAttributes] = useState(summary)

	const formatValue = (value) => {
		if (Array.isArray(value)) {
			return `[ ${value.join(', ')} ]`
		}

		return value
	}

	return (
		<>
			<ul className='object-recap'>
				{objectAttributes.map((attr) => (
					<li key={attr.title} className='row'>
						<div class='col'>{attr.title}</div>
						<strong class='col text-end'>{formatValue(attr.value)}</strong>
					</li>
				))}
			</ul>
			<button
				className='button primary-btn w-100 mx-auto my-2'
				onClick={() => onExpand({ ...attribute })}
			>
				Expand
			</button>
		</>
	)
}

export default ObjectAttribute
