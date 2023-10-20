import React from 'react'
import Attribute from '../../utils/Attribute/Attribute'
import Banner from '../../utils/Banner'
import { getInitialValue } from '../../../js/utils'

const AttributesSection = ({ affordance, onChange }) => {
	/**
	 * Handler for when is activated another affordance
	 * @param {String} title of the new affordance
	 * @param {Object} value of the new affordance
	 */
	function handleChange(title, value) {
		const updatedAttribute = affordance.attributes
			.filter((attribute) => attribute.title === title)
			.map((attribute) => {
				return {
					...attribute,
					value: value,
				}
			})[0]

		const newAttributes = affordance.attributes.map((attribute) => {
			if (attribute.title === updatedAttribute.title) {
				return updatedAttribute
			}

			return attribute
		})

		const newAffordance = { ...affordance, attributes: newAttributes }

		onChange(newAffordance)
	}

	/**
	 * Set as affordance the newAffordance passed
	 * @param {Object} newAffordance to open
	 */
	function handleExpand(newAffordance) {
		const newProperties = (
			newAffordance.attributes === undefined
				? Object.entries(newAffordance.properties)
				: newAffordance.attributes.map((attribute) => [
						attribute.title,
						attribute,
				  ])
		).map((property) => {
			const [title, value] = property
			return {
				title: value?.title ?? title,
				...value,
				value: getAttributeValue(value),
			}
		})

		console.log(affordance.address)

		onChange({
			...newAffordance,
			address: affordance.address,
			affordanceType: affordance.affordanceType,
			attributes: newProperties,
			parent: affordance,
			thingDescription: affordance.thingDescription,
		})
	}

	/**
	 * Returns the value or the default value for a property object
	 * @param {Object} property to know the value of
	 * @returns the value or default value
	 */
	function getAttributeValue(property) {
		if (property.value !== undefined) {
			return property.value
		}

		return getInitialValue(property)
	}

	/**
	 * Return the JSX for the attributes or a banner if attributes is empty.
	 * @param {Array} attributes to display
	 * @returns JSX code
	 */
	function displayAttributesList(attributes) {
		if (attributes === undefined || attributes.length === 0) {
			return <Banner type='info'>No attributes</Banner>
		}

		return (
			<ul className='m-0 attributes-list overflow-auto pe-md-1'>
				{attributes.map((attribute) => (
					<li key={attribute.title}>
						<Attribute
							attribute={attribute}
							onChange={handleChange}
							onExpand={handleExpand}
						/>
					</li>
				))}
			</ul>
		)
	}

	return (
		<div className='col-12 col-sm-7 mb-3 mb-sm-0 ps-md-0 pe-md-2'>
			{displayAttributesList(affordance.attributes)}
		</div>
	)
}

export default AttributesSection
