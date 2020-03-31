import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { TextField } from '@material-ui/core';
import { NavigationContainer } from '@react-navigation/native';
import { ProgressBar, Colors } from 'react-native-paper';
import { Card, Title, Paragraph } from 'react-native-paper';
import Drawer from '@material-ui/core/Drawer';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import * as Font from 'expo-font';


class HomeRestaurants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            restaurantData: null,
            selectedRestaurantId: ''
        }
    }

    orderHandler = (restaurantId, restaurantLink) => {
        // go to RestaurantDetails Page
        this.props.navigation.navigate('RestaurantDetails', { 'restaurantId': restaurantId, 'restaurantImage': restaurantLink });
    }

    loadFonts = async () => {
        await Font.loadAsync({
            'RobotoRegular': require('../../assets/fonts/Roboto-Regular.ttf'),
            'Pacifico': require('../../assets/fonts/Pacifico-Regular.ttf'),
        });
    }

    componentDidMount() {
        this.loadFonts();

        axios.get(`https://aae295ea.ngrok.io/api/Restaurants/`).then(response => {
            // console.log('Get Restaurant data: ', response.data);
            this.setState({ restaurantData: response.data });
            // console.log('Restaurant State Data: ', this.state.restaurantData);
        }).catch(error => { console.log(error) });
    }

   
    
    // Dynamically change the styling of the waiting time
    waitingTimeStyle = (waitingTime) => {
        // console.log('Waiting Time => ', waitingTime);
      
        switch (waitingTime) {
            case 'Long':
                return { color: 'red', }
            case 'Medium':
                return { color: '#F5B335', }
            case 'Low':
                return { color: '#1A5632',}
        }
    }

    
    render() {
        
        if (this.state.restaurantData != null) {
            // console.log('STATE of Restaqurant Data => ', this.state.restaurantData);
            const resultRestaurantList = this.state.restaurantData.map((restaurant) => {
                return (
                    <View style={{ flex: 1, height: 145, marginRight: 25, marginLeft: 25, marginBottom: 20 }} key={restaurant.restaurantId}>
                        <TouchableOpacity onPress={() => { this.orderHandler(restaurant.restaurantId, restaurant.imageLink) }}>
                            <ImageBackground style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }} resizeMode='cover' source={{ uri: restaurant.imageLink }}>
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', height: '100%', width: '100%', justifyContent: 'center' }}>
                                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: 20, fontWeight: 'bold' }}>{restaurant.restaurantName}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                       
                        {/* <View style={{ flex: 3}}>
                            <Image style={{ flex: 1, borderTopRightRadius: 10, borderTopLeftRadius: 10 }} resizeMode='cover' source={{ uri: restaurant.imageLink }} />
                        </View>
                        <View style={{ flex: 2, fontSize: 14, marginLeft: 10}}>
                            <Text style={{ marginBottom: 0, fontSize: 26}}>{restaurant.restaurantName}</Text>
                            <Text style={{ }}>{restaurant.restaurantDescription} </Text>
                            <Text style={{ }} style={this.waitingTimeStyle(restaurant.waitingTime)} >{restaurant.waitingTime} </Text>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#1A5632', justifyContent: 'center', borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
                            <Icon.Button name="shopping-basket" backgroundColor='#1A5632' style={{ justifyContent: 'center' }} onPress={() => { this.orderHandler(restaurant.restaurantId, restaurant.imageLink) }}>
                                <Text style={{ textAlign: 'center', color: '#fff' }}>Make an Order!</Text>
                            </Icon.Button>
                        </View> */}
                    </View> 
                )
            });

            return (
                <View style={{ flex: 1 }}>
                    <ScrollView style={{  }}>
                        {resultRestaurantList}
                    </ScrollView>
                </View>
            )
        }

        else {
            // Maybe add a Loading icon here
            return <View><Text></Text></View>
        }

      
    }
}

export default HomeRestaurants;

const horizontalMargin = 20;
const slideWidth = 200;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;
const styles = StyleSheet.create({
    Long: {
        color: 'red',
        fontSize: 50
    },
    homeRestaurantsContainer: {
       
        marginTop: 5,
        
    },
    carouselContainer: {
    },
    slide: {
        width: itemWidth,
        height: itemHeight,
        paddingHorizontal: horizontalMargin
        // other styles for the item container
    },
    slideInnerContainer: {
        width: slideWidth,
        flex: 1
        // other styles for the inner container
    },
    orderButton: {
        backgroundColor: '#007bff',
        padding: 10,
        height: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    orderButtonText: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    menuItem: {
        width: 300,
        height: 240,
        backgroundColor: '#fff',
        marginRight: 20,
        shadowColor: "blue",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 16,
        // borderStyle: 'solid',
        // borderWidth: 5,
        // borderColor: 'blue',
        borderRadius: 10,

    }
});