import React, { useState } from 'react'
import InputField from '../InputField'
import Icon from '../Icon'

const ArrayAttribute = ({ title, description, items, onChange }) => {
	const [index, setIndex] = useState(1)

	const [arrayItems, setArrayItems] = useState([
		{
			name: `${title}-0`,
		},
	])

	const addItem = () => {
		setArrayItems((currentState) => {
			return [...currentState, { name: `${title}-${index}` }]
		})
		setIndex((currentState) => currentState + 1)
	}

	const deleteItem = (name) => {
		if (arrayItems.length > 1) {
			setArrayItems(arrayItems.filter((item) => item.name !== name))
		}
	}

	return (
		<>
			<ul className='array-attribute-list'>
				{arrayItems.map((item) => (
					<li key={item.name}>
						<InputField
							type={items.type}
							name={item.name}
							properties={new Map(Object.entries(items))}
							onChange={onChange}
						/>
						<button className='btn' onClick={() => deleteItem(item.name)}>
							<Icon
								src='../icons/remove.svg'
								alt={`Remove ${item.name} element`}
							/>
						</button>
					</li>
				))}
				<li className='array-attribute-item'>
					<button className='btn add-array-item' onClick={addItem}>
						Add element
					</button>
				</li>
			</ul>
		</>
	)
}

export default ArrayAttribute
