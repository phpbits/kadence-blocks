/**
 * BLOCK: Kadence Info Box
 */

/**
 * Import Icons
 */
import icons from '../../icons';
import GenIcon from '../../genicon';
import Ico from '../../svgicons';
import FaIco from '../../faicons';
/**
 * Import attributes
 */
import attributes from './attributes';
/**
 * Import edit
 */
import edit from './edit';

/**
 * Import Css
 */
import './style.scss';
import './editor.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
	RichText,
} = wp.blockEditor;

/**
 * Register: a Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'kadence/infobox', {
	title: __( 'Info Box' ),
	icon: {
		src: icons.infobox,
	},
	category: 'kadence-blocks',
	keywords: [
		__( 'Info' ),
		__( 'Icon' ),
		__( 'KT' ),
	],
	attributes,
	edit,

	save: props => {
		const { attributes: { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, mediaVAlign }, className } = props;
		const titleTagName = 'h' + titleFont[ 0 ].level;
		const image = (
			<div className="kadence-info-box-image-inner-intrisic-container" style={ {
				maxWidth: mediaImage[ 0 ].maxWidth + 'px',
			} } >
				<div className={ `kadence-info-box-image-intrisic kt-info-animate-${ mediaImage[ 0 ].hoverAnimation }${ ( 'svg+xml' === mediaImage[ 0 ].subtype ? ' kb-info-box-image-type-svg' : '' ) }` } style={ {
					paddingBottom: isNaN( mediaImage[ 0 ].height ) ? undefined : ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
					height: isNaN( mediaImage[ 0 ].height ) ? undefined : 0,
					width: isNaN( mediaImage[ 0 ].width ) || 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth + 'px' : mediaImage[ 0 ].width + 'px',
					maxWidth: '100%',
				} } >
					<div className="kadence-info-box-image-inner-intrisic">
						<img
							src={ mediaImage[ 0 ].url }
							alt={ mediaImage[ 0 ].alt }
							width={ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].width ) }
							height={ mediaImage[ 0 ].height }
							className={ `${ ( mediaImage[ 0 ].id ? `kt-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'kt-info-box-image wp-image-offsite' ) } ${ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? ' kt-info-svg-image' : '' ) }` }
						/>
						{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
							<img
								src={ mediaImage[ 0 ].flipUrl }
								alt={ mediaImage[ 0 ].flipAlt }
								width={ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].flipWidth ) }
								height={ mediaImage[ 0 ].flipHeight }
								className={ `${ ( mediaImage[ 0 ].flipId ? `kt-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'kt-info-box-image-flip wp-image-offsite' ) } ${ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? ' kt-info-svg-image' : '' ) }` }
							/>
						) }
					</div>
				</div>
			</div>
		);
		const icon = (
			<div className={ `kadence-info-box-icon-container kt-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
				<div className={ 'kadence-info-box-icon-inner-container' } >
					<GenIcon className={ `kt-info-svg-icon kt-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].icon ] : Ico[ mediaIcon[ 0 ].icon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
						display: 'block',
					} } />
					{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
						<GenIcon className={ `kt-info-svg-icon-flip kt-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].flipIcon ] : Ico[ mediaIcon[ 0 ].flipIcon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
							display: 'block',
						} } />
					) }
				</div>
			</div>
		);
		const learMoreOutput = (
			<div className="kt-blocks-info-box-learnmore-wrap">
				<RichText.Content
					className="kt-blocks-info-box-learnmore"
					tagName={ 'span' }
					value={ learnMore }
				/>
			</div>
		);
		const learMoreLinkOutput = (
			<div className="kt-blocks-info-box-learnmore-wrap">
				<RichText.Content
					className="kt-blocks-info-box-learnmore"
					tagName={ 'a' }
					target={ ( '_blank' === target ? target : undefined ) }
					rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) }
					value={ learnMore }
					href={ link }
				/>
			</div>
		);
		const textOutput = (
			<div className={ 'kt-infobox-textcontent' } >
				{ displayTitle && (
					<RichText.Content
						className="kt-blocks-info-box-title"
						tagName={ titleTagName }
						value={ title }
					/>
				) }
				{ displayText && (
					<RichText.Content
						className="kt-blocks-info-box-text"
						tagName={ 'p' }
						value={ contentText }
					/>
				) }
				{ displayLearnMore && linkProperty === 'learnmore' && (
					learMoreLinkOutput
				) }
				{ displayLearnMore && linkProperty !== 'learnmore' && (
					learMoreOutput
				) }
			</div>
		);
		return (
			<div id={ `kt-info-box${ uniqueID }` } className={ className }>
				{ linkProperty !== 'learnmore' && (
					<a className={ `kt-blocks-info-box-link-wrap kt-blocks-info-box-media-align-${ mediaAlign } kt-info-halign-${ hAlign }${ ( mediaVAlign && 'middle' !== mediaVAlign ? ' kb-info-box-vertical-media-align-' + mediaVAlign : '' ) }` } target={ ( '_blank' === target ? target : undefined ) } rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) } href={ link }>
						<div className={ 'kt-blocks-info-box-media-container' }>
							<div className={ `kt-blocks-info-box-media kt-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
								{ mediaImage[ 0 ].url && 'image' === mediaType && (
									image
								) }
								{ 'icon' === mediaType && (
									icon
								) }
							</div>
						</div>
						{ textOutput }
					</a>
				) }
				{ linkProperty === 'learnmore' && (
					<div className={ `kt-blocks-info-box-link-wrap kt-blocks-info-box-media-align-${ mediaAlign } kt-info-halign-${ hAlign }${ ( mediaVAlign && 'middle' !== mediaVAlign ? ' kb-info-box-vertical-media-align-' + mediaVAlign : '' ) }` }>
						<div className={ 'kt-blocks-info-box-media-container' }>
							<div className={ `kt-blocks-info-box-media kt-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
								{ mediaImage[ 0 ].url && 'image' === mediaType && (
									image
								) }
								{ 'icon' === mediaType && (
									icon
								) }
							</div>
						</div>
						{ textOutput }
					</div>
				) }
			</div>
		);
	},
	deprecated: [
		{
			attributes,
			save: ( { attributes } ) => {
				const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, mediaVAlign, className } = attributes;
				const titleTagName = 'h' + titleFont[ 0 ].level;
				return (
					<div id={ `kt-info-box${ uniqueID }` } className={ className }>
						{ linkProperty !== 'learnmore' && (
							<a className={ `kt-blocks-info-box-link-wrap kt-blocks-info-box-media-align-${ mediaAlign } kt-info-halign-${ hAlign }${ ( mediaVAlign && 'middle' !== mediaVAlign ? ' kb-info-box-vertical-media-align-' + mediaVAlign : '' ) }` } target={ ( '_blank' === target ? target : undefined ) } rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) } href={ link }>
								<div className={ 'kt-blocks-info-box-media-container' }>
									<div className={ `kt-blocks-info-box-media kt-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
										{ mediaImage[ 0 ].url && 'image' === mediaType && (
											<div className="kadence-info-box-image-inner-intrisic-container" style={ {
												maxWidth: mediaImage[ 0 ].maxWidth + 'px',
											} } >
												<div className={ `kadence-info-box-image-intrisic kt-info-animate-${ mediaImage[ 0 ].hoverAnimation }${ ( 'svg+xml' === mediaImage[ 0 ].subtype ? ' kb-info-box-image-type-svg' : '' ) }` } style={ {
													paddingBottom: isNaN( mediaImage[ 0 ].height ) ? undefined : ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
													width: isNaN( mediaImage[ 0 ].height ) ? undefined : mediaImage[ 0 ].width + 'px',
													maxWidth: isNaN( mediaImage[ 0 ].height ) ? undefined : '100%',
												} } >
													<div className="kadence-info-box-image-inner-intrisic">
														<img
															src={ mediaImage[ 0 ].url }
															alt={ mediaImage[ 0 ].alt }
															width={ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].width ) }
															height={ mediaImage[ 0 ].height }
															className={ `${ ( mediaImage[ 0 ].id ? `kt-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'kt-info-box-image wp-image-offsite' ) } ${ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? ' kt-info-svg-image' : '' ) }` }
														/>
														{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
															<img
																src={ mediaImage[ 0 ].flipUrl }
																alt={ mediaImage[ 0 ].flipAlt }
																width={ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].flipWidth ) }
																height={ mediaImage[ 0 ].flipHeight }
																className={ `${ ( mediaImage[ 0 ].flipId ? `kt-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'kt-info-box-image-flip wp-image-offsite' ) } ${ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? ' kt-info-svg-image' : '' ) }` }
															/>
														) }
													</div>
												</div>
											</div>
										) }
										{ 'icon' === mediaType && (
											<div className={ `kadence-info-box-icon-container kt-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
												<div className={ 'kadence-info-box-icon-inner-container' } >
													<GenIcon className={ `kt-info-svg-icon kt-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].icon ] : Ico[ mediaIcon[ 0 ].icon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
														display: 'block',
													} } />
													{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
														<GenIcon className={ `kt-info-svg-icon-flip kt-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].flipIcon ] : Ico[ mediaIcon[ 0 ].flipIcon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
															display: 'block',
														} } />
													) }
												</div>
											</div>
										) }
									</div>
								</div>
								<div className={ 'kt-infobox-textcontent' } >
									{ displayTitle && (
										<RichText.Content
											className="kt-blocks-info-box-title"
											tagName={ titleTagName }
											value={ title }
										/>
									) }
									{ displayText && (
										<RichText.Content
											className="kt-blocks-info-box-text"
											tagName={ 'p' }
											value={ contentText }
										/>
									) }
									{ displayLearnMore && (
										<div className="kt-blocks-info-box-learnmore-wrap">
											<RichText.Content
												className="kt-blocks-info-box-learnmore"
												tagName={ 'span' }
												value={ learnMore }
											/>
										</div>
									) }
								</div>
							</a>
						) }
						{ linkProperty === 'learnmore' && (
							<div className={ `kt-blocks-info-box-link-wrap kt-blocks-info-box-media-align-${ mediaAlign } kt-info-halign-${ hAlign }${ ( mediaVAlign && 'middle' !== mediaVAlign ? ' kb-info-box-vertical-media-align-' + mediaVAlign : '' ) }` }>
								<div className={ 'kt-blocks-info-box-media-container' }>
									<div className={ `kt-blocks-info-box-media kt-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
										{ mediaImage[ 0 ].url && 'image' === mediaType && (
											<div className="kadence-info-box-image-inner-intrisic-container" style={ {
												maxWidth: mediaImage[ 0 ].maxWidth + 'px',
											} } >
												<div className={ `kadence-info-box-image-intrisic kt-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
													paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
												} } >
													<div className="kadence-info-box-image-inner-intrisic">
														<img
															src={ mediaImage[ 0 ].url }
															alt={ mediaImage[ 0 ].alt }
															width={ mediaImage[ 0 ].width }
															height={ mediaImage[ 0 ].height }
															className={ mediaImage[ 0 ].id ? `kt-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'kt-info-box-image wp-image-offsite' }
														/>
														{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
															<img
																src={ mediaImage[ 0 ].flipUrl }
																alt={ mediaImage[ 0 ].flipAlt }
																width={ mediaImage[ 0 ].flipWidth }
																height={ mediaImage[ 0 ].flipHeight }
																className={ mediaImage[ 0 ].flipId ? `kt-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'kt-info-box-image-flip wp-image-offsite' }
															/>
														) }
													</div>
												</div>
											</div>
										) }
										{ 'icon' === mediaType && (
											<div className={ `kadence-info-box-icon-container kt-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
												<div className={ 'kadence-info-box-icon-inner-container' } >
													<GenIcon className={ `kt-info-svg-icon kt-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].icon ] : Ico[ mediaIcon[ 0 ].icon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
														display: 'block',
													} } />
													{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
														<GenIcon className={ `kt-info-svg-icon-flip kt-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].flipIcon ] : Ico[ mediaIcon[ 0 ].flipIcon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
															display: 'block',
														} } />
													) }
												</div>
											</div>
										) }
									</div>
								</div>
								<div className={ 'kt-infobox-textcontent' } >
									{ displayTitle && (
										<RichText.Content
											className="kt-blocks-info-box-title"
											tagName={ titleTagName }
											value={ title }
										/>
									) }
									{ displayText && (
										<RichText.Content
											className="kt-blocks-info-box-text"
											tagName={ 'p' }
											value={ contentText }
										/>
									) }
									{ displayLearnMore && (
										<div className="kt-blocks-info-box-learnmore-wrap">
											<RichText.Content
												className="kt-blocks-info-box-learnmore"
												tagName={ 'a' }
												target={ ( '_blank' === target ? target : undefined ) }
												rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) }
												value={ learnMore }
												href={ link }
											/>
										</div>
									) }
								</div>
							</div>
						) }
					</div>
				);
			},
		},
		{
			attributes,
			save: ( { attributes } ) => {
				const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, className } = attributes;
				const titleTagName = 'h' + titleFont[ 0 ].level;
				return (
					<div id={ `kt-info-box${ uniqueID }` } className={ className }>
						{ linkProperty !== 'learnmore' && (
							<a className={ `kt-blocks-info-box-link-wrap kt-blocks-info-box-media-align-${ mediaAlign } kt-info-halign-${ hAlign }` } target={ ( '_blank' === target ? target : undefined ) } rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) } href={ link }>
								<div className={ `kt-blocks-info-box-media kt-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
									{ mediaImage[ 0 ].url && 'image' === mediaType && (
										<div className="kadence-info-box-image-inner-intrisic-container" style={ {
											maxWidth: mediaImage[ 0 ].maxWidth + 'px',
										} } >
											<div className={ `kadence-info-box-image-intrisic kt-info-animate-${ mediaImage[ 0 ].hoverAnimation }${ ( 'svg+xml' === mediaImage[ 0 ].subtype ? ' kb-info-box-image-type-svg' : '' ) }` } style={ {
												paddingBottom: isNaN( mediaImage[ 0 ].height ) ? undefined : ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
												width: isNaN( mediaImage[ 0 ].height ) ? undefined : mediaImage[ 0 ].width + 'px',
												maxWidth: isNaN( mediaImage[ 0 ].height ) ? undefined : '100%',
											} } >
												<div className="kadence-info-box-image-inner-intrisic">
													<img
														src={ mediaImage[ 0 ].url }
														alt={ mediaImage[ 0 ].alt }
														width={ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].width ) }
														height={ mediaImage[ 0 ].height }
														className={ `${ ( mediaImage[ 0 ].id ? `kt-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'kt-info-box-image wp-image-offsite' ) } ${ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? ' kt-info-svg-image' : '' ) }` }
													/>
													{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
														<img
															src={ mediaImage[ 0 ].flipUrl }
															alt={ mediaImage[ 0 ].flipAlt }
															width={ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].flipWidth ) }
															height={ mediaImage[ 0 ].flipHeight }
															className={ `${ ( mediaImage[ 0 ].flipId ? `kt-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'kt-info-box-image-flip wp-image-offsite' ) } ${ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? ' kt-info-svg-image' : '' ) }` }
														/>
													) }
												</div>
											</div>
										</div>
									) }
									{ 'icon' === mediaType && (
										<div className={ `kadence-info-box-icon-container kt-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
											<div className={ 'kadence-info-box-icon-inner-container' } >
												<GenIcon className={ `kt-info-svg-icon kt-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].icon ] : Ico[ mediaIcon[ 0 ].icon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
												{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
													<GenIcon className={ `kt-info-svg-icon-flip kt-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].flipIcon ] : Ico[ mediaIcon[ 0 ].flipIcon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
														display: 'block',
													} } />
												) }
											</div>
										</div>
									) }
								</div>
								<div className={ 'kt-infobox-textcontent' } >
									{ displayTitle && (
										<RichText.Content
											className="kt-blocks-info-box-title"
											tagName={ titleTagName }
											value={ title }
										/>
									) }
									{ displayText && (
										<RichText.Content
											className="kt-blocks-info-box-text"
											tagName={ 'p' }
											value={ contentText }
										/>
									) }
									{ displayLearnMore && (
										<div className="kt-blocks-info-box-learnmore-wrap">
											<RichText.Content
												className="kt-blocks-info-box-learnmore"
												tagName={ 'span' }
												value={ learnMore }
											/>
										</div>
									) }
								</div>
							</a>
						) }
						{ linkProperty === 'learnmore' && (
							<div className={ `kt-blocks-info-box-link-wrap kt-blocks-info-box-media-align-${ mediaAlign } kt-info-halign-${ hAlign }` }>
								<div className={ `kt-blocks-info-box-media kt-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
									{ mediaImage[ 0 ].url && 'image' === mediaType && (
										<div className="kadence-info-box-image-inner-intrisic-container" style={ {
											maxWidth: mediaImage[ 0 ].maxWidth + 'px',
										} } >
											<div className={ `kadence-info-box-image-intrisic kt-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
												paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
											} } >
												<div className="kadence-info-box-image-inner-intrisic">
													<img
														src={ mediaImage[ 0 ].url }
														alt={ mediaImage[ 0 ].alt }
														width={ mediaImage[ 0 ].width }
														height={ mediaImage[ 0 ].height }
														className={ mediaImage[ 0 ].id ? `kt-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'kt-info-box-image wp-image-offsite' }
													/>
													{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
														<img
															src={ mediaImage[ 0 ].flipUrl }
															alt={ mediaImage[ 0 ].flipAlt }
															width={ mediaImage[ 0 ].flipWidth }
															height={ mediaImage[ 0 ].flipHeight }
															className={ mediaImage[ 0 ].flipId ? `kt-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'kt-info-box-image-flip wp-image-offsite' }
														/>
													) }
												</div>
											</div>
										</div>
									) }
									{ 'icon' === mediaType && (
										<div className={ `kadence-info-box-icon-container kt-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
											<div className={ 'kadence-info-box-icon-inner-container' } >
												<GenIcon className={ `kt-info-svg-icon kt-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].icon ] : Ico[ mediaIcon[ 0 ].icon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
												{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
													<GenIcon className={ `kt-info-svg-icon-flip kt-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].flipIcon ] : Ico[ mediaIcon[ 0 ].flipIcon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
														display: 'block',
													} } />
												) }
											</div>
										</div>
									) }
								</div>
								<div className={ 'kt-infobox-textcontent' } >
									{ displayTitle && (
										<RichText.Content
											className="kt-blocks-info-box-title"
											tagName={ titleTagName }
											value={ title }
										/>
									) }
									{ displayText && (
										<RichText.Content
											className="kt-blocks-info-box-text"
											tagName={ 'p' }
											value={ contentText }
										/>
									) }
									{ displayLearnMore && (
										<div className="kt-blocks-info-box-learnmore-wrap">
											<RichText.Content
												className="kt-blocks-info-box-learnmore"
												tagName={ 'a' }
												target={ ( '_blank' === target ? target : undefined ) }
												rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) }
												value={ learnMore }
												href={ link }
											/>
										</div>
									) }
								</div>
							</div>
						) }
					</div>
				);
			}
		},
		{
			attributes,
			save: ( { attributes } ) => {
				const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, className } = attributes;
				const titleTagName = 'h' + titleFont[ 0 ].level;
				return (
					<div id={ `kt-info-box${ uniqueID }` } className={ className }>
						{ linkProperty !== 'learnmore' && (
							<a className={ `kt-blocks-info-box-link-wrap kt-blocks-info-box-media-align-${ mediaAlign } kt-info-halign-${ hAlign }` } target={ ( '_blank' === target ? target : undefined ) } rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) } href={ link }>
								<div className={ `kt-blocks-info-box-media kt-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
									{ mediaImage[ 0 ].url && 'image' === mediaType && (
										<div className="kadence-info-box-image-inner-intrisic-container" style={ {
											maxWidth: mediaImage[ 0 ].maxWidth + 'px',
										} } >
											<div className={ `kadence-info-box-image-intrisic kt-info-animate-${ mediaImage[ 0 ].hoverAnimation }${ ( 'svg+xml' === mediaImage[ 0 ].subtype ? ' kb-info-box-image-type-svg' : '' ) }` } style={ {
												paddingBottom: isNaN( mediaImage[ 0 ].height ) ? undefined : ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
											} } >
												<div className="kadence-info-box-image-inner-intrisic">
													<img
														src={ mediaImage[ 0 ].url }
														alt={ mediaImage[ 0 ].alt }
														width={ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].width ) }
														height={ mediaImage[ 0 ].height }
														className={ `${ ( mediaImage[ 0 ].id ? `kt-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'kt-info-box-image wp-image-offsite' ) } ${ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? ' kt-info-svg-image' : '' ) }` }
													/>
													{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
														<img
															src={ mediaImage[ 0 ].flipUrl }
															alt={ mediaImage[ 0 ].flipAlt }
															width={ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].flipWidth ) }
															height={ mediaImage[ 0 ].flipHeight }
															className={ `${ ( mediaImage[ 0 ].flipId ? `kt-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'kt-info-box-image-flip wp-image-offsite' ) } ${ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? ' kt-info-svg-image' : '' ) }` }
														/>
													) }
												</div>
											</div>
										</div>
									) }
									{ 'icon' === mediaType && (
										<div className={ `kadence-info-box-icon-container kt-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
											<div className={ 'kadence-info-box-icon-inner-container' } >
												<GenIcon className={ `kt-info-svg-icon kt-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].icon ] : Ico[ mediaIcon[ 0 ].icon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
												{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
													<GenIcon className={ `kt-info-svg-icon-flip kt-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].flipIcon ] : Ico[ mediaIcon[ 0 ].flipIcon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
														display: 'block',
													} } />
												) }
											</div>
										</div>
									) }
								</div>
								<div className={ 'kt-infobox-textcontent' } >
									{ displayTitle && (
										<RichText.Content
											className="kt-blocks-info-box-title"
											tagName={ titleTagName }
											value={ title }
										/>
									) }
									{ displayText && (
										<RichText.Content
											className="kt-blocks-info-box-text"
											tagName={ 'p' }
											value={ contentText }
										/>
									) }
									{ displayLearnMore && (
										<div className="kt-blocks-info-box-learnmore-wrap">
											<RichText.Content
												className="kt-blocks-info-box-learnmore"
												tagName={ 'span' }
												value={ learnMore }
											/>
										</div>
									) }
								</div>
							</a>
						) }
						{ linkProperty === 'learnmore' && (
							<div className={ `kt-blocks-info-box-link-wrap kt-blocks-info-box-media-align-${ mediaAlign } kt-info-halign-${ hAlign }` }>
								<div className={ `kt-blocks-info-box-media kt-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
									{ mediaImage[ 0 ].url && 'image' === mediaType && (
										<div className="kadence-info-box-image-inner-intrisic-container" style={ {
											maxWidth: mediaImage[ 0 ].maxWidth + 'px',
										} } >
											<div className={ `kadence-info-box-image-intrisic kt-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
												paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
											} } >
												<div className="kadence-info-box-image-inner-intrisic">
													<img
														src={ mediaImage[ 0 ].url }
														alt={ mediaImage[ 0 ].alt }
														width={ mediaImage[ 0 ].width }
														height={ mediaImage[ 0 ].height }
														className={ mediaImage[ 0 ].id ? `kt-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'kt-info-box-image wp-image-offsite' }
													/>
													{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
														<img
															src={ mediaImage[ 0 ].flipUrl }
															alt={ mediaImage[ 0 ].flipAlt }
															width={ mediaImage[ 0 ].flipWidth }
															height={ mediaImage[ 0 ].flipHeight }
															className={ mediaImage[ 0 ].flipId ? `kt-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'kt-info-box-image-flip wp-image-offsite' }
														/>
													) }
												</div>
											</div>
										</div>
									) }
									{ 'icon' === mediaType && (
										<div className={ `kadence-info-box-icon-container kt-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
											<div className={ 'kadence-info-box-icon-inner-container' } >
												<GenIcon className={ `kt-info-svg-icon kt-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].icon ] : Ico[ mediaIcon[ 0 ].icon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
												{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
													<GenIcon className={ `kt-info-svg-icon-flip kt-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].flipIcon ] : Ico[ mediaIcon[ 0 ].flipIcon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
														display: 'block',
													} } />
												) }
											</div>
										</div>
									) }
								</div>
								<div className={ 'kt-infobox-textcontent' } >
									{ displayTitle && (
										<RichText.Content
											className="kt-blocks-info-box-title"
											tagName={ titleTagName }
											value={ title }
										/>
									) }
									{ displayText && (
										<RichText.Content
											className="kt-blocks-info-box-text"
											tagName={ 'p' }
											value={ contentText }
										/>
									) }
									{ displayLearnMore && (
										<div className="kt-blocks-info-box-learnmore-wrap">
											<RichText.Content
												className="kt-blocks-info-box-learnmore"
												tagName={ 'a' }
												target={ ( '_blank' === target ? target : undefined ) }
												rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) }
												value={ learnMore }
												href={ link }
											/>
										</div>
									) }
								</div>
							</div>
						) }
					</div>
				);
			},
		},
		{
			attributes: {
				uniqueID: {
					type: 'string',
					default: '',
				},
				link: {
					type: 'string',
					source: 'attribute',
					attribute: 'href',
					selector: 'a',
				},
				linkProperty: {
					type: 'string',
					default: 'box',
				},
				target: {
					type: 'string',
					source: 'attribute',
					attribute: 'target',
					selector: 'a',
					default: '_self',
				},
				hAlign: {
					type: 'string',
					default: 'center',
				},
				containerBackground: {
					type: 'string',
					default: '#f2f2f2',
				},
				containerHoverBackground: {
					type: 'string',
					default: '#f2f2f2',
				},
				containerBorder: {
					type: 'string',
					default: '#eeeeee',
				},
				containerHoverBorder: {
					type: 'string',
					default: '#eeeeee',
				},
				containerBorderWidth: {
					type: 'array',
					default: [ 0, 0, 0, 0 ],
				},
				containerBorderRadius: {
					type: 'number',
					default: 0,
				},
				containerPadding: {
					type: 'array',
					default: [ 20, 20, 20, 20 ],
				},
				mediaType: {
					type: 'string',
					default: 'icon',
				},
				mediaAlign: {
					type: 'string',
					default: 'top',
				},
				mediaImage: {
					type: 'array',
					default: [ {
						url: '',
						id: '',
						alt: '',
						width: '',
						height: '',
						maxWidth: '',
						hoverAnimation: 'none',
						flipUrl: '',
						flipId: '',
						flipAlt: '',
						flipWidth: '',
						flipHeight: '',
					} ],
				},
				mediaIcon: {
					type: 'array',
					default: [ {
						icon: 'fe_aperture',
						size: 50,
						width: 2,
						title: '',
						color: '#444444',
						hoverColor: '#444444',
						hoverAnimation: 'none',
						flipIcon: '',
					} ],
				},
				mediaStyle: {
					type: 'array',
					default: [ {
						background: 'transparent',
						hoverBackground: 'transparent',
						border: '#444444',
						hoverBorder: '#444444',
						borderRadius: 0,
						borderWidth: [ 0, 0, 0, 0 ],
						padding: [ 10, 10, 10, 10 ],
						margin: [ 0, 15, 0, 15 ],
					} ],
				},
				displayTitle: {
					type: 'bool',
					default: true,
				},
				title: {
					type: 'array',
					source: 'children',
					selector: 'h1,h2,h3,h4,h5,h6',
					default: __( 'Title' ),
				},
				titleColor: {
					type: 'string',
					default: '',
				},
				titleHoverColor: {
					type: 'string',
					default: '',
				},
				titleFont: {
					type: 'array',
					default: [ {
						level: 2,
						size: [ '', '', '' ],
						sizeType: 'px',
						lineHeight: [ '', '', '' ],
						lineType: 'px',
						letterSpacing: '',
						textTransform: '',
						family: '',
						google: false,
						style: '',
						weight: '',
						variant: '',
						subset: '',
						loadGoogle: true,
						padding: [ 0, 0, 0, 0 ],
						paddingControl: 'linked',
						margin: [ 5, 0, 10, 0 ],
						marginControl: 'individual',
					} ],
				},
				displayText: {
					type: 'bool',
					default: true,
				},
				contentText: {
					type: 'array',
					source: 'children',
					selector: 'p',
					default: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.' ),
				},
				textColor: {
					type: 'string',
					default: '#555555',
				},
				textHoverColor: {
					type: 'string',
					default: '',
				},
				textFont: {
					type: 'array',
					default: [ {
						size: [ '', '', '' ],
						sizeType: 'px',
						lineHeight: [ '', '', '' ],
						lineType: 'px',
						letterSpacing: '',
						family: '',
						google: '',
						style: '',
						weight: '',
						variant: '',
						subset: '',
						loadGoogle: true,
					} ],
				},
				displayLearnMore: {
					type: 'bool',
					default: false,
				},
				learnMore: {
					type: 'array',
					source: 'children',
					selector: '.kt-blocks-info-box-learnmore',
					default: __( 'Learn More' ),
				},
				learnMoreStyles: {
					type: 'array',
					default: [ {
						size: [ '', '', '' ],
						sizeType: 'px',
						lineHeight: [ '', '', '' ],
						lineType: 'px',
						letterSpacing: '',
						family: '',
						google: '',
						style: '',
						weight: '',
						variant: '',
						subset: '',
						loadGoogle: true,
						padding: [ 4, 8, 4, 8 ],
						paddingControl: 'individual',
						margin: [ 10, 0, 10, 0 ],
						marginControl: 'individual',
						color: '',
						background: 'transparent',
						border: '#555555',
						borderRadius: 0,
						borderWidth: [ 0, 0, 0, 0 ],
						borderControl: 'linked',
						colorHover: '#ffffff',
						backgroundHover: '#444444',
						borderHover: '#444444',
						hoverEffect: 'revealBorder',
					} ],
				},
				displayShadow: {
					type: 'bool',
					default: false,
				},
				shadow: {
					type: 'array',
					default: [ {
						color: '#000000',
						opacity: 0,
						spread: 0,
						blur: 0,
						hOffset: 0,
						vOffset: 0,
					} ],
				},
				shadowHover: {
					type: 'array',
					default: [ {
						color: '#000000',
						opacity: 0.2,
						spread: 0,
						blur: 14,
						hOffset: 0,
						vOffset: 0,
					} ],
				},
			},
			save: ( { attributes } ) => {
				const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, className } = attributes;
				const titleTagName = 'h' + titleFont[ 0 ].level;
				return (
					<div id={ `kt-info-box${ uniqueID }` } className={ className }>
						{ linkProperty !== 'learnmore' && (
							<a className={ `kt-blocks-info-box-link-wrap kt-blocks-info-box-media-align-${ mediaAlign } kt-info-halign-${ hAlign }` } target={ ( '_blank' === target ? target : undefined ) } rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) } href={ link }>
								<div className={ `kt-blocks-info-box-media kt-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
									{ mediaImage[ 0 ].url && 'image' === mediaType && (
										<div className="kadence-info-box-image-inner-intrisic-container" style={ {
											maxWidth: mediaImage[ 0 ].maxWidth + 'px',
										} } >
											<div className={ `kadence-info-box-image-intrisic kt-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
												paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
											} } >
												<div className="kadence-info-box-image-inner-intrisic">
													<img
														src={ mediaImage[ 0 ].url }
														alt={ mediaImage[ 0 ].alt }
														width={ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].width ) }
														height={ mediaImage[ 0 ].height }
														className={ `${ ( mediaImage[ 0 ].id ? `kt-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'kt-info-box-image wp-image-offsite' ) } ${ ( mediaImage[ 0 ].subtype && 'svg+xml' === mediaImage[ 0 ].subtype ? ' kt-info-svg-image' : '' ) }` }
													/>
													{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
														<img
															src={ mediaImage[ 0 ].flipUrl }
															alt={ mediaImage[ 0 ].flipAlt }
															width={ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? mediaImage[ 0 ].maxWidth : mediaImage[ 0 ].flipWidth ) }
															height={ mediaImage[ 0 ].flipHeight }
															className={ `${ ( mediaImage[ 0 ].flipId ? `kt-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'kt-info-box-image-flip wp-image-offsite' ) } ${ ( mediaImage[ 0 ].flipSubtype && 'svg+xml' === mediaImage[ 0 ].flipSubtype ? ' kt-info-svg-image' : '' ) }` }
														/>
													) }
												</div>
											</div>
										</div>
									) }
									{ 'icon' === mediaType && (
										<div className={ `kadence-info-box-icon-container kt-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
											<div className={ 'kadence-info-box-icon-inner-container' } >
												<GenIcon className={ `kt-info-svg-icon kt-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].icon ] : Ico[ mediaIcon[ 0 ].icon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
												{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
													<GenIcon className={ `kt-info-svg-icon-flip kt-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].flipIcon ] : Ico[ mediaIcon[ 0 ].flipIcon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
														display: 'block',
													} } />
												) }
											</div>
										</div>
									) }
								</div>
								<div className={ 'kt-infobox-textcontent' } >
									{ displayTitle && (
										<RichText.Content
											className="kt-blocks-info-box-title"
											tagName={ titleTagName }
											value={ title }
										/>
									) }
									{ displayText && (
										<RichText.Content
											className="kt-blocks-info-box-text"
											tagName={ 'p' }
											value={ contentText }
										/>
									) }
									{ displayLearnMore && (
										<div className="kt-blocks-info-box-learnmore-wrap">
											<RichText.Content
												className="kt-blocks-info-box-learnmore"
												tagName={ 'span' }
												value={ learnMore }
											/>
										</div>
									) }
								</div>
							</a>
						) }
						{ linkProperty === 'learnmore' && (
							<div className={ `kt-blocks-info-box-link-wrap kt-blocks-info-box-media-align-${ mediaAlign } kt-info-halign-${ hAlign }` }>
								<div className={ `kt-blocks-info-box-media kt-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
									{ mediaImage[ 0 ].url && 'image' === mediaType && (
										<div className="kadence-info-box-image-inner-intrisic-container" style={ {
											maxWidth: mediaImage[ 0 ].maxWidth + 'px',
										} } >
											<div className={ `kadence-info-box-image-intrisic kt-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
												paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
											} } >
												<div className="kadence-info-box-image-inner-intrisic">
													<img
														src={ mediaImage[ 0 ].url }
														alt={ mediaImage[ 0 ].alt }
														width={ mediaImage[ 0 ].width }
														height={ mediaImage[ 0 ].height }
														className={ mediaImage[ 0 ].id ? `kt-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'kt-info-box-image wp-image-offsite' }
													/>
													{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
														<img
															src={ mediaImage[ 0 ].flipUrl }
															alt={ mediaImage[ 0 ].flipAlt }
															width={ mediaImage[ 0 ].flipWidth }
															height={ mediaImage[ 0 ].flipHeight }
															className={ mediaImage[ 0 ].flipId ? `kt-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'kt-info-box-image-flip wp-image-offsite' }
														/>
													) }
												</div>
											</div>
										</div>
									) }
									{ 'icon' === mediaType && (
										<div className={ `kadence-info-box-icon-container kt-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
											<div className={ 'kadence-info-box-icon-inner-container' } >
												<GenIcon className={ `kt-info-svg-icon kt-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].icon ] : Ico[ mediaIcon[ 0 ].icon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
												{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
													<GenIcon className={ `kt-info-svg-icon-flip kt-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].flipIcon ] : Ico[ mediaIcon[ 0 ].flipIcon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
														display: 'block',
													} } />
												) }
											</div>
										</div>
									) }
								</div>
								<div className={ 'kt-infobox-textcontent' } >
									{ displayTitle && (
										<RichText.Content
											className="kt-blocks-info-box-title"
											tagName={ titleTagName }
											value={ title }
										/>
									) }
									{ displayText && (
										<RichText.Content
											className="kt-blocks-info-box-text"
											tagName={ 'p' }
											value={ contentText }
										/>
									) }
									{ displayLearnMore && (
										<div className="kt-blocks-info-box-learnmore-wrap">
											<RichText.Content
												className="kt-blocks-info-box-learnmore"
												tagName={ 'a' }
												target={ ( '_blank' === target ? target : undefined ) }
												rel={ ( '_blank' === target ? 'noopener noreferrer' : undefined ) }
												value={ learnMore }
												href={ link }
											/>
										</div>
									) }
								</div>
							</div>
						) }
					</div>
				);
			}
		},
		{
			attributes: {
				uniqueID: {
					type: 'string',
					default: '',
				},
				link: {
					type: 'string',
					source: 'attribute',
					attribute: 'href',
					selector: 'a',
				},
				linkProperty: {
					type: 'string',
					default: 'box',
				},
				target: {
					type: 'string',
					source: 'attribute',
					attribute: 'target',
					selector: 'a',
					default: '_self',
				},
				hAlign: {
					type: 'string',
					default: 'center',
				},
				containerBackground: {
					type: 'string',
					default: '#f2f2f2',
				},
				containerHoverBackground: {
					type: 'string',
					default: '#f2f2f2',
				},
				containerBorder: {
					type: 'string',
					default: '#eeeeee',
				},
				containerHoverBorder: {
					type: 'string',
					default: '#eeeeee',
				},
				containerBorderWidth: {
					type: 'array',
					default: [ 0, 0, 0, 0 ],
				},
				containerBorderRadius: {
					type: 'number',
					default: 0,
				},
				containerPadding: {
					type: 'array',
					default: [ 20, 20, 20, 20 ],
				},
				mediaType: {
					type: 'string',
					default: 'icon',
				},
				mediaAlign: {
					type: 'string',
					default: 'top',
				},
				mediaImage: {
					type: 'array',
					default: [ {
						url: '',
						id: '',
						alt: '',
						width: '',
						height: '',
						maxWidth: '',
						hoverAnimation: 'none',
						flipUrl: '',
						flipId: '',
						flipAlt: '',
						flipWidth: '',
						flipHeight: '',
					} ],
				},
				mediaIcon: {
					type: 'array',
					default: [ {
						icon: 'fe_aperture',
						size: 50,
						width: 2,
						title: '',
						color: '#444444',
						hoverColor: '#444444',
						hoverAnimation: 'none',
						flipIcon: '',
					} ],
				},
				mediaStyle: {
					type: 'array',
					default: [ {
						background: 'transparent',
						hoverBackground: 'transparent',
						border: '#444444',
						hoverBorder: '#444444',
						borderRadius: 0,
						borderWidth: [ 0, 0, 0, 0 ],
						padding: [ 10, 10, 10, 10 ],
						margin: [ 0, 15, 0, 15 ],
					} ],
				},
				displayTitle: {
					type: 'bool',
					default: true,
				},
				title: {
					type: 'array',
					source: 'children',
					selector: 'h1,h2,h3,h4,h5,h6',
					default: __( 'Title' ),
				},
				titleColor: {
					type: 'string',
					default: '',
				},
				titleHoverColor: {
					type: 'string',
					default: '',
				},
				titleFont: {
					type: 'array',
					default: [ {
						level: 2,
						size: [ '', '', '' ],
						sizeType: 'px',
						lineHeight: [ '', '', '' ],
						lineType: 'px',
						letterSpacing: '',
						textTransform: '',
						family: '',
						google: false,
						style: '',
						weight: '',
						variant: '',
						subset: '',
						loadGoogle: true,
						padding: [ 0, 0, 0, 0 ],
						paddingControl: 'linked',
						margin: [ 5, 0, 10, 0 ],
						marginControl: 'individual',
					} ],
				},
				displayText: {
					type: 'bool',
					default: true,
				},
				contentText: {
					type: 'array',
					source: 'children',
					selector: 'p',
					default: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.' ),
				},
				textColor: {
					type: 'string',
					default: '#555555',
				},
				textHoverColor: {
					type: 'string',
					default: '',
				},
				textFont: {
					type: 'array',
					default: [ {
						size: [ '', '', '' ],
						sizeType: 'px',
						lineHeight: [ '', '', '' ],
						lineType: 'px',
						letterSpacing: '',
						family: '',
						google: '',
						style: '',
						weight: '',
						variant: '',
						subset: '',
						loadGoogle: true,
					} ],
				},
				displayLearnMore: {
					type: 'bool',
					default: false,
				},
				learnMore: {
					type: 'array',
					source: 'children',
					selector: '.kt-blocks-info-box-learnmore',
					default: __( 'Learn More' ),
				},
				learnMoreStyles: {
					type: 'array',
					default: [ {
						size: [ '', '', '' ],
						sizeType: 'px',
						lineHeight: [ '', '', '' ],
						lineType: 'px',
						letterSpacing: '',
						family: '',
						google: '',
						style: '',
						weight: '',
						variant: '',
						subset: '',
						loadGoogle: true,
						padding: [ 4, 8, 4, 8 ],
						paddingControl: 'individual',
						margin: [ 10, 0, 10, 0 ],
						marginControl: 'individual',
						color: '',
						background: 'transparent',
						border: '#555555',
						borderRadius: 0,
						borderWidth: [ 0, 0, 0, 0 ],
						borderControl: 'linked',
						colorHover: '#ffffff',
						backgroundHover: '#444444',
						borderHover: '#444444',
						hoverEffect: 'revealBorder',
					} ],
				},
				displayShadow: {
					type: 'bool',
					default: false,
				},
				shadow: {
					type: 'array',
					default: [ {
						color: '#000000',
						opacity: 0,
						spread: 0,
						blur: 0,
						hOffset: 0,
						vOffset: 0,
					} ],
				},
				shadowHover: {
					type: 'array',
					default: [ {
						color: '#000000',
						opacity: 0.2,
						spread: 0,
						blur: 14,
						hOffset: 0,
						vOffset: 0,
					} ],
				},
			},
			save: ( { attributes } ) => {
				const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, className } = attributes;
				const titleTagName = 'h' + titleFont[ 0 ].level;
				return (
					<div id={ `kt-info-box${ uniqueID }` } className={ className }>
						{ linkProperty !== 'learnmore' && (
							<a className={ `kt-blocks-info-box-link-wrap kt-blocks-info-box-media-align-${ mediaAlign } kt-info-halign-${ hAlign }` } target={ target } rel={ 'noopener noreferrer' } href={ link }>
								<div className={ `kt-blocks-info-box-media kt-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
									{ mediaImage[ 0 ].url && 'image' === mediaType && (
										<div className="kadence-info-box-image-inner-intrisic-container" style={ {
											maxWidth: mediaImage[ 0 ].maxWidth + 'px',
										} } >
											<div className={ `kadence-info-box-image-intrisic kt-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
												paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
											} } >
												<div className="kadence-info-box-image-inner-intrisic">
													<img
														src={ mediaImage[ 0 ].url }
														alt={ mediaImage[ 0 ].alt }
														width={ mediaImage[ 0 ].width }
														height={ mediaImage[ 0 ].height }
														className={ mediaImage[ 0 ].id ? `kt-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'kt-info-box-image wp-image-offsite' }
													/>
													{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
														<img
															src={ mediaImage[ 0 ].flipUrl }
															alt={ mediaImage[ 0 ].flipAlt }
															width={ mediaImage[ 0 ].flipWidth }
															height={ mediaImage[ 0 ].flipHeight }
															className={ mediaImage[ 0 ].flipId ? `kt-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'kt-info-box-image-flip wp-image-offsite' }
														/>
													) }
												</div>
											</div>
										</div>
									) }
									{ 'icon' === mediaType && (
										<div className={ `kadence-info-box-icon-container kt-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
											<div className={ 'kadence-info-box-icon-inner-container' } >
												<GenIcon className={ `kt-info-svg-icon kt-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].icon ] : Ico[ mediaIcon[ 0 ].icon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
												{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
													<GenIcon className={ `kt-info-svg-icon-flip kt-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].flipIcon ] : Ico[ mediaIcon[ 0 ].flipIcon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
														display: 'block',
													} } />
												) }
											</div>
										</div>
									) }
								</div>
								<div className={ 'kt-infobox-textcontent' } >
									{ displayTitle && (
										<RichText.Content
											className="kt-blocks-info-box-title"
											tagName={ titleTagName }
											value={ title }
										/>
									) }
									{ displayText && (
										<RichText.Content
											className="kt-blocks-info-box-text"
											tagName={ 'p' }
											value={ contentText }
										/>
									) }
									{ displayLearnMore && (
										<div className="kt-blocks-info-box-learnmore-wrap">
											<RichText.Content
												className="kt-blocks-info-box-learnmore"
												tagName={ 'span' }
												value={ learnMore }
											/>
										</div>
									) }
								</div>
							</a>
						) }
						{ linkProperty === 'learnmore' && (
							<div className={ `kt-blocks-info-box-link-wrap kt-blocks-info-box-media-align-${ mediaAlign } kt-info-halign-${ hAlign }` }>
								<div className={ `kt-blocks-info-box-media kt-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
									{ mediaImage[ 0 ].url && 'image' === mediaType && (
										<div className="kadence-info-box-image-inner-intrisic-container" style={ {
											maxWidth: mediaImage[ 0 ].maxWidth + 'px',
										} } >
											<div className={ `kadence-info-box-image-intrisic kt-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
												paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
											} } >
												<div className="kadence-info-box-image-inner-intrisic">
													<img
														src={ mediaImage[ 0 ].url }
														alt={ mediaImage[ 0 ].alt }
														width={ mediaImage[ 0 ].width }
														height={ mediaImage[ 0 ].height }
														className={ mediaImage[ 0 ].id ? `kt-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'kt-info-box-image wp-image-offsite' }
													/>
													{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
														<img
															src={ mediaImage[ 0 ].flipUrl }
															alt={ mediaImage[ 0 ].flipAlt }
															width={ mediaImage[ 0 ].flipWidth }
															height={ mediaImage[ 0 ].flipHeight }
															className={ mediaImage[ 0 ].flipId ? `kt-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'kt-info-box-image-flip wp-image-offsite' }
														/>
													) }
												</div>
											</div>
										</div>
									) }
									{ 'icon' === mediaType && (
										<div className={ `kadence-info-box-icon-container kt-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
											<div className={ 'kadence-info-box-icon-inner-container' } >
												<GenIcon className={ `kt-info-svg-icon kt-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].icon ] : Ico[ mediaIcon[ 0 ].icon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
												{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
													<GenIcon className={ `kt-info-svg-icon-flip kt-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].flipIcon ] : Ico[ mediaIcon[ 0 ].flipIcon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
														display: 'block',
													} } />
												) }
											</div>
										</div>
									) }
								</div>
								<div className={ 'kt-infobox-textcontent' } >
									{ displayTitle && (
										<RichText.Content
											className="kt-blocks-info-box-title"
											tagName={ titleTagName }
											value={ title }
										/>
									) }
									{ displayText && (
										<RichText.Content
											className="kt-blocks-info-box-text"
											tagName={ 'p' }
											value={ contentText }
										/>
									) }
									{ displayLearnMore && (
										<div className="kt-blocks-info-box-learnmore-wrap">
											<RichText.Content
												className="kt-blocks-info-box-learnmore"
												tagName={ 'a' }
												target={ target }
												rel={ 'noopener noreferrer' }
												value={ learnMore }
												href={ link }
											/>
										</div>
									) }
								</div>
							</div>
						) }
					</div>
				)
			}
		},
		{
			attributes: {
				uniqueID: {
					type: 'string',
					default: '',
				},
				link: {
					type: 'string',
					source: 'attribute',
					attribute: 'href',
					selector: 'a',
				},
				linkProperty: {
					type: 'string',
					default: 'box',
				},
				target: {
					type: 'string',
					source: 'attribute',
					attribute: 'target',
					selector: 'a',
					default: '_self',
				},
				hAlign: {
					type: 'string',
					default: 'center',
				},
				containerBackground: {
					type: 'string',
					default: '#f2f2f2',
				},
				containerHoverBackground: {
					type: 'string',
					default: '#f2f2f2',
				},
				containerBorder: {
					type: 'string',
					default: '#eeeeee',
				},
				containerHoverBorder: {
					type: 'string',
					default: '#eeeeee',
				},
				containerBorderWidth: {
					type: 'array',
					default: [ 0, 0, 0, 0 ],
				},
				containerBorderRadius: {
					type: 'number',
					default: 0,
				},
				containerPadding: {
					type: 'array',
					default: [ 20, 20, 20, 20 ],
				},
				mediaType: {
					type: 'string',
					default: 'icon',
				},
				mediaAlign: {
					type: 'string',
					default: 'top',
				},
				mediaImage: {
					type: 'array',
					default: [ {
						url: '',
						id: '',
						alt: '',
						width: '',
						height: '',
						maxWidth: '',
						hoverAnimation: 'none',
						flipUrl: '',
						flipId: '',
						flipAlt: '',
						flipWidth: '',
						flipHeight: '',
					} ],
				},
				mediaIcon: {
					type: 'array',
					default: [ {
						icon: 'fe_aperture',
						size: 50,
						width: 2,
						title: '',
						color: '#444444',
						hoverColor: '#444444',
						hoverAnimation: 'none',
						flipIcon: '',
					} ],
				},
				mediaStyle: {
					type: 'array',
					default: [ {
						background: 'transparent',
						hoverBackground: 'transparent',
						border: '#444444',
						hoverBorder: '#444444',
						borderRadius: 0,
						borderWidth: [ 0, 0, 0, 0 ],
						padding: [ 10, 10, 10, 10 ],
						margin: [ 0, 15, 0, 15 ],
					} ],
				},
				displayTitle: {
					type: 'bool',
					default: true,
				},
				title: {
					type: 'array',
					source: 'children',
					selector: 'h1,h2,h3,h4,h5,h6',
					default: __( 'Title' ),
				},
				titleColor: {
					type: 'string',
					default: '',
				},
				titleHoverColor: {
					type: 'string',
					default: '',
				},
				titleFont: {
					type: 'array',
					default: [ {
						level: 2,
						size: [ '', '', '' ],
						sizeType: 'px',
						lineHeight: [ '', '', '' ],
						lineType: 'px',
						letterSpacing: '',
						textTransform: '',
						family: '',
						google: false,
						style: '',
						weight: '',
						variant: '',
						subset: '',
						loadGoogle: true,
						padding: [ 0, 0, 0, 0 ],
						paddingControl: 'linked',
						margin: [ 5, 0, 10, 0 ],
						marginControl: 'individual',
					} ],
				},
				displayText: {
					type: 'bool',
					default: true,
				},
				contentText: {
					type: 'array',
					source: 'children',
					selector: 'p',
					default: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.' ),
				},
				textColor: {
					type: 'string',
					default: '#555555',
				},
				textHoverColor: {
					type: 'string',
					default: '',
				},
				textFont: {
					type: 'array',
					default: [ {
						size: [ '', '', '' ],
						sizeType: 'px',
						lineHeight: [ '', '', '' ],
						lineType: 'px',
						letterSpacing: '',
						family: '',
						google: '',
						style: '',
						weight: '',
						variant: '',
						subset: '',
						loadGoogle: true,
					} ],
				},
				displayLearnMore: {
					type: 'bool',
					default: false,
				},
				learnMore: {
					type: 'array',
					source: 'children',
					selector: '.kt-blocks-info-box-learnmore',
					default: __( 'Learn More' ),
				},
				learnMoreStyles: {
					type: 'array',
					default: [ {
						size: [ '', '', '' ],
						sizeType: 'px',
						lineHeight: [ '', '', '' ],
						lineType: 'px',
						letterSpacing: '',
						family: '',
						google: '',
						style: '',
						weight: '',
						variant: '',
						subset: '',
						loadGoogle: true,
						padding: [ 4, 8, 4, 8 ],
						paddingControl: 'individual',
						margin: [ 10, 0, 10, 0 ],
						marginControl: 'individual',
						color: '',
						background: 'transparent',
						border: '#555555',
						borderRadius: 0,
						borderWidth: [ 0, 0, 0, 0 ],
						borderControl: 'linked',
						colorHover: '#ffffff',
						backgroundHover: '#444444',
						borderHover: '#444444',
						hoverEffect: 'revealBorder',
					} ],
				},
				displayShadow: {
					type: 'bool',
					default: false,
				},
				shadow: {
					type: 'array',
					default: [ {
						color: '#000000',
						opacity: 0,
						spread: 0,
						blur: 0,
						hOffset: 0,
						vOffset: 0,
					} ],
				},
				shadowHover: {
					type: 'array',
					default: [ {
						color: '#000000',
						opacity: 0.2,
						spread: 0,
						blur: 14,
						hOffset: 0,
						vOffset: 0,
					} ],
				},
			},
			save: ( { attributes } ) => {
				const { uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont, displayText, contentText, displayLearnMore, learnMore, className } = attributes;
				const titleTagName = 'h' + titleFont[ 0 ].level;
				return (
					<div id={ `kt-info-box${ uniqueID }` } className={ className }>
						{ linkProperty !== 'learnmore' && (
							<a className={ `kt-blocks-info-box-link-wrap kt-blocks-info-box-media-align-${ mediaAlign } kt-info-halign-${ hAlign }` } target={ target } href={ link }>
								<div className={ `kt-blocks-info-box-media kt-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
									{ mediaImage[ 0 ].url && 'image' === mediaType && (
										<div className="kadence-info-box-image-inner-intrisic-container" style={ {
											maxWidth: mediaImage[ 0 ].maxWidth + 'px',
										} } >
											<div className={ `kadence-info-box-image-intrisic kt-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
												paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
											} } >
												<div className="kadence-info-box-image-inner-intrisic">
													<img
														src={ mediaImage[ 0 ].url }
														alt={ mediaImage[ 0 ].alt }
														width={ mediaImage[ 0 ].width }
														height={ mediaImage[ 0 ].height }
														className={ mediaImage[ 0 ].id ? `kt-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'kt-info-box-image wp-image-offsite' }
													/>
													{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
														<img
															src={ mediaImage[ 0 ].flipUrl }
															alt={ mediaImage[ 0 ].flipAlt }
															width={ mediaImage[ 0 ].flipWidth }
															height={ mediaImage[ 0 ].flipHeight }
															className={ mediaImage[ 0 ].flipId ? `kt-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'kt-info-box-image-flip wp-image-offsite' }
														/>
													) }
												</div>
											</div>
										</div>
									) }
									{ 'icon' === mediaType && (
										<div className={ `kadence-info-box-icon-container kt-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
											<div className={ 'kadence-info-box-icon-inner-container' } >
												<GenIcon className={ `kt-info-svg-icon kt-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].icon ] : Ico[ mediaIcon[ 0 ].icon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
												{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
													<GenIcon className={ `kt-info-svg-icon-flip kt-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].flipIcon ] : Ico[ mediaIcon[ 0 ].flipIcon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
														display: 'block',
													} } />
												) }
											</div>
										</div>
									) }
								</div>
								<div className={ 'kt-infobox-textcontent' } >
									{ displayTitle && (
										<RichText.Content
											className="kt-blocks-info-box-title"
											tagName={ titleTagName }
											value={ title }
										/>
									) }
									{ displayText && (
										<RichText.Content
											className="kt-blocks-info-box-text"
											tagName={ 'p' }
											value={ contentText }
										/>
									) }
									{ displayLearnMore && (
										<div className="kt-blocks-info-box-learnmore-wrap">
											<RichText.Content
												className="kt-blocks-info-box-learnmore"
												tagName={ 'span' }
												value={ learnMore }
											/>
										</div>
									) }
								</div>
							</a>
						) }
						{ linkProperty === 'learnmore' && (
							<div className={ `kt-blocks-info-box-link-wrap kt-blocks-info-box-media-align-${ mediaAlign } kt-info-halign-${ hAlign }` }>
								<div className={ `kt-blocks-info-box-media kt-info-media-animate-${ 'image' === mediaType ? mediaImage[ 0 ].hoverAnimation : mediaIcon[ 0 ].hoverAnimation }` }>
									{ mediaImage[ 0 ].url && 'image' === mediaType && (
										<div className="kadence-info-box-image-inner-intrisic-container" style={ {
											maxWidth: mediaImage[ 0 ].maxWidth + 'px',
										} } >
											<div className={ `kadence-info-box-image-intrisic kt-info-animate-${ mediaImage[ 0 ].hoverAnimation }` } style={ {
												paddingBottom: ( ( mediaImage[ 0 ].height / mediaImage[ 0 ].width ) * 100 ) + '%',
											} } >
												<div className="kadence-info-box-image-inner-intrisic">
													<img
														src={ mediaImage[ 0 ].url }
														alt={ mediaImage[ 0 ].alt }
														width={ mediaImage[ 0 ].width }
														height={ mediaImage[ 0 ].height }
														className={ mediaImage[ 0 ].id ? `kt-info-box-image wp-image-${ mediaImage[ 0 ].id }` : 'kt-info-box-image wp-image-offsite' }
													/>
													{ mediaImage[ 0 ].flipUrl && 'flip' === mediaImage[ 0 ].hoverAnimation && (
														<img
															src={ mediaImage[ 0 ].flipUrl }
															alt={ mediaImage[ 0 ].flipAlt }
															width={ mediaImage[ 0 ].flipWidth }
															height={ mediaImage[ 0 ].flipHeight }
															className={ mediaImage[ 0 ].flipId ? `kt-info-box-image-flip wp-image-${ mediaImage[ 0 ].flipId }` : 'kt-info-box-image-flip wp-image-offsite' }
														/>
													) }
												</div>
											</div>
										</div>
									) }
									{ 'icon' === mediaType && (
										<div className={ `kadence-info-box-icon-container kt-info-icon-animate-${ mediaIcon[ 0 ].hoverAnimation }` } >
											<div className={ 'kadence-info-box-icon-inner-container' } >
												<GenIcon className={ `kt-info-svg-icon kt-info-svg-icon-${ mediaIcon[ 0 ].icon }` } name={ mediaIcon[ 0 ].icon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].icon ] : Ico[ mediaIcon[ 0 ].icon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].icon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
													display: 'block',
												} } />
												{ mediaIcon[ 0 ].flipIcon && 'flip' === mediaIcon[ 0 ].hoverAnimation && (
													<GenIcon className={ `kt-info-svg-icon-flip kt-info-svg-icon-${ mediaIcon[ 0 ].flipIcon }` } name={ mediaIcon[ 0 ].flipIcon } size={ ( ! mediaIcon[ 0 ].size ? '14' : mediaIcon[ 0 ].size ) } icon={ ( 'fa' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? FaIco[ mediaIcon[ 0 ].flipIcon ] : Ico[ mediaIcon[ 0 ].flipIcon ] ) } htmltag="span" strokeWidth={ ( 'fe' === mediaIcon[ 0 ].flipIcon.substring( 0, 2 ) ? mediaIcon[ 0 ].width : undefined ) } style={ {
														display: 'block',
													} } />
												) }
											</div>
										</div>
									) }
								</div>
								<div className={ 'kt-infobox-textcontent' } >
									{ displayTitle && (
										<RichText.Content
											className="kt-blocks-info-box-title"
											tagName={ titleTagName }
											value={ title }
										/>
									) }
									{ displayText && (
										<RichText.Content
											className="kt-blocks-info-box-text"
											tagName={ 'p' }
											value={ contentText }
										/>
									) }
									{ displayLearnMore && (
										<div className="kt-blocks-info-box-learnmore-wrap">
											<RichText.Content
												className="kt-blocks-info-box-learnmore"
												tagName={ 'a' }
												target={ target }
												value={ learnMore }
												href={ link }
											/>
										</div>
									) }
								</div>
							</div>
						) }
					</div>
				)
			}
		}
	],
} );
