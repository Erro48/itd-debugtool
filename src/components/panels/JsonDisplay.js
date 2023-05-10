import React from 'react'
import './jsonDisplay.css'
import Icon from '../utils/Icon'

const placeholder = `{
    "id": 3,
	"angle": 180°,
	"array": [
		1,
		2,
		3,
		4
	],
	"obj": {
		"r": 255,
		"g": 255,
		"b": 255
	}
}`

const JsonDisplay = () => {
	return (
		<>
			<aside className='accordion d-sm-none' id='json-accordion'>
				<div>
					<header className='accordion-header card' id='headingOne'>
						<button
							className='accordion-button'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#collapseOne'
							aria-expanded='true'
							aria-controls='collapseOne'
						>
							JSON object
						</button>
					</header>
					<div
						id='collapseOne'
						className='accordion-collapse collapse show p-1 position-relative'
						aria-labelledby='headingOne'
						data-bs-parent='#json-accordion'
					>
						<button class='button light-btn icon-btn top-right-btn'>
							<Icon src='../icons/copy.svg' alt={'Copy JSON object'} />
						</button>
						<pre className='mb-0'>
							<code>{placeholder}</code>
						</pre>
					</div>
				</div>
			</aside>

			<aside className='h-100 p-1 d-none d-sm-block'>
				<button class='button light-btn icon-btn top-right-btn'>
					<Icon src='../icons/copy.svg' alt={'Copy JSON object'} />
				</button>
				<pre>
					<code>{placeholder}</code>
				</pre>
			</aside>
		</>
	)
}

export default JsonDisplay
