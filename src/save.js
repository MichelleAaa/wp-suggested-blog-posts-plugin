import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { heading, text, links, theAlignment, bgColor, bPadding, bBorder, hColor, shColor, lkColor } = attributes;
	
	return (
		<div { ...useBlockProps.save() }>
			<div className="" style={{backgroundColor: bgColor, padding: bPadding, textAlign: theAlignment, border: bBorder.width + " " + bBorder.style + " " + bBorder.color}}>
				<h2 style={{ color: hColor, textAlign: theAlignment }}>{heading}</h2>
				<p style={{ color: shColor, textAlign: theAlignment }}>{text}</p>
				<ul>
				{links.length !== undefined && links.map(function (link, index) {
					return (
					<li key={index}>
						<a href={link.url} style={{color: lkColor}}>{link.title}</a>
					</li>
					)
				})}
				</ul>
			</div>
		</div>
	);
}
