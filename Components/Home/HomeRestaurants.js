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
            selectedRestaurantId: '',
            fontLoaded: false
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
        }).then(() => this.setState({fontLoaded: true}))
    }

    componentDidMount() {
        this.loadFonts();
      
        axios.get(`https://6f212dcd.ngrok.io/api/Restaurants/`).then(response => {
            // console.log('Get Restaurant data: ', response.data);
            this.setState({ restaurantData: response.data });
            // console.log('Restaurant State Data: ', this.state.restaurantData);
        }).catch(error => { console.log(error) });
    }

   
    
    // Dynamically change the styling of the waiting time
    waitingTimeStyle = (waitingTime) => {
        // console.log('Waiting Time => ', waitingTime);
        switch (waitingTime) {
            // fontfamily: 'Roboto', fontSize: 30, fontWeight: 'bold'
            case 'Long':
                return { color: 'crimson', fontWeight: 'bold' }
            case 'Medium':
                return { color: '#F5B335', fontWeight: 'bold'}
            case 'Low':
                return { color: '#1A5632', fontWeight: 'bold'}
        }
    }

    
    render() {
        
        if (this.state.restaurantData != null && this.state.fontLoaded == true) {
            // console.log('STATE of Restaqurant Data => ', this.state.restaurantData);
            const resultRestaurantList = this.state.restaurantData.map((restaurant) => {
                return (
                    <View style={{ flex: 1, height: 135, marginRight: 25, marginLeft: 25, marginBottom: 20 }} key={restaurant.restaurantId}>
                        <TouchableOpacity onPress={() => { this.orderHandler(restaurant.restaurantId, restaurant.imageLink) }}>
                            <ImageBackground style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }} resizeMode='cover' source={{ uri: restaurant.imageLink }}>
                               
                                <View style={{ alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)', height: '100%', width: '100%', justifyContent: 'center' }}>
                                    
                                    <Text style={{ fontFamily: 'Pacifico', color: 'white', fontSize: 20, fontWeight: 'bold' }}>{restaurant.restaurantName}</Text>
                                    {/* <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name='home' size={20} color={'white'} style={{marginRight: 5}}></Icon>
                                        <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>{restaurant.restaurantLocation}</Text>
                                    </View> */}
                                    
                                </View>
                                
                            </ImageBackground>
                        </TouchableOpacity>
                       
                    </View> 
                )
            });

            return (
                <View style={{ flex: 1 }}>
                    <ScrollView>
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