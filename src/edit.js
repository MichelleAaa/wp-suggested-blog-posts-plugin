/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import { useState } from "@wordpress/element";
import {TextControl, Flex, FlexBlock, FlexItem, Button, Popover, Icon} from "@wordpress/components";
// eslint-disable-next-line
import { useBlockProps, __experimentalLinkControl as LinkControl } from "@wordpress/block-editor";

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { heading, text, links } = attributes;
	const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);
	const [ linkValue, setLinkValue ] = useState("");

	function updateHeading(value) {
		setAttributes({heading: value})
	}

	function updateText(value) {
		setAttributes({text: value})
	}

	function deleteAnswer(indexToDelete) {
		// Filter will return all items except for the current item:
		const newLinks = links.filter(function(object, index) {
		return index !== indexToDelete
		})
		setAttributes({links: newLinks})
	}

    function buttonHandler() {
		setIsLinkPickerVisible(prev => !prev)
	}

	function handleLinkChange(newLink) {
		setLinkValue( newLink );
	} 

	function addLink(){
		let newArr;
		if (links === undefined){
			newArr = [linkValue];
		} else {
			newArr = [...links, linkValue];
		}
		setAttributes({links: newArr});
		setLinkValue('');
		setIsLinkPickerVisible(false);
	}

	return (
		<>
			<div className="">
				<TextControl label="Heading" value={heading} onChange={updateHeading} style={{fontSize: "20px"}} />
				<TextControl label="Subheading" value={text} onChange={updateText} style={{fontSize: "20px"}} />

				{links.length !== undefined && links.map(function (link, index) {
					return (
					<Flex key={index}>
						<FlexBlock>
							<a href={link.url}>{link.title}</a>
						</FlexBlock>
						<FlexItem>
							<Button isLink className="" onClick={() => deleteAnswer(index)}>
								<Icon className="" icon="trash" />
							</Button>
						</FlexItem>
					</Flex>
					)
				})}

				<Button isPrimary onClick={() => buttonHandler()
				}>Add Link</Button>
			</div>

			{isLinkPickerVisible && (
				<Popover position="middle center" onFocusOutside={() => setIsLinkPickerVisible(false)}>
					{/* This creates a field where someone can enter a URL or they can search the wordpress site for a page: */}
					<LinkControl settings={[]} value={linkValue} onChange={(newLink) => handleLinkChange(newLink)} />
					<Button variant="primary" onClick={addLink} style={{ display: "block", width: "100%" }}>
						Confirm Link
					</Button>
				</Popover>
			)}
		</>
	)
}
