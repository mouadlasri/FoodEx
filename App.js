import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerStack } from '@react-navigation/drawer';
import Home from './Components/Home/Home';
import Login from './Components/Registration/Login';

import Navigator from './routes/homeStack';

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  

  render() {
 
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
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
