const {
	Component,
	Fragment,
} = wp.element;
const {
	Dashicon,
	Tooltip,
	SelectControl,
	Button,
	Modal,
} = wp.components;
/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
class KadenceSpacerSettings extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			isOpen: false,
			isSaving: false,
			settings: ( kadence_blocks_params.settings ? JSON.parse( kadence_blocks_params.settings ) : {} ),
		};
	}
	saveConfig( blockID, settingArray ) {
		this.setState( { isSaving: true } );
		const config = this.state.settings;
		if ( ! config[ blockID ] ) {
			config[ blockID ] = {};
		}
		config[ blockID ] = settingArray;
		const settingModel = new wp.api.models.Settings( { kadence_blocks_settings_blocks: JSON.stringify( config ) } );
		settingModel.save().then( response => {
			this.setState( { isSaving: false, settings: config, isOpen: false } );
			kadence_blocks_params.settings = JSON.stringify( config );
		} );
	}
	saveConfigState( key, value ) {
		const config = this.state.settings;
		if ( ! config[ 'kadence/spacer' ] ) {
			config[ 'kadence/spacer' ] = {};
		}
		config[ 'kadence/spacer' ][ key ] = value;
		this.setState( { settings: config } );
	}
	render() {
		const { settings, isOpen } = this.state;
		const spacerSettings = ( settings && settings[ 'kadence/spacer' ] ? settings[ 'kadence/spacer' ] : {} );
		return (
			<Fragment>
				<Tooltip text="Block Settings Visibility">
					<Button className="kt-block-settings" onClick={ () => this.setState( { isOpen: true } ) }>
						<Dashicon icon="visibility" />
					</Button>
				</Tooltip>
				{ isOpen ?
					<Modal
						className="kt-block-settings-modal"
						title={ __( 'Spacer/Divider Settings' ) }
						onRequestClose={ () => {
							this.saveConfig( 'kadence/spacer', spacerSettings );
						} }>
						<SelectControl
							label={ __( 'Enabled All Settings For' ) }
							value={ ( spacerSettings.spacerDivider ? spacerSettings.spacerDivider : 'all' ) }
							options={ [
								{ value: 'all', label: __( 'All Users' ) },
								{ value: 'contributor', label: __( 'Minimum User Role Contributor' ) },
								{ value: 'author', label: __( 'Minimum User Role Author' ) },
								{ value: 'editor', label: __( 'Minimum User Role Editor' ) },
								{ value: 'admin', label: __( 'Minimum User Role Admin' ) },
								{ value: 'none', label: __( 'No Users' ) },
							] }
							onChange={ value => this.saveConfigState( 'spacerDivider', value ) }
						/>
						<hr />
						<h2>{ __( 'Control Individual Settings' ) }</h2>
						<SelectControl
							label={ __( 'Enable Height Units' ) }
							value={ ( spacerSettings.spacerHeightUnits ? spacerSettings.spacerHeightUnits : 'all' ) }
							options={ [
								{ value: 'all', label: __( 'All Users' ) },
								{ value: 'contributor', label: __( 'Minimum User Role Contributor' ) },
								{ value: 'author', label: __( 'Minimum User Role Author' ) },
								{ value: 'editor', label: __( 'Minimum User Role Editor' ) },
								{ value: 'admin', label: __( 'Minimum User Role Admin' ) },
								{ value: 'none', label: __( 'No Users' ) },
							] }
							onChange={ value => this.saveConfigState( 'spacerHeightUnits', value ) }
						/>
						<SelectControl
							label={ __( 'Enable Height Control' ) }
							value={ ( spacerSettings.spacerHeight ? spacerSettings.spacerHeight : 'all' ) }
							options={ [
								{ value: 'all', label: __( 'All Users' ) },
								{ value: 'contributor', label: __( 'Minimum User Role Contributor' ) },
								{ value: 'author', label: __( 'Minimum User Role Author' ) },
								{ value: 'editor', label: __( 'Minimum User Role Editor' ) },
								{ value: 'admin', label: __( 'Minimum User Role Admin' ) },
								{ value: 'none', label: __( 'No Users' ) },
							] }
							onChange={ value => this.saveConfigState( 'spacerHeight', value ) }
						/>
						<SelectControl
							label={ __( 'Enable Divider Toggle Control' ) }
							value={ ( spacerSettings.dividerToggle ? spacerSettings.dividerToggle : 'all' ) }
							options={ [
								{ value: 'all', label: __( 'All Users' ) },
								{ value: 'contributor', label: __( 'Minimum User Role Contributor' ) },
								{ value: 'author', label: __( 'Minimum User Role Author' ) },
								{ value: 'editor', label: __( 'Minimum User Role Editor' ) },
								{ value: 'admin', label: __( 'Minimum User Role Admin' ) },
								{ value: 'none', label: __( 'No Users' ) },
							] }
							onChange={ value => this.saveConfigState( 'dividerToggle', value ) }
						/>
						<SelectControl
							label={ __( 'Enable Divider Styles Control' ) }
							value={ ( spacerSettings.dividerStyles ? spacerSettings.dividerStyles : 'all' ) }
							options={ [
								{ value: 'all', label: __( 'All Users' ) },
								{ value: 'contributor', label: __( 'Minimum User Role Contributor' ) },
								{ value: 'author', label: __( 'Minimum User Role Author' ) },
								{ value: 'editor', label: __( 'Minimum User Role Editor' ) },
								{ value: 'admin', label: __( 'Minimum User Role Admin' ) },
								{ value: 'none', label: __( 'No Users' ) },
							] }
							onChange={ value => this.saveConfigState( 'dividerStyles', value ) }
						/>
						<Button className="kt-settings-save" isDefault isPrimary onClick={ () => {
							this.saveConfig( 'kadence/spacer', spacerSettings );
						} }>
							{ __( 'Save/Close' ) }
						</Button>
					</Modal>
					: null }
			</Fragment>
		);
	}
}
export default KadenceSpacerSettings;
