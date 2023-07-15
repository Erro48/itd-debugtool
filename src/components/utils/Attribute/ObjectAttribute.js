import React, { useState } from 'react'

const ObjectAttribute = ({ attribute, onChange, onExpand }) => {
	const [objectAttributes, setObjectAttributes] = useState([])
	return (
		<>
			<ul className='object-recap'>
				{objectAttributes.map((attr) => (
					<li key={attr.name}>
						{attr.name}: {attr.value}
					</li>
				))}
			</ul>
			<button
				className='btn primary-btn w-100'
				onClick={() => onExpand({ ...attribute })}
			>
				Expand
			</button>
		</>
	)
}

export default ObjectAttribute
