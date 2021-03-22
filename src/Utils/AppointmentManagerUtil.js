import {
    Alert,
    Dimensions,
    Platform
} from 'react-native';

import StringConstants from './StringConstant';
import Constants from './Constants'
import RealmController from '../Database/Realm'

class AttendenceUtil {

    static logout(navigation) {
        Alert.alert(
            StringConstants.appName, StringConstants.logout,
            [
                {
                    text: StringConstants.CancelText,
                    onPress: () => console.log('Cancel Button Pressed'),
                    style: StringConstants.CancelText
                },
                {
                    text: StringConstants.OkText,
                    onPress: () => AttendenceUtil.navigateLogout(navigation),
                    style: 'default'
                },
            ]
        )

    }

    static navigateLogout = (navigation) => {

    }

    static getMinDate() {
        let date = new Date();

        let currentdate = date.getDate();
        let currentmonth = date.getMonth();

        //for minimumyear
        let minimumyear = date.getFullYear();
        let minDate = minimumyear + '-' + currentmonth + '-' + currentdate;
        let minmumdate = minDate.split('-');
        return minmumdate
    }
    static getMaxDate() {
        let date = new Date();

        let currentdate = date.getDate();
        let currentmonth = date.getMonth();

        //for maximundate
        let maxyear = date.getFullYear() + 1;
        let maxDate = maxyear + '-' + currentmonth + '-' + currentdate;
        let maximumdate = maxDate.split('-');
        return maximumdate

    }
    static isEmptyValue(inputString) {
        if (inputString === undefined) {
            return true;
        }

        //Empty values check..
        let resultString = this.removeWhiteSpacing(inputString);
        if (resultString == '') {
            return true
        }
        return false
    }

    static removeWhiteSpacing(inputString) {
        if (AttendenceUtil.isNumber(inputString)) {
            return inputString;
        } else if (inputString == undefined) {
            return '';
        } else if (inputString.length > 0) {
            let resultString = inputString.trim();
            return resultString;
        }
        else {
            return inputString;
        }
    }

    static isValidEmaiID(inputString) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(inputString) === false) {
            return false;
        }
        return true

    }

    static validateForSpecialChar(inputString) {
        var regChars = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (!regChars.test(inputString)) {
            return false;
        }
        return true;

    }

    static strToDate(dateString) { //Format 2019-09-12 07:30:00
        let reggie = /(\d{4})-(\d{2}|\d{1})-(\d{2}|\d{1}) (\d{2}):(\d{2}):(\d{2})/
            , [, year, month, day, hours, minutes, seconds] = reggie.exec(dateString)
            , dateObject = new Date(year, month - 1, day, hours, minutes, seconds);
        return dateObject;
    }

    static getFormattedDate = (dateAsString) => {
        if (dateAsString === undefined) {
            return 'No Date';
        } else if (dateAsString.length < 16) {
            return dateAsString;
        }
        else if (typeof (dateAsString) != 'string') {
            return 'Invalid Date';
        }

        let dateAsObj = AttendenceUtil.strToDate(dateAsString);
        let onlyDateStr = dateAsObj.toDateString();
        let hoursVal = dateAsObj.getHours();
        let minsVal = dateAsObj.getMinutes();
        var timeAM_PM_Val = 'AM';

        if (hoursVal >= 12) {
            timeAM_PM_Val = 'PM';
            hoursVal -= (hoursVal > 12) ? 12 : 0;
        }

        if (hoursVal < 10) {
            hoursVal = '0' + hoursVal;
        }

        if (minsVal < 10) {
            minsVal = '0' + minsVal;
        }

        let formattedDateFormat = ' ' + hoursVal + ':' + minsVal + ' ' + timeAM_PM_Val;

        //Today
        let todaysDate = new Date();
        let todaysOnlyDateStr = todaysDate.toDateString();
        if (todaysOnlyDateStr === onlyDateStr) {
            return 'Today' + formattedDateFormat;
        }

        //Yesterday
        var yesterdaysDate = new Date();
        yesterdaysDate.setDate(yesterdaysDate.getDate() - 1);
        let yesterdaysOnlyDateStr = yesterdaysDate.toDateString();
        if (yesterdaysOnlyDateStr === onlyDateStr) {
            return 'Yesterday' + formattedDateFormat;
        }

        //Tomorrow
        var tomorrowsDate = new Date();
        tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
        let tomorrowsOnlyDateStr = tomorrowsDate.toDateString();
        if (tomorrowsOnlyDateStr === onlyDateStr) {
            return 'Tomorrow' + formattedDateFormat;
        }

        //All other days
        return onlyDateStr + formattedDateFormat;
    }


    static isNumber(n) {
        return !isNaN(parseFloat(n)) && !isNaN(n - 0)
    }
    static getPotraitHeight() {
        return Math.max(Dimensions.get('window').width, Dimensions.get('window').height);
    }

    static getPotraitWidth() {
        return Math.min(Dimensions.get('window').width, Dimensions.get('window').height);
    }
    static getParamsForAuthRequest() {
        let authRequestObj = {};
        if (Platform.OS == 'android') {
            authRequestObj.app_id = Constants.ANDROID_APP_ID
            authRequestObj.app_pwd = Constants.ANDROID_APP_SECRET_KEY
        } else if (Platform.OS == 'ios') {
            authRequestObj.app_id = Constants.IOS_APP_ID
            authRequestObj.app_pwd = Constants.IOS_APP_SECRET_KEY
        }
        authRequestObj.salt_key = Constants.SALT_KEY
        return authRequestObj;
    }
    static getAuthToken() {
        let appKeyObj = RealmController.getAppStateKey();
        if (appKeyObj.length > 0) {
            return appKeyObj[0].auth_token;
        }

        return null;
    }
    static isUserLoggedIn() {
        let appKeyObj = RealmController.getAppStateKey();
        if (appKeyObj.length > 0) {
            if (appKeyObj[0].loginStatus == "loggedIn") {
                return true
            }
        }
        return false;
    }
}

export default AttendenceUtil;