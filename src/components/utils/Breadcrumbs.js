import React from 'react'
import './breadcrumbs.css'
import classNames from 'classnames'

const Breadcrumbs = ({ path }) => {
	const isLastPage = (page) => {
		// If page is the last element
		return path[path.length - 1] === page
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
							{element}
						</li>
					))}
					{/* <li className='breadcrumb-item'>angle</li>
				<li className='breadcrumb-item active' aria-current='page'>
					object1
				</li> */}
				</ol>
			</div>
		</nav>
	)
}

export default Breadcrumbs
