import React from 'react'
import './codePanel.css'
import CopyButton from '../utils/Buttons/CopyButton'
import classNames from 'classnames'

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

	const codeJsx = (
		<pre>
			<code>
				{JSON.stringify(formatCode(attributes), null, CODE_INDENTETION)}
			</code>
		</pre>
	)

	return (
		<>
			<button
				type='button'
				className='btn code-btn w-100 d-sm-none'
				data-btn-type={type}
				data-bs-toggle='modal'
				data-bs-target={`#${type}Modal`}
			>
				{type}
			</button>

			<div
				className='modal fade'
				id={`${type}Modal`}
				tabindex='-1'
				aria-labelledby={`${type}ModalLabel`}
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content code-section' data-section-type={type}>
						<div className='modal-header border-0'>
							<h5 className='modal-title' id={`${type}ModalLabel`}>
								{type}
							</h5>

							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body py-0 position-relative'>
							<CopyButton
								textElement={'[data-section-type=' + type + '] code'}
								copyBtnElement={'[data-section-type=' + type + '] img'}
								className={'position-relative float-end'}
							/>
							{codeJsx}
						</div>
					</div>
				</div>
			</div>

			<section
				className='code-section d-none d-sm-block'
				data-section-type={type}
			>
				<header className='row w-100 m-auto p-0'>
					<h3 className='col-9 p-0'>{type}</h3>
					<div className='col-3 d-flex justify-content-end p-0'>
						<CopyButton
							textElement={'[data-section-type=' + type + '] code'}
							copyBtnElement={'[data-section-type=' + type + '] img'}
						/>
					</div>
				</header>
				<section>{codeJsx}</section>
			</section>
		</>
	)
}

export default CodePanel
