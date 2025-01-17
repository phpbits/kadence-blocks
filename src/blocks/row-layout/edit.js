/**
 * BLOCK: Kadence Row / Layout
 */

/**
 * Import Icons
 */
import icons from '../../icons';

/**
 * Import External
 */
import times from 'lodash/times';
import map from 'lodash/map';
import classnames from 'classnames';
import memoize from 'memize';
import ResizableBox from 're-resizable';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import ContainerDimensions from 'react-container-dimensions';
import PrebuiltModal from './prebuilt_modal';
import MeasurementControls from '../../measurement-control';
import ThreeColumnDrag from './threecolumndrag';
import AdvancedColorControl from '../../advanced-color-control';
import Slider from 'react-slick';
/**
 * Import Css
 */
import './style.scss';
import './editor.scss';
const {
	Component,
	Fragment,
} = wp.element;
const {
	MediaUpload,
	InnerBlocks,
	InspectorControls,
	BlockControls,
	BlockAlignmentToolbar,
} = wp.blockEditor;
const {
	Button,
	ButtonGroup,
	Tooltip,
	TabPanel,
	TextControl,
	IconButton,
	Dashicon,
	PanelBody,
	RangeControl,
	Toolbar,
	ToggleControl,
	SelectControl,
} = wp.components;
/**
 * Internal block libraries
 */
const { __ } = wp.i18n;

const ALLOWED_BLOCKS = [ 'kadence/column' ];
/**
 * Returns the layouts configuration for a given number of columns.
 *
 * @param {number} columns Number of columns.
 *
 * @return {Object[]} Columns layout configuration.
 */
const getColumnsTemplate = memoize( ( columns ) => {
	return times( columns, n => [ 'kadence/column', { id: n + 1 } ] );
} );

const overlayOpacityOutput = memoize( ( opacity ) => {
	if ( opacity < 10 ) {
		return '0.0' + opacity;
	} else if ( opacity >= 100 ) {
		return '1';
	}
	return '0.' + opacity;
} );
/**
 * This allows for checking to see if the block needs to generate a new ID.
 */
const ktrowUniqueIDs = [];
/**
 * Build the row edit
 */
