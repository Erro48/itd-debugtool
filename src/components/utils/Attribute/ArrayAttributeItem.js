import React from 'react'
import AttributeInput from './AttributeInput'

const ArrayAttributeItem = ({ index, values }) => {
	return (
		<div className='row w-100'>
			<div className='col-2 attribute-name'>{index}</div>
			<div className='col-10 attribute-input p-0'>
				<AttributeInput type={'string'} />
			</div>
		</div>
	)
}

export default ArrayAttributeItem
