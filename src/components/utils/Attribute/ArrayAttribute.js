import React, { useEffect, useState } from 'react'
import InputField from '../InputField'
import Icon from '../Icon'
import './arrayAttribute.css'

const ArrayAttribute = ({ title, description, items, onChange }) => {
	const [index, setIndex] = useState(1)
	const [arrayItems, setArrayItems] = useState([
		{
			name: `${title}-0`,
			value: '0',
		},
	])

	useEffect(() => {
		onChange(
			title,
			arrayItems.map((item) => item.value)
		)
	}, [arrayItems])

	const updateItem = (inputTitle, inputValue) => {
		setArrayItems((currentState) => {
			const itemIndex = currentState
				.map((item) => item.name)
				.indexOf(inputTitle)
			const previous = currentState.slice(0, itemIndex)
			const next = currentState.slice(itemIndex + 1)

			return [...previous, { name: inputTitle, value: inputValue }, ...next]
		})
	}

	const addItem = () => {
		setArrayItems((currentState) => {
			return [...currentState, { name: `${title}-${index}`, value: '0' }]
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
					<li key={item.name} className='row'>
						<InputField
							type={items.type}
							name={item.name}
							properties={new Map(Object.entries(items))}
							onChange={updateItem}
							className={'col-10'}
						/>
						<button className='btn col-2' onClick={() => deleteItem(item.name)}>
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
