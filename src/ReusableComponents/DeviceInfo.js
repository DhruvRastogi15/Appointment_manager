import { Dimensions, Platform } from 'react-native';
import VersionNumber from 'react-native-version-number';
const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 320;
const guidelineBaseHeight = 568;

const horizontalScale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.0) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };

export function isiPhoneX() {
    return (
        // This has to be iOS
        Platform.OS === 'ios' &&

        // Check either, iPhone X or XR
        (isiPhoneXSize() || isiPhoneXRSize())
    );
}

export function isiPhoneXSize() {
    return height == 812 || width == 812;
}

export function isiPhoneXRSize() {
    return height == 896 || width == 896;
}

export function isTabDevice() {
    var aspectRatio;
    if (height > width) {
        aspectRatio = height / width;
    }
    else {
        aspectRatio = width / height;
    }
    return aspectRatio > 1.6 ? false : true;
}

export function getAppVersion() {
    return VersionNumber.appVersion + '.' + VersionNumber.buildVersion;
}