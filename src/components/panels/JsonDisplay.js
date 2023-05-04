import React from 'react'
import './jsonDisplay.css'

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
			<aside class='accordion d-sm-none' id='json-accordion'>
				<div class=''>
					<header class='accordion-header' id='headingOne'>
						<button
							class='accordion-button'
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
						class='accordion-collapse collapse show'
						aria-labelledby='headingOne'
						data-bs-parent='#json-accordion'
					>
						<pre>
							<code>{placeholder}</code>
						</pre>
					</div>
				</div>
			</aside>
			<aside className='d-none d-sm-block'>
				<pre>
					<code>{placeholder}</code>
				</pre>
			</aside>
		</>
	)
}

export default JsonDisplay
