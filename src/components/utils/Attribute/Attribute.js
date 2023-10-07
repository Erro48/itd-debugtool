import React from 'react'
import NumberAttribute from './NumberAttribute'
import StringAttribute from './StringAttribute'
import './attribute.css'
import ArrayAttribute from './ArrayAttribute'
import ObjectAttribute from './ObjectAttribute'
import BooleanAttribute from './BooleanAttribute'

const Attribute = ({ attribute, onChange, onExpand }) => {
	const { title, type, description } = attribute
	function selectAttribute(type) {
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

			case 'array': {
				return <ArrayAttribute {...attribute} onChange={onChange} />
			}

			case 'object': {
				return <ObjectAttribute attribute={attribute} onExpand={onExpand} />
			}

			case 'boolean': {
				return <BooleanAttribute attribute={attribute} onChange={onChange} />
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
