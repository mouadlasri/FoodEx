import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Components/Home/Home';
import Login from './Components/Registration/Login';
import RestaurantDetails from './Components/Order/RestaurantDetails';

// testing
import DetailedAnalytics from './Components/User/DetailedAnalytics';

import Navigator from './routes/homeStack';
// import { Drawer } from '@material-ui/core';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  

  render() {
 
    return (
      // <DetailedAnalytics />


      // Correct navigation
      <NavigationContainer>
        <Login />
      </NavigationContainer>


      
      
      
      
    //   <NavigationContainer>
    //     <Stack.Navigator>
    //       <Stack.Screen name='Login' component={Login} />
    //       <Stack.Screen name='Home' children={createDrawerNavigator} />
    //       {/* <Stack.Screen name='RestaurantDetails' component={RestaurantDetails} /> */}
    //     </Stack.Navigator>
    //   </NavigationContainer>
    );
  }
  // return (
  //     <Navigator />
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
