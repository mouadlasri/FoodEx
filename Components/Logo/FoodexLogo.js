import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, ScrollView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';
import { Divider } from 'react-native-elements';

class FoodexLogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded:false
        }
    }


    loadFonts = async () => {
        await Font.loadAsync({
            'RobotoRegular': require('../../assets/fonts/Roboto-Regular.ttf'),
            'Pacifico': require('../../assets/fonts/Pacifico-Regular.ttf'),
        });
    }

    async componentDidMount() {
        await Font.loadAsync({
            'RobotoRegular': require('../../assets/fonts/Roboto-Regular.ttf'),
            'Pacifico': require('../../assets/fonts/Pacifico-Regular.ttf'),
        }).then(() => this.setState({fontLoaded: true}));
    }

    render() {
        // console.log(' HOME STATE ID => ', this.props.route.params.test);
        if (this.state.fontLoaded == true) {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', textAlign: 'center' }}>
                    <Text style={{ fontSize: 40, fontFamily: 'Pacifico' }}>Foode</Text>
                    <Image source={require('./foodex.png')} style={{ left: -8, top: 15, height: 50, width: 50 }} />
                </View>
            );
        } else {
            return (<View></View>)
        }
       
    }
}

export default FoodexLogo;

const styles = StyleSheet.create({



})