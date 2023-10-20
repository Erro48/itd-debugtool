'use strict'

const CHILD_IDENTIFIER = '*'

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

export function serializeAttributes(attributes) {
	if (attributes === undefined || attributes.length === 0) return {}

	const code = {}

	attributes.forEach((attribute) => {
		let value = attribute.value

		if (Array.isArray(value)) {
			console.log(attribute.title + ' is an array')
			value = value.map((element) => element.toString())
		}

		if (attribute.type !== undefined && attribute.type === 'object') {
			value = serializeAttributes(attribute.attributes)
		}

		code[removeIdentifierFromChildAttribute(attribute.title)] = value
	})

	return code
}

export function addIdentifierToChildAttribute(string) {
	return string + CHILD_IDENTIFIER
}

export function getAddress(affordance, thingDescription) {
	if (affordance.address) return affordance.address

	const validURLRegExp = new RegExp('^(?:[a-z+]+:)?//', 'i')
	const baseURI = thingDescription?.base
	const relativeURI = affordance.forms?.[0]?.href

	let finalURI = undefined

	if (validURLRegExp.test(relativeURI)) {
		finalURI = relativeURI // relative URL is more specific
	}

	if (validURLRegExp.test(baseURI) && !validURLRegExp.test(relativeURI)) {
		finalURI = baseURI + relativeURI
	}

	if (affordance?.uriVariables) {
		finalURI = formatUrlWithUriVariables(finalURI, affordance.attributes)
	}
	return finalURI
}

export async function performQuery(URL, options) {
	return await fetch(
		process.env.REACT_APP_CORS_PROXY_SERVER + URL,
		options
	).then((response) => response.json())
}

function formatUrlWithUriVariables(url, uriVariables) {
	url += '?'
	uriVariables?.forEach((variable) => {
		url = url
			.replace(`{${variable.title}}`, '')
			.replace(`{?${variable.title}}`, '')

		url += `${variable.title}=${variable.value}&`
	})
	return url.slice(0, -1)
}

function removeIdentifierFromChildAttribute(string) {
	return string.replace(CHILD_IDENTIFIER, '')
}
