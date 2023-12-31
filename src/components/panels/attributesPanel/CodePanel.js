import React, { useState } from 'react'
import { serializeAttributes } from '../../../js/utils'
import CopyButton from '../../utils/Buttons/CopyButton'
import './codePanel.css'

const CodePanel = ({ type, attributes }) => {
	const CODE_INDENTETION = 3
	const [readonlyTextarea] = useState(true)

	const codeJsx = (
		<pre>
			{/* <code> */}
			<textarea
				name='code-snippet'
				id={`code-snippet-${type}`}
				readOnly={readonlyTextarea}
				value={JSON.stringify(
					serializeAttributes(attributes),
					null,
					CODE_INDENTETION
				)}
			/>
			{/* </code> */}
		</pre>
	)

	return (
		<>
			{/* Mobile version */}
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

			{/* Desktop version */}
			<section
				className='code-section d-none d-sm-flex flex-column'
				data-section-type={type}
			>
				<header className='row w-100 m-auto p-0'>
					<h3 className='col-9 p-0'>{type}</h3>
					<div className='col-3 d-flex justify-content-end p-0 gap-1'>
						{type === 'input' ?? 'true'}

						{/* {type === 'input' ? (
							<EditModeButton
								onClick={() => setReadonlyTextarea((state) => !state)}
							/>
						) : (
							''
						)} */}

						<CopyButton
							textElement={'[data-section-type=' + type + '] textarea'}
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
