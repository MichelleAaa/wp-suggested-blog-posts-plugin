import { __ } from '@wordpress/i18n';

import { useState } from "@wordpress/element";
// eslint-disable-next-line
import { TextControl, Flex, FlexBlock, FlexItem, Button, Popover, Icon, PanelBody, PanelRow, ColorPicker, __experimentalDimensionControl as DimensionControl, __experimentalBorderControl as BorderControl } from "@wordpress/components";
// eslint-disable-next-line
import { useBlockProps, __experimentalLinkControl as LinkControl, InspectorControls, BlockControls, AlignmentToolbar } from "@wordpress/block-editor";

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { heading, text, links, theAlignment, bgColor, bPadding, bBorder, hColor, shColor, lkColor } = attributes;
	const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);
	const [ linkValue, setLinkValue ] = useState("");

	function updatePadding(value) {
		switch(value){
			case "small":
				value = "3%";
				break;
			case "medium": 
				value = "5%";
				break;
			case "large": 
				value = "7%";
				break;
			case "xlarge": 
				value = "10%";
				break;
			default:
				value = "1%";
		}
		setAttributes({ bPadding: value });
	}

	function updateBorder(object) {
		let newData = {...bBorder};
		if (object.color){
			newData.color = object.color;
		}
		if (object.style && object.style !== 'none'){
			newData.style = object.style;
		}
		if (object.width){
			newData.width = object.width;
		}
		setAttributes({bBorder: newData});
	}

	function deleteAnswer(indexToDelete) {
		// Filter will return all items except for the current item:
		const newLinks = links.filter(function(object, index) {
		return index !== indexToDelete
		})
		setAttributes({links: newLinks})
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
			<div className="" { ...useBlockProps() } style={{backgroundColor: bgColor, padding: bPadding, textAlign: theAlignment, border: bBorder.width + " " + bBorder.style + " " + bBorder.color }}>
				<BlockControls>
					<AlignmentToolbar value={theAlignment} onChange={x => setAttributes({ theAlignment: x })} />
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( "Block Background Color", 'suggested-blog-posts' ) } initialOpen={false}>
						<PanelRow>
							<ColorPicker color={bgColor} onChangeComplete={x => setAttributes({bgColor: x.hex})} />
						</PanelRow>
					</PanelBody>
					<PanelBody title={ __( "Block Padding", 'suggested-blog-posts' ) } initialOpen={false}>
						<PanelRow>
							<DimensionControl
								label={ __('Padding', 'suggested-blog-posts') }
								icon={ 'desktop' }
								onChange={ value  => updatePadding(value)  }
								value={ bPadding }
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody title={ __( "Block Border Box", 'suggested-blog-posts' ) } initialOpen={false}>
						<PanelRow>
							<BorderControl
								label={ __( 'Borders', 'suggested-blog-posts' ) }
								onChange={ value => updateBorder(value) }
								value={ bBorder }
								shouldSanitizeBorder= {false}
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody title={ __( "Heading Color", 'suggested-blog-posts' ) } initialOpen={false}>
						<PanelRow>
							<ColorPicker color={hColor} onChangeComplete={x => setAttributes({hColor: x.hex})} />
						</PanelRow>
					</PanelBody>
					<PanelBody title={ __( "SubHeading Color", 'suggested-blog-posts' ) } initialOpen={false}>
						<PanelRow>
							<ColorPicker color={shColor} onChangeComplete={x => setAttributes({shColor: x.hex})} />
						</PanelRow>
					</PanelBody>
					<PanelBody title={ __( "Link Color", 'suggested-blog-posts' ) } initialOpen={false}>
						<PanelRow>
							<ColorPicker color={lkColor} onChangeComplete={x => setAttributes({lkColor: x.hex})} />
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<TextControl label={__("Heading")} value={heading} onChange={value => setAttributes({heading: value})} style={{ color: hColor, textAlign: theAlignment }} />
				<TextControl label={__("Subheading")} value={text} onChange={ value => setAttributes({text: value}) } style={{ color: shColor,textAlign: theAlignment }} />
				{links.length > 0 && links.map(function (link, index) {
					return (
					<Flex key={index}>
						<FlexBlock>
							<a href={link.url} style={{color: lkColor}}>{link.title}</a>
						</FlexBlock>
						<FlexItem>
							<Button isLink className="" onClick={() => deleteAnswer(index)}>
								<Icon className="" icon="trash" />
							</Button>
						</FlexItem>
					</Flex>
					)
				})}
				<Button isPrimary onClick={() => setIsLinkPickerVisible(prev => !prev)
				}>{__('Add Link', 'suggested-blog-posts')}</Button>
			</div>
			{isLinkPickerVisible && (
				<Popover position="middle center" onFocusOutside={() => setIsLinkPickerVisible(false)}>
					{/* This creates a field where someone can enter a URL or they can search the WordPress site for a page: */}
					<LinkControl settings={[]} value={linkValue} onChange={(newLink) => setLinkValue( newLink )} />
					<Button variant="primary" onClick={addLink} style={{ display: "block", width: "100%" }}>
						{__('Confirm Link', 'suggested-blog-posts')}
					</Button>
				</Popover>
			)}
		</>
	)
}
