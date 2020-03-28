import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Components/Home/Home';
import Profile from '../Components/User/Profile';
import RestaurantDetails from '../Components/Order/RestaurantDetails';
import RestaurantCart from '../Components/Order/RestaurantCart';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

 class DrawerNavigator extends React.Component {
    constructor(props) {
        super(props);
    }
    createHomeStack = () => (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="RestaurantDetails" options={{ title: '' }} component={RestaurantDetails} />
            <Stack.Screen name="RestaurantCart" options={{ title: '' }} component={RestaurantCart} />
        </Stack.Navigator>
    );
    
    
    render() {
       
        return (
            <Drawer.Navigator>
                <Drawer.Screen name="HomeStack" children={this.createHomeStack} />
                <Drawer.Screen name="Profile" component={Profile} />
            </Drawer.Navigator>

        );
    }
   
}

export default DrawerNavigator;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
