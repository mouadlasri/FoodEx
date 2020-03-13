import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Components/Home/Home';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {
    constructor(props) {
        super(props);
    }

    
    render() {

        return (
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={Home} independent={true}/>
            </Drawer.Navigator>

        );
    }
   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
