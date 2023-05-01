import React from 'react'
import AttributeInput from './AttributeInput'

const BasicAttribute = ({ name, description, type, values }) => {
	return (
		<div className='row attribute w-100 my-3'>
			<h3 className='col-3 attribute-name d-flex align-items-center'>{name}</h3>
			<div className='col-9 attribute-input p-0'>
				<AttributeInput type={type} values={values} />
			</div>
			<div className='col-12'>{description}</div>
		</div>
	)
}

export default BasicAttribute
