import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, ScrollView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';

class FoodexLogo extends React.Component {
    constructor(props) {
        super(props);
    }


    loadFonts = async () => {
        await Font.loadAsync({
            'RobotoRegular': require('../../assets/fonts/Roboto-Regular.ttf'),
            'Pacifico': require('../../assets/fonts/Pacifico-Regular.ttf'),
        });
    }

    componentDidMount() {
        this.loadFonts();
    }

    render() {
        // console.log(' HOME STATE ID => ', this.props.route.params.test);
        return (
            <View style={{flexDirection: 'row'}}>
                <Text style={{ fontSize: 40, fontFamily: 'Pacifico'}}>Foode</Text>
                <Image source={require('./foodex.png')} style={{ left: -8, top: 15, height: 50, width: 50}} />
            </View>
        );
    }
}

export default FoodexLogo;

const styles = StyleSheet.create({



})