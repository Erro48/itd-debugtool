import React from 'react'

const NumericAttribute = ({ values }) => {
	return (
		<div class='dropdown'>
			<button
				className='w-100 dropdown-toggle'
				type='button'
				data-bs-toggle='dropdown'
				aria-expanded='false'
			>
				{values[0]}
			</button>
			<ul className='dropdown-menu'>
				{values.map((value) => (
					<li key={value}>{value}</li>
				))}
			</ul>
		</div>
	)
}

export default NumericAttribute
