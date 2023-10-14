import React from 'react'
import CodePanel from './CodePanel'

const CodePanelsSection = ({ affordance, output }) => {
	const outputAttributes =
		output === undefined
			? []
			: Object.entries(output)
					?.map((entry) => {
						return { title: entry[0], value: entry[1] }
					})
					?.map((attribute) => {
						return {
							...attribute,
							parent: affordance,
						}
					})

	return (
		<div className='col-12 col-sm-5 p-0'>
			<div className='code-panels-section gap-sm-1'>
				<div>
					<CodePanel
						type='input'
						attributes={affordance.attributes.map((attribute) => {
							return {
								...attribute,
								parent: affordance,
							}
						})}
					/>
				</div>
				<div>
					<CodePanel type='output' attributes={outputAttributes} />
				</div>
			</div>
		</div>
	)
}

export default CodePanelsSection
