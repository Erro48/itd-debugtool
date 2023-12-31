import React, { useState } from 'react'
import './objectAttribute.css'

const getSummary = (attribute) => {
	const getSummaryObject = (child) => {
		if (child.type === 'object') {
			const attributes =
				child.attributes === undefined
					? child.properties
					: child.attributes.reduce(
							(acc, attr) => ({
								...acc,
								[attr.title]: getSummaryObject(attr), // qui
							}),
							{}
					  )

			return {
				title: child.title,
				value: attributes,
			}
		}

		return {
			title: child.title,
			value: child.value,
		}
	}

	return attribute.attributes !== undefined
		? attribute.attributes.map((attr) => getSummaryObject(attr))
		: []
}

const ObjectAttribute = ({ attribute, onExpand }) => {
	const [objectAttributes, setObjectAttributes] = useState(
		getSummary(attribute)
	)

	const formatValue = (value) => {
		if (Array.isArray(value)) {
			return `[ ${value.join(', ')} ]`
		}

		return value
	}

	const displayList = (list) => {
		return list.map((element) => (
			<li key={element.title} className='row'>
				<div className='col'>{element.title}</div>

				{element.value !== null &&
				typeof element.value === 'object' &&
				!Array.isArray(element.value) ? (
					<ul className='pe-0'>
						{displayList(
							Object.entries(element.value).map((entry) => {
								const key = entry[1].title
								const val = entry[1].value

								return {
									title: key,
									value: val,
								}
							})
						)}
					</ul>
				) : (
					<strong className='col text-end'>{formatValue(element.value)}</strong>
				)}
			</li>
		))
	}

	function showButtonMessage() {
		if (attribute?.title === undefined) return "Display object's attributes"

		const string =
			attribute?.title?.slice(-1) === 's'
				? attribute.title + "'"
				: attribute.title + "'s"
		return `Display ${string} attributes`
	}

	return (
		<>
			<ul className='object-recap'>{displayList(objectAttributes)}</ul>
			<button
				className='button primary-btn w-100 mx-auto my-2'
				onClick={() => onExpand({ ...attribute })}
			>
				{showButtonMessage()}
			</button>
		</>
	)
}

export default ObjectAttribute
