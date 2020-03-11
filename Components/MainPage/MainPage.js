import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { TextField } from '@material-ui/core';
import { NavigationContainer } from '@react-navigation/native';

import axios from 'axios';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }


        // console.log("RESPONSE => ", responseStatus);
   
    render() {
        const { userId, userPassword, authFlag } = this.state;

        return (
            <NavigationContainer>
                <View>
                    <Text>Main Page</Text>
                </View>
            </NavigationContainer>
        );
    }
}

export default MainPage;