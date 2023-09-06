import React from 'react'
import './breadcrumbs.css'
import classNames from 'classnames'

const Breadcrumbs = ({ path, onClick }) => {
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
							<button
								className='transparent-btn'
								onClick={(event) => onClick(event.target.value)}
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
