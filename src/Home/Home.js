import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Color from '../Utils/Color'
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            markedNormal: [],
            markedMedium: [],
            markedBusy: [],
        };
    }

    componentDidMount() {

    }
    checkDataForDay = (date) => {
        alert(date)
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginHorizontal: 10 }}>
                    <View style={{
                        marginVertical: 10, height: 50, backgroundColor: Color.White, borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', elevation: 5, shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62
                    }}>
                        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: 15, width: 15, borderRadius: 15 / 2, backgroundColor: Color.AMGreen }}></View>
                            <Text numberOfLines={2} style={{ marginTop: 3 }}>Normal</Text>
                        </View>
                        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: 15, width: 15, borderRadius: 15 / 2, backgroundColor: Color.AMBlue }}></View>
                            <Text numberOfLines={2} style={{ marginTop: 3 }}>Medium</Text>
                        </View>
                        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: 15, width: 15, borderRadius: 15 / 2, backgroundColor: Color.AMOrange }}></View>
                            <Text numberOfLines={2} style={{ marginTop: 3 }}>Busy</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
