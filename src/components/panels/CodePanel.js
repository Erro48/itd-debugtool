import React from 'react'
import './codePanel.css'
import classNames from 'classnames'
import Icon from '../utils/Icon'

const tabulation = (repeat = 1) => {
	return '  '.repeat(repeat)
}

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

const formatKey = (key) => {
	return `<span className="code-key">${key}</span>`
}

const formatCode = (code, iterationCounter = 1) => {
	let formattedCode = '{\n'

	Object.entries(code).forEach((entry) => {
		const [entryKey, entryValue] = entry
		let value = ''

		// If value is an object
		if (
			typeof entryValue === 'object' &&
			entryValue !== null &&
			!Array.isArray(entryValue)
		) {
			value = formatCode(entryValue, iterationCounter + 1)
		} else if (Array.isArray(entryValue)) {
			const joinSeparator = ',\n' + tabulation(iterationCounter + 1)
			const array = entryValue.join(joinSeparator)
			value = `[\n${tabulation(iterationCounter + 1)}${array}\n${tabulation(
				iterationCounter
			)}]`
		} else {
			value = `"${entryValue}"`
		}

		formattedCode += tabulation(iterationCounter) + `${entryKey}: ${value},\n`
	})

	formattedCode += tabulation(iterationCounter - 1) + '}'
	return formattedCode
}

const CodePanel = ({ type, attribute }) => {
	return (
		<section className='code-section' data-section-type={type}>
			<header className='row w-100 m-auto p-0'>
				<h3 className='col-9 p-0'>{type}</h3>
				<div class='col-3 d-flex justify-content-end p-0'>
					<Icon
						src='./icons/copy.svg'
						alt='Copy'
						classname={'button light-btn'}
					/>
				</div>
			</header>
			<section>
				<pre>
					<code>{formatCode(tmp)}</code>
				</pre>
			</section>
		</section>
	)
}

export default CodePanel