class KadenceRowLayout extends Component {
	constructor() {
		super( ...arguments );
		this.showSettings = this.showSettings.bind( this );
		this.state = {
			firstWidth: null,
			secondWidth: null,
			showPreset: false,
			user: ( kadence_blocks_params.user ? kadence_blocks_params.user : 'admin' ),
			settings: {},
		};
	}
	componentDidMount() {
		if ( ! this.props.attributes.uniqueID ) {
			const oldBlockConfig = kadence_blocks_params.config[ 'kadence/rowlayout' ];
			const blockConfigObject = ( kadence_blocks_params.configuration ? JSON.parse( kadence_blocks_params.configuration ) : [] );
			if ( blockConfigObject[ 'kadence/rowlayout' ] !== undefined && typeof blockConfigObject[ 'kadence/rowlayout' ] === 'object' ) {
				Object.keys( blockConfigObject[ 'kadence/rowlayout' ] ).map( ( attribute ) => {
					this.props.attributes[ attribute ] = blockConfigObject[ 'kadence/rowlayout' ][ attribute ];
				} );
			} else if ( oldBlockConfig !== undefined && typeof oldBlockConfig === 'object' ) {
				Object.keys( oldBlockConfig ).map( ( attribute ) => {
					this.props.attributes[ attribute ] = oldBlockConfig[ attribute ];
				} );
			}
			this.props.setAttributes( {
				uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
			} );
			ktrowUniqueIDs.push( '_' + this.props.clientId.substr( 2, 9 ) );
		} else if ( ktrowUniqueIDs.includes( this.props.attributes.uniqueID ) ) {
			this.props.setAttributes( {
				uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
			} );
			ktrowUniqueIDs.push( '_' + this.props.clientId.substr( 2, 9 ) );
		} else {
			ktrowUniqueIDs.push( this.props.attributes.uniqueID );
		}
		const blockSettings = ( kadence_blocks_params.settings ? JSON.parse( kadence_blocks_params.settings ) : {} );
		if ( blockSettings[ 'kadence/rowlayout' ] !== undefined && typeof blockSettings[ 'kadence/rowlayout' ] === 'object' ) {
			this.setState( { settings: blockSettings[ 'kadence/rowlayout' ] } );
		}
	}
	showSettings( key ) {
		if ( undefined === this.state.settings[ key ] || 'all' === this.state.settings[ key ] ) {
			return true;
		} else if ( 'contributor' === this.state.settings[ key ] && ( 'contributor' === this.state.user || 'author' === this.state.user || 'editor' === this.state.user || 'admin' === this.state.user ) ) {
			return true;
		} else if ( 'author' === this.state.settings[ key ] && ( 'author' === this.state.user || 'editor' === this.state.user || 'admin' === this.state.user ) ) {
			return true;
		} else if ( 'editor' === this.state.settings[ key ] && ( 'editor' === this.state.user || 'admin' === this.state.user ) ) {
			return true;
		} else if ( 'admin' === this.state.settings[ key ] && 'admin' === this.state.user ) {
			return true;
		}
		return false;
	}
	saveSlideItem = ( value, thisIndex ) => {
		const currentItems = this.props.attributes.backgroundSlider;
		const newUpdate = currentItems.map( ( item, index ) => {
			if ( index === thisIndex ) {
				item = { ...item, ...value };
			}
			return item;
		} );
		this.props.setAttributes( {
			backgroundSlider: newUpdate,
		} );
	};
	render() {
		const { attributes: { uniqueID, columns, blockAlignment, mobileLayout, currentTab, colLayout, tabletLayout, columnGutter, collapseGutter, collapseOrder, topPadding, bottomPadding, leftPadding, rightPadding, topPaddingM, bottomPaddingM, leftPaddingM, rightPaddingM, topMargin, bottomMargin, topMarginM, bottomMarginM, bgColor, bgImg, bgImgAttachment, bgImgSize, bgImgPosition, bgImgRepeat, bgImgID, verticalAlignment, overlayOpacity, overlayBgImg, overlayBgImgAttachment, overlayBgImgID, overlayBgImgPosition, overlayBgImgRepeat, overlayBgImgSize, currentOverlayTab, overlayBlendMode, overlayGradAngle, overlayGradLoc, overlayGradLocSecond, overlayGradType, overlay, overlaySecond, htmlTag, minHeight, maxWidth, bottomSep, bottomSepColor, bottomSepHeight, bottomSepHeightMobile, bottomSepHeightTab, bottomSepWidth, bottomSepWidthMobile, bottomSepWidthTab, topSep, topSepColor, topSepHeight, topSepHeightMobile, topSepHeightTab, topSepWidth, topSepWidthMobile, topSepWidthTab, firstColumnWidth, secondColumnWidth, textColor, linkColor, linkHoverColor, tabletPadding, topMarginT, bottomMarginT, minHeightUnit, maxWidthUnit, marginUnit, columnsUnlocked, tabletBackground, tabletOverlay, mobileBackground, mobileOverlay, columnsInnerHeight, zIndex, backgroundInline, backgroundSettingTab, backgroundSliderCount, backgroundSlider, backgroundSliderSettings, backgroundVideo, backgroundVideoType }, toggleSelection, className, setAttributes, clientId } = this.props;
		const saveTabletBackground = ( value ) => {
			const newUpdate = tabletBackground.map( ( item, index ) => {
				if ( 0 === index ) {
					item = { ...item, ...value };
				}
				return item;
			} );
			setAttributes( {
				tabletBackground: newUpdate,
			} );
		};
		const saveTabletOverlay = ( value ) => {
			const newUpdate = tabletOverlay.map( ( item, index ) => {
				if ( 0 === index ) {
					item = { ...item, ...value };
				}
				return item;
			} );
			setAttributes( {
				tabletOverlay: newUpdate,
			} );
		};
		const saveMobileBackground = ( value ) => {
			const newUpdate = mobileBackground.map( ( item, index ) => {
				if ( 0 === index ) {
					item = { ...item, ...value };
				}
				return item;
			} );
			setAttributes( {
				mobileBackground: newUpdate,
			} );
		};
		const saveMobileOverlay = ( value ) => {
			const newUpdate = mobileOverlay.map( ( item, index ) => {
				if ( 0 === index ) {
					item = { ...item, ...value };
				}
				return item;
			} );
			setAttributes( {
				mobileOverlay: newUpdate,
			} );
		};
		const marginTypes = [
			{ key: 'px', name: __( 'px' ) },
			{ key: 'em', name: __( 'em' ) },
			{ key: '%', name: __( '%' ) },
			{ key: 'vh', name: __( 'vh' ) },
			{ key: 'rem', name: __( 'rem' ) },
		];
		const heightTypes = [
			{ key: 'px', name: __( 'px' ) },
			{ key: 'vw', name: __( 'vw' ) },
			{ key: 'vh', name: __( 'vh' ) },
		];
		const widthTypes = [
			{ key: 'px', name: __( 'px' ) },
			{ key: '%', name: __( '%' ) },
			{ key: 'vw', name: __( 'vw' ) },
		];
		const heightMax = ( minHeightUnit === 'px' ? 2000 : 200 );
		const widthMax = ( maxWidthUnit === 'px' ? 2000 : 100 );
		const marginMin = ( marginUnit === 'em' || marginUnit === 'rem' ? -12 : -200 );
		const marginMax = ( marginUnit === 'em' || marginUnit === 'rem' ? 24 : 200 );
		const marginStep = ( marginUnit === 'em' || marginUnit === 'rem' ? 0.1 : 1 );
		const onResize = ( event, direction, elt ) => {
			let firstCol;
			let secondCol;
			if ( columnsUnlocked ) {
				firstCol = Math.round( parseFloat( elt.style.width ) * 10 ) / 10;
				secondCol = Math.round( ( 100 - firstCol ) * 10 ) / 10;
			} else {
				firstCol = Math.round( parseInt( elt.style.width ) / 5 ) * 5;
				secondCol = 100 - ( Math.round( parseInt( elt.style.width ) / 5 ) * 5 );
			}
			this.setState( {
				firstWidth: firstCol,
			} );
			this.setState( {
				secondWidth: secondCol,
			} );
			document.getElementById( 'left-column-width-' + uniqueID ).innerHTML = firstCol + '%';
			document.getElementById( 'right-column-width-' + uniqueID ).innerHTML = secondCol + '%';
		};
		const onResizeStop = ( event, direction, elt ) => {
			let firstCol;
			let secondCol;
			if ( columnsUnlocked ) {
				firstCol = Math.round( parseFloat( elt.style.width ) * 10 ) / 10;
				secondCol = Math.round( ( 100 - firstCol ) * 10 ) / 10;
			} else {
				firstCol = Math.round( parseInt( elt.style.width ) / 5 ) * 5;
				secondCol = 100 - ( Math.round( parseInt( elt.style.width ) / 5 ) * 5 );
			}
			setAttributes( { firstColumnWidth: firstCol } );
			setAttributes( { secondColumnWidth: secondCol } );
			this.setState( {
				firstWidth: null,
				secondWidth: null,
			} );
		};
		const temporaryColumnWidth = this.state.firstWidth;
		const temporarySecondColumnWidth = this.state.secondWidth;
		const widthString = `${ temporaryColumnWidth || firstColumnWidth || colLayout }`;
		const secondWidthString = `${ temporarySecondColumnWidth || secondColumnWidth || colLayout }`;
		let thirdWidthString;
		if ( 3 === columns ) {
			if ( this.state.firstWidth ) {
				thirdWidthString = Math.abs( Math.round( ( ( parseFloat( this.state.firstWidth ) + parseFloat( this.state.secondWidth ) ) - 100 ) * 10 ) / 10 );
			} else if ( Math.abs( firstColumnWidth ) === parseFloat( firstColumnWidth ) ) {
				thirdWidthString = Math.abs( Math.round( ( ( parseFloat( firstColumnWidth ) + parseFloat( secondColumnWidth ) ) - 100 ) * 10 ) / 10 );
			} else {
				thirdWidthString = colLayout;
			}
		} else {
			thirdWidthString = colLayout;
		}
		let widthNumber;
		if ( widthString === parseFloat( widthString ) ) {
			widthNumber = widthString + '%';
		} else if ( 'left-golden' === widthString ) {
			widthNumber = '66.67%';
		} else if ( 'right-golden' === widthString ) {
			widthNumber = '33.37%';
		} else {
			widthNumber = '50%';
		}
		const layoutClass = ( ! colLayout ? 'equal' : colLayout );
		const tabLayoutClass = ( ! tabletLayout ? 'inherit' : tabletLayout );
		const mobileLayoutClass = ( ! mobileLayout ? 'inherit' : mobileLayout );
		const selectColLayout = ( columns && ( 2 === columns || 3 === columns ) ? widthString : colLayout );
		const hasBG = ( bgColor || bgImg || overlay || overlayBgImg ? 'kt-row-has-bg' : '' );
		const classes = classnames( className, `kt-has-${ columns }-columns kt-row-layout-${ layoutClass } kt-row-valign-${ verticalAlignment } kt-tab-layout-${ tabLayoutClass } kt-mobile-layout-${ mobileLayoutClass } current-tab-${ currentTab } kt-gutter-${ columnGutter } kt-v-gutter-${ collapseGutter } kt-custom-first-width-${ widthString } kt-custom-second-width-${ secondWidthString } kt-custom-third-width-${ thirdWidthString } ${ hasBG }${ ( columnsInnerHeight ? ' kt-inner-column-height-full' : '' ) }` );
		let layoutOptions;
		let mobileLayoutOptions;
		const startlayoutOptions = [
			{ key: 'equal', col: 1, name: __( 'Row' ), icon: icons.row },
			{ key: 'equal', col: 2, name: __( 'Two: Equal' ), icon: icons.twocol },
			{ key: 'left-golden', col: 2, name: __( 'Two: Left Heavy 66/33' ), icon: icons.twoleftgolden },
			{ key: 'right-golden', col: 2, name: __( 'Two: Right Heavy 33/66' ), icon: icons.tworightgolden },
			{ key: 'equal', col: 3, name: __( 'Three: Equal' ), icon: icons.threecol },
			{ key: 'left-half', col: 3, name: __( 'Three: Left Heavy 50/25/25' ), icon: icons.lefthalf },
			{ key: 'right-half', col: 3, name: __( 'Three: Right Heavy 25/25/50' ), icon: icons.righthalf },
			{ key: 'center-half', col: 3, name: __( 'Three: Center Heavy 25/50/25' ), icon: icons.centerhalf },
			{ key: 'center-wide', col: 3, name: __( 'Three: Wide Center 20/60/20' ), icon: icons.widecenter },
			{ key: 'center-exwide', col: 3, name: __( 'Three: Wider Center 15/70/15' ), icon: icons.exwidecenter },
			{ key: 'equal', col: 4, name: __( 'Four: Equal' ), icon: icons.fourcol },
			{ key: 'left-forty', col: 4, name: __( 'Four: Left Heavy 40/20/20/20' ), icon: icons.lfourforty },
			{ key: 'right-forty', col: 4, name: __( 'Four: Right Heavy 20/20/20/40' ), icon: icons.rfourforty },
			{ key: 'equal', col: 5, name: __( 'Five: Equal' ), icon: icons.fivecol },
			{ key: 'equal', col: 6, name: __( 'Six: Equal' ), icon: icons.sixcol },
		];
		function CustomNextArrow( props ) {
			const { className, style, onClick } = props;
			return (
				<button
					className={ className }
					style={ { ...style, display: 'block' } }
					onClick={ onClick }
				>
					<Dashicon icon="arrow-right-alt2" />
				</button>
			);
		}

		function CustomPrevArrow( props ) {
			const { className, style, onClick } = props;
			return (
				<button
					className={ className }
					style={ { ...style, display: 'block' } }
					onClick={ onClick }
				>
					<Dashicon icon="arrow-left-alt2" />
				</button>
			);
		}
		const sliderSettings = {
			dots: ( backgroundSliderSettings[ 0 ].dotStyle === 'none' ? false : true ),
			arrows: ( backgroundSliderSettings[ 0 ].arrowStyle === 'none' ? false : true ),
			infinite: true,
			fade: backgroundSliderSettings[ 0 ].fade,
			speed: backgroundSliderSettings[ 0 ].tranSpeed,
			draggable: false,
			autoplaySpeed: backgroundSliderSettings[ 0 ].speed,
			autoplay: backgroundSliderSettings[ 0 ].autoPlay,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: <CustomNextArrow />,
			prevArrow: <CustomPrevArrow />,
		};
		const renderSliderImages = ( index ) => {
			return (
				<div className="kb-bg-slide-contain">
					<div className={ `kb-bg-slide kb-bg-slide-${ index }` } style={ {
						backgroundColor: backgroundSlider[ index ].bgColor,
						backgroundImage: 'url("' + backgroundSlider[ index ].bgImg + '")',
						backgroundSize: bgImgSize,
						backgroundPosition: bgImgPosition,
						backgroundRepeat: bgImgRepeat,
					} }></div>
				</div>
			);
		};
		const saveSliderSettings = ( value ) => {
			const newUpdate = backgroundSliderSettings.map( ( item, index ) => {
				if ( 0 === index ) {
					item = { ...item, ...value };
				}
				return item;
			} );
			setAttributes( {
				backgroundSliderSettings: newUpdate,
			} );
		};
		const saveVideoSettings = ( value ) => {
			const newUpdate = backgroundVideo.map( ( item, index ) => {
				if ( 0 === index ) {
					item = { ...item, ...value };
				}
				return item;
			} );
			setAttributes( {
				backgroundVideo: newUpdate,
			} );
		};
		const bottomSVGDivider = {};
		bottomSVGDivider.ct = <path d="M1000,0l-500,98l-500,-98l0,100l1000,0l0,-100Z" />;
		bottomSVGDivider.cti = <path d="M500,2l500,98l-1000,0l500,-98Z" />;
		bottomSVGDivider.ctd = <Fragment><path d="M1000,0l-500,98l-500,-98l0,100l1000,0l0,-100Z" style={ { opacity: 0.4 } } /><path d="M1000,20l-500,78l-500,-78l0,80l1000,0l0,-80Z" /></Fragment>;
		bottomSVGDivider.ctdi = <Fragment><path d="M500,2l500,78l0,20l-1000,0l0,-20l500,-78Z" style={ { opacity: 0.4 } } /><path d="M500,2l500,98l-1000,0l500,-98Z" /></Fragment>;
		bottomSVGDivider.sltl = <path d="M1000,0l-1000,100l1000,0l0,-100Z" />;
		bottomSVGDivider.sltli = <path d="M0,100l1000,-100l-1000,0l0,100Z" />;
		bottomSVGDivider.sltr = <path d="M0,0l1000,100l-1000,0l0,-100Z" />;
		bottomSVGDivider.sltri = <path d="M1000,100l-1000,-100l1000,0l0,100Z" />;
		bottomSVGDivider.crv = <path d="M1000,100c0,0 -270.987,-98 -500,-98c-229.013,0 -500,98 -500,98l1000,0Z" />;
		bottomSVGDivider.crvi = <path d="M1000,0c0,0 -270.987,98 -500,98c-229.013,0 -500,-98 -500,-98l0,100l1000,0l0,-100Z" />;
		bottomSVGDivider.crvl = <path d="M1000,100c0,0 -420.987,-98 -650,-98c-229.013,0 -350,98 -350,98l1000,0Z" />;
		bottomSVGDivider.crvli = <path d="M1000,0c0,0 -420.987,98 -650,98c-229.013,0 -350,-98 -350,-98l0,100l1000,0l0,-100Z" />;
		bottomSVGDivider.crvr = <path d="M1000,100c0,0 -120.987,-98 -350,-98c-229.013,0 -650,98 -650,98l1000,0Z" />;
		bottomSVGDivider.crvri = <path d="M1000,0c0,0 -120.987,98 -350,98c-229.013,0 -650,-98 -650,-98l0,100l1000,0l0,-100Z" />;
		bottomSVGDivider.wave = <path d="M1000,40c0,0 -120.077,-38.076 -250,-38c-129.923,0.076 -345.105,78 -500,78c-154.895,0 -250,-30 -250,-30l0,50l1000,0l0,-60Z" />;
		bottomSVGDivider.wavei = <path d="M0,40c0,0 120.077,-38.076 250,-38c129.923,0.076 345.105,78 500,78c154.895,0 250,-30 250,-30l0,50l-1000,0l0,-60Z" />;
		bottomSVGDivider.waves = <Fragment><path d="M1000,40c0,0 -120.077,-38.076 -250,-38c-129.923,0.076 -345.105,78 -500,78c-154.895,0 -250,-30 -250,-30l0,50l1000,0l0,-60Z" /><path d="M1000,40c0,0 -120.077,-38.076 -250,-38c-129.923,0.076 -345.105,73 -500,73c-154.895,0 -250,-45 -250,-45l0,70l1000,0l0,-60Z" style={ { opacity: 0.4 } } /><path d="M1000,40c0,0 -120.077,-38.076 -250,-38c-129.923,0.076 -345.105,68 -500,68c-154.895,0 -250,-65 -250,-65l0,95l1000,0l0,-60Z" style={ { opacity: 0.4 } } /></Fragment>;
		bottomSVGDivider.wavesi = <Fragment><path d="M0,40c0,0 120.077,-38.076 250,-38c129.923,0.076 345.105,78 500,78c154.895,0 250,-30 250,-30l0,50l-1000,0l0,-60Z" /><path d="M0,40c0,0 120.077,-38.076 250,-38c129.923,0.076 345.105,73 500,73c154.895,0 250,-45 250,-45l0,70l-1000,0l0,-60Z" style={ { opacity: 0.4 } } /><path d="M0,40c0,0 120.077,-38.076 250,-38c129.923,0.076 345.105,68 500,68c154.895,0 250,-65 250,-65l0,95l-1000,0l0,-60Z" style={ { opacity: 0.4 } } /></Fragment>;
		bottomSVGDivider.mtns = <Fragment><path d="M1000,50l-182.69,-45.286l-292.031,61.197l-190.875,-41.075l-143.748,28.794l-190.656,-23.63l0,70l1000,0l0,-50Z" style={ { opacity: 0.4 } } /><path d="M1000,57l-152.781,-22.589l-214.383,19.81l-159.318,-21.471l-177.44,25.875l-192.722,5.627l-103.356,-27.275l0,63.023l1000,0l0,-43Z" /></Fragment>;
		bottomSVGDivider.littri = <path d="M500,2l25,98l-50,0l25,-98Z" />;
		bottomSVGDivider.littrii = <path d="M1000,100l-1000,0l0,-100l475,0l25,98l25,-98l475,0l0,100Z" />;
		const renderBottomSVGDivider = svg => (
			<svg viewBox="0 0 1000 100" preserveAspectRatio="none" style={ { fill: '#000000' } }>
				{ bottomSVGDivider[ svg ] }
			</svg>
		);
		const topSVGDivider = {};
		topSVGDivider.ct = <path d="M1000,0l-500,98l-500,-98l0,100l1000,0l0,-100Z" />;
		topSVGDivider.cti = <path d="M500,2l500,98l-1000,0l500,-98Z" />;
		topSVGDivider.ctd = <Fragment><path d="M1000,0l-500,98l-500,-98l0,100l1000,0l0,-100Z" style={ { opacity: 0.4 } } /><path d="M1000,20l-500,78l-500,-78l0,80l1000,0l0,-80Z" /></Fragment>;
		topSVGDivider.ctdi = <Fragment><path d="M500,2l500,78l0,20l-1000,0l0,-20l500,-78Z" style={ { opacity: 0.4 } } /><path d="M500,2l500,98l-1000,0l500,-98Z" /></Fragment>;
		topSVGDivider.sltl = <path d="M1000,0l-1000,100l1000,0l0,-100Z" />;
		topSVGDivider.sltli = <path d="M0,100l1000,-100l-1000,0l0,100Z" />;
		topSVGDivider.sltr = <path d="M0,0l1000,100l-1000,0l0,-100Z" />;
		topSVGDivider.sltri = <path d="M1000,100l-1000,-100l1000,0l0,100Z" />;
		topSVGDivider.crv = <path d="M1000,100c0,0 -270.987,-98 -500,-98c-229.013,0 -500,98 -500,98l1000,0Z" />;
		topSVGDivider.crvi = <path d="M1000,0c0,0 -270.987,98 -500,98c-229.013,0 -500,-98 -500,-98l0,100l1000,0l0,-100Z" />;
		topSVGDivider.crvl = <path d="M1000,100c0,0 -420.987,-98 -650,-98c-229.013,0 -350,98 -350,98l1000,0Z" />;
		topSVGDivider.crvli = <path d="M1000,0c0,0 -420.987,98 -650,98c-229.013,0 -350,-98 -350,-98l0,100l1000,0l0,-100Z" />;
		topSVGDivider.crvr = <path d="M1000,100c0,0 -120.987,-98 -350,-98c-229.013,0 -650,98 -650,98l1000,0Z" />;
		topSVGDivider.crvri = <path d="M1000,0c0,0 -120.987,98 -350,98c-229.013,0 -650,-98 -650,-98l0,100l1000,0l0,-100Z" />;
		topSVGDivider.wave = <path d="M1000,40c0,0 -120.077,-38.076 -250,-38c-129.923,0.076 -345.105,78 -500,78c-154.895,0 -250,-30 -250,-30l0,50l1000,0l0,-60Z" />;
		topSVGDivider.wavei = <path d="M0,40c0,0 120.077,-38.076 250,-38c129.923,0.076 345.105,78 500,78c154.895,0 250,-30 250,-30l0,50l-1000,0l0,-60Z" />;
		topSVGDivider.waves = <Fragment><path d="M1000,40c0,0 -120.077,-38.076 -250,-38c-129.923,0.076 -345.105,78 -500,78c-154.895,0 -250,-30 -250,-30l0,50l1000,0l0,-60Z" /><path d="M1000,40c0,0 -120.077,-38.076 -250,-38c-129.923,0.076 -345.105,73 -500,73c-154.895,0 -250,-45 -250,-45l0,70l1000,0l0,-60Z" style={ { opacity: 0.4 } } /><path d="M1000,40c0,0 -120.077,-38.076 -250,-38c-129.923,0.076 -345.105,68 -500,68c-154.895,0 -250,-65 -250,-65l0,95l1000,0l0,-60Z" style={ { opacity: 0.4 } } /></Fragment>;
		topSVGDivider.wavesi = <Fragment><path d="M0,40c0,0 120.077,-38.076 250,-38c129.923,0.076 345.105,78 500,78c154.895,0 250,-30 250,-30l0,50l-1000,0l0,-60Z" /><path d="M0,40c0,0 120.077,-38.076 250,-38c129.923,0.076 345.105,73 500,73c154.895,0 250,-45 250,-45l0,70l-1000,0l0,-60Z" style={ { opacity: 0.4 } } /><path d="M0,40c0,0 120.077,-38.076 250,-38c129.923,0.076 345.105,68 500,68c154.895,0 250,-65 250,-65l0,95l-1000,0l0,-60Z" style={ { opacity: 0.4 } } /></Fragment>;
		topSVGDivider.mtns = <Fragment><path d="M1000,50l-182.69,-45.286l-292.031,61.197l-190.875,-41.075l-143.748,28.794l-190.656,-23.63l0,70l1000,0l0,-50Z" style={ { opacity: 0.4 } } /><path d="M1000,57l-152.781,-22.589l-214.383,19.81l-159.318,-21.471l-177.44,25.875l-192.722,5.627l-103.356,-27.275l0,63.023l1000,0l0,-43Z" /></Fragment>;
		topSVGDivider.littri = <path d="M500,2l25,98l-50,0l25,-98Z" />;
		topSVGDivider.littrii = <path d="M1000,100l-1000,0l0,-100l475,0l25,98l25,-98l475,0l0,100Z" />;
		const renderTopSVGDivider = svg => (
			<svg className="top-icon" viewBox="0 0 1000 100" preserveAspectRatio="none" style={ { fill: '#000000' } }>
				{ topSVGDivider[ svg ] }
			</svg>
		);
		if ( 2 === columns ) {
			layoutOptions = [
				{ key: 'equal', name: __( 'Equal' ), icon: icons.twocol },
				{ key: 'left-golden', name: __( 'Left Heavy 66/33' ), icon: icons.twoleftgolden },
				{ key: 'right-golden', name: __( 'Right Heavy 33/66' ), icon: icons.tworightgolden },
				{ key: 'row', name: __( 'Collapse to Rows' ), icon: icons.collapserow },
			];
		} else if ( 3 === columns ) {
			layoutOptions = [
				{ key: 'equal', name: __( 'Equal' ), icon: icons.threecol },
				{ key: 'left-half', name: __( 'Left Heavy 50/25/25' ), icon: icons.lefthalf },
				{ key: 'right-half', name: __( 'Right Heavy 25/25/50' ), icon: icons.righthalf },
				{ key: 'center-half', name: __( 'Center Heavy 25/50/25' ), icon: icons.centerhalf },
				{ key: 'center-wide', name: __( 'Wide Center 20/60/20' ), icon: icons.widecenter },
				{ key: 'center-exwide', name: __( 'Wider Center 15/70/15' ), icon: icons.exwidecenter },
				{ key: 'row', name: __( 'Collapse to Rows' ), icon: icons.collapserowthree },
			];
		} else if ( 4 === columns ) {
			layoutOptions = [
				{ key: 'equal', name: __( 'Equal' ), icon: icons.fourcol },
				{ key: 'left-forty', name: __( 'Left Heavy 40/20/20/20' ), icon: icons.lfourforty },
				{ key: 'right-forty', name: __( 'Right Heavy 20/20/20/40' ), icon: icons.rfourforty },
				{ key: 'row', name: __( 'Collapse to Rows' ), icon: icons.collapserowfour },
			];
		} else if ( 5 === columns ) {
			layoutOptions = [
				{ key: 'equal', name: __( 'Equal' ), icon: icons.fivecol },
				{ key: 'row', name: __( 'Collapse to Rows' ), icon: icons.collapserowfive },
			];
		} else if ( 6 === columns ) {
			layoutOptions = [
				{ key: 'equal', name: __( 'Equal' ), icon: icons.sixcol },
				{ key: 'row', name: __( 'Collapse to Rows' ), icon: icons.collapserowsix },
			];
		} else {
			layoutOptions = [
				{ key: 'equal', name: __( 'Single Row' ), icon: icons.row },
			];
		}
		if ( 2 === columns ) {
			mobileLayoutOptions = [
				{ key: 'equal', name: __( 'Equal' ), icon: icons.twocol },
				{ key: 'left-golden', name: __( 'Left Heavy 66/33' ), icon: icons.twoleftgolden },
				{ key: 'right-golden', name: __( 'Right Heavy 33/66' ), icon: icons.tworightgolden },
				{ key: 'row', name: __( 'Collapse to Rows' ), icon: icons.collapserow },
			];
		} else if ( 3 === columns ) {
			mobileLayoutOptions = [
				{ key: 'equal', name: __( 'Equal' ), icon: icons.threecol },
				{ key: 'left-half', name: __( 'Left Heavy 50/25/25' ), icon: icons.lefthalf },
				{ key: 'right-half', name: __( 'Right Heavy 25/25/50' ), icon: icons.righthalf },
				{ key: 'center-half', name: __( 'Center Heavy 25/50/25' ), icon: icons.centerhalf },
				{ key: 'center-wide', name: __( 'Wide Center 20/60/20' ), icon: icons.widecenter },
				{ key: 'center-exwide', name: __( 'Wider Center 15/70/15' ), icon: icons.exwidecenter },
				{ key: 'first-row', name: __( 'First Row, Next Columns 100 - 50/50' ), icon: icons.firstrow },
				{ key: 'last-row', name: __( 'Last Row, Previous Columns 50/50 - 100' ), icon: icons.lastrow },
				{ key: 'row', name: __( 'Collapse to Rows' ), icon: icons.collapserowthree },
			];
		} else if ( 4 === columns ) {
			mobileLayoutOptions = [
				{ key: 'equal', name: __( 'Equal' ), icon: icons.fourcol },
				{ key: 'left-forty', name: __( 'Left Heavy 40/20/20/20' ), icon: icons.lfourforty },
				{ key: 'right-forty', name: __( 'Right Heavy 20/20/20/40' ), icon: icons.rfourforty },
				{ key: 'two-grid', name: __( 'Two Column Grid' ), icon: icons.grid },
				{ key: 'row', name: __( 'Collapse to Rows' ), icon: icons.collapserowfour },
			];
		} else if ( 5 === columns ) {
			mobileLayoutOptions = [
				{ key: 'equal', name: __( 'Equal' ), icon: icons.fivecol },
				{ key: 'row', name: __( 'Collapse to Rows' ), icon: icons.collapserowfive },
			];
		} else if ( 6 === columns ) {
			mobileLayoutOptions = [
				{ key: 'equal', name: __( 'Equal' ), icon: icons.sixcol },
				{ key: 'two-grid', name: __( 'Two Column Grid' ), icon: icons.grid },
				{ key: 'three-grid', name: __( 'Three Column Grid' ), icon: icons.threegrid },
				{ key: 'row', name: __( 'Collapse to Rows' ), icon: icons.collapserowsix },
			];
		} else {
			mobileLayoutOptions = [
				{ key: 'row', name: __( 'Single Row' ), icon: icons.row },
			];
		}
		const onTabBackgroundSelect = ( tabName ) => {
			setAttributes( { backgroundSettingTab: tabName } );
		};
		const onTabSelect = ( tabName ) => {
			setAttributes( { currentTab: tabName } );
		};
		const onOverlayTabSelect = ( tabName ) => {
			setAttributes( { currentOverlayTab: tabName } );
		};
		const onSelectImage = img => {
			setAttributes( {
				bgImgID: img.id,
				bgImg: img.url,
			} );
		};
		const onSelectOverlayImage = img => {
			setAttributes( {
				overlayBgImgID: img.id,
				overlayBgImg: img.url,
			} );
		};
		const onRemoveMobileImage = () => {
			saveMobileBackground( {
				bgImgID: '',
				bgImg: '',
			} );
		};
		const onRemoveTabletImage = () => {
			saveTabletBackground( {
				bgImgID: '',
				bgImg: '',
			} );
		};
		const onRemoveImage = () => {
			setAttributes( {
				bgImgID: null,
				bgImg: null,
			} );
		};
		const onRemoveMobileOverlayImage = () => {
			saveMobileOverlay( {
				overlayBgImgID: '',
				overlayBgImg: '',
			} );
		};
		const onRemoveTabletOverlayImage = () => {
			saveTabletOverlay( {
				overlayBgImgID: '',
				overlayBgImg: '',
			} );
		};
		const onRemoveOverlayImage = () => {
			setAttributes( {
				overlayBgImgID: null,
				overlayBgImg: null,
			} );
		};
		const mobileControls = (
			<Fragment>
				<PanelBody>
					{ columns > 1 && (
						<Fragment>
							<p className="components-base-control__label">{ __( 'Mobile Layout' ) }</p>
							<ButtonGroup aria-label={ __( 'Mobile Layout' ) }>
								{ map( mobileLayoutOptions, ( { name, key, icon } ) => (
									<Tooltip text={ name }>
										<Button
											key={ key }
											className="kt-layout-btn"
											isSmall
											isPrimary={ mobileLayout === key }
											aria-pressed={ mobileLayout === key }
											onClick={ () => setAttributes( { mobileLayout: key } ) }
										>
											{ icon }
										</Button>
									</Tooltip>
								) ) }
							</ButtonGroup>
						</Fragment>
					) }
					{ columns > 1 && (
						<SelectControl
							label={ __( 'Column Collapse Vertical Gutter' ) }
							value={ collapseGutter }
							options={ [
								{ value: 'default', label: __( 'Standard: 30px' ) },
								{ value: 'none', label: __( 'No Gutter' ) },
								{ value: 'skinny', label: __( 'Skinny: 10px' ) },
								{ value: 'narrow', label: __( 'Narrow: 20px' ) },
								{ value: 'wide', label: __( 'Wide: 40px' ) },
								{ value: 'wider', label: __( 'Wider: 60px' ) },
								{ value: 'widest', label: __( 'Widest: 80px' ) },
							] }
							onChange={ ( value ) => setAttributes( { collapseGutter: value } ) }
						/>
					) }
					{ columns > 1 && (
						<SelectControl
							label={ __( 'Collapse Order' ) }
							value={ collapseOrder }
							options={ [
								{ value: 'left-to-right', label: __( 'Left to Right' ) },
								{ value: 'right-to-left', label: __( 'Right to Left' ) },
							] }
							onChange={ value => setAttributes( { collapseOrder: value } ) }
						/>
					) }
				</PanelBody>
				{ this.showSettings( 'paddingMargin' ) && (
					<PanelBody
						title={ __( 'Mobile Padding/Margin' ) }
						initialOpen={ false }
					>
						<h2>{ __( 'Padding (px)' ) }</h2>
						<RangeControl
							label={ icons.outlinetop }
							value={ topPaddingM }
							className="kt-icon-rangecontrol kt-top-padding"
							onChange={ ( value ) => {
								setAttributes( {
									topPaddingM: value,
								} );
							} }
							min={ 0 }
							max={ 500 }
						/>
						<RangeControl
							label={ icons.outlineright }
							value={ rightPaddingM }
							className="kt-icon-rangecontrol kt-right-padding"
							onChange={ ( value ) => {
								setAttributes( {
									rightPaddingM: value,
								} );
							} }
							min={ 0 }
							max={ 500 }
						/>
						<RangeControl
							label={ icons.outlinebottom }
							value={ bottomPaddingM }
							className="kt-icon-rangecontrol kt-bottom-padding"
							onChange={ ( value ) => {
								setAttributes( {
									bottomPaddingM: value,
								} );
							} }
							min={ 0 }
							max={ 500 }
						/>
						<RangeControl
							label={ icons.outlineleft }
							value={ leftPaddingM }
							className="kt-icon-rangecontrol kt-left-padding"
							onChange={ ( value ) => {
								setAttributes( {
									leftPaddingM: value,
								} );
							} }
							min={ 0 }
							max={ 500 }
						/>
						<ButtonGroup className="kt-size-type-options kt-row-size-type-options" aria-label={ __( 'Margin Type' ) }>
							{ map( marginTypes, ( { name, key } ) => (
								<Button
									key={ key }
									className="kt-size-btn"
									isSmall
									isPrimary={ marginUnit === key }
									aria-pressed={ marginUnit === key }
									onClick={ () => setAttributes( { marginUnit: key } ) }
								>
									{ name }
								</Button>
							) ) }
						</ButtonGroup>
						<h2>{ __( 'Mobile Margin' ) }</h2>
						<RangeControl
							label={ icons.outlinetop }
							value={ topMarginM }
							className="kt-icon-rangecontrol kt-top-margin"
							onChange={ ( value ) => {
								setAttributes( {
									topMarginM: value,
								} );
							} }
							min={ marginMin }
							max={ marginMax }
							step={ marginStep }
						/>
						<RangeControl
							label={ icons.outlinebottom }
							value={ bottomMarginM }
							className="kt-icon-rangecontrol kt-bottom-margin"
							onChange={ ( value ) => {
								setAttributes( {
									bottomMarginM: value,
								} );
							} }
							min={ marginMin }
							max={ marginMax }
							step={ marginStep }
						/>
					</PanelBody>
				) }
				{ this.showSettings( 'background' ) && (
					<PanelBody
						title={ __( 'Mobile Background' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Set custom background for Mobile?' ) }
							checked={ ( mobileBackground && mobileBackground[ 0 ] ? mobileBackground[ 0 ].enable : false ) }
							onChange={ ( value ) => saveMobileBackground( { enable: value } ) }
						/>
						{ mobileBackground && mobileBackground[ 0 ] && mobileBackground[ 0 ].enable && (
							<Fragment>
								<AdvancedColorControl
									label={ __( 'Background Color' ) }
									colorValue={ ( mobileBackground[ 0 ].bgColor ? mobileBackground[ 0 ].bgColor : '' ) }
									colorDefault={ '' }
									onColorChange={ value => saveMobileBackground( { bgColor: value } ) }
								/>
								<MediaUpload
									onSelect={ img => {
										saveMobileBackground( { bgImgID: img.id, bgImg: img.url } );
									} }
									type="image"
									value={ mobileBackground[ 0 ].bgImgID }
									render={ ( { open } ) => (
										<Button
											className={ 'components-button components-icon-button kt-cta-upload-btn' }
											onClick={ open }
										>
											<Dashicon icon="format-image" />
											{ __( 'Select Image' ) }
										</Button>
									) }
								/>
								{ mobileBackground[ 0 ].bgImg && (
									<Tooltip text={ __( 'Remove Image' ) }>
										<Button
											className={ 'components-button components-icon-button kt-remove-img kt-cta-upload-btn' }
											onClick={ onRemoveMobileImage }
										>
											<Dashicon icon="no-alt" />
										</Button>
									</Tooltip>
								) }
								{ '' === mobileBackground[ 0 ].bgImg && '' !== bgImg && (
									<ToggleControl
										label={ __( 'Force no image for mobile' ) }
										checked={ ( mobileBackground && mobileBackground[ 0 ] ? mobileBackground[ 0 ].forceOverDesk : false ) }
										onChange={ ( value ) => saveMobileBackground( { forceOverDesk: value } ) }
									/>
								) }
								{ mobileBackground[ 0 ].bgImg && (
									<Fragment>
										<SelectControl
											label={ __( 'Background Image Size' ) }
											value={ mobileBackground[ 0 ].bgImgSize }
											options={ [
												{ value: 'cover', label: __( 'Cover' ) },
												{ value: 'contain', label: __( 'Contain' ) },
												{ value: 'auto', label: __( 'Auto' ) },
											] }
											onChange={ value => saveMobileBackground( { bgImgSize: value } ) }
										/>
										<SelectControl
											label={ __( 'Background Image Position' ) }
											value={ mobileBackground[ 0 ].bgImgPosition }
											options={ [
												{ value: 'center top', label: __( 'Center Top' ) },
												{ value: 'center center', label: __( 'Center Center' ) },
												{ value: 'center bottom', label: __( 'Center Bottom' ) },
												{ value: 'left top', label: __( 'Left Top' ) },
												{ value: 'left center', label: __( 'Left Center' ) },
												{ value: 'left bottom', label: __( 'Left Bottom' ) },
												{ value: 'right top', label: __( 'Right Top' ) },
												{ value: 'right center', label: __( 'Right Center' ) },
												{ value: 'right bottom', label: __( 'Right Bottom' ) },
											] }
											onChange={ value => saveMobileBackground( { bgImgPosition: value } ) }
										/>
										<SelectControl
											label={ __( 'Background Image Repeat' ) }
											value={ mobileBackground[ 0 ].bgImgRepeat }
											options={ [
												{ value: 'no-repeat', label: __( 'No Repeat' ) },
												{ value: 'repeat', label: __( 'Repeat' ) },
												{ value: 'repeat-x', label: __( 'Repeat-x' ) },
												{ value: 'repeat-y', label: __( 'Repeat-y' ) },
											] }
											onChange={ value => saveMobileBackground( { bgImgRepeat: value } ) }
										/>
										<SelectControl
											label={ __( 'Background Image Attachment' ) }
											value={ mobileBackground[ 0 ].bgImgAttachment }
											options={ [
												{ value: 'scroll', label: __( 'Scroll' ) },
												{ value: 'fixed', label: __( 'Fixed' ) },
												{ value: 'parallax', label: __( 'Parallax' ) },
											] }
											onChange={ value => saveMobileBackground( { bgImgAttachment: value } ) }
										/>
									</Fragment>
								) }
							</Fragment>
						) }
					</PanelBody>
				) }
				{ this.showSettings( 'backgroundOverlay' ) && (
					<PanelBody
						title={ __( 'Mobile Background Overlay' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Set custom background overlay for mobile?' ) }
							checked={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].enable : false ) }
							onChange={ ( value ) => saveMobileOverlay( { enable: value } ) }
						/>
						{ mobileOverlay && mobileOverlay[ 0 ] && mobileOverlay[ 0 ].enable && (
							<TabPanel className="kt-inspect-tabs kt-gradient-tabs"
								activeClass="active-tab"
								initialTabName={ mobileOverlay[ 0 ].currentOverlayTab }
								onSelect={ value => saveMobileOverlay( { currentOverlayTab: value } ) }
								tabs={ [
									{
										name: 'normal',
										title: __( 'Normal' ),
										className: 'kt-over-normal',
									},
									{
										name: 'grad',
										title: __( 'Gradient' ),
										className: 'kt-over-grad',
									},
								] }>
								{
									( tab ) => {
										let tabout;
										if ( tab.name ) {
											if ( 'grad' === tab.name ) {
												tabout = overMobileGradControls;
											} else {
												tabout = overMobileControls;
											}
										}
										return <div>{ tabout }</div>;
									}
								}
							</TabPanel>
						) }
					</PanelBody>
				) }
			</Fragment>
		);
		const tabletControls = (
			<Fragment>
				<PanelBody>
					{ columns > 1 && (
						<Fragment>
							<p className="components-base-control__label">{ __( 'Tablet Layout' ) }</p>
							<ButtonGroup aria-label={ __( 'Tablet Layout' ) }>
								{ map( mobileLayoutOptions, ( { name, key, icon } ) => (
									<Tooltip text={ name }>
										<Button
											key={ key }
											className="kt-layout-btn"
											isSmall
											isPrimary={ tabletLayout === key }
											aria-pressed={ tabletLayout === key }
											onClick={ () => setAttributes( { tabletLayout: key } ) }
										>
											{ icon }
										</Button>
									</Tooltip>
								) ) }
							</ButtonGroup>
						</Fragment>
					) }
				</PanelBody>
				{ this.showSettings( 'paddingMargin' ) && (
					<PanelBody
						title={ __( 'Tablet Padding/Margin' ) }
						initialOpen={ false }
					>
						<MeasurementControls
							label={ __( 'Padding (px)' ) }
							measurement={ tabletPadding }
							onChange={ ( value ) => setAttributes( { tabletPadding: value } ) }
							min={ 0 }
							max={ 500 }
							step={ 1 }
							allowEmpty={ true }
						/>
						<ButtonGroup className="kt-size-type-options kt-row-size-type-options" aria-label={ __( 'Margin Type' ) }>
							{ map( marginTypes, ( { name, key } ) => (
								<Button
									key={ key }
									className="kt-size-btn"
									isSmall
									isPrimary={ marginUnit === key }
									aria-pressed={ marginUnit === key }
									onClick={ () => setAttributes( { marginUnit: key } ) }
								>
									{ name }
								</Button>
							) ) }
						</ButtonGroup>
						<h2>{ __( 'Tablet Margin' ) }</h2>
						<RangeControl
							label={ icons.outlinetop }
							value={ topMarginT }
							className="kt-icon-rangecontrol kt-top-margin"
							onChange={ ( value ) => {
								setAttributes( {
									topMarginT: value,
								} );
							} }
							min={ marginMin }
							max={ marginMax }
							step={ marginStep }
						/>
						<RangeControl
							label={ icons.outlinebottom }
							value={ bottomMarginT }
							className="kt-icon-rangecontrol kt-bottom-margin"
							onChange={ ( value ) => {
								setAttributes( {
									bottomMarginT: value,
								} );
							} }
							min={ marginMin }
							max={ marginMax }
							step={ marginStep }
						/>
					</PanelBody>
				) }
				{ this.showSettings( 'background' ) && (
					<PanelBody
						title={ __( 'Tablet Background' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Set custom background for tablets?' ) }
							checked={ ( tabletBackground && tabletBackground[ 0 ] ? tabletBackground[ 0 ].enable : false ) }
							onChange={ ( value ) => saveTabletBackground( { enable: value } ) }
						/>
						{ tabletBackground && tabletBackground[ 0 ] && tabletBackground[ 0 ].enable && (
							<Fragment>
								<AdvancedColorControl
									label={ __( 'Background Color' ) }
									colorValue={ ( tabletBackground[ 0 ].bgColor ? tabletBackground[ 0 ].bgColor : '' ) }
									colorDefault={ '' }
									onColorChange={ value => saveTabletBackground( { bgColor: value } ) }
								/>
								<MediaUpload
									onSelect={ value => saveTabletBackground( { bgImgID: value.id, bgImg: value.url } ) }
									type="image"
									value={ tabletBackground[ 0 ].bgImgID }
									render={ ( { open } ) => (
										<Button
											className={ 'components-button components-icon-button kt-cta-upload-btn' }
											onClick={ open }
										>
											<Dashicon icon="format-image" />
											{ __( 'Select Image' ) }
										</Button>
									) }
								/>
								{ tabletBackground[ 0 ].bgImg && (
									<Tooltip text={ __( 'Remove Image' ) }>
										<Button
											className={ 'components-button components-icon-button kt-remove-img kt-cta-upload-btn' }
											onClick={ onRemoveTabletImage }
										>
											<Dashicon icon="no-alt" />
										</Button>
									</Tooltip>
								) }
								{ '' === tabletBackground[ 0 ].bgImg && '' !== bgImg && (
									<ToggleControl
										label={ __( 'Force no image for tablet' ) }
										checked={ ( tabletBackground && tabletBackground[ 0 ] ? tabletBackground[ 0 ].forceOverDesk : false ) }
										onChange={ ( value ) => saveTabletBackground( { forceOverDesk: value } ) }
									/>
								) }
								{ tabletBackground[ 0 ].bgImg && (
									<Fragment>
										<SelectControl
											label={ __( 'Background Image Size' ) }
											value={ tabletBackground[ 0 ].bgImgSize }
											options={ [
												{ value: 'cover', label: __( 'Cover' ) },
												{ value: 'contain', label: __( 'Contain' ) },
												{ value: 'auto', label: __( 'Auto' ) },
											] }
											onChange={ value => saveTabletBackground( { bgImgSize: value } ) }
										/>
										<SelectControl
											label={ __( 'Background Image Position' ) }
											value={ tabletBackground[ 0 ].bgImgPosition }
											options={ [
												{ value: 'center top', label: __( 'Center Top' ) },
												{ value: 'center center', label: __( 'Center Center' ) },
												{ value: 'center bottom', label: __( 'Center Bottom' ) },
												{ value: 'left top', label: __( 'Left Top' ) },
												{ value: 'left center', label: __( 'Left Center' ) },
												{ value: 'left bottom', label: __( 'Left Bottom' ) },
												{ value: 'right top', label: __( 'Right Top' ) },
												{ value: 'right center', label: __( 'Right Center' ) },
												{ value: 'right bottom', label: __( 'Right Bottom' ) },
											] }
											onChange={ value => saveTabletBackground( { bgImgPosition: value } ) }
										/>
										<SelectControl
											label={ __( 'Background Image Repeat' ) }
											value={ tabletBackground[ 0 ].bgImgRepeat }
											options={ [
												{ value: 'no-repeat', label: __( 'No Repeat' ) },
												{ value: 'repeat', label: __( 'Repeat' ) },
												{ value: 'repeat-x', label: __( 'Repeat-x' ) },
												{ value: 'repeat-y', label: __( 'Repeat-y' ) },
											] }
											onChange={ value => saveTabletBackground( { bgImgRepeat: value } ) }
										/>
										<SelectControl
											label={ __( 'Background Image Attachment' ) }
											value={ tabletBackground[ 0 ].bgImgAttachment }
											options={ [
												{ value: 'scroll', label: __( 'Scroll' ) },
												{ value: 'fixed', label: __( 'Fixed' ) },
												{ value: 'parallax', label: __( 'Parallax' ) },
											] }
											onChange={ value => saveTabletBackground( { bgImgAttachment: value } ) }
										/>
									</Fragment>
								) }
							</Fragment>
						) }
					</PanelBody>
				) }
				{ this.showSettings( 'backgroundOverlay' ) && (
					<PanelBody
						title={ __( 'Tablet Background Overlay' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Set custom background overlay for tablets?' ) }
							checked={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].enable : false ) }
							onChange={ ( value ) => saveTabletOverlay( { enable: value } ) }
						/>
						{ tabletOverlay && tabletOverlay[ 0 ] && tabletOverlay[ 0 ].enable && (
							<TabPanel className="kt-inspect-tabs kt-gradient-tabs"
								activeClass="active-tab"
								initialTabName={ tabletOverlay[ 0 ].currentOverlayTab }
								onSelect={ value => saveTabletOverlay( { currentOverlayTab: value } ) }
								tabs={ [
									{
										name: 'normal',
										title: __( 'Normal' ),
										className: 'kt-over-normal',
									},
									{
										name: 'grad',
										title: __( 'Gradient' ),
										className: 'kt-over-grad',
									},
								] }>
								{
									( tab ) => {
										let tabout;
										if ( tab.name ) {
											if ( 'grad' === tab.name ) {
												tabout = overTabGradControls;
											} else {
												tabout = overTabControls;
											}
										}
										return <div>{ tabout }</div>;
									}
								}
							</TabPanel>
						) }
					</PanelBody>
				) }
			</Fragment>
		);
		const slideControls = ( index ) => {
			return (
				<Fragment>
					<h2>{ __( 'Slide' ) + ' ' + ( index + 1 ) + ' ' + __( 'Settings' ) }</h2>
					<div className="kt-inner-sub-section">
						<AdvancedColorControl
							label={ __( 'Slide Background Color' ) }
							colorValue={ ( undefined !== backgroundSlider && undefined !== backgroundSlider[ index ] && backgroundSlider[ index ].bgColor ? backgroundSlider[ index ].bgColor : '' ) }
							colorDefault={ '' }
							onColorChange={ value => this.saveSlideItem( { bgColor: value }, index ) }
						/>
						{ ( undefined === backgroundSlider[ index ] || undefined === backgroundSlider[ index ].bgImg || '' === backgroundSlider[ index ].bgImg ) && (
							<MediaUpload
								onSelect={ img => {
									this.saveSlideItem( {
										bgImgID: img.id,
										bgImg: img.url,
									}, index );
								} }
								type="image"
								value={ ( undefined !== backgroundSlider && undefined !== backgroundSlider[ index ] && backgroundSlider[ index ].bgImgID ? backgroundSlider[ index ].bgImgID : '' ) }
								render={ ( { open } ) => (
									<Button
										className={ 'components-button components-icon-button kt-cta-upload-btn' }
										onClick={ open }
									>
										<Dashicon icon="format-image" />
										{ __( 'Slide Select Image' ) }
									</Button>
								) }
							/>
						) }
						{ undefined !== backgroundSlider && undefined !== backgroundSlider[ index ] && backgroundSlider[ index ].bgImg && (
							<Fragment>
								<MediaUpload
									onSelect={ media => {
										this.saveSlideItem( {
											bgImgID: media.id,
											bgImg: media.url,
										}, index );
									} }
									type="image"
									value={ ( undefined !== backgroundSlider && undefined !== backgroundSlider[ index ] && backgroundSlider[ index ].bgImgID ? backgroundSlider[ index ].bgImgID : '' ) }
									allowedTypes={ [ 'image' ] }
									render={ ( { open } ) => (
										<Tooltip text={ __( 'Edit Image' ) }>
											<Button
												style={ {
													backgroundImage: 'url("' + backgroundSlider[ index ].bgImg + '")',
													backgroundSize: 'cover',
												} }
												className={ 'kb-sidebar-image' }
												onClick={ open }
											>
												{ __( 'Edit Image' ) }
											</Button>
										</Tooltip>
									) }
								/>
								<Tooltip text={ __( 'Remove Image' ) }>
									<Button
										className={ 'components-button components-icon-button kt-remove-img kt-cta-upload-btn' }
										onClick={ () => {
											this.saveSlideItem( {
												bgImgID: '',
												bgImg: '',
											}, index );
										} }
									>
										<Dashicon icon="no-alt" />
									</Button>
								</Tooltip>
							</Fragment>
						) }
					</div>
				</Fragment>
			);
		};
		const deskControls = (
			<Fragment>
				<PanelBody>
					<RangeControl
						label={ __( 'Columns' ) }
						value={ columns }
						onChange={ ( nextColumns ) => {
							setAttributes( {
								columns: nextColumns,
								colLayout: 'equal',
								firstColumnWidth: undefined,
								secondColumnWidth: undefined,
								tabletLayout: 'inherit',
								mobileLayout: 'row',
							} );
						} }
						min={ 1 }
						max={ 6 }
					/>
					{ columns > 1 && (
						<Fragment>
							<p className="components-base-control__label">{ __( 'Layout' ) }</p>
							<ButtonGroup aria-label={ __( 'Column Layout' ) }>
								{ map( layoutOptions, ( { name, key, icon } ) => (
									<Tooltip text={ name }>
										<Button
											key={ key }
											className="kt-layout-btn"
											isSmall
											isPrimary={ selectColLayout === key }
											aria-pressed={ selectColLayout === key }
											onClick={ () => {
												setAttributes( {
													colLayout: key,
												} );
												setAttributes( {
													firstColumnWidth: undefined,
													secondColumnWidth: undefined,
												} );
											} }
										>
											{ icon }
										</Button>
									</Tooltip>
								) ) }
							</ButtonGroup>
						</Fragment>
					) }
					{ columns > 1 && (
						<SelectControl
							label={ __( 'Column Gutter' ) }
							value={ columnGutter }
							options={ [
								{ value: 'default', label: __( 'Standard: 30px' ) },
								{ value: 'none', label: __( 'No Gutter' ) },
								{ value: 'skinny', label: __( 'Skinny: 10px' ) },
								{ value: 'narrow', label: __( 'Narrow: 20px' ) },
								{ value: 'wide', label: __( 'Wide: 40px' ) },
								{ value: 'wider', label: __( 'Wider: 60px' ) },
								{ value: 'widest', label: __( 'Widest: 80px' ) },
							] }
							onChange={ ( value ) => setAttributes( { columnGutter: value } ) }
						/>
					) }
				</PanelBody>
				{ this.showSettings( 'paddingMargin' ) && (
					<PanelBody
						title={ __( 'Padding/Margin' ) }
						initialOpen={ false }
					>
						<h2>{ __( 'Padding (px)' ) }</h2>
						<RangeControl
							label={ icons.outlinetop }
							value={ topPadding }
							className="kt-icon-rangecontrol"
							onChange={ ( value ) => {
								setAttributes( {
									topPadding: value,
								} );
							} }
							min={ 0 }
							max={ 500 }
						/>
						<RangeControl
							label={ icons.outlineright }
							value={ rightPadding }
							className="kt-icon-rangecontrol"
							onChange={ ( value ) => {
								setAttributes( {
									rightPadding: value,
								} );
							} }
							min={ 0 }
							max={ 500 }
						/>
						<RangeControl
							label={ icons.outlinebottom }
							value={ bottomPadding }
							className="kt-icon-rangecontrol"
							onChange={ ( value ) => {
								setAttributes( {
									bottomPadding: value,
								} );
							} }
							min={ 0 }
							max={ 500 }
						/>
						<RangeControl
							label={ icons.outlineleft }
							value={ leftPadding }
							className="kt-icon-rangecontrol"
							onChange={ ( value ) => {
								setAttributes( {
									leftPadding: value,
								} );
							} }
							min={ 0 }
							max={ 500 }
						/>
						<ButtonGroup className="kt-size-type-options kt-row-size-type-options" aria-label={ __( 'Margin Type' ) }>
							{ map( marginTypes, ( { name, key } ) => (
								<Button
									key={ key }
									className="kt-size-btn"
									isSmall
									isPrimary={ marginUnit === key }
									aria-pressed={ marginUnit === key }
									onClick={ () => setAttributes( { marginUnit: key } ) }
								>
									{ name }
								</Button>
							) ) }
						</ButtonGroup>
						<h2>{ __( 'Margin' ) }</h2>
						<RangeControl
							label={ icons.outlinetop }
							value={ topMargin }
							className="kt-icon-rangecontrol"
							onChange={ ( value ) => {
								setAttributes( {
									topMargin: value,
								} );
							} }
							min={ marginMin }
							max={ marginMax }
							step={ marginStep }
						/>
						<RangeControl
							label={ icons.outlinebottom }
							value={ bottomMargin }
							className="kt-icon-rangecontrol"
							onChange={ ( value ) => {
								setAttributes( {
									bottomMargin: value,
								} );
							} }
							min={ marginMin }
							max={ marginMax }
							step={ marginStep }
						/>
					</PanelBody>
				) }
				{ this.showSettings( 'background' ) && (
					<PanelBody
						title={ __( 'Background Settings' ) }
						initialOpen={ false }
					>
						<TabPanel className="kt-inspect-tabs"
							initialTabName={ backgroundSettingTab }
							activeClass="active-tab"
							onSelect={ onTabBackgroundSelect }
							tabs={ [
								{
									name: 'normal',
									title: <Dashicon icon="format-image" />,
									className: 'kt-desk-tab',
								},
								{
									name: 'slider',
									title: <Dashicon icon="slides" />,
									className: 'kt-tablet-tab',
								},
								{
									name: 'video',
									title: <Dashicon icon="format-video" />,
									className: 'kt-mobile-tab',
								},
							] }>
							{
								( tab ) => {
									let tabout;
									if ( tab.name ) {
										if ( 'slider' === tab.name ) {
											tabout = (
												<PanelBody>
													<RangeControl
														label={ __( 'Background Slider Image Count' ) }
														value={ backgroundSliderCount }
														onChange={ newcount => {
															const newSlides = backgroundSlider;
															if ( newSlides.length < newcount ) {
																const amount = Math.abs( newcount - newSlides.length );
																{ times( amount, n => {
																	newSlides.push( {
																		bgColor: '',
																		bgImg: '',
																		bgImgID: '',
																	} );
																} ); }
																setAttributes( { backgroundSlider: newSlides } );
															}
															setAttributes( { backgroundSliderCount: newcount } );
														} }
														step={ 1 }
														min={ 1 }
														max={ 20 }
													/>
													{ times( backgroundSliderCount, n => slideControls( n ) ) }
													<SelectControl
														label={ __( 'Slider Image Size' ) }
														value={ bgImgSize }
														options={ [
															{ value: 'cover', label: __( 'Cover' ) },
															{ value: 'contain', label: __( 'Contain' ) },
															{ value: 'auto', label: __( 'Auto' ) },
														] }
														onChange={ value => setAttributes( { bgImgSize: value } ) }
													/>
													<SelectControl
														label={ __( 'Slider Image Position' ) }
														value={ bgImgPosition }
														options={ [
															{ value: 'center top', label: __( 'Center Top' ) },
															{ value: 'center center', label: __( 'Center Center' ) },
															{ value: 'center bottom', label: __( 'Center Bottom' ) },
															{ value: 'left top', label: __( 'Left Top' ) },
															{ value: 'left center', label: __( 'Left Center' ) },
															{ value: 'left bottom', label: __( 'Left Bottom' ) },
															{ value: 'right top', label: __( 'Right Top' ) },
															{ value: 'right center', label: __( 'Right Center' ) },
															{ value: 'right bottom', label: __( 'Right Bottom' ) },
														] }
														onChange={ value => setAttributes( { bgImgPosition: value } ) }
													/>
													<SelectControl
														label={ __( 'Slider Image Repeat' ) }
														value={ bgImgRepeat }
														options={ [
															{ value: 'no-repeat', label: __( 'No Repeat' ) },
															{ value: 'repeat', label: __( 'Repeat' ) },
															{ value: 'repeat-x', label: __( 'Repeat-x' ) },
															{ value: 'repeat-y', label: __( 'Repeat-y' ) },
														] }
														onChange={ value => setAttributes( { bgImgRepeat: value } ) }
													/>
													<ToggleControl
														label={ __( 'Slider Auto Play' ) }
														checked={ backgroundSliderSettings[ 0 ].autoPlay }
														onChange={ ( value ) => saveSliderSettings( { autoPlay: value } ) }
													/>
													{ backgroundSliderSettings[ 0 ].autoPlay && (
														<RangeControl
															label={ __( 'Autoplay Speed' ) }
															value={ backgroundSliderSettings[ 0 ].speed }
															onChange={ ( value ) => saveSliderSettings( { speed: value } ) }
															min={ 500 }
															max={ 15000 }
															step={ 10 }
														/>
													) }
													<SelectControl
														label={ __( 'Transition Style' ) }
														options={ [
															{
																label: __( 'Fade' ),
																value: 'fade',
															},
															{
																label: __( 'Slide' ),
																value: 'slide',
															},
														] }
														value={ ( false === backgroundSliderSettings[ 0 ].fade ? 'slide' : 'fade' ) }
														onChange={ ( value ) => {
															if ( 'slide' === value ) {
																saveSliderSettings( { fade: false } );
															} else {
																saveSliderSettings( { fade: true } );
															}
														} }
													/>
													<RangeControl
														label={ __( 'Slider Transition Speed' ) }
														value={ backgroundSliderSettings[ 0 ].tranSpeed }
														onChange={ ( value ) => saveSliderSettings( { tranSpeed: value } ) }
														min={ 100 }
														max={ 2000 }
														step={ 10 }
													/>
													<SelectControl
														label={ __( 'Arrow Style' ) }
														options={ [
															{
																label: __( 'White on Dark' ),
																value: 'whiteondark',
															},
															{
																label: __( 'Black on Light' ),
																value: 'blackonlight',
															},
															{
																label: __( 'Outline Black' ),
																value: 'outlineblack',
															},
															{
																label: __( 'Outline White' ),
																value: 'outlinewhite',
															},
															{
																label: __( 'None' ),
																value: 'none',
															},
														] }
														value={ backgroundSliderSettings[ 0 ].arrowStyle }
														onChange={ ( value ) => saveSliderSettings( { arrowStyle: value } ) }
													/>
													<SelectControl
														label={ __( 'Dot Style' ) }
														options={ [
															{
																label: __( 'Dark' ),
																value: 'dark',
															},
															{
																label: __( 'Light' ),
																value: 'light',
															},
															{
																label: __( 'Outline Dark' ),
																value: 'outlinedark',
															},
															{
																label: __( 'Outline Light' ),
																value: 'outlinelight',
															},
															{
																label: __( 'None' ),
																value: 'none',
															},
														] }
														value={ backgroundSliderSettings[ 0 ].dotStyle }
														onChange={ ( value ) => saveSliderSettings( { dotStyle: value } ) }
													/>
												</PanelBody>
											);
										} else if ( 'video' === tab.name ) {
											tabout = (
												<PanelBody>
													{/* <SelectControl
														label={ __( 'Background Video Type' ) }
														options={ [
															{
																label: __( 'Local (MP4)' ),
																value: 'local',
															},
															{
																label: __( 'YouTube' ),
																value: 'youtube',
															},
															{
																label: __( 'Vimeo' ),
																value: 'vimeo',
															},
														] }
														value={ backgroundVideoType }
														onChange={ ( value ) => setAttributes( { backgroundVideoType: value } ) }
													/> */}
													{ 'local' === backgroundVideoType && (
														<Fragment>
															<MediaUpload
																onSelect={ video => {
																	saveVideoSettings( {
																		localID: video.id,
																		local: video.url,
																	} );
																} }
																type="video"
																allowedTypes={ [ 'video' ] }
																value={ ( undefined !== backgroundVideo && undefined !== backgroundVideo[ 0 ] && backgroundVideo[ 0 ].localID ? backgroundVideo[ 0 ].localID : '' ) }
																render={ ( { open } ) => (
																	<Button
																		className={ 'components-button components-icon-button kt-cta-upload-btn' }
																		onClick={ open }
																	>
																		<Dashicon icon="format-image" />
																		{ __( 'Select Video' ) }
																	</Button>
																) }
															/>
															{ backgroundVideo[ 0 ].localID && (
																<Tooltip text={ __( 'Remove Image' ) }>
																	<Button
																		className={ 'components-button components-icon-button kt-remove-img kt-cta-upload-btn' }
																		onClick={ () => {
																			saveVideoSettings( {
																				localID: '',
																				local: '',
																			} );
																		} }
																	>
																		<Dashicon icon="no-alt" />
																	</Button>
																</Tooltip>
															) }
														</Fragment>
													) }
													{ 'youtube' === backgroundVideoType && (
														<TextControl
															label={ __( 'YouTube ID ( example: Sv_hGITmNuo ) ' ) }
															value={ ( undefined !== backgroundVideo && undefined !== backgroundVideo[ 0 ] && backgroundVideo[ 0 ].youtube ? backgroundVideo[ 0 ].youtube : '' ) }
															onChange={ value => saveVideoSettings( { youtube: value } ) }
														/>
													) }
													{ 'local' !== backgroundVideoType && (
														<SelectControl
															label={ __( 'Background Video Ratio' ) }
															options={ [
																{
																	label: __( '16 / 9' ),
																	value: '16/9',
																},
																{
																	label: __( '4 / 3' ),
																	value: '4/3',
																},
																{
																	label: __( '3 / 2' ),
																	value: '3/2',
																},
															] }
															value={ ( undefined !== backgroundVideo && undefined !== backgroundVideo[ 0 ] && undefined !== backgroundVideo[ 0 ].ratio ? backgroundVideo[ 0 ].ratio : '16/9' ) }
															onChange={ ( value ) => saveVideoSettings( { ratio: value } ) }
														/>
													) }
													<ToggleControl
														label={ __( 'Mute Video' ) }
														checked={ ( undefined !== backgroundVideo && undefined !== backgroundVideo[ 0 ] && undefined !== backgroundVideo[ 0 ].mute ? backgroundVideo[ 0 ].mute : true ) }
														onChange={ ( value ) => saveVideoSettings( { mute: value } ) }
													/>
													<ToggleControl
														label={ __( 'Loop Video' ) }
														checked={ ( undefined !== backgroundVideo && undefined !== backgroundVideo[ 0 ] && undefined !== backgroundVideo[ 0 ].loop ? backgroundVideo[ 0 ].loop : true ) }
														onChange={ ( value ) => saveVideoSettings( { loop: value } ) }
													/>
													<ToggleControl
														label={ __( 'Show Play Pause Buttons?' ) }
														checked={ ( undefined !== backgroundVideo && undefined !== backgroundVideo[ 0 ] && undefined !== backgroundVideo[ 0 ].btns ? backgroundVideo[ 0 ].btns : true ) }
														onChange={ ( value ) => saveVideoSettings( { btns: value } ) }
													/>
													<AdvancedColorControl
														label={ __( 'Background Color' ) }
														colorValue={ ( bgColor ? bgColor : '' ) }
														colorDefault={ '' }
														onColorChange={ value => setAttributes( { bgColor: value } ) }
													/>
													<MediaUpload
														onSelect={ onSelectImage }
														type="image"
														value={ bgImgID }
														render={ ( { open } ) => (
															<Button
																className={ 'components-button components-icon-button kt-cta-upload-btn' }
																onClick={ open }
															>
																<Dashicon icon="format-image" />
																{ __( 'Select Video Poster' ) }
															</Button>
														) }
													/>
													{ bgImg && (
														<Tooltip text={ __( 'Remove Image' ) }>
															<Button
																className={ 'components-button components-icon-button kt-remove-img kt-cta-upload-btn' }
																onClick={ onRemoveImage }
															>
																<Dashicon icon="no-alt" />
															</Button>
														</Tooltip>
													) }
												</PanelBody>
											);
										} else {
											tabout = (
												<PanelBody>
													<AdvancedColorControl
														label={ __( 'Background Color' ) }
														colorValue={ ( bgColor ? bgColor : '' ) }
														colorDefault={ '' }
														onColorChange={ value => setAttributes( { bgColor: value } ) }
													/>
													<MediaUpload
														onSelect={ onSelectImage }
														type="image"
														value={ bgImgID }
														render={ ( { open } ) => (
															<Button
																className={ 'components-button components-icon-button kt-cta-upload-btn' }
																onClick={ open }
															>
																<Dashicon icon="format-image" />
																{ __( 'Select Image' ) }
															</Button>
														) }
													/>
													{ bgImg && (
														<Fragment>
															<Tooltip text={ __( 'Remove Image' ) }>
																<Button
																	className={ 'components-button components-icon-button kt-remove-img kt-cta-upload-btn' }
																	onClick={ onRemoveImage }
																>
																	<Dashicon icon="no-alt" />
																</Button>
															</Tooltip>
															<Tooltip text={ __( 'Some Lazyloads only support this type of background images.' ) }>
																<ToggleControl
																	label={ __( 'Force Background Image inline?' ) }
																	checked={ ( undefined !== backgroundInline ? backgroundInline : false ) }
																	onChange={ ( value ) => setAttributes( { backgroundInline: value } ) }
																/>
															</Tooltip>
															<SelectControl
																label={ __( 'Background Image Size' ) }
																value={ bgImgSize }
																options={ [
																	{ value: 'cover', label: __( 'Cover' ) },
																	{ value: 'contain', label: __( 'Contain' ) },
																	{ value: 'auto', label: __( 'Auto' ) },
																] }
																onChange={ value => setAttributes( { bgImgSize: value } ) }
															/>
															<SelectControl
																label={ __( 'Background Image Position' ) }
																value={ bgImgPosition }
																options={ [
																	{ value: 'center top', label: __( 'Center Top' ) },
																	{ value: 'center center', label: __( 'Center Center' ) },
																	{ value: 'center bottom', label: __( 'Center Bottom' ) },
																	{ value: 'left top', label: __( 'Left Top' ) },
																	{ value: 'left center', label: __( 'Left Center' ) },
																	{ value: 'left bottom', label: __( 'Left Bottom' ) },
																	{ value: 'right top', label: __( 'Right Top' ) },
																	{ value: 'right center', label: __( 'Right Center' ) },
																	{ value: 'right bottom', label: __( 'Right Bottom' ) },
																] }
																onChange={ value => setAttributes( { bgImgPosition: value } ) }
															/>
															<SelectControl
																label={ __( 'Background Image Repeat' ) }
																value={ bgImgRepeat }
																options={ [
																	{ value: 'no-repeat', label: __( 'No Repeat' ) },
																	{ value: 'repeat', label: __( 'Repeat' ) },
																	{ value: 'repeat-x', label: __( 'Repeat-x' ) },
																	{ value: 'repeat-y', label: __( 'Repeat-y' ) },
																] }
																onChange={ value => setAttributes( { bgImgRepeat: value } ) }
															/>
															<SelectControl
																label={ __( 'Background Image Attachment' ) }
																value={ bgImgAttachment }
																options={ [
																	{ value: 'scroll', label: __( 'Scroll' ) },
																	{ value: 'fixed', label: __( 'Fixed' ) },
																	{ value: 'parallax', label: __( 'Parallax' ) },
																] }
																onChange={ value => setAttributes( { bgImgAttachment: value } ) }
															/>
														</Fragment>
													) }
												</PanelBody>
											);
										}
									}
									return <div>{ tabout }</div>;
								}
							}
						</TabPanel>
					</PanelBody>
				) }
				{ this.showSettings( 'backgroundOverlay' ) && (
					<PanelBody
						title={ __( 'Background Overlay Settings' ) }
						initialOpen={ false }
					>
						<TabPanel className="kt-inspect-tabs kt-gradient-tabs"
							activeClass="active-tab"
							initialTabName={ currentOverlayTab }
							onSelect={ onOverlayTabSelect }
							tabs={ [
								{
									name: 'normal',
									title: __( 'Normal' ),
									className: 'kt-over-normal',
								},
								{
									name: 'grad',
									title: __( 'Gradient' ),
									className: 'kt-over-grad',
								},
							] }>
							{
								( tab ) => {
									let tabout;
									if ( tab.name ) {
										if ( 'grad' === tab.name ) {
											tabout = overGradControls;
										} else {
											tabout = overControls;
										}
									}
									return <div>{ tabout }</div>;
								}
							}
						</TabPanel>
					</PanelBody>
				) }
			</Fragment>
		);
		const overControls = (
			<Fragment>
				<RangeControl
					label={ __( 'Overlay Opacity' ) }
					value={ overlayOpacity }
					onChange={ ( value ) => {
						setAttributes( {
							overlayOpacity: value,
						} );
					} }
					min={ 0 }
					max={ 100 }
				/>
				<AdvancedColorControl
					label={ __( 'Overlay Color' ) }
					colorValue={ ( overlay ? overlay : '' ) }
					colorDefault={ '' }
					onColorChange={ value => setAttributes( {overlay: value } ) }
				/>
				<MediaUpload
					onSelect={ onSelectOverlayImage }
					type="image"
					value={ overlayBgImgID }
					render={ ( { open } ) => (
						<Button
							className={ 'components-button components-icon-button kt-cta-upload-btn' }
							onClick={ open }
						>
							<Dashicon icon="format-image" />
							{ __( 'Select Image' ) }
						</Button>
					) }
				/>
				{ overlayBgImg && (
					<Fragment>
						<Tooltip text={ __( 'Remove Image' ) }>
							<Button
								className={ 'components-button components-icon-button kt-remove-img kt-cta-upload-btn' }
								onClick={ onRemoveOverlayImage }
							>
								<Dashicon icon="no-alt" />
							</Button>
						</Tooltip>
						<SelectControl
							label={ __( 'Background Image Size' ) }
							value={ overlayBgImgSize }
							options={ [
								{ value: 'cover', label: __( 'Cover' ) },
								{ value: 'contain', label: __( 'Contain' ) },
								{ value: 'auto', label: __( 'Auto' ) },
							] }
							onChange={ value => setAttributes( { overlayBgImgSize: value } ) }
						/>
						<SelectControl
							label={ __( 'Background Image Position' ) }
							value={ overlayBgImgPosition }
							options={ [
								{ value: 'center top', label: __( 'Center Top' ) },
								{ value: 'center center', label: __( 'Center Center' ) },
								{ value: 'center bottom', label: __( 'Center Bottom' ) },
								{ value: 'left top', label: __( 'Left Top' ) },
								{ value: 'left center', label: __( 'Left Center' ) },
								{ value: 'left bottom', label: __( 'Left Bottom' ) },
								{ value: 'right top', label: __( 'Right Top' ) },
								{ value: 'right center', label: __( 'Right Center' ) },
								{ value: 'right bottom', label: __( 'Right Bottom' ) },
							] }
							onChange={ value => setAttributes( { overlayBgImgPosition: value } ) }
						/>
						<SelectControl
							label={ __( 'Background Image Repeat' ) }
							value={ overlayBgImgRepeat }
							options={ [
								{ value: 'no-repeat', label: __( 'No Repeat' ) },
								{ value: 'repeat', label: __( 'Repeat' ) },
								{ value: 'repeat-x', label: __( 'Repeat-x' ) },
								{ value: 'repeat-y', label: __( 'Repeat-y' ) },
							] }
							onChange={ value => setAttributes( { overlayBgImgRepeat: value } ) }
						/>
						<SelectControl
							label={ __( 'Background Image Attachment' ) }
							value={ overlayBgImgAttachment }
							options={ [
								{ value: 'scroll', label: __( 'Scroll' ) },
								{ value: 'fixed', label: __( 'Fixed' ) },
								{ value: 'parallax', label: __( 'Parallax' ) },
							] }
							onChange={ value => setAttributes( { overlayBgImgAttachment: value } ) }
						/>
					</Fragment>
				) }
				<SelectControl
					label={ __( 'Blend Mode' ) }
					value={ overlayBlendMode }
					options={ [
						{ value: 'normal', label: __( 'Normal' ) },
						{ value: 'multiply', label: __( 'Multiply' ) },
						{ value: 'screen', label: __( 'Screen' ) },
						{ value: 'overlay', label: __( 'Overlay' ) },
						{ value: 'darken', label: __( 'Darken' ) },
						{ value: 'lighten', label: __( 'Lighten' ) },
						{ value: 'color-dodge', label: __( 'Color Dodge' ) },
						{ value: 'color-burn', label: __( 'Color Burn' ) },
						{ value: 'difference', label: __( 'Difference' ) },
						{ value: 'exclusion', label: __( 'Exclusion' ) },
						{ value: 'hue', label: __( 'Hue' ) },
						{ value: 'saturation', label: __( 'Saturation' ) },
						{ value: 'color', label: __( 'Color' ) },
						{ value: 'luminosity', label: __( 'Luminosity' ) },

					] }
					onChange={ value => setAttributes( { overlayBlendMode: value } ) }
				/>
				<p>{ __( 'Notice: Blend Mode not supported in all browsers' ) }</p>
			</Fragment>
		);
		const overGradControls = (
			<div>
				<RangeControl
					label={ __( 'Overlay Opacity' ) }
					value={ overlayOpacity }
					onChange={ ( value ) => {
						setAttributes( {
							overlayOpacity: value,
						} );
					} }
					min={ 0 }
					max={ 100 }
				/>
				<AdvancedColorControl
					label={ __( 'Color' ) }
					colorValue={ ( overlay ? overlay : '' ) }
					colorDefault={ '' }
					onColorChange={ value => setAttributes( { overlay: value } ) }
				/>
				<RangeControl
					label={ __( 'Location' ) }
					value={ overlayGradLoc }
					onChange={ ( value ) => {
						setAttributes( {
							overlayGradLoc: value,
						} );
					} }
					min={ 0 }
					max={ 100 }
				/>
				<AdvancedColorControl
					label={ __( 'Second Color' ) }
					colorValue={ ( overlaySecond ? overlaySecond : '' ) }
					colorDefault={ '' }
					onColorChange={ value => setAttributes( { overlaySecond: value } ) }
				/>
				<RangeControl
					label={ __( 'Location' ) }
					value={ overlayGradLocSecond }
					onChange={ ( value ) => {
						setAttributes( {
							overlayGradLocSecond: value,
						} );
					} }
					min={ 0 }
					max={ 100 }
				/>
				<SelectControl
					label={ __( 'Gradient Type' ) }
					value={ overlayGradType }
					options={ [
						{ value: 'linear', label: __( 'Linear' ) },
						{ value: 'radial', label: __( 'Radial' ) },
					] }
					onChange={ value => setAttributes( { overlayGradType: value } ) }
				/>
				{ overlayGradType && 'linear' === overlayGradType && (
					<RangeControl
						label={ __( 'Gradient Angle' ) }
						value={ overlayGradAngle }
						onChange={ ( value ) => {
							setAttributes( {
								overlayGradAngle: value,
							} );
						} }
						min={ 0 }
						max={ 360 }
					/>
				) }
				{ overlayGradType && 'radial' === overlayGradType && (
					<SelectControl
						label={ __( 'Gradient Position' ) }
						value={ overlayBgImgPosition }
						options={ [
							{ value: 'center top', label: __( 'Center Top' ) },
							{ value: 'center center', label: __( 'Center Center' ) },
							{ value: 'center bottom', label: __( 'Center Bottom' ) },
							{ value: 'left top', label: __( 'Left Top' ) },
							{ value: 'left center', label: __( 'Left Center' ) },
							{ value: 'left bottom', label: __( 'Left Bottom' ) },
							{ value: 'right top', label: __( 'Right Top' ) },
							{ value: 'right center', label: __( 'Right Center' ) },
							{ value: 'right bottom', label: __( 'Right Bottom' ) },
						] }
						onChange={ value => setAttributes( { overlayBgImgPosition: value } ) }
					/>
				) }
				<SelectControl
					label={ __( 'Blend Mode' ) }
					value={ overlayBlendMode }
					options={ [
						{ value: 'normal', label: __( 'Normal' ) },
						{ value: 'multiply', label: __( 'Multiply' ) },
						{ value: 'screen', label: __( 'Screen' ) },
						{ value: 'overlay', label: __( 'Overlay' ) },
						{ value: 'darken', label: __( 'Darken' ) },
						{ value: 'lighten', label: __( 'Lighten' ) },
						{ value: 'color-dodge', label: __( 'Color Dodge' ) },
						{ value: 'color-burn', label: __( 'Color Burn' ) },
						{ value: 'difference', label: __( 'Difference' ) },
						{ value: 'exclusion', label: __( 'Exclusion' ) },
						{ value: 'hue', label: __( 'Hue' ) },
						{ value: 'saturation', label: __( 'Saturation' ) },
						{ value: 'color', label: __( 'Color' ) },
						{ value: 'luminosity', label: __( 'Luminosity' ) },

					] }
					onChange={ value => setAttributes( { overlayBlendMode: value } ) }
				/>
				<p>{ __( 'Notice: Blend Mode not supported in all browsers' ) }</p>
			</div>
		);
		const overTabControls = (
			<div>
				<RangeControl
					label={ __( 'Overlay Opacity' ) }
					value={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].overlayOpacity : 30 ) }
					onChange={ ( value ) => {
						saveTabletOverlay( {
							overlayOpacity: value,
						} );
					} }
					min={ 0 }
					max={ 100 }
				/>
				<AdvancedColorControl
					label={ __( 'Overlay Color' ) }
					colorValue={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].overlay : '' ) }
					colorDefault={ '' }
					onColorChange={ value => saveTabletOverlay( { overlay: value } ) }
				/>
				<MediaUpload
					onSelect={ value => saveTabletOverlay( { overlayBgImg: value.url, overlayBgImgID: value.id } ) }
					type="image"
					value={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].overlayBgImgID : '' ) }
					render={ ( { open } ) => (
						<Button
							className={ 'components-button components-icon-button kt-cta-upload-btn' }
							onClick={ open }
						>
							<Dashicon icon="format-image" />
							{ __( 'Select Image' ) }
						</Button>
					) }
				/>
				{ tabletOverlay && tabletOverlay[ 0 ] && tabletOverlay[ 0 ].overlayBgImg && (
					<Tooltip text={ __( 'Remove Image' ) }>
						<Button
							className={ 'components-button components-icon-button kt-remove-img kt-cta-upload-btn' }
							onClick={ onRemoveTabletOverlayImage }
						>
							<Dashicon icon="no-alt" />
						</Button>
					</Tooltip>
				) }
				<SelectControl
					label={ __( 'Background Image Size' ) }
					value={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].overlayBgImgSize : 'cover' ) }
					options={ [
						{ value: 'cover', label: __( 'Cover' ) },
						{ value: 'contain', label: __( 'Contain' ) },
						{ value: 'auto', label: __( 'Auto' ) },
					] }
					onChange={ value => saveTabletOverlay( { overlayBgImgSize: value } ) }
				/>
				<SelectControl
					label={ __( 'Background Image Position' ) }
					value={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].overlayBgImgPosition : 'center center' ) }
					options={ [
						{ value: 'center top', label: __( 'Center Top' ) },
						{ value: 'center center', label: __( 'Center Center' ) },
						{ value: 'center bottom', label: __( 'Center Bottom' ) },
						{ value: 'left top', label: __( 'Left Top' ) },
						{ value: 'left center', label: __( 'Left Center' ) },
						{ value: 'left bottom', label: __( 'Left Bottom' ) },
						{ value: 'right top', label: __( 'Right Top' ) },
						{ value: 'right center', label: __( 'Right Center' ) },
						{ value: 'right bottom', label: __( 'Right Bottom' ) },
					] }
					onChange={ value => saveTabletOverlay( { overlayBgImgPosition: value } ) }
				/>
				<SelectControl
					label={ __( 'Background Image Repeat' ) }
					value={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].overlayBgImgRepeat : 'no-repeat' ) }
					options={ [
						{ value: 'no-repeat', label: __( 'No Repeat' ) },
						{ value: 'repeat', label: __( 'Repeat' ) },
						{ value: 'repeat-x', label: __( 'Repeat-x' ) },
						{ value: 'repeat-y', label: __( 'Repeat-y' ) },
					] }
					onChange={ value => saveTabletOverlay( { overlayBgImgRepeat: value } ) }
				/>
				<SelectControl
					label={ __( 'Background Image Attachment' ) }
					value={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].overlayBgImgAttachment : 'scroll' ) }
					options={ [
						{ value: 'scroll', label: __( 'Scroll' ) },
						{ value: 'fixed', label: __( 'Fixed' ) },
						{ value: 'parallax', label: __( 'Parallax' ) },
					] }
					onChange={ value => saveTabletOverlay( { overlayBgImgAttachment: value } ) }
				/>
				<SelectControl
					label={ __( 'Blend Mode' ) }
					value={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].overlayBlendMode : 'none' ) }
					options={ [
						{ value: 'normal', label: __( 'Normal' ) },
						{ value: 'multiply', label: __( 'Multiply' ) },
						{ value: 'screen', label: __( 'Screen' ) },
						{ value: 'overlay', label: __( 'Overlay' ) },
						{ value: 'darken', label: __( 'Darken' ) },
						{ value: 'lighten', label: __( 'Lighten' ) },
						{ value: 'color-dodge', label: __( 'Color Dodge' ) },
						{ value: 'color-burn', label: __( 'Color Burn' ) },
						{ value: 'difference', label: __( 'Difference' ) },
						{ value: 'exclusion', label: __( 'Exclusion' ) },
						{ value: 'hue', label: __( 'Hue' ) },
						{ value: 'saturation', label: __( 'Saturation' ) },
						{ value: 'color', label: __( 'Color' ) },
						{ value: 'luminosity', label: __( 'Luminosity' ) },

					] }
					onChange={ value => saveTabletOverlay( { overlayBlendMode: value } ) }
				/>
				<p>{ __( 'Notice: Blend Mode not supported in all browsers' ) }</p>
			</div>
		);
		const overTabGradControls = (
			<div>
				<RangeControl
					label={ __( 'Overlay Opacity' ) }
					value={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].overlayOpacity : 30 ) }
					onChange={ ( value ) => {
						saveTabletOverlay( {
							overlayOpacity: value,
						} );
					} }
					min={ 0 }
					max={ 100 }
				/>
				<AdvancedColorControl
					label={ __( 'Color' ) }
					colorValue={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].overlay : '' ) }
					colorDefault={ '' }
					onColorChange={ value => saveTabletOverlay( { overlay: value } ) }
				/>
				<RangeControl
					label={ __( 'Location' ) }
					value={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].overlayGradLoc : 0 ) }
					onChange={ ( value ) => {
						saveTabletOverlay( {
							overlayGradLoc: value,
						} );
					} }
					min={ 0 }
					max={ 100 }
				/>
				<AdvancedColorControl
					label={ __( 'Second Color' ) }
					colorValue={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].overlaySecond : '' ) }
					colorDefault={ '' }
					onColorChange={ value => saveTabletOverlay( { overlaySecond: value } ) }
				/>
				<RangeControl
					label={ __( 'Location' ) }
					value={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].overlayGradLocSecond : 100 ) }
					onChange={ ( value ) => {
						saveTabletOverlay( {
							overlayGradLocSecond: value,
						} );
					} }
					min={ 0 }
					max={ 100 }
				/>
				<SelectControl
					label={ __( 'Gradient Type' ) }
					value={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].overlayGradType : 'linear' ) }
					options={ [
						{ value: 'linear', label: __( 'Linear' ) },
						{ value: 'radial', label: __( 'Radial' ) },
					] }
					onChange={ value => saveTabletOverlay( { overlayGradType: value } ) }
				/>
				{ tabletOverlay && tabletOverlay[ 0 ] && tabletOverlay[ 0 ].overlayGradType && 'linear' === tabletOverlay[ 0 ].overlayGradType && (
					<RangeControl
						label={ __( 'Gradient Angle' ) }
						value={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].overlayGradAngle : 180 ) }
						onChange={ ( value ) => {
							saveTabletOverlay( {
								overlayGradAngle: value,
							} );
						} }
						min={ 0 }
						max={ 360 }
					/>
				) }
				{ tabletOverlay && tabletOverlay[ 0 ] && tabletOverlay[ 0 ].overlayGradType && 'radial' === tabletOverlay[ 0 ].overlayGradType && (
					<SelectControl
						label={ __( 'Gradient Position' ) }
						value={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].overlayBgImgPosition : 'center center' ) }
						options={ [
							{ value: 'center top', label: __( 'Center Top' ) },
							{ value: 'center center', label: __( 'Center Center' ) },
							{ value: 'center bottom', label: __( 'Center Bottom' ) },
							{ value: 'left top', label: __( 'Left Top' ) },
							{ value: 'left center', label: __( 'Left Center' ) },
							{ value: 'left bottom', label: __( 'Left Bottom' ) },
							{ value: 'right top', label: __( 'Right Top' ) },
							{ value: 'right center', label: __( 'Right Center' ) },
							{ value: 'right bottom', label: __( 'Right Bottom' ) },
						] }
						onChange={ value => saveTabletOverlay( { overlayBgImgPosition: value } ) }
					/>
				) }
				<SelectControl
					label={ __( 'Blend Mode' ) }
					value={ ( tabletOverlay && tabletOverlay[ 0 ] ? tabletOverlay[ 0 ].overlayBlendMode : 'none' ) }
					options={ [
						{ value: 'normal', label: __( 'Normal' ) },
						{ value: 'multiply', label: __( 'Multiply' ) },
						{ value: 'screen', label: __( 'Screen' ) },
						{ value: 'overlay', label: __( 'Overlay' ) },
						{ value: 'darken', label: __( 'Darken' ) },
						{ value: 'lighten', label: __( 'Lighten' ) },
						{ value: 'color-dodge', label: __( 'Color Dodge' ) },
						{ value: 'color-burn', label: __( 'Color Burn' ) },
						{ value: 'difference', label: __( 'Difference' ) },
						{ value: 'exclusion', label: __( 'Exclusion' ) },
						{ value: 'hue', label: __( 'Hue' ) },
						{ value: 'saturation', label: __( 'Saturation' ) },
						{ value: 'color', label: __( 'Color' ) },
						{ value: 'luminosity', label: __( 'Luminosity' ) },

					] }
					onChange={ value => saveTabletOverlay( { overlayBlendMode: value } ) }
				/>
				<p>{ __( 'Notice: Blend Mode not supported in all browsers' ) }</p>
			</div>
		);
		const overMobileControls = (
			<div>
				<RangeControl
					label={ __( 'Overlay Opacity' ) }
					value={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].overlayOpacity : 30 ) }
					onChange={ ( value ) => {
						saveMobileOverlay( {
							overlayOpacity: value,
						} );
					} }
					min={ 0 }
					max={ 100 }
				/>
				<AdvancedColorControl
					label={ __( 'Overlay Color' ) }
					colorValue={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].overlay : '' ) }
					colorDefault={ '' }
					onColorChange={ value => saveMobileOverlay( { overlay: value } ) }
				/>
				<MediaUpload
					onSelect={ value => saveMobileOverlay( { overlayBgImg: value.url, overlayBgImgID: value.id } ) }
					type="image"
					value={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].overlayBgImgID : '' ) }
					render={ ( { open } ) => (
						<Button
							className={ 'components-button components-icon-button kt-cta-upload-btn' }
							onClick={ open }
						>
							<Dashicon icon="format-image" />
							{ __( 'Select Image' ) }
						</Button>
					) }
				/>
				{ mobileOverlay && mobileOverlay[ 0 ] && mobileOverlay[ 0 ].overlayBgImg && (
					<Tooltip text={ __( 'Remove Image' ) }>
						<Button
							className={ 'components-button components-icon-button kt-remove-img kt-cta-upload-btn' }
							onClick={ onRemoveMobileOverlayImage }
						>
							<Dashicon icon="no-alt" />
						</Button>
					</Tooltip>
				) }
				<SelectControl
					label={ __( 'Background Image Size' ) }
					value={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].overlayBgImgSize : 'cover' ) }
					options={ [
						{ value: 'cover', label: __( 'Cover' ) },
						{ value: 'contain', label: __( 'Contain' ) },
						{ value: 'auto', label: __( 'Auto' ) },
					] }
					onChange={ value => saveMobileOverlay( { overlayBgImgSize: value } ) }
				/>
				<SelectControl
					label={ __( 'Background Image Position' ) }
					value={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].overlayBgImgPosition : 'center center' ) }
					options={ [
						{ value: 'center top', label: __( 'Center Top' ) },
						{ value: 'center center', label: __( 'Center Center' ) },
						{ value: 'center bottom', label: __( 'Center Bottom' ) },
						{ value: 'left top', label: __( 'Left Top' ) },
						{ value: 'left center', label: __( 'Left Center' ) },
						{ value: 'left bottom', label: __( 'Left Bottom' ) },
						{ value: 'right top', label: __( 'Right Top' ) },
						{ value: 'right center', label: __( 'Right Center' ) },
						{ value: 'right bottom', label: __( 'Right Bottom' ) },
					] }
					onChange={ value => saveMobileOverlay( { overlayBgImgPosition: value } ) }
				/>
				<SelectControl
					label={ __( 'Background Image Repeat' ) }
					value={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].overlayBgImgRepeat : 'no-repeat' ) }
					options={ [
						{ value: 'no-repeat', label: __( 'No Repeat' ) },
						{ value: 'repeat', label: __( 'Repeat' ) },
						{ value: 'repeat-x', label: __( 'Repeat-x' ) },
						{ value: 'repeat-y', label: __( 'Repeat-y' ) },
					] }
					onChange={ value => saveMobileOverlay( { overlayBgImgRepeat: value } ) }
				/>
				<SelectControl
					label={ __( 'Background Image Attachment' ) }
					value={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].overlayBgImgAttachment : 'scroll' ) }
					options={ [
						{ value: 'scroll', label: __( 'Scroll' ) },
						{ value: 'fixed', label: __( 'Fixed' ) },
						{ value: 'parallax', label: __( 'Parallax' ) },
					] }
					onChange={ value => saveMobileOverlay( { overlayBgImgAttachment: value } ) }
				/>
				<SelectControl
					label={ __( 'Blend Mode' ) }
					value={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].overlayBlendMode : 'none' ) }
					options={ [
						{ value: 'normal', label: __( 'Normal' ) },
						{ value: 'multiply', label: __( 'Multiply' ) },
						{ value: 'screen', label: __( 'Screen' ) },
						{ value: 'overlay', label: __( 'Overlay' ) },
						{ value: 'darken', label: __( 'Darken' ) },
						{ value: 'lighten', label: __( 'Lighten' ) },
						{ value: 'color-dodge', label: __( 'Color Dodge' ) },
						{ value: 'color-burn', label: __( 'Color Burn' ) },
						{ value: 'difference', label: __( 'Difference' ) },
						{ value: 'exclusion', label: __( 'Exclusion' ) },
						{ value: 'hue', label: __( 'Hue' ) },
						{ value: 'saturation', label: __( 'Saturation' ) },
						{ value: 'color', label: __( 'Color' ) },
						{ value: 'luminosity', label: __( 'Luminosity' ) },

					] }
					onChange={ value => saveMobileOverlay( { overlayBlendMode: value } ) }
				/>
				<p>{ __( 'Notice: Blend Mode not supported in all browsers' ) }</p>
			</div>
		);
		const overMobileGradControls = (
			<div>
				<RangeControl
					label={ __( 'Overlay Opacity' ) }
					value={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].overlayOpacity : 30 ) }
					onChange={ ( value ) => {
						saveMobileOverlay( {
							overlayOpacity: value,
						} );
					} }
					min={ 0 }
					max={ 100 }
				/>
				<AdvancedColorControl
					label={ __( 'Color' ) }
					colorValue={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].overlay : '' ) }
					colorDefault={ '' }
					onColorChange={ value => saveMobileOverlay( { overlay: value } ) }
				/>
				<RangeControl
					label={ __( 'Location' ) }
					value={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].overlayGradLoc : 0 ) }
					onChange={ ( value ) => {
						saveMobileOverlay( {
							overlayGradLoc: value,
						} );
					} }
					min={ 0 }
					max={ 100 }
				/>
				<AdvancedColorControl
					label={ __( 'Second Color' ) }
					colorValue={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].overlaySecond : '' ) }
					colorDefault={ '' }
					onColorChange={ value => saveMobileOverlay( { overlaySecond: value } ) }
				/>
				<RangeControl
					label={ __( 'Location' ) }
					value={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].overlayGradLocSecond : 100 ) }
					onChange={ ( value ) => {
						saveMobileOverlay( {
							overlayGradLocSecond: value,
						} );
					} }
					min={ 0 }
					max={ 100 }
				/>
				<SelectControl
					label={ __( 'Gradient Type' ) }
					value={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].overlayGradType : 'linear' ) }
					options={ [
						{ value: 'linear', label: __( 'Linear' ) },
						{ value: 'radial', label: __( 'Radial' ) },
					] }
					onChange={ value => saveMobileOverlay( { overlayGradType: value } ) }
				/>
				{ mobileOverlay && mobileOverlay[ 0 ] && mobileOverlay[ 0 ].overlayGradType && 'linear' === mobileOverlay[ 0 ].overlayGradType && (
					<RangeControl
						label={ __( 'Gradient Angle' ) }
						value={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].overlayGradAngle : 180 ) }
						onChange={ ( value ) => {
							saveMobileOverlay( {
								overlayGradAngle: value,
							} );
						} }
						min={ 0 }
						max={ 360 }
					/>
				) }
				{ mobileOverlay && mobileOverlay[ 0 ] && mobileOverlay[ 0 ].overlayGradType && 'radial' === mobileOverlay[ 0 ].overlayGradType && (
					<SelectControl
						label={ __( 'Gradient Position' ) }
						value={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].overlayBgImgPosition : 'center center' ) }
						options={ [
							{ value: 'center top', label: __( 'Center Top' ) },
							{ value: 'center center', label: __( 'Center Center' ) },
							{ value: 'center bottom', label: __( 'Center Bottom' ) },
							{ value: 'left top', label: __( 'Left Top' ) },
							{ value: 'left center', label: __( 'Left Center' ) },
							{ value: 'left bottom', label: __( 'Left Bottom' ) },
							{ value: 'right top', label: __( 'Right Top' ) },
							{ value: 'right center', label: __( 'Right Center' ) },
							{ value: 'right bottom', label: __( 'Right Bottom' ) },
						] }
						onChange={ value => saveMobileOverlay( { overlayBgImgPosition: value } ) }
					/>
				) }
				<SelectControl
					label={ __( 'Blend Mode' ) }
					value={ ( mobileOverlay && mobileOverlay[ 0 ] ? mobileOverlay[ 0 ].overlayBlendMode : 'none' ) }
					options={ [
						{ value: 'normal', label: __( 'Normal' ) },
						{ value: 'multiply', label: __( 'Multiply' ) },
						{ value: 'screen', label: __( 'Screen' ) },
						{ value: 'overlay', label: __( 'Overlay' ) },
						{ value: 'darken', label: __( 'Darken' ) },
						{ value: 'lighten', label: __( 'Lighten' ) },
						{ value: 'color-dodge', label: __( 'Color Dodge' ) },
						{ value: 'color-burn', label: __( 'Color Burn' ) },
						{ value: 'difference', label: __( 'Difference' ) },
						{ value: 'exclusion', label: __( 'Exclusion' ) },
						{ value: 'hue', label: __( 'Hue' ) },
						{ value: 'saturation', label: __( 'Saturation' ) },
						{ value: 'color', label: __( 'Color' ) },
						{ value: 'luminosity', label: __( 'Luminosity' ) },

					] }
					onChange={ value => saveMobileOverlay( { overlayBlendMode: value } ) }
				/>
				<p>{ __( 'Notice: Blend Mode not supported in all browsers' ) }</p>
			</div>
		);
		const colorControls = (
			<PanelBody
				title={ __( 'Text Color Settings' ) }
				initialOpen={ false }
			>
				<AdvancedColorControl
					label={ __( 'Text Color' ) }
					colorValue={ ( textColor ? textColor : '' ) }
					colorDefault={ '' }
					onColorChange={ value => setAttributes( { textColor: value } ) }
				/>
				<AdvancedColorControl
					label={ __( 'Link Color' ) }
					colorValue={ ( linkColor ? linkColor : '' ) }
					colorDefault={ '' }
					onColorChange={ value => setAttributes( { linkColor: value } ) }
				/>
				<AdvancedColorControl
					label={ __( 'Link Hover Color' ) }
					colorValue={ ( linkHoverColor ? linkHoverColor : '' ) }
					colorDefault={ '' }
					onColorChange={ value => setAttributes( { linkHoverColor: value } ) }
				/>
			</PanelBody>
		);
		const tabControls = (
			<TabPanel className="kt-inspect-tabs"
				activeClass="active-tab"
				initialTabName={ currentTab }
				onSelect={ onTabSelect }
				tabs={ [
					{
						name: 'desk',
						title: <Dashicon icon="desktop" />,
						className: 'kt-desk-tab',
					},
					{
						name: 'tablet',
						title: <Dashicon icon="tablet" />,
						className: 'kt-tablet-tab',
					},
					{
						name: 'mobile',
						title: <Dashicon icon="smartphone" />,
						className: 'kt-mobile-tab',
					},
				] }>
				{
					( tab ) => {
						let tabout;
						if ( tab.name ) {
							if ( 'mobile' === tab.name ) {
								tabout = mobileControls;
							} else if ( 'tablet' === tab.name ) {
								tabout = tabletControls;
							} else {
								tabout = deskControls;
							}
						}
						return <div>{ tabout }</div>;
					}
				}
			</TabPanel>
		);
		const bottomSepSizesMobile = (
			<Fragment>
				<RangeControl
					label={ __( 'Mobile Height (px)' ) }
					value={ ( bottomSepHeightMobile ? bottomSepHeightMobile : '' ) }
					onChange={ ( value ) => {
						setAttributes( {
							bottomSepHeightMobile: value,
						} );
					} }
					min={ 0 }
					max={ 500 }
				/>
				<RangeControl
					label={ __( 'Mobile Width (%)' ) }
					value={ ( bottomSepWidthMobile ? bottomSepWidthMobile : '' ) }
					onChange={ ( value ) => {
						setAttributes( {
							bottomSepWidthMobile: value,
						} );
					} }
					min={ 100 }
					max={ 400 }
				/>
			</Fragment>
		);
		const bottomSepSizesTablet = (
			<Fragment>
				<RangeControl
					label={ __( 'Tablet Height (px)' ) }
					value={ ( bottomSepHeightTab ? bottomSepHeightTab : '' ) }
					onChange={ ( value ) => {
						setAttributes( {
							bottomSepHeightTab: value,
						} );
					} }
					min={ 0 }
					max={ 500 }
				/>
				<RangeControl
					label={ __( 'Tablet Width (%)' ) }
					value={ ( bottomSepWidthTab ? bottomSepWidthTab : '' ) }
					onChange={ ( value ) => {
						setAttributes( {
							bottomSepWidthTab: value,
						} );
					} }
					min={ 100 }
					max={ 400 }
				/>
			</Fragment>
		);
		const bottomSepSizes = (
			<Fragment>
				<RangeControl
					label={ __( 'Divider Height (px)' ) }
					value={ bottomSepHeight }
					onChange={ ( value ) => {
						setAttributes( {
							bottomSepHeight: value,
						} );
					} }
					min={ 0 }
					max={ 500 }
				/>
				<RangeControl
					label={ __( 'Divider Width (%)' ) }
					value={ ( bottomSepWidth ? bottomSepWidth : '' ) }
					onChange={ ( value ) => {
						setAttributes( {
							bottomSepWidth: value,
						} );
					} }
					min={ 100 }
					max={ 400 }
				/>
			</Fragment>
		);
		const topSepSizesMobile = (
			<Fragment>
				<RangeControl
					label={ __( 'Mobile Height (px)' ) }
					value={ ( topSepHeightMobile ? topSepHeightMobile : '' ) }
					onChange={ ( value ) => {
						setAttributes( {
							topSepHeightMobile: value,
						} );
					} }
					min={ 0 }
					max={ 500 }
				/>
				<RangeControl
					label={ __( 'Mobile Width (%)' ) }
					value={ ( topSepWidthMobile ? topSepWidthMobile : '' ) }
					onChange={ ( value ) => {
						setAttributes( {
							topSepWidthMobile: value,
						} );
					} }
					min={ 100 }
					max={ 400 }
				/>
			</Fragment>
		);
		const topSepSizesTablet = (
			<Fragment>
				<RangeControl
					label={ __( 'Tablet Height (px)' ) }
					value={ ( topSepHeightTab ? topSepHeightTab : '' ) }
					onChange={ ( value ) => {
						setAttributes( {
							topSepHeightTab: value,
						} );
					} }
					min={ 0 }
					max={ 500 }
				/>
				<RangeControl
					label={ __( 'Tablet Width (%)' ) }
					value={ ( topSepWidthTab ? topSepWidthTab : '' ) }
					onChange={ ( value ) => {
						setAttributes( {
							topSepWidthTab: value,
						} );
					} }
					min={ 100 }
					max={ 400 }
				/>
			</Fragment>
		);
		const topSepSizes = (
			<Fragment>
				<RangeControl
					label={ __( 'Divider Height (px)' ) }
					value={ topSepHeight }
					onChange={ ( value ) => {
						setAttributes( {
							topSepHeight: value,
						} );
					} }
					min={ 0 }
					max={ 500 }
				/>
				<RangeControl
					label={ __( 'Divider Width (%)' ) }
					value={ ( topSepWidth ? topSepWidth : '' ) }
					onChange={ ( value ) => {
						setAttributes( {
							topSepWidth: value,
						} );
					} }
					min={ 100 }
					max={ 400 }
				/>
			</Fragment>
		);
		const topDividerSettings = (
			<Fragment>
				<FontIconPicker
					icons={ [
						'ct',
						'cti',
						'ctd',
						'ctdi',
						'sltl',
						'sltr',
						'crv',
						'crvi',
						'crvl',
						'crvli',
						'crvr',
						'crvri',
						'wave',
						'wavei',
						'waves',
						'wavesi',
						'mtns',
						'littri',
						'littrii',
					] }
					value={ ( topSep === 'none' ? '' : topSep ) }
					onChange={ value => setAttributes( { topSep: value } ) }
					appendTo="body"
					showSearch={ false }
					renderFunc={ renderTopSVGDivider }
					theme="dividers"
					noSelectedPlaceholder={ __( 'Select Divider' ) }
					isMulti={ false }
				/>
				<AdvancedColorControl
					label={ __( 'Divider Color' ) }
					colorValue={ ( topSepColor ? topSepColor : '' ) }
					colorDefault={ '' }
					onColorChange={ value => setAttributes( { topSepColor: value } ) }
				/>
				<h2 className="kt-heading-size-title">{ __( 'Size Controls' ) }</h2>
				<TabPanel className="kt-size-tabs"
					activeClass="active-tab"
					tabs={ [
						{
							name: 'desk',
							title: <Dashicon icon="desktop" />,
							className: 'kt-desk-tab',
						},
						{
							name: 'tablet',
							title: <Dashicon icon="tablet" />,
							className: 'kt-tablet-tab',
						},
						{
							name: 'mobile',
							title: <Dashicon icon="smartphone" />,
							className: 'kt-mobile-tab',
						},
					] }>
					{
						( tab ) => {
							let tabout;
							if ( tab.name ) {
								if ( 'mobile' === tab.name ) {
									tabout = topSepSizesMobile;
								} else if ( 'tablet' === tab.name ) {
									tabout = topSepSizesTablet;
								} else {
									tabout = topSepSizes;
								}
							}
							return <div>{ tabout }</div>;
						}
					}
				</TabPanel>
			</Fragment>
		);
		const bottomDividerSettings = (
			<Fragment>
				<FontIconPicker
					icons={ [
						'ct',
						'cti',
						'ctd',
						'ctdi',
						'sltl',
						'sltr',
						'crv',
						'crvi',
						'crvl',
						'crvli',
						'crvr',
						'crvri',
						'wave',
						'wavei',
						'waves',
						'wavesi',
						'mtns',
						'littri',
						'littrii',
					] }
					value={ ( bottomSep === 'none' ? '' : bottomSep ) }
					onChange={ value => setAttributes( { bottomSep: value } ) }
					appendTo="body"
					showSearch={ false }
					renderFunc={ renderBottomSVGDivider }
					theme="dividers"
					noSelectedPlaceholder={ __( 'Select Divider' ) }
					isMulti={ false }
				/>
				<AdvancedColorControl
					label={ __( 'Divider Color' ) }
					colorValue={ ( bottomSepColor ? bottomSepColor : '' ) }
					colorDefault={ '' }
					onColorChange={ value => setAttributes( { bottomSepColor: value } ) }
				/>
				<h2 className="kt-heading-size-title">{ __( 'Size Controls' ) }</h2>
				<TabPanel className="kt-size-tabs"
					activeClass="active-tab"
					tabs={ [
						{
							name: 'desk',
							title: <Dashicon icon="desktop" />,
							className: 'kt-desk-tab',
						},
						{
							name: 'tablet',
							title: <Dashicon icon="tablet" />,
							className: 'kt-tablet-tab',
						},
						{
							name: 'mobile',
							title: <Dashicon icon="smartphone" />,
							className: 'kt-mobile-tab',
						},
					] }>
					{
						( tab ) => {
							let tabout;
							if ( tab.name ) {
								if ( 'mobile' === tab.name ) {
									tabout = bottomSepSizesMobile;
								} else if ( 'tablet' === tab.name ) {
									tabout = bottomSepSizesTablet;
								} else {
									tabout = bottomSepSizes;
								}
							}
							return <div>{ tabout }</div>;
						}
					}
				</TabPanel>
			</Fragment>
		);
		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ blockAlignment }
						controls={ [ 'center', 'wide', 'full' ] }
						onChange={ value => setAttributes( { blockAlignment: value } ) }
					/>
					{ this.showSettings( 'allSettings' ) && this.showSettings( 'background' ) && (
						<Toolbar>
							<MediaUpload
								onSelect={ onSelectImage }
								type="image"
								value={ null }
								render={ ( { open } ) => (
									<IconButton
										className="components-toolbar__control"
										label={ __( 'Background Image' ) }
										icon="format-image"
										onClick={ open }
									/>
								) }
							/>
						</Toolbar>
					) }
					<Toolbar>
						<Tooltip text={ __( 'Vertical Align Top' ) }>
							<Button
								className={ classnames(
									'components-icon-button',
									'components-toolbar__control',
									{ 'is-active': verticalAlignment === 'top' },
								) }
								onClick={ () => setAttributes( { verticalAlignment: 'top' } ) }
							>
								{ icons.aligntop }
							</Button>
						</Tooltip>
					</Toolbar>
					<Toolbar>
						<Tooltip text={ __( 'Vertical Align Middle' ) }>
							<Button
								className={ classnames(
									'components-icon-button',
									'components-toolbar__control',
									{ 'is-active': verticalAlignment === 'middle' },
								) }
								onClick={ () => setAttributes( { verticalAlignment: 'middle' } ) }
							>
								{ icons.alignmiddle }
							</Button>
						</Tooltip>
					</Toolbar>
					<Toolbar>
						<Tooltip text={ __( 'Vertical Align Bottom' ) }>
							<Button
								className={ classnames(
									'components-icon-button',
									'components-toolbar__control',
									{ 'is-active': verticalAlignment === 'bottom' },
								) }
								onClick={ () => setAttributes( { verticalAlignment: 'bottom' } ) }
							>
								{ icons.alignbottom }
							</Button>
						</Tooltip>
					</Toolbar>
				</BlockControls>
				{ this.showSettings( 'allSettings' ) && (
					<InspectorControls>
						{ tabControls }
						<div className="kt-sidebar-settings-spacer"></div>
						{ this.showSettings( 'dividers' ) && (
							<PanelBody
								title={ __( 'Dividers' ) }
								initialOpen={ false }
							>
								<TabPanel className="kt-inspect-tabs kt-hover-tabs"
									activeClass="active-tab"
									tabs={ [
										{
											name: 'bottomdivider',
											title: __( 'Bottom' ),
											className: 'kt-bottom-tab',
										},
										{
											name: 'topdivider',
											title: __( 'Top' ),
											className: 'kt-top-tab',
										},
									] }>
									{
										( tab ) => {
											let tabout;
											if ( tab.name ) {
												if ( 'topdivider' === tab.name ) {
													tabout = topDividerSettings;
												} else {
													tabout = bottomDividerSettings;
												}
											}
											return <div>{ tabout }</div>;
										}
									}
								</TabPanel>
							</PanelBody>
						) }
						{ this.showSettings( 'textColor' ) && (
							colorControls
						) }
						{ this.showSettings( 'structure' ) && (
							<PanelBody
								title={ __( 'Structure Settings' ) }
								initialOpen={ false }
							>
								<SelectControl
									label={ __( 'Container HTML tag' ) }
									value={ htmlTag }
									options={ [
										{ value: 'div', label: __( 'div' ) },
										{ value: 'header', label: __( 'header' ) },
										{ value: 'section', label: __( 'section' ) },
										{ value: 'article', label: __( 'article' ) },
										{ value: 'main', label: __( 'main' ) },
										{ value: 'aside', label: __( 'aside' ) },
										{ value: 'footer', label: __( 'footer' ) },
									] }
									onChange={ value => setAttributes( { htmlTag: value } ) }
								/>
								<ButtonGroup className="kt-size-type-options" aria-label={ __( 'Min Height Type' ) }>
									{ map( heightTypes, ( { name, key } ) => (
										<Button
											key={ key }
											className="kt-size-btn"
											isSmall
											isPrimary={ minHeightUnit === key }
											aria-pressed={ minHeightUnit === key }
											onClick={ () => setAttributes( { minHeightUnit: key } ) }
										>
											{ name }
										</Button>
									) ) }
								</ButtonGroup>
								<RangeControl
									label={ __( 'Minimium Height' ) }
									value={ minHeight }
									onChange={ ( value ) => {
										setAttributes( {
											minHeight: value,
										} );
									} }
									min={ 0 }
									max={ heightMax }
								/>
								<ButtonGroup className="kt-size-type-options" aria-label={ __( 'Max Width Type' ) }>
									{ map( widthTypes, ( { name, key } ) => (
										<Button
											key={ key }
											className="kt-size-btn"
											isSmall
											isPrimary={ maxWidthUnit === key }
											aria-pressed={ maxWidthUnit === key }
											onClick={ () => setAttributes( { maxWidthUnit: key } ) }
										>
											{ name }
										</Button>
									) ) }
								</ButtonGroup>
								<RangeControl
									label={ __( 'Content Max Width' ) }
									value={ maxWidth }
									onChange={ ( value ) => {
										setAttributes( {
											maxWidth: value,
										} );
									} }
									min={ 0 }
									max={ widthMax }
								/>
								<ToggleControl
									label={ __( 'Inner Column Height 100%' ) }
									checked={ ( undefined !== columnsInnerHeight ? columnsInnerHeight : false ) }
									onChange={ ( value ) => setAttributes( { columnsInnerHeight: value } ) }
								/>
								<RangeControl
									label={ __( 'Z-Index Control' ) }
									value={ zIndex }
									onChange={ ( value ) => {
										setAttributes( {
											zIndex: value,
										} );
									} }
									min={ -200 }
									max={ 2000 }
								/>
							</PanelBody>
						) }
					</InspectorControls>
				) }
				{ ( textColor || linkColor || linkHoverColor || columns ) && (
					<style>
						{ ( textColor ? `#kt-layout-id${ uniqueID }, #kt-layout-id${ uniqueID } p, #kt-layout-id${ uniqueID } h1, #kt-layout-id${ uniqueID } h2, #kt-layout-id${ uniqueID } h3, #kt-layout-id${ uniqueID } h4, #kt-layout-id${ uniqueID } h5, #kt-layout-id${ uniqueID } h6 { color: ${ textColor }; }` : '' ) }
						{ ( linkColor ? `#kt-layout-id${ uniqueID } a { color: ${ linkColor }; }` : '' ) }
						{ ( linkHoverColor ? `#kt-layout-id${ uniqueID } a:hover { color: ${ linkHoverColor }; }` : '' ) }
						{ columns && columns === 2 && (
							<Fragment>
								{ ( firstColumnWidth || temporaryColumnWidth ? `#kt-layout-id${ uniqueID } > .editor-inner-blocks > .editor-block-list__layout > [data-type="kadence/column"]:nth-child(1) { flex: 0 1 ${ parseFloat( widthString ) }%; }` : '' ) }
								{ ( secondColumnWidth || temporarySecondColumnWidth ? `#kt-layout-id${ uniqueID } > .editor-inner-blocks > .editor-block-list__layout > [data-type="kadence/column"]:nth-child(2) { flex: 0 1 ${ parseFloat( secondWidthString ) }%; }` : '' ) }
							</Fragment>
						) }
						{ columns && columns === 3 && (
							<Fragment>
								{ ( firstColumnWidth || temporaryColumnWidth ? `#kt-layout-id${ uniqueID } > .editor-inner-blocks > .editor-block-list__layout > [data-type="kadence/column"]:nth-child(1) { flex: 0 1 ${ parseFloat( widthString ) }%; }` : '' ) }
								{ ( secondColumnWidth || temporarySecondColumnWidth ? `#kt-layout-id${ uniqueID } > .editor-inner-blocks > .editor-block-list__layout > [data-type="kadence/column"]:nth-child(2) { flex: 0 1 ${ parseFloat( secondWidthString ) }%; }` : '' ) }
								{ ( secondColumnWidth || temporarySecondColumnWidth ? `#kt-layout-id${ uniqueID } > .editor-inner-blocks > .editor-block-list__layout > [data-type="kadence/column"]:nth-child(3) { flex: 0 1 ${ parseFloat( thirdWidthString ) }%; }` : '' ) }
							</Fragment>
						) }
					</style>
				) }
				<div className={ classes } style={ {
					marginBottom: bottomMargin + marginUnit,
					marginTop: topMargin + marginUnit,
					minHeight: minHeight + minHeightUnit,
				} }>
					{ ( 'slider' !== backgroundSettingTab && 'video' !== backgroundSettingTab ) && (
						<div className={ `kt-row-layout-background${ bgImg && bgImgAttachment === 'parallax' ? ' kt-jarallax' : '' }` } data-bg-img-id={ bgImgID } style={ {
							backgroundColor: ( bgColor ? bgColor : undefined ),
							backgroundImage: ( bgImg ? `url(${ bgImg })` : undefined ),
							backgroundSize: bgImgSize,
							backgroundPosition: bgImgPosition,
							backgroundRepeat: bgImgRepeat,
							backgroundAttachment: ( bgImgAttachment === 'parallax' ? 'fixed' : bgImgAttachment ),
						} }></div>
					) }
					{ ( 'slider' === backgroundSettingTab ) && (
						<div className={ `kt-blocks-carousel kb-blocks-bg-slider kt-carousel-container-dotstyle-${ backgroundSliderSettings[ 0 ].dotStyle }` }>
							{ backgroundSliderCount !== 1 && (
								<Slider className={ `kt-carousel-arrowstyle-${ backgroundSliderSettings[ 0 ].arrowStyle } kt-carousel-dotstyle-${ backgroundSliderSettings[ 0 ].dotStyle }` } { ...sliderSettings }>
									{ times( backgroundSliderCount, n => renderSliderImages( n ) ) }
								</Slider>
							) }
							{ backgroundSliderCount === 1 && (
								times( backgroundSliderCount, n => renderSliderImages( n ) )
							) }
						</div>
					) }
					{ ( 'video' === backgroundSettingTab ) && (
						<div className={ 'kb-blocks-bg-video-container' }>
							{ ( 'local' === backgroundVideoType ) && (
								<video className="kb-blocks-bg-video" playsinline="" loop="" src={ backgroundVideo[ 0 ].local }></video>
							) }
							{ ( 'youtube' === backgroundVideoType ) && (
								<div className="kb-blocks-bg-video" style={ { backgroundImage: `url(http://img.youtube.com/vi/${ backgroundVideo[ 0 ].youtube }/maxresdefault.jpg)` } }></div>
							) }
						</div>
					) }
					{ ( ! currentOverlayTab || 'grad' !== currentOverlayTab ) && (
						<div className={ `kt-row-layout-overlay kt-row-overlay-normal${ overlayBgImg && overlayBgImgAttachment === 'parallax' ? ' kt-jarallax' : '' }` } data-bg-img-id={ overlayBgImgID } style={ {
							backgroundColor: ( overlay ? overlay : undefined ),
							backgroundImage: ( overlayBgImg ? `url(${ overlayBgImg })` : undefined ),
							backgroundSize: overlayBgImgSize,
							backgroundPosition: overlayBgImgPosition,
							backgroundRepeat: overlayBgImgRepeat,
							backgroundAttachment: ( overlayBgImgAttachment === 'parallax' ? 'fixed' : overlayBgImgAttachment ),
							mixBlendMode: overlayBlendMode,
							opacity: overlayOpacityOutput( overlayOpacity ),
						} }>
						</div>
					) }
					{ currentOverlayTab && 'grad' === currentOverlayTab && (
						<div className={ 'kt-row-layout-overlay kt-row-overlay-gradient' } data-bg-img-id={ overlayBgImgID } style={ {
							backgroundImage: ( 'radial' === overlayGradType ? `radial-gradient(at ${ overlayBgImgPosition }, ${ overlay } ${ overlayGradLoc }%, ${ overlaySecond } ${ overlayGradLocSecond }%)` : `linear-gradient(${ overlayGradAngle }deg, ${ overlay } ${ overlayGradLoc }%, ${ overlaySecond } ${ overlayGradLocSecond }%)` ),
							mixBlendMode: overlayBlendMode,
							opacity: overlayOpacityOutput( overlayOpacity ),
						} }>
						</div>
					) }
					{ ! colLayout && (
						<div className="kt-select-layout">
							<div className="kt-select-layout-title">
								{ __( 'Select Your Layout' ) }
							</div>
							<ButtonGroup aria-label={ __( 'Column Layout' ) }>
								{ map( startlayoutOptions, ( { name, key, icon, col } ) => (
									<Tooltip text={ name }>
										<Button
											key={ key }
											className="kt-layout-btn"
											isSmall
											onClick={ () => setAttributes( {
												colLayout: key,
												columns: col,
											} ) }
										>
											{ icon }
										</Button>
									</Tooltip>
								) ) }
							</ButtonGroup>
							<PrebuiltModal
								clientId={ clientId }
							/>
						</div>
					) }
					{ colLayout && 'none' !== topSep && '' !== topSep && (
						<div className={ `kt-row-layout-top-sep kt-row-sep-type-${ topSep }` } style={ {
							height: topSepHeight + 'px',
						} }>
							<svg style={ { fill: topSepColor, width: topSepWidth + '%' } } viewBox="0 0 1000 100" preserveAspectRatio="none">
								{ topSVGDivider[ topSep ] }
							</svg>
						</div>
					) }
					<div style={ { height: '1px' } }></div>
					{ colLayout && this.showSettings( 'allSettings' ) && this.showSettings( 'paddingMargin' ) && (
						<ResizableBox
							size={ {
								height: topPadding,
							} }
							minHeight="0"
							handleClasses={ {
								top: 'wp-block-kadence-rowlayout-handler-top',
								bottom: 'wp-block-kadence-rowlayout-handler-bottom',
							} }
							enable={ {
								top: true,
								right: false,
								bottom: false,
								left: false,
								topRight: false,
								bottomRight: false,
								bottomLeft: false,
								topLeft: false,
							} }
							className={ 'kt-top-padding-resize kt-padding-resize-box' }
							onResize={ ( event, direction, elt, delta ) => {
								event.preventDefault();
								document.getElementById( 'row-top-' + uniqueID ).innerHTML = parseInt( topPadding + delta.height, 10 ) + 'px';
							} }
							onResizeStop={ ( event, direction, elt, delta ) => {
								setAttributes( {
									topPadding: parseInt( topPadding + delta.height, 10 ),
								} );
								toggleSelection( true );
							} }
							onResizeStart={ () => {
								toggleSelection( false );
							} }
						>
							{ uniqueID && (
								<div className="kt-row-padding">
									<span id={ `row-top-${ uniqueID }` } >
										{ topPadding + 'px' }
									</span>
								</div>
							) }
						</ResizableBox>
					) }
					{ colLayout && (
						<div className="innerblocks-wrap" id={ `kt-layout-id${ uniqueID }` } style={ {
							maxWidth: maxWidth + maxWidthUnit,
							paddingLeft: leftPadding + 'px',
							paddingRight: rightPadding + 'px',
						} }>
							{ colLayout && 'row' !== colLayout && columns && 2 === columns && this.showSettings( 'allSettings' ) && this.showSettings( 'columnResize' ) && (
								<div className="kt-resizeable-column-container" style={ {
									left: leftPadding + 'px',
									right: rightPadding + 'px',
								} }>
									<ContainerDimensions>
										{ ( { width } ) =>
											<ResizableBox
												className="editor-row-first-column__resizer"
												size={ { width: ( ! firstColumnWidth ? widthNumber : firstColumnWidth + '%' ) } }
												minWidth="10%"
												maxWidth="90%"
												enable={ {
													right: true,
												} }
												handleClasses={ {
													right: 'components-resizable-box__handle components-resizable-box__handle-right',
												} }
												grid={ ( columnsUnlocked ? [ width / 1000, 1 ] : [ width / 20, 1 ] ) }
												onResize={ onResize }
												onResizeStop={ onResizeStop }
												axis="x"
											>
												{ columnsUnlocked && (
													<Tooltip text={ __( 'Switch to 5% step resizing' ) }>
														<Button
															className="kt-fluid-grid-btn"
															isSmall
															onClick={ () => setAttributes( { columnsUnlocked: false } ) }
														>
															{
																<svg viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414"><path d="M4.217,10.611l0,2.7l-3.31,-3.311l3.31,-3.311l0,2.7l11.566,0l0,-2.7l3.31,3.311l-3.31,3.311l0,-2.7l-11.566,0Z" /></svg>
															}
														</Button>
													</Tooltip>
												) }
												{ ! columnsUnlocked && (
													<Tooltip text={ __( 'Switch to fluid resizing' ) }>
														<Button
															className="kt-fluid-grid-btn"
															isSmall
															onClick={ () => setAttributes( { columnsUnlocked: true } ) }
														>
															{
																<svg viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="1.5">
																	<path d="M13.967,10.611l0.001,-1.222l1.815,0l0,-2.7l3.31,3.311l-3.31,3.311l0,-2.7l-1.816,0Z"
																	/>
																	<path d="M8.918,10.611l-0.022,-1.222l2.15,0l-0.031,1.222l-2.097,0Z" />
																	<path d="M4.217,10.611l0,2.7l-3.31,-3.311l3.31,-3.311l0,2.7l1.693,0l-0.028,1.222l-1.665,0Z"
																	/>
																	<circle cx="12.427" cy="9.997" r="1.419" fill="none" stroke="#0085ba" />
																	<circle cx="7.456" cy="9.997" r="1.419" fill="none" stroke="#0085ba" />
																</svg>
															}
														</Button>
													</Tooltip>
												) }
												<span id={ `left-column-width-${ uniqueID }` } className="left-column-width-size column-width-size-handle" >
													{ ( ! firstColumnWidth ? widthNumber : firstColumnWidth + '%' ) }
												</span>
												<span id={ `right-column-width-${ uniqueID }` } className="right-column-width-size column-width-size-handle" >
													{ ( ! firstColumnWidth ? Math.abs( parseFloat( widthNumber ) - 100 ) + '%' : ( Math.round( ( 100 - firstColumnWidth ) * 10 ) / 10 ) + '%' ) }
												</span>
											</ResizableBox>
										}
									</ContainerDimensions>
								</div>
							) }
							{ colLayout && 'row' !== colLayout && columns && 3 === columns && this.showSettings( 'allSettings' ) && this.showSettings( 'columnResize' ) && (
								<ThreeColumnDrag
									uniqueID={ uniqueID }
									onSetState={ value => this.setState( value ) }
									onSetAttributes={ value => setAttributes( value ) }
									firstColumnWidth={ firstColumnWidth }
									secondColumnWidth={ secondColumnWidth }
									widthString={ widthString }
									secondWidthString={ secondWidthString }
									columnsUnlocked={ columnsUnlocked }
									leftPadding={ leftPadding }
									rightPadding={ rightPadding }
								/>
							) }
							<InnerBlocks
								template={ getColumnsTemplate( columns ) }
								templateLock="all"
								allowedBlocks={ ALLOWED_BLOCKS } />
						</div>
					) }
					{ colLayout && this.showSettings( 'allSettings' ) && this.showSettings( 'paddingMargin' ) && (
						<ResizableBox
							size={ {
								height: bottomPadding,
							} }
							minHeight="0"
							handleClasses={ {
								top: 'wp-block-kadence-rowlayout-handler-top',
								bottom: 'wp-block-kadence-rowlayout-handler-bottom',
							} }
							enable={ {
								top: false,
								right: false,
								bottom: true,
								left: false,
								topRight: false,
								bottomRight: false,
								bottomLeft: false,
								topLeft: false,
							} }
							className={ 'kt-bottom-padding-resize kt-padding-resize-box' }
							onResize={ ( event, direction, elt, delta ) => {
								document.getElementById( 'row-bottom-' + uniqueID ).innerHTML = parseInt( bottomPadding + delta.height, 10 ) + 'px';
							} }
							onResizeStop={ ( event, direction, elt, delta ) => {
								setAttributes( {
									bottomPadding: parseInt( bottomPadding + delta.height, 10 ),
								} );
							} }
							onResizeStart={ () => {
							} }
						>
							{ uniqueID && (
								<div className="kt-row-padding">
									<span id={ `row-bottom-${ uniqueID }` } >
										{ bottomPadding + 'px' }
									</span>
								</div>
							) }
						</ResizableBox>
					) }
					<div style={ { height: '1px' } }></div>
					{ colLayout && 'none' !== bottomSep && '' !== bottomSep && (
						<div className={ `kt-row-layout-bottom-sep kt-row-sep-type-${ bottomSep }` } style={ {
							height: bottomSepHeight + 'px',
						} }>
							<svg style={ { fill: bottomSepColor, width: bottomSepWidth + '%' } } viewBox="0 0 1000 100" preserveAspectRatio="none">
								{ bottomSVGDivider[ bottomSep ] }
							</svg>
						</div>
					) }
				</div>
			</Fragment>
		);
	}
}
export default ( KadenceRowLayout );
