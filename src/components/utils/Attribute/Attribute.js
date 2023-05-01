import React from 'react'
import AttributeInput from './AttributeInput'

const Attribute = ({ name, description, type, values }) => {
	return (
		<React.Fragment>
			<div className='row attribute'>
				<div className='col-3'>{name}</div>
				<div className='col-9 attribute-input'>
					<AttributeInput type={type} values={values} />
				</div>
				<div className='col-12'>{description}</div>
			</div>
		</React.Fragment>
	)
}

export default Attribute
