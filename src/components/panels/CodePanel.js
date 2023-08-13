import React from 'react'
import './codePanel.css'
import CopyButton from '../utils/Buttons/CopyButton'

const formatCode = (attributes) => {
	if (attributes === undefined || attributes.length === 0) return {}

	const code = {}

	attributes.forEach((attribute) => {
		let value = attribute.value

		if (Array.isArray(value)) {
			value = value.map((element) => element.toString())
		}

		if (attribute.type !== undefined && attribute.type === 'object') {
			value = formatCode(attribute.attributes)
		}

		code[attribute.title] = value
	})

	return code
}

const CodePanel = ({ type, attributes }) => {
	const CODE_INDENTETION = 3

	return (
		<section className='code-section' data-section-type={type}>
			<header className='row w-100 m-auto p-0'>
				<h3 className='col-9 p-0'>{type}</h3>
				<div className='col-3 d-flex justify-content-end p-0'>
					<CopyButton
						textElement={'[data-section-type=' + type + '] code'}
						copyBtnElement={'[data-section-type=' + type + '] img'}
					/>
				</div>
			</header>
			<section>
				<pre>
					<code>
						{JSON.stringify(formatCode(attributes), null, CODE_INDENTETION)}
					</code>
				</pre>
			</section>
		</section>
	)
}

export default CodePanel
