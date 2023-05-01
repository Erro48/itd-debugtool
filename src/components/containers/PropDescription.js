import Attribute from '../utils/Attribute/Attribute'
import JsonDisplay from './JsonDisplay'

function PropDescription({ interaction, address, attributes }) {
	return (
		<section className='col col-sm-12 prop-description'>
			<header>
				<h2>{interaction}</h2>
				<p>{address}</p>
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
