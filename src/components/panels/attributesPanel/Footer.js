import React from 'react'
import SubmitButton from '../../utils/Buttons/SubmitButton'
import Icon from '../../utils/Icon'

const Footer = ({ affordance, handleAffordanceChange }) => {
	return (
		<footer className='row w-100 mx-auto my-1	'>
			{affordance.parent !== undefined ? (
				<>
					<button
						className='col-2 col-sm-1 button light-btn'
						onClick={() =>
							handleAffordanceChange(affordance.parent, affordance)
						}
					>
						<Icon
							src={'./icons/left-arrow-dark.svg'}
							alt={`Go to ${affordance.parent.title} attribute`}
						/>
					</button>
					<div className='col-1 d-sm-none'></div>
				</>
			) : (
				<div className='d-none d-sm-block col-sm-1'></div>
			)}

			<div className='d-none d-sm-block col-sm-9'></div>

			<SubmitButton affordance={affordance} />
		</footer>
	)
}

export default Footer
