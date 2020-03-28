import React from 'react';
import { StyleSheet, Text, View,  TextInput, AsyncStorage, Image, ScrollView, ImageBackground } from 'react-native';
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
            number: null
        }
    }
   
  
    updateState = () => {
        this.setState({
            restaurantId: this.props.route.params.restaurantId,
            restaurantImage: this.props.route.params.restaurantImage
        });
    }

    async componentDidMount() {
        console.log('DETAILED RESTAURANT ID => ', this.props.route.params.restaurantId);
        // Loading fonts
        await Font.loadAsync({
            'PoppinsRegular': require('../../assets/fonts/Poppins-Regular.ttf'),
            'PoppinsExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
            'RobotoRegular': require('../../assets/fonts/Roboto-Regular.ttf'),
            'RobotoBold': require('../../assets/fonts/Roboto-Bold.ttf')
        });

        axios.get(`https://3e4d4d94.ngrok.io/api/Restaurants/${this.props.route.params.restaurantId}/ItemCategories`).then(response => {
            // console.log('Item Category => ', response.data);
            // console.log('TOTAL ITEMS => ', response.data.length);
            var results = {}; // m

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

            this.setState({
                restaurantId: this.props.route.params.restaurantId,
                restaurantImage: this.props.route.params.restaurantImage,
                restaurantCategoriesItems: results,
                totalItems: response.data.length
            });

        }).catch(error => {console.log(error)});
    }

    addItemToCart = (itemToAdd, quantity) => {
        // console.log('Parent Item Added to acrt => ', itemToAdd);
        // console.log('Parent Quantity Added to Cart => ', quantity);
        // console.log('Parent Item added to cart => ', itemToAdd);
        // console.log('Parent Quantity added to cart => ', this.state.number);
        this.setState({
            cart: [...this.state.cart, {'itemId': itemToAdd.itemId, 'itemName': itemToAdd.itemName, 'itemPrice': itemToAdd.itemPrice, quantity}]
        });
    }
   

    goToShoppingCart = () => {
        console.log('Parent cart content: ', this.state.cart);
        if (this.state.cart.length > 0) {
            this.props.navigation.navigate('RestaurantCart', { 'cart': this.state.cart });
        }
    }


    displayItems = (key) => {
        var items = this.state.restaurantCategoriesItems;

        var results = items[key].map((foodItem) => {
            // console.log('T => ', t);
            return (
                // <Text>{t.itemName}</Text>
                <RestaurantItem foodItem={foodItem} cart={this.state.cart} addItemToCart={this.addItemToCart} />

            )
        });

        return results;
        
    }

    render() {
        
        if (this.state.restaurantId != null && this.state.restaurantCategoriesItems != null && this.state.totalItems != null) {
            var itemsData = this.state.restaurantCategoriesItems;
            var results = Object.keys(itemsData).map((key) => {
                return (
                    <ScrollView style={{ flex: 3, marginLeft: 20, marginTop: 16 }} key={key}>
                        <Text style={{ marginTop: 10, fontSize: 20, fontFamily: 'RobotoBold', textTransform: 'uppercase'}}>{key}</Text>
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
                    <View style={{ margin: 5, justifyContent: 'center', alignContent: 'center', height: 75, width: 75, backgroundColor: '#F4C430', borderRadius: 50, position: 'absolute', bottom: 0, right: 0 }}>
                        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => {this.goToShoppingCart()}}>

                            <Text style={{ fontSize: 20 }}>

                                {this.state.cart.length}
                                <Icon name='shopping-cart' size={20}/>

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