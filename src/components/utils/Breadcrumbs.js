import React from 'react'
import './breadcrumbs.css'

const Breadcrumbs = () => {
	return (
		<nav aria-label='breadcrumb'>
			<ol className='breadcrumb m-0'>
				<li className='breadcrumb-item'>angle</li>
				<li className='breadcrumb-item active' aria-current='page'>
					object1
				</li>
			</ol>
		</nav>
	)
}

export default Breadcrumbs
