'use strict';

import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ListView,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';

import BaseComponent from './BaseComponent'
import Styles from './styles'

const ViewStylePropTypes = ViewPropTypes ? ViewPropTypes.style : View.propTypes.style;

const propTypes = {
    options: PropTypes.array.isRequired,
    selectedOptions: PropTypes.array,
    selectedOptionsList: PropTypes.func,
    maxSelectedOptions: PropTypes.number,
    onSelection: PropTypes.func,
    renderIndicator: PropTypes.func,
    renderSeparator: PropTypes.func,
    renderRow: PropTypes.func,
    renderText: PropTypes.func,
    style: ViewStylePropTypes,
    optionStyle: ViewStylePropTypes,
    disabled: PropTypes.bool,
    indicatorLeft: PropTypes.bool,
};
const defaultProps = {
    options: [],
    selectedOptions: [],
    onSelection(option,){},
    selectedOptionsList(optionList){},
    style:{},
    optionStyle:{},
    disabled: false,
    indicatorLeft: false,
};

class MultipleChoice extends BaseComponent {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
        this.ds = ds;

        this.state = {
            dataSource: ds.cloneWithRows(this.props.options),
            selectedOptions: this.props.selectedOptions || [],
            disabled: this.props.disabled
        };

        this._bind(
            '_renderRow',
            '_selectOption',
            '_isSelected',
            '_updateSelectedOptions'
        );
    }

    componentWillReceiveProps(nextProps) {
        this._updateSelectedOptions(nextProps.selectedOptions);
        this.setState({
            disabled: nextProps.disabled
        });
    }
    _updateSelectedOptions(selectedOptions) {
        this.setState({
            selectedOptions,
            dataSource: this.ds.cloneWithRows(this.props.options)
        });
    }

    _validateMaxSelectedOptions() {
        const maxSelectedOptions = this.props.maxSelectedOptions;
        const selectedOptions = this.state.selectedOptions;

        if (maxSelectedOptions && selectedOptions.length > 0 && selectedOptions.length >= maxSelectedOptions) {
            selectedOptions.splice(0, 1);
        }

        this._updateSelectedOptions(selectedOptions);
    }

    _selectOption(selectedOption) {

        let selectedOptions = this.state.selectedOptions;
        const index = this._getIndex(selectedOption);

        if (index === -1) {
            this._validateMaxSelectedOptions();
            selectedOptions.push(selectedOption);
        } else {
            selectedOptions.splice(index, 1);
        }

        this._updateSelectedOptions(selectedOptions);


        //run callback
        this.props.onSelection(selectedOption);
        this.props.selectedOptionsList(selectedOptions);
    }

    _getIndex(option) {
        let index;
        if (this.props.findIndexProp != null) {
            index = this.state.selectedOptions.findIndex(i => i[this.props.findIndexProp] === option[this.props.findIndexProp])
        } else {
            index = this.state.selectedOptions.indexOf(option);
        }
        return index;
    }

    _isSelected(option) {
        // return this.state.selectedOptions.indexOf(option) !== -1;
        return this._getIndex(option) > -1;
    }

    _renderIndicator(option, selected) {

        if(typeof this.props.renderIndicator === 'function') {
            return this.props.renderIndicator(option, selected);
        }
        if (selected) {
            return (
                <Image
                    style={Styles.optionIndicatorIcon}
                    source={require('./assets/images/check.png')}
                />
            );
        } else {
            return null;
        }
    }

    _renderSeparator(option) {

        if(typeof this.props.renderSeparator === 'function') {
            return this.props.renderSeparator(option);
        }

        return (<View style={Styles.separator} />);
    }

    _renderText(option, selected) {

        if(typeof this.props.renderText === 'function') {
            return this.props.renderText(option, selected);
        }

        return (<Text>{option}</Text>);
    }

    _renderRow(option) {

        const selected = this._isSelected(option);
        let customRow = (
            <View>
                {this.props.indicatorLeft && <View style={Styles.optionIndicator}>{this._renderIndicator(option, selected)}</View>}
                <View style={Styles.optionLabel}>{this._renderText(option, selected)}</View>
                {!this.props.indicatorLeft && <View style={Styles.optionIndicator}>{this._renderIndicator(option, selected)}</View>}
            </View>
        );
        if(typeof this.props.renderRow === 'function') {
            customRow = this.props.renderRow(option, selected);
        }

        const disabled = this.state.disabled;
        return (

            <View style={this.props.optionStyle}>
                <TouchableOpacity
                    activeOpacity={disabled ? 1 : 0.7}
                    onPress={!disabled ? ()=>{this._selectOption(option)} : null}
                >
                    <View>
                        <View
                            style={Styles.row}
                        >
                            {customRow}
                        </View>
                    </View>
                </TouchableOpacity>
                {this._renderSeparator(option)}
            </View>
        );
    }

    render() {
        return (
            <ListView
                enableEmptySections={true}
                style={[Styles.list, this.props.style]}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
            />
        );
    }
};

MultipleChoice.propTypes = propTypes;
MultipleChoice.defaultProps = defaultProps;

module.exports = MultipleChoice;
