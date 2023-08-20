import React, { useEffect, useState } from 'react'
import './booleanAttribute.css'

const BooleanAttribute = ({ attribute, onChange }) => {
	const [status, setStatus] = useState(false)

	useEffect(() => {
		onChange(attribute.title, status)
	}, [])

	const handleClick = () => {
		setStatus((state) => !state)
		onChange(attribute.title, !status)
	}

	return (
		<div className='row w-100 mx-auto'>
			<span className='col-1 p-0'>
				<input
					type='checkbox'
					className=''
					name={`${attribute.title}-checkbox`}
					id={`${attribute.title}-checkbox`}
					onChange={handleClick}
				/>
			</span>
			<label
				htmlFor={`${attribute.title}-checkbox`}
				className='checkbox-container col-10'
			>
				{status.toString()}
			</label>
		</div>
	)
}

export default BooleanAttribute
