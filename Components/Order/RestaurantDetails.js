import React from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage, Image, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import InputSpinner from 'react-native-input-spinner';
import RestaurantItem from './RestaurantItem';

import * as Font from 'expo-font';

class RestaurantDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantId: null,
            restaurantImage: '',
            restaurantCategoriesItems: null,
            totalItems: null,
            cart: [],
            number: null,
            loading: true
        }
    }
   
  
    updateState = () => {
        this.setState({
            restaurantId: this.props.route.params.restaurantId,
            restaurantImage: this.props.route.params.restaurantImage
        });
    }

    async componentDidMount() {
        // Loading fonts
        await Font.loadAsync({
            'PoppinsRegular': require('../../assets/fonts/Poppins-Regular.ttf'),
            'PoppinsExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
            'RobotoRegular': require('../../assets/fonts/Roboto-Regular.ttf'),
            'RobotoBold': require('../../assets/fonts/Roboto-Bold.ttf'),
            'Pacifico': require('../../assets/fonts/Pacifico-Regular.ttf')
        });

        axios.get(`https://683e9d34.ngrok.io/api/Restaurants/${this.props.route.params.restaurantId}/ItemCategories`).then(response => {
            var results = {};

            // this loop constructs a dictionary based on the item category (ie: 'Paninis': [items])
            // the API does not return nested objects therefore the dictionary is built in client-side
            for (var i = 0; i < response.data.length; i++) {

                var category = response.data[i].categoryName;

                if (results[category] == null) {
                    results[category] = [];
                    results[category].push(response.data[i])

                }
                else if (results[category] != null) {
                    results[category].push(response.data[i]);
                }
            }

            // Update the state with the appropriate data
            this.setState({
                restaurantId: this.props.route.params.restaurantId,
                restaurantImage: this.props.route.params.restaurantImage,
                restaurantCategoriesItems: results,
                totalItems: response.data.length,
                loading: false
            });

        }).catch(error => {console.log(error)});
    }

    addItemToCart = (itemToAdd, quantity) => {
        // Add idem to the cart
        this.setState({
            cart: [...this.state.cart, {'itemId': itemToAdd.itemId, 'itemName': itemToAdd.itemName, 'itemPrice': itemToAdd.itemPrice, 'itemImage': itemToAdd.itemImage, quantity}]
        });

    }

    deleteItem(indexToDelete) {
        console.log('Returned Data in Parent => ', indexToDelete);


        var newCart = this.state.cart.filter((value, index, arr) => {
            return index != indexToDelete
        });

        // console.log(this.state.cart.length);

        this.setState({
            cart: newCart
        });

    }

    // function to clean the current cart of user (after Order is confirmed in the RestaurantComponent)
    // this function is called from RestaurantCart.js
    cleanCart() {
        this.setState({
            cart: []
        });
    }

    goToShoppingCart = () => {
        // console.log('Parent cart content: ', this.state.cart);
        if (this.state.cart.length > 0) {
            this.props.navigation.navigate('RestaurantCart', { 'cart': this.state.cart, 'deleteItem': this.deleteItem.bind(this), 'cleanCart': this.cleanCart.bind(this), 'restaurantId': this.state.restaurantId });
        }
    }


    displayItems = (key) => {
        var items = this.state.restaurantCategoriesItems;
        
        // For each category of items, display all items of that category 
        var results = items[key].map((foodItem, index) => {
            return (
                <RestaurantItem key={index} foodItem={foodItem} cart={this.state.cart} addItemToCart={this.addItemToCart}  />
            )
        });

        return results;
    }


    render() {
        if (this.state.loading) {
            return (
                <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <ActivityIndicator size="large" color="#1A5632" />
                    <Text style={{ color:"#1A5632"}}>Loading...</Text>
                </View>
            )
        }
        else {
            if (this.state.restaurantId != null && this.state.restaurantCategoriesItems != null && this.state.totalItems != null) {
                var itemsData = this.state.restaurantCategoriesItems;
                var results = Object.keys(itemsData).map((key) => {
                    return (
                        <ScrollView style={{ flex: 3, marginLeft: 20, marginTop: 16 }} key={key}>
                            <Text style={{ marginTop: 10, fontSize: 22, fontFamily: 'Pacifico', letterSpacing: 2 }}>{key}</Text>
                            <View style={{ height: 260, borderStyle: 'solid', borderColor: 'black' }}>
                                <ScrollView horizontal={true} contentContainerStyle={{ justifyContent: 'space-between' }} showsHorizontalScrollIndicator={false} >
                                    {/*For each food category display all its items using the function */}
                                    {this.displayItems(key)}

                                </ScrollView>
                            </View>
                            <View style={{ flex: 2, backgroundColor: '' }}>
                                {/* <Text style={styles.orderTitle}>Make an Order</Text> */}
                                {/* Items of that specific category that changes when a category is chosen */}
                            </View>
                            <View style={{ flex: 3, backgroundColor: '' }}>
                            </View>
                        </ScrollView>
                    )
                });
                // console.log('Parent Cart => ', this.state.cart);

                return (
                    <View>
                        <ScrollView >
                            <View>
                                <Image source={{ uri: this.props.route.params.restaurantImage }} style={{ height: 160 }} />
                            </View>
                            {results}
                            {/* {itemsData} */}

                        </ScrollView>

                        {/* Shopping Cart Button to send user to the Shopping Cart screen */}
                        <View style={{ margin: 5, justifyContent: 'center', alignContent: 'center', height: 75, width: 75, backgroundColor: '#F4C430', borderRadius: 50, position: 'absolute', bottom: 0, right: 0 }}>
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => { this.goToShoppingCart() }}>
                                
                                <Text style={{ fontSize: 22 }}>
                                    
                                    {this.state.cart.length}
                                    <Icon name='shopping-cart' size={25} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            }

            else {
                return (<Text></Text>);
            }
        }
       
    }
}


export default RestaurantDetails;

const styles = StyleSheet.create({
    addCartButton: {
        height: 30,
        backgroundColor: '#1A5632',
        alignSelf: 'center',
        marginTop: 5,
        justifyContent: 'center',
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 30 
    },
    addCartButtonText: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'RobotoRegular',
        fontWeight: 'bold'
    },  
    menuItem: {
        // marginTop: 20,
        width: 300,
        height: 240,
        backgroundColor: '#fff',
        marginRight: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        marginTop: 16
    }
   
});