import React from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import InputSpinner from 'react-native-input-spinner';
import { ListItem } from 'react-native-elements'
import Modal from 'react-native-modal';

import * as Font from 'expo-font';
import zIndex from '@material-ui/core/styles/zIndex';

class RestaurantCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: null,
            total: null,
            connectedUserId: null,
            restaurantId: null,
            isModalVisible: false,
            orderId: null
        }
    }


    async componentDidMount() {
        // Loading fonts
        await Font.loadAsync({
            'PoppinsRegular': require('../../assets/fonts/Poppins-Regular.ttf'),
            'PoppinsExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
            'RobotoRegular': require('../../assets/fonts/Roboto-Regular.ttf'),
            'RobotoBold': require('../../assets/fonts/Roboto-Bold.ttf')
        });
        
        var userId = await AsyncStorage.getItem('connectedUserId');
        console.log('USER ID ====> ', userId);
        
        this.setState({
            cart: this.props.route.params.cart, // accessing the cart sent from RestaurantDetails Component
            total: null,
            connectedUserId: userId,
            restaurantId: this.props.route.params.restaurantId
        });

        console.log('State user ID : ', this.state.connectedUserId);

        // Counting the total amount of all items in the cart
        const total = this.countCartTotal();

        // Updating the cart again with the right total
        this.setState({
            total: total
        });

    }

    countCartTotal = () => {
        // Count the total of all items * their quantities using reduce function, starting value is = 0
        const cartAmountTotal = this.state.cart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.itemPrice * currentValue.quantity;
        }, 0);
        
        return cartAmountTotal;
    }


    // Function to delete an item from the cart when user removes it from his order
    deleteItemFromCart =  async (itemIndex) => {
        console.log('Index of item to delete: ', itemIndex);
      
        // Filter the existing cart on the item of the item that needs to be deleted
        var newCart = await this.state.cart.filter((value, index, arr) => {
            return index != itemIndex
        });

        console.log('New Cart => ', newCart);
        
        // Modify the state of cart
        this.setState({
            cart: newCart
        });

        // Count the cart total again
        var newTotal = await this.countCartTotal();
        
        // modify the state of total
        this.setState({
            total: newTotal
        });

        console.log('New Total State => ', this.state.total);

        this.props.route.params.deleteItem(itemIndex);
    }
     

    // function to toggle the Order Confirmation modal on top of the view
    toggleModalConfirmation = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        console.log(' Modal State : ', this.state.isModalVisible);
    }

    // function to return back to restaurant details page after closing the modal (successfull order placed)
    goBackToRestaurantDetails = () => {
        // clean the cart of child and parent components
        this.setState({
            cart: null
        });
        this.props.route.params.cleanCart();
        this.props.navigation.navigate('RestaurantDetails');
    }

    placeOrder = () => {
        // construct object to send as POST request to the API
        // console.log('Connected User ID => ', this.state.connectedUserId);
        var orderDetails = {
            ItemsList: this.state.cart,
            UserId: this.state.connectedUserId,
            RestaurantId: this.state.restaurantId
        }

        axios.post('https://79950a69.ngrok.io/api/Restaurants/order', orderDetails).then(response => {
            console.log('STATUS => ', response.status);
            console.log('Data => ', response.data);
            // response.data contains the orderId (returned by the API)
            this.setState({
                orderId: response.data
            });

            this.toggleModalConfirmation();
        }).catch(error => {
            console.log('Error: ', error.response);
        });
    }

    render() {
        if (this.state.cart != null && this.state.total != null) {
            this.state.cart.map((l, i) => {
                // console.log('Cart State => ', l);
            });

            return (
                <ImageBackground style={{
                    backgroundColor: 'white',
                    flex: 1,
                    position: 'absolute',
                    width: '100%',
                    height: '100%'
                }}  >
                    <ScrollView style={{ height: '50%'}}>
                        {
                            this.state.cart.map((cartItem, index) => (
                                <View style={styles.cartItemContainer} key={index}>
                                    {/* Avatar */}
                                    <View style={styles.avatarContainer} >
                                        <Image style={{ width: 80, height: 80, borderRadius: 100 }} resizeMode='cover' source={{ uri: cartItem.itemImage }} />
                                    </View>

                                    {/* Top Banner */}
                                    <View style={{ height: 12, backgroundColor: '#1A5632', paddingLeft: 0, borderTopRightRadius: 8, borderTopLeftRadius: 8 }}>

                                    </View>

                                    {/* Main Item Container */}
                                    <View style={{ flex: 1, paddingTop: 10, alignSelf: 'flex-start', width: '85%', paddingLeft: 55 }}>
                                        
                                        {/* Trash Icon */}
                                        <View style={styles.deleteItemButton}>
                                            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.deleteItemFromCart(index)}>
                                                <Icon name='trash' size={30} color={'#c20000'}></Icon>
                                            </TouchableOpacity>
                                        </View>

                                        <Text style={{ fontSize: 20, marginBottom: 3 }}>{cartItem.itemName}</Text>
                                        <Text style={{ marginBottom: 3 }}>Quantity: {cartItem.quantity}</Text>
                                        <Text>Price: {parseFloat(cartItem.itemPrice).toFixed(2)} x {cartItem.quantity} = <Text style={{ fontWeight: 'bold', color: '#1A5632' }}>{parseFloat((cartItem.itemPrice) * parseFloat(cartItem.quantity)).toFixed(2)}</Text></Text>
                                    </View>

                                    {/* Bottom Banner */}
                                    <View style={{height: 10, backgroundColor: '#1A5632', paddingLeft: 0, borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }}>

                                    </View>

                                </View>
                            ))
                        }
                    </ScrollView>

                    <View style={{flex: 1, backgroundColor: 'white', height: '60%', paddingBottom: 50}}>
                        <View style={{marginLeft: 30, marginRight: 30}} >
                            <Text>Order Summary</Text>

                            {
                                this.state.cart.map((cartItem, index) => (
                                    <View style={{  flexDirection: 'row', justifyContent: 'space-between' }} key={index}>
                                        <Text>{cartItem.itemName} x {cartItem.quantity}</Text>
                                        <Text>{parseFloat((cartItem.itemPrice) * parseFloat(cartItem.quantity)).toFixed(2) }</Text>
                                    </View>
                                ))
                            }
                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                                <Text style={{fontSize: 26, fontWeight: 'bold'}}>Total:</Text>
                                <Text style={{fontSize: 26}}>{parseFloat(this.state.total).toFixed(2)}</Text>
                            </View>

                            {/* Place Order Button at the Bottom of the View */}
                            <TouchableOpacity style={styles.placeOrderButton} onPress={() => this.placeOrder()}>
                                    <Icon name='shopping-cart' color={'white'} size={25} style={{ marginRight: 7 }}/>
                                    <Text style={styles.placeOrderText}>Place Order</Text>
                            </TouchableOpacity>

                            <View style={{flex: 1}}>
                                <Modal isVisible={this.state.isModalVisible} style={{alignItems: 'center'}} >
                                    <View style={styles.modalContainer}>
                                        <Icon name='check-circle' color={'#1A5632'} size={55} style={{ marginRight: 7 }} />
                                        <Text>Your order has been placed!</Text>
                                        <Text style={{ marginTop: 5 }}>Order #{this.state.orderId}</Text>
                                        <TouchableOpacity style={styles.returnMainMenuButton} onPress={() => { this.goBackToRestaurantDetails() }}>
                                            <Text style={styles.returnMainMenuText}>Return to menu</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
               
            );
        }
      
        return (
            <View>
                <Text>Your cart is empty.</Text>
            </View>
        )

    }

}


