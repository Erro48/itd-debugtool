'use strict'

export function getInitialValue(attribute) {
	if (attribute === undefined) return undefined

	if (attribute.value !== undefined) {
		return attribute.value
	}

	if (attribute.enum !== undefined) {
		return attribute.enum[0]
	}

	if (attribute.type === undefined) {
		return getInitialValue(attribute.input)
	}

	if (attribute.type === 'string') {
		return ''
	}

	if (attribute.type === 'array') {
		return [getInitialValue(attribute.items)]
	}

	if (attribute.minimum !== undefined) {
		return attribute.minimum
	}

	if (attribute.maximum !== undefined) {
		return attribute.maximum
	}

	return 0
}
