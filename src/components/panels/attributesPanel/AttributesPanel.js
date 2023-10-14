import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import Breadcrumbs from '../../utils/Breadcrumbs'
import Banner from '../../utils/Banner'
import AttributesSection from './AttributesSection'
import CodePanelsSection from './CodePanelsSection'
import Footer from './Footer'

import './attributesPanel.css'

const AttributesPanel = ({
	activeAffordance,
	formatAffordance,
	onChangeValue,
	updateNestedAffordance,
}) => {
	const [affordance, setAffordance] = useState(activeAffordance)
	const [output, setOutput] = useState({})
	const mainAffordance = useRef(activeAffordance)

	// Update affordance on attribute change
	useEffect(() => {
		setAffordance(formatAffordance(activeAffordance))
		setOutput({})
	}, [activeAffordance])

	/**
	 * Sets newAffordance as the current affordance.
	 * @param {Object} newAffordance the updated affordance
	 * @param {Object} previousAffordance the affordance which was the current before
	 */
	function loadPreviousAffordance(newAffordance, previousAffordance) {
		console.log(newAffordance, previousAffordance)
		const currentAffordance = formatAffordance({
			...newAffordance,
			attributes: newAffordance.attributes.map((attribute) =>
				attribute.title === previousAffordance?.title
					? previousAffordance
					: attribute
			),
		})

		setAffordance(currentAffordance)
	}

	if (affordance === undefined) {
		return (
			<section className='col col-sm-12 px-0' data-panel='attributes-panel'>
				<Banner classname='my-5'>No Thing Descriptions loaded...</Banner>
			</section>
		)
	}

	function update(affordance, nestedAffordance) {
		if (affordance.title === nestedAffordance.title) return nestedAffordance

		if (affordance?.attributes === undefined) {
			return affordance
		}

		return {
			...affordance,
			attributes: [
				...affordance?.attributes?.map((attr) =>
					update(attr, nestedAffordance)
				),
			],
		}
	}

	return (
		<section className='col col-lg-8' data-panel='attributes-panel'>
			<Header affordance={affordance} />

			<Breadcrumbs
				affordance={affordance}
				handleAffordanceChange={loadPreviousAffordance}
			/>
			<section className='row w-100 mx-auto col'>
				<AttributesSection
					affordance={affordance}
					onChange={(newAffordance) => {
						onChangeValue(newAffordance)

						if (mainAffordance.current === undefined)
							mainAffordance.current = activeAffordance

						mainAffordance.current = update(
							mainAffordance.current,
							newAffordance
						)

						updateNestedAffordance(mainAffordance.current)
					}}
				/>

				<CodePanelsSection affordance={affordance} output={output} />
			</section>
			<Footer
				affordance={affordance}
				onSubmit={(output) => setOutput(output)}
				handleAffordanceChange={loadPreviousAffordance}
			/>
		</section>
	)
}

export default AttributesPanel
