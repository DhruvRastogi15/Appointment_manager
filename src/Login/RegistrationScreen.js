import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Image, Text } from 'react-native';
import { StackActions } from '@react-navigation/native';
import Color from '../Utils/Color'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TextInputComponent from '../CommonComponent/TextInputComponent'
import StringConstants from '../Utils/StringConstant';
import DropDownComponent from '../CommonComponent/DropDownComponent'
var companyArray = ['agggggggggggggggg','bhhhhhhhhhhhhhhhhh']
class RegistrationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    onClick = () => {
        this.props.navigation.dispatch(
            StackActions.replace('LoginScreen')
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Color.White }}>
                <ScrollView style={{}} contentContainerStyle={{}}>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Image
                            style={{ height: 100, width: 100 }}
                            source={require('../Assets/AppLogo.png')} />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <TextInputComponent isRequired={true}
                            placeholder={StringConstants.placeholderFirstName}
                            type='Name'
                            keyboardType={'default'}
                            headerText={StringConstants.firstName} onChangeText={(text) => {
                                this.setFirstName(text)
                            }} text={this.state.firstName} marginTop={14}
                            marginBottom={0} />
                        <TextInputComponent isRequired={true}
                            placeholder={StringConstants.placeholderLastName}
                            type='Name'
                            keyboardType={'default'}
                            headerText={StringConstants.lastName} onChangeText={(text) => {
                                this.setLastName(text)
                            }} text={this.state.lastName} marginTop={14}
                            marginBottom={0} />
                        <TextInputComponent isRequired={true}
                            placeholder={StringConstants.placeholderPersonalEmailId}
                            type='Name'
                            keyboardType={'default'}
                            headerText={StringConstants.personalEmailId} onChangeText={(text) => {
                                this.setPersonalEmailId(text)
                            }} text={this.state.personalEmailId} marginTop={14}
                            marginBottom={0} />
                        <TextInputComponent isRequired={true}
                            placeholder={StringConstants.placeholderCompanyEmailId}
                            type='Name'
                            keyboardType={'default'}
                            headerText={StringConstants.companyEmailId} onChangeText={(text) => {
                                this.setCompanyEmailId(text)
                            }} text={this.state.companyEmailId} marginTop={14}
                            marginBottom={0} />
                        <TextInputComponent isRequired={true}
                            placeholder={StringConstants.placeholderMobileNumber}
                            type='Name'
                            keyboardType={'number-pad'}
                            maxLength={10}
                            headerText={StringConstants.mobileNumber} onChangeText={(text) => {
                                this.setMobileNumber(text)
                            }} text={this.state.mobileNumber} marginTop={14}
                            marginBottom={0}
                            onSubmitEditing={() => { this.registerUser() }} />
                        <DropDownComponent onSelect={this.selectCompany} dropDownText={StringConstants.department}
                            isRequired={true} dropDownArray={companyArray} marginTop={14}
                            marginBottom={0} />

                    </View>

                    <TouchableOpacity onPress={this.onClick}
                        style={{ alignItems: 'center', borderRadius: 6, backgroundColor: Color.AMOrange, marginTop: 20, marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 22, paddingVertical: 10, color: Color.White }}>Register</Text>
                    </TouchableOpacity>
                </ScrollView>

            </View >
        );
    }
}

export default RegistrationScreen