export default RestaurantCart;

const styles = StyleSheet.create({
    cartItemContainer: {
        backgroundColor: 'white',
        height: 120,
        margin: 30,
        marginLeft: 75,
        marginBottom: 0,
        marginTop: 14,
        // paddingLeft: 55,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        borderStyle: 'solid',
        borderWidth: 1.5,
        borderColor: '#1A5632',
        elevation: 10,
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        backgroundColor:'white',
        borderWidth: 2,
        borderColor: '#1A5632',
        position: 'absolute',
        left: -50,
        top: 12,
        width: 90,
        height: 90,
        borderRadius: 100,
        elevation: 10
    },
    deleteItemButton: {
        position: 'absolute',
        backgroundColor: 'transparent',
        width: 46,
        height: 46,
        top: 26,
        right: -30,
        justifyContent: 'center',
        borderRadius: 100,
    },
    placeOrderButton: {
        height: 40,
        backgroundColor: '#1A5632',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 5,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 30,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    placeOrderText: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'RobotoRegular',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
        letterSpacing: 2,
        paddingLeft: 7
    },
    modalContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center', 
        backgroundColor: 'white',
        // height: '20%',
        borderRadius: 10,
        width: '70%',
        paddingTop: 20,
        paddingBottom: 20
    },
    returnMainMenuButton: {
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        paddingLeft: 20,
        // width: '70%',
        backgroundColor: '#1A5632',
        borderRadius: 10,
        
    },
    returnMainMenuText: {
        color: 'white',
        fontFamily: 'RobotoRegular',
        textTransform: 'uppercase',
        // letterSpacing: 1,
        fontSize: 14
    }

});