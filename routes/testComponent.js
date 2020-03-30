import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, ScrollView, ImageBackground , TouchableOpacity} from 'react-native';
import { TextField } from '@material-ui/core';
import { NavigationContainer } from '@react-navigation/native';
import { ProgressBar, Colors } from 'react-native-paper';
import axios from 'axios';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerView } from '@react-navigation/drawer';
import { NavigationActions } from 'react-navigation';

class TestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            firstName: '',
            lastName: '',
            profileImage: 'https://ui-avatars.com/api/?name=Mouad+Lasri&rounded=true',

        }
    }



    componentDidMount() {
        console.log("Props: ", this.props);
      
    }

    goToProfile = (routeName) => {
        // this.props.navigation.navigate('Profile');
        this.props.navigation.dispatch(NavigationActions.navigate({ routeName }));
    }

    render() {
        return (
            <View style={{ height: '100%' }}>
                <View style={{ height: '20%', backgroundColor: '#1A5632', margin: 0 }}>
                    {/* <Image source={{ uri:  }} style={{ height: 75, width: 75 }} /> */}

                    <Text>Test COmponent Textr</Text>
                        <Text onPress={this.goToProfile('Profile')}>Button test</Text>
                    {/* <DrawerItemList  />
                    <DrawerItem
                        label="Close drawer"
                        onPress={() => props.navigation.closeDrawer()}
                    />
                    <DrawerItem
                        label="Toggle drawer"
                        onPress={() => props.navigation.toggleDrawer()}
                    /> */}
                </View>
                
            </View>
          
        );
    }
}

export default TestComponent;

