import React from 'react'

const SetInput = ({ values }) => {
	return (
		<div class='dropdown'>
			<input
				className='w-100 dropdown-toggle'
				type='button'
				data-bs-toggle='dropdown'
				aria-expanded='false'
				value={values[0]}
			/>
			<ul className='dropdown-menu my-1'>
				{values.map((value) => (
					<li key={value}>{value}</li>
				))}
			</ul>
		</div>
	)
}

export default SetInput
