import React from 'react'
import { getAddress, serializeAttributes } from '../../../js/utils'

const SubmitButton = ({ affordance, onSubmit }) => {
	async function handleSubmit(affordance) {
		if (affordance?.parent !== undefined) return handleSubmit(affordance.parent)

		const URI = getAddress(affordance)
		const contentType = affordance?.forms[0].contentType ?? 'application/json'
		const op = Array.isArray(affordance?.forms[0]?.op)
			? affordance?.forms[0]?.op[0]
			: affordance?.forms[0]?.op

		const options = getHttpRequestOptions({
			op,
			contentType,
			attributes: affordance?.attributes,
		})

		const tmpURL = 'http://localhost:8080/' + URI

		console.log(tmpURL, options)

		const response = await fetch(tmpURL, options).then((response) =>
			response.json()
		)

		onSubmit(response)
	}

	function getHttpRequestOptions({ op, contentType, attributes }) {
		const method = getHttpMethod(op)
		const headers = {
			'Content-Type': contentType,
		}
		const body =
			method === 'POST' ? JSON.stringify(serializeAttributes(attributes)) : null

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
