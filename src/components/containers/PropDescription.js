import Attribute from '../utils/Attribute/Attribute'
import JsonDisplay from './JsonDisplay'

function PropDescription({ interaction, address, attributes }) {
	return (
		<section className='col col-sm-12 px-2 prop-description'>
			<header className='pt-3'>
				<h2 className='title'>{interaction}</h2>
				<p className='subtitle'>{address}</p>
				<hr />
			</header>
			{/* Attributes */}
			<div class='row'>
				<div class='col-7'>
					<ul>
						{attributes.map((attribute) => {
							return (
								<li key={attribute.name}>
									<Attribute {...attribute} />
								</li>
							)
						})}
					</ul>
				</div>
				<div class='col-5'>
					<JsonDisplay />
				</div>
			</div>
		</section>
	)
}

export default PropDescription
