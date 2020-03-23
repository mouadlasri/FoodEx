import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, ScrollView, ImageBackground } from 'react-native';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        // console.log(' HOME STATE ID => ', this.props.route.params.test);
        return (
            <View>
               <Text>Profile View</Text>
            </View>
        );
    }
}

export default Profile;

const styles = StyleSheet.create({

   

})