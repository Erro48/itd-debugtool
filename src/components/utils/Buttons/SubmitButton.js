import React from 'react'
import {
	getAddress,
	performQuery,
	serializeAttributes,
} from '../../../js/utils'

const SubmitButton = ({ affordance, onSubmit }) => {
	async function handleSubmit(affordance) {
		if (affordance?.parent !== undefined) return handleSubmit(affordance.parent)

		const URL = getAddress(affordance)
		const contentType = affordance?.forms[0].contentType ?? 'application/json'
		const op = Array.isArray(affordance?.forms[0]?.op)
			? affordance?.forms[0]?.op[0]
			: affordance?.forms[0]?.op

		const options = getHttpRequestOptions({
			op,
			contentType,
			attributes: affordance?.attributes,
		})

		const response = await performQuery(URL, options)

		// Error
		if (response.status < 200 || response.status > 299) {
			const newOptions = getHttpRequestOptions({
				op,
				undefined,
				attributes: affordance?.attributes,
			})

			const response = await performQuery(URL, newOptions)
			return onSubmit(response.body)
		}

		onSubmit(response.body)
	}

	function parseAttributesToFormData(attributes, initial = new FormData()) {
		Object.entries(attributes).forEach((entry) => {
			const [key, val] = entry

			initial.append(key, val)
		})

		return initial
	}

	function getHttpRequestOptions({ op, contentType, attributes }) {
		const method = getHttpMethod(op)

		if (!contentType) {
			let attr = serializeAttributes(attributes)
			if (Object.keys(attr).filter((key) => key.includes('*')).length > 0) {
				attr = Object.entries(attr).map((entry) => {
					const [key, val] = entry
					if (key.includes('*')) {
						return val
					}
					return [key, val]
				})
				attr = { ...{ ...attr }['0'] }
			}

			const body = parseAttributesToFormData(attr)
			return {
				method,
				...(body && { body }),
			}
		}

		const headers = {
			'Content-Type': contentType,
		}
		const body =
			method === 'POST'
				? JSON.stringify(serializeAttributes(attributes)['setColor*'])
				: null

		return {
			method,
			headers,
			...(body && { body }),
		}
	}

	function getHttpMethod(op) {
		switch (op) {
			case 'readproperty':
			case 'writeproperty':
			case 'observeproperty':
			case 'unobserveproperty':
				return 'GET'

			case 'invokeaction':
			case 'queryaction':
			case 'cancelation':
				return 'POST'

			default:
				return 'GET'
		}
	}

	return (
		<button
			type='button'
			className='button primary-btn col'
			onClick={() => handleSubmit(affordance)}
		>
			Submit
		</button>
	)
}

export default SubmitButton
