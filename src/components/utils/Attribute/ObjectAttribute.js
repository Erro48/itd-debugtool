import React, { useState } from 'react'

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
			<p>Summary</p>
			<ul className='object-recap'>
				{objectAttributes.map((attr) => (
					<li key={attr.title}>
						{attr.title}: {formatValue(attr.value)}
					</li>
				))}
			</ul>
			<button
				className='button primary-btn w-100'
				onClick={() => onExpand({ ...attribute })}
			>
				Expand
			</button>
		</>
	)
}

export default ObjectAttribute
