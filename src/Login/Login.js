import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Color from '../Utils/Color'
import StringConstants from '../Utils/StringConstant'
import { StackActions } from '@react-navigation/native';
import AppointmentManagerUtil from '../Utils/AppointmentManagerUtil'
import Toast from 'react-native-root-toast';

var arr = [2020 - 12 - 16]

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileNumber: '',
            isMobileNumberEntered: false,
            otp: '',
            firstNum: '',
            secondNum: '',
            thirdNum: '',
            fourthNum: '',
            loading: false,
            type: '',
        };
    }

    componentDidMount() {

    }

    registerUser() {
        this.props.navigation.dispatch(
            StackActions.replace('RegistrationScreen')
        );
    }

    setMobileNumber = (text) => {
        this.setState({ mobileNumber: text })
    }

    getOTP() {
        if (AppointmentManagerUtil.isEmptyValue(this.state.mobileNumber)) {
            Toast.show(StringConstants.plzEnterMblNum)
        } else if (this.state.mobileNumber.length < 10) {
            Toast.show(StringConstants.plzEnterValidMblNum)
        } else if (this.state.mobileNumber.charAt(0) < 6) {
            Toast.show(StringConstants.plzEnterValidMblNum)
        } else {
            this.setState({ loading: true, isMobileNumberEntered: true }, () => {
                this.getOtpService()
            })
        }
    }

    getOtpService = () => {
        let requestObj = {}
        requestObj.type = this.state.type
        requestObj.mobile_number = this.state.mobileNumber
    }
    setFirstTextinput = (text) => {
        this.setState({ firstNum: text }, () => {
            if (this.state.firstNum != '') {
                this.refs.secondTextFeild.focus()
            }
        })
    }

    setSecondTextinput = (text) => {
        this.setState({ secondNum: text }, () => {
            if (this.state.secondNum != '') {
                this.refs.thirdTextFeild.focus()
            }
        })
    }

    setThirdTextinput = (text) => {
        this.setState({ thirdNum: text }, () => {
            if (this.state.thirdNum != '') {
                this.refs.fourthTextFeild.focus()
            }
        })
    }

    setFourthTextinput = (text) => {
        this.setState({
            fourthNum: text,
        }, () => {
            this.setState({
                otp: this.state.firstNum + this.state.secondNum +
                    this.state.thirdNum + this.state.fourthNum,
                type: 'login'
            })
            if (this.state.fourthNum != '') {
                //call login
            }
        })
    }

    callLoginAPI() {
        if (AppointmentManagerUtil.isEmptyValue(this.state.firstNum) || AppointmentManagerUtil.isEmptyValue(this.state.secondNum)
            || AppointmentManagerUtil.isEmptyValue(this.state.thirdNum) || AppointmentManagerUtil.isEmptyValue(this.state.fourthNum)) {
            Toast.show(StringConstants.plzEnterOtpNum)
        } else {
            if (this.state.type == 'login') {
                this.setState({ loading: true }, () => {
                    this.callLoginService()
                })
            } else {
                this.setState({ loading: true }, () => {
                    this.callRegisterUserApi()
                })
            }
        }
    }

    callLoginService() {
        this.props.navigation.dispatch(
            StackActions.replace('Home')
        );
    }
    callRegisterUserApi = () => {
        alert('a')
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Color.White }}>
                <View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center', height: '50%' }}>
                    <Image
                        source={require('../Assets/AppLogo.png')}
                        resizeMode="contain">
                    </Image>
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: Color.Silver }}>{StringConstants.appointmentManager}</Text>
                    </View>
                </View>
                {this.state.isMobileNumberEntered == false ?
                    <View style={{ width: "100%", height: null, alignItems: 'center', justifyContent: 'center', marginTop: 20 }} >
                        <TextInput
                            style={{ height: 50, width: "90%", borderBottomWidth: 2, borderWidth: 0.2, borderColor: 'gray', textAlign: 'center' }}
                            onChangeText={text => this.setMobileNumber(text)}
                            placeholder={StringConstants.mobileStr}
                            value={this.state.mobileNumber}
                            keyboardType={'number-pad'}
                            maxLength={10}
                            returnKeyType={'done'}
                            onSubmitEditing={() => { this.getOTP() }}
                        />
                        <TouchableOpacity
                            style={{
                                marginTop: 60, width: "90%", height: 56, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.AMOrange, borderRadius: 5
                            }}
                            onPress={() => {
                                this.getOTP()
                            }}>
                            <Text style={{ fontSize: 22, textAlign: 'center', color: Color.White }}>{StringConstants.getOTP}</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ width: "100%", height: null, alignItems: 'center', justifyContent: 'center', marginTop: 20 }} >
                        <View style={{ width: '90%', justifyContent: 'space-around', flexDirection: 'row' }}>
                            <TextInput
                                ref='firstTextFeild'
                                style={{ width: 50, height: 50, borderWidth: 1, borderColor: Color.Gray, textAlign: 'center' }}
                                onChangeText={(text) => this.setFirstTextinput(text)}
                                maxLength={1}
                                value={this.state.firstNum}
                                keyboardType={'number-pad'}
                                returnKeyType={'done'}
                            />
                            <TextInput
                                ref='secondTextFeild'
                                style={{ width: 50, height: 50, borderWidth: 1, borderColor: Color.Gray, textAlign: 'center' }}
                                onChangeText={(text) => this.setSecondTextinput(text)}
                                maxLength={1}
                                value={this.state.secondNum}
                                keyboardType={'number-pad'}
                                returnKeyType={'done'}
                            />
                            <TextInput
                                ref='thirdTextFeild'
                                style={{ width: 50, height: 50, borderWidth: 1, borderColor: Color.Gray, textAlign: 'center' }}
                                onChangeText={(text) => this.setThirdTextinput(text)}
                                maxLength={1}
                                value={this.state.thirdNum}
                                keyboardType={'number-pad'}
                                returnKeyType={'done'}
                            />
                            <TextInput
                                ref='fourthTextFeild'
                                style={{ width: 50, height: 50, borderWidth: 1, borderColor: Color.Gray, textAlign: 'center' }}
                                onChangeText={(text) => this.setFourthTextinput(text)}
                                maxLength={1}
                                value={this.state.fourthNum}
                                keyboardType={'number-pad'}
                                returnKeyType={'done'}
                                onSubmitEditing={() => { this.callLoginAPI() }}
                            />
                        </View>

                        <TouchableOpacity

                            style={{
                                marginTop: 60, width: "90%", height: 56, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.AMOrange, borderRadius: 5
                            }}
                            onPress={() => {
                                this.callLoginAPI()
                            }}>
                            <Text style={{ fontSize: 22, textAlign: 'center', color: Color.White }}>{StringConstants.verifyOtp}</Text>
                        </TouchableOpacity>
                    </View>
                }
                {!this.state.isMobileNumberEntered ?
                    <View style={{ height: 55, width: '100%', position: 'absolute', bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '500', color: 'silver' }}>{StringConstants.dontHaveAccount}</Text>
                        <TouchableOpacity onPress={() => this.registerUser()}>
                            <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: '500', color: Color.AMBlue }}> {StringConstants.registerNow}</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    null
                }
            </View>
        );
    }
}
