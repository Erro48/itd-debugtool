import React from 'react'

const SubmitButton = ({ affordance }) => {
	const handleSubmit = () => {
		console.log(affordance)
	}

	return (
		<button
			type='button'
			className='button primary-btn col'
			onClick={handleSubmit}
		>
			Submit
		</button>
	)
}

export default SubmitButton
