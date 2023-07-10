import React from 'react'
import NumberAttribute from './NumberAttribute'
import StringAttribute from './StringAttribute'
import './attribute.css'

const Attribute = ({ attribute, onChange }) => {
	const { title, type, description } = attribute
	const selectAttribute = (type) => {
		switch (type) {
			case 'number':
			case 'integer': {
				return (
					<NumberAttribute
						{...attribute}
						list={attribute.enum}
						onChange={onChange}
					/>
				)
			}

			case 'string': {
				return (
					<StringAttribute
						{...attribute}
						list={attribute.enum}
						onChange={onChange}
					/>
				)
			}

			default:
				return <p>{type}</p>
		}
	}

	return (
		<React.Fragment>
			<h3>{title}</h3>
			<p>{description}</p>
			{selectAttribute(type)}
		</React.Fragment>
	)
}

export default Attribute
