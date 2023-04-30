import React from 'react'

const placeholder = `{
    "id": 3
}`

const JsonDisplay = () => {
	return (
		<aside>
			{placeholder.split('\n').map((row) => (
				<>
					<code>{row.replace('\n', '')}</code>
					<br />
				</>
			))}
		</aside>
	)
}

export default JsonDisplay
