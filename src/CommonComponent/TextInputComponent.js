import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import Color from '../Utils/Color'
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { isTabDevice, moderateScale } from '../reusableComponents/DeviceInfo'
import PropTypes from 'prop-types';

// const tabMulFactor = isTabDevice() ? 0.25 : 0.0;
export default class TextInputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 40
        };
    }

    navigateTo = () => {

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

    // updateHeight = (e) => {
    //     if (this.state.height > 80) {

    //     } else {
    //         this.setState({ height: e.nativeEvent.contentSize.height })
    //     }
    // }

    render() {
        return (
            <View style={{
                height: null, width: '90%', justifyContent: 'space-between', alignItems: 'center', backgroundColor: this.props.editable ? Color.White : '#FFFAF0', elevation: 3, marginTop: this.props.marginTop, marginBottom: this.props.marginBottom, borderRadius: 5,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62
            }}>

                <Text style={{ height: null, color: Color.Black, marginLeft: 16, marginTop: 7, alignSelf: 'flex-start', fontSize: 16 }}>{this.props.headerText}
                    {
                        this.props.isRequired ?
                            <Text style={{ height: null, color: Color.Red, fontSize: 15 }}>*</Text>
                            :
                            null
                    }

                </Text>
                {
                    this.props.type === 'Status' ?
                        <TouchableOpacity onPress={() => this.props.navigateTo()} style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <Text style={{ width: this.state.orientation == 'portrait' ? '84%' : '87%', color: Color.Header, marginLeft: 16, fontSize: 16 }} numberOfLines={1}>{this.props.open}</Text>
                            <TouchableOpacity onPress={() => this.props.navigateTo()} style={{ height: '100%', width: this.state.orientation == 'portrait' ? '13%' : '10%', alignItems: 'center' }}>
                                {/* <FontAwesome name={'chevron-right'} color={Color.Black} size={moderateScale(16, tabMulFactor)} style={{ marginRight: moderateScale(10, tabMulFactor) }} /> */}
                            </TouchableOpacity>
                        </TouchableOpacity>
                        :
                        <TextInput
                            style={{
                                width: '100%',
                                height: 40,
                                color: this.props.editable ? Color.Header : Color.Gray,
                                fontSize: 16,
                                paddingLeft: 16,
                                marginTop: -5
                            }}
                            multiline={this.props.multiline}
                            numberOfLines={this.props.numberOfLines}
                            onChangeText={(text) => this.props.onChangeText(text)}
                            value={this.props.text}
                            ref={"textInput"}
                            returnKeyType={"done"}
                            onSubmitEditing={() => {
                                this.props.onSubmitEditing()
                            }}
                            underlineColorAndroid={'transparent'}
                            placeholder={this.props.placeholder}
                            keyboardType={this.props.keyboardType}
                            maxLength={this.props.maxLength}
                            autoCapitalize={this.props.autoCapitalize}
                            onBlur={this.props.onBlur}
                            editable={this.props.editable}
                            autoCorrect={false}
                            autoCompleteType={'off'}
                            onFocus={this.props.onFocus}
                        >
                        </TextInput>
                }
            </View>
        );
    }
}

TextInputComponent.propTypes = {
    open: PropTypes.string,
    keyboardType: PropTypes.string,
    autoCapitalize: PropTypes.string,
    maxLength: PropTypes.number,
    numberOfLines: PropTypes.number,
    height: PropTypes.number,
    isRequired: PropTypes.bool,
    multiline: PropTypes.bool,
    navigateTo: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onBlur: PropTypes.func,
    editable: PropTypes.bool,
    onFocus:PropTypes.func,
};

TextInputComponent.defaultProps = {
    open: 'Open',
    keyboardType: 'default',
    autoCapitalize:'none',
    maxLength: 250,
    numberOfLines: 1,
    height: 40,
    isRequired: false,
    multiline: false,
    editable: true,
    
    navigateTo: () => {
        
    },

    onSubmitEditing: () => {

    },
    onFocus: () => {

    },
}