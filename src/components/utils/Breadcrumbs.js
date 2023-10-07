import React, { useEffect, useState } from 'react'
import './breadcrumbs.css'
import classNames from 'classnames'

const Breadcrumbs = ({ affordance, handleAffordanceChange }) => {
	const [path, setPath] = useState(extractPath(affordance))

	useEffect(() => {
		setPath(extractPath(affordance))
	}, [affordance])

	/**
	 * If page is the last element
	 * @param {String} page the name of the breadcrumb page
	 * @returns true if it is the last page, false otherwise
	 */
	function isLastPage(page) {
		return path[path.length - 1] === page
	}

	/**
	 * Get the full path of an affordance.
	 * @param {Object} currentAffordance the given affordance to know the path of
	 * @returns an array with the names of the parents of the affordance
	 */
	function extractPath(currentAffordance) {
		if (currentAffordance === undefined) return []
		if (currentAffordance.parent === undefined) return [currentAffordance.title]

		return [...extractPath(currentAffordance.parent), currentAffordance.title]
	}

	function handleClick(affordanceTitle, currentAffordance = affordance) {
		if (currentAffordance === undefined || affordanceTitle === undefined) return

		if (currentAffordance.parent.title === affordanceTitle) {
			handleAffordanceChange(currentAffordance.parent, currentAffordance)
		} else {
			const tmpAffordance = {
				...currentAffordance.parent,
				attributes: [
					...currentAffordance.parent.attributes.map((attr) =>
						attr.title === currentAffordance.title ? currentAffordance : attr
					),
				],
			}
			handleClick(affordanceTitle, tmpAffordance)
		}
	}

	return (
		<nav
			aria-label='breadcrumb'
			className={classNames(path.length === 0 ? 'd-none' : '')}
		>
			<div>
				<ol className='breadcrumb m-0'>
					{path.map((element) => (
						<li
							key={element}
							className='breadcrumb-item'
							aria-current={isLastPage(element) ? 'page' : ''}
						>
							<button
								className='transparent-btn'
								onClick={(e) => handleClick(e.target.value)}
								value={element}
							>
								{element}
							</button>
						</li>
					))}
				</ol>
			</div>
		</nav>
	)
}

export default Breadcrumbs
