import React, { useState } from 'react'

const ObjectAttribute = ({ attribute, summary = [], onExpand }) => {
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
