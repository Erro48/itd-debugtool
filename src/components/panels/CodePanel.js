import React from 'react'
import './codePanel.css'
import classNames from 'classnames'
import Icon from '../utils/Icon'

const tmp = {
	id: 3,
	colors: ['red', '#c2c2c2'],
	obj: {
		prop_1: 45,
		prop_2: true,
		prop_3: [12, 13, 14],
		prop_4: {
			key: 'string',
		},
	},
}

const formatCode = (attributes) => {
	if (attributes === undefined || attributes.length === 0) return {}

	const code = {}

	attributes.forEach((attribute) => {
		let value = attribute.value
		if (attribute.type !== undefined && attribute.type === 'object') {
			value = formatCode(attribute.attributes)
		}

		code[attribute.title] = value
	})

	return code
}

const CodePanel = ({ type, attributes }) => {
	const COPY_ANIMATION_DELAY = 2000

	const copyCode = () => {
		const code = document.querySelector(
			`[data-section-type=${type}] code`
		).innerHTML
		navigator.clipboard.writeText(code)

		document.querySelector(`[data-section-type=${type}] img`).src =
			'./icons/tick-outline.svg'

		setTimeout(() => {
			document.querySelector(`[data-section-type=${type}] img`).src =
				'./icons/copy.svg'
		}, COPY_ANIMATION_DELAY)
	}

	return (
		<section className='code-section' data-section-type={type}>
			<header className='row w-100 m-auto p-0'>
				<h3 className='col-9 p-0'>{type}</h3>
				<div class='col-3 d-flex justify-content-end p-0'>
					<Icon
						src='./icons/copy.svg'
						alt='Copy'
						classname={'button light-btn'}
						onClick={copyCode}
					/>
				</div>
			</header>
			<section>
				<pre>
					<code>{JSON.stringify(formatCode(attributes), null, 2)}</code>
				</pre>
			</section>
		</section>
	)
}

export default CodePanel
