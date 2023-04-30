import React from 'react'

const Attribute = ({ name, description, type, values }) => {
	return (
		<React.Fragment>
			<div className='row'>
				<div className='col-3'>{name}</div>
				<div className='col-9'>
					<div class='dropdown'>
						<button
							class='w-100 dropdown-toggle'
							type='button'
							data-bs-toggle='dropdown'
							aria-expanded='false'
						>
							{values[0]}
						</button>
						<ul class='dropdown-menu'>
							{values.map((value) => (
								<li key={value}>{value}</li>
							))}
						</ul>
					</div>
				</div>
				<div className='col-12'>{description}</div>
			</div>
		</React.Fragment>
	)
}

export default Attribute
