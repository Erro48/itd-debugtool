import React from 'react'
import './breadcrumbs.css'

const Breadcrumbs = ({ path }) => {
	const isLastPage = (page) => {
		// If page is the last element
		return path[path.length - 1] === page
	}

	return (
		<nav aria-label='breadcrumb'>
			<ol className='breadcrumb m-0'>
				{path.map((element) => (
					<li
						key={element}
						className='breadcrumb-item'
						{...(isLastPage(element) ? 'aria-current="page"' : '')}
					>
						{element}
					</li>
				))}
				{/* <li className='breadcrumb-item'>angle</li>
				<li className='breadcrumb-item active' aria-current='page'>
					object1
				</li> */}
			</ol>
		</nav>
	)
}

export default Breadcrumbs
