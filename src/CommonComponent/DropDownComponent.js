import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Color from '../Utils/Color'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
export default class DropDownComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        this.getOrientation();
        Dimensions.addEventListener('change', () => {
            this.getOrientation();
        });
    }

    getOrientation = () => {
        if (Dimensions.get('window').width < Dimensions.get('window').height) {
            this.setState({ orientation: 'portrait', isMarginRequired: true });
        } else {

            this.setState({ orientation: 'landscape', isMarginRequired: false });
        }
    }

    showDropdown = () => {
        if (!this.props.isCreateAppointment) {
            this.refs.dropDown.show()
            this.props.onDropdownWillShow()
            this.props.onDropdownWillHide()
        }
    }
    render() {
        return (
            <View style={{
                height: null, width: '90%', justifyContent: 'space-between', backgroundColor: Color.White, elevation: 3, marginTop: this.props.marginTop, marginBottom: this.props.marginBottom, borderRadius: 5,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62
            }}>

                <Text style={{ height: null, color: Color.Black, paddingLeft: 16, paddingRight: 10, marginTop: 7, fontSize: 16 }}>{this.props.dropDownText}
                    {
                        this.props.isRequired ?
                            <Text style={{ height: null, color: Color.Red, fontSize: 15 }}>*</Text>
                            :
                            null
                    }

                </Text>

                <View style={{
                    width: '100%',
                    height: 32,
                    flexDirection: 'row',
                    marginTop: 5
                }}>
                    <ModalDropdown style={{
                        width: this.state.orientation == 'portrait' ?  '87%' : '90%',
                        height: '100%',
                    }}
                        defaultValue={this.props.defaultValue ? this.props.defaultValue : 'Select'}
                        ref={'dropDown'}
                        options={this.props.dropDownArray}
                        onSelect={(index, value) => this.props.onSelect(index, value)}
                        dropdownStyle={{
                            height: (this.props.dropDownArray.length < 12 ? this.props.dropDownArray.length : 12) * 40, width: '90%', marginBottom: 50, borderRadius: 10, elevation: 3, shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.23,
                            shadowRadius: 2.62
                        }}
                        //accessible={false}
                        disabled={this.props.isCreateAppointment}
                        onDropdownWillShow={this.props.onDropdownWillShow}
                        onDropdownWillHide={this.props.onDropdownWillHide}
                        textStyle={{ color: Color.Header, fontSize: 16, marginHorizontal: 16 }}
                        dropdownTextStyle={{ color: Color.Header, fontSize: 16, marginHorizontal: 16 }}
                    />
                    {this.props.isFeildOptional && this.props.defaultValue != 'Select' ?
                        <TouchableOpacity onPress={this.props.resetValue} style={{ height: '100%', width: this.state.orientation == 'portrait' ?  '13%' :  '10%', alignItems: 'center' }}>
                            <FontAwesome name={'times'} color={Color.Black} size={16} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={this.showDropdown} style={{ height: '100%', width: this.state.orientation == 'portrait' ? '13%' : '10%', alignItems: 'center' }}>
                            <FontAwesome name={'chevron-down'} color={Color.Black} size={16} />
                        </TouchableOpacity>
                    }

                </View>

            </View>

        );
    }
}
DropDownComponent.propTypes = {
    isRequired: PropTypes.bool,
    defaultValue: PropTypes.string,
    isDropdownSmall: PropTypes.bool,
    isExtraWidthRequire:PropTypes.bool,
    isFeildOptional: PropTypes.bool,
    isCreateAppointment: PropTypes.bool,
    onSelect: PropTypes.func,
    resetValue: PropTypes.func,
    onDropdownWillShow: PropTypes.func,
    onDropdownWillHide: PropTypes.func,
};
DropDownComponent.defaultProps = {
    isRequired: false,
    isDropdownSmall: false,
    isExtraWidthRequire: false,
    isCreateAppointment: false,
    isFeildOptional: false,
    defaultValue: 'Select',
    onSelect: () => {

    },
    onDropdownWillShow: () => {

    },
    onDropdownWillHide: () => {

    },
    resetValue: () => {

    },
}