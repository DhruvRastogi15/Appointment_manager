import React, {  } from 'react';
import { Text, Platform } from 'react-native';

export const FontFix = () => {
    if (Platform.OS !== 'android') {
        return
    }

    const oldRender = Text.render
    Text.render = function (...args) {
        const origin = oldRender.call(this, ...args);
        return React.cloneElement(origin, {
            style: [{ fontFamily: 'Roboto' }, origin.props.style]
        })
    }
}
