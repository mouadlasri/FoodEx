import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, Dimensions, TouchableOpacity } from 'react-native';
import { TextField } from '@material-ui/core';
import { NavigationContainer } from '@react-navigation/native';
import { ProgressBar, Colors } from 'react-native-paper';
import { Card, Title, Paragraph } from 'react-native-paper';
import Drawer from '@material-ui/core/Drawer';
import Carousel from 'react-native-snap-carousel';

import axios from 'axios';

class HomeRestaurants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            restaurantData: [],
            selectedRestaurantId: ''
        }
        
        this._renderItem = this._renderItem.bind(this);
    }

    orderHandler =  () => {
        // this.props.navigation.navigate('Login');
        this.props.navigation.navigate('RestaurantDetails');

        console.log(`====================== ORDER HAAAAAAAAAANDLER==================== `);
    }

    componentDidMount() {
        axios.get(`https://9d6a7de6.ngrok.io/api/Restaurants/`).then(response => {
            // console.log('Get Restaurant data: ', response.data);
            this.setState({ restaurantData: response.data });
            console.log('Restaurant State Data: ', this.state.restaurantData);
        }).catch(error => { console.log(error) });

        // axios.get('http:/')
    }

   
   
    _renderItem({ item, index }) {
        // console.log('ITEM => ', item);
        return (
            <View style={styles.slide} style={{ flex: 1, backgroundColor: 'black', borderRadius: 10 }}>
                <Card>
                    <Card.Cover source={{ uri: item.imageLink}} />
                    <Card.Content>
                        <Title style={{marginTop: 20}}>{item.restaurantName}</Title>
                        <Paragraph>Located in {item.restaurantLocation}</Paragraph>
                        <Paragraph>{item.restaurantDescription}</Paragraph>
                        <Paragraph style={{ marginBottom: 20 }}>Average Waiting Time: {item.waitingTime}</Paragraph>
                        {/* <Button title="Make an order" style={{ marginTop: 20 }} key={index} onPress={this.orderHandler} ></Button> */}

                        <TouchableOpacity style={styles.orderButton}
                            onPress={() => { 
                                this.props.navigation.navigate('RestaurantDetails', {'restaurantId': item.restaurantId, 'restaurantImage': item.imageLink});
                            }} >
                            <Text style={styles.orderButtonText}>Make an order</Text>
                        </TouchableOpacity>
                        {/* <Button title="Make an order" style={{ marginTop: 20 }} onClick={this.orderHandler}></Button> */}
                    </Card.Content>
                </Card>
            </View>
        );
    }
   
    render() {
        
        return (
            <View style={styles.homeRestaurantsContainer}>

                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.restaurantData}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    // onClick={this.orderHandler}
                />

            </View>
        );
    }
}

export default HomeRestaurants;

const horizontalMargin = 20;
const slideWidth = 250;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 300;
const styles = StyleSheet.create({
    homeRestaurantsContainer: {
        // borderStyle: 'solid',
        // borderWidth: 1,
        // borderColor: '#000',
        marginTop: 5,
        // height: 340,
        
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
    }
});