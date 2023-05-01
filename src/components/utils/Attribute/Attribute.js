import React from 'react'
import BasicAttribute from './BasicAttribute'
import ObjectAttribute from './ObjectAttribute'
import ArrayAttribute from './ArrayAttribute'
import './attribute.css'

const Attribute = (props) => {
	const selectAttributeType = (type) => {
		if (type == 'object') return <ObjectAttribute {...props} />
		if (type == 'array') return <ArrayAttribute {...props} />
		return <BasicAttribute {...props} />
	}
	return <React.Fragment>{selectAttributeType(props.type)}</React.Fragment>
}

export default Attribute
