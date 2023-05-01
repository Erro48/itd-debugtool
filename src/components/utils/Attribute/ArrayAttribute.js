import React from 'react'
import ArrayAttributeItem from './ArrayAttributeItem'

const arrayItems = [
	{
		index: 0,
	},
	{
		index: 1,
	},
	{
		index: 2,
	},
]

const ArrayAttribute = ({ name, description, type, values }) => {
	return (
		<>
			<p className='attribute-name'>{name}</p>
			<p>{description}</p>
			<ul className='attribute-array-list ms-3 ps-3'>
				{arrayItems.map((item) => (
					<li key={item.index}>
						<ArrayAttributeItem index={item.index} />
					</li>
				))}
			</ul>
		</>
	)
}

export default ArrayAttribute
