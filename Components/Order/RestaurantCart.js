import React from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage, Image, ScrollView, ImageBackground } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import InputSpinner from 'react-native-input-spinner';
import { ListItem } from 'react-native-elements'


import * as Font from 'expo-font';

class RestaurantCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: null
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
        console.log('Restaurant Cart Component cart => ', this.state.cart);

        this.setState({
            cart: this.props.route.params.cart
        })

    }

    
    render() {
        if (this.state.cart != null) {
            this.state.cart.map((l, i) => {
                console.log('Cart State => ', l);
            });

            return (
                <View>
                    {
                        this.state.cart.map((cartItem, index) => (
                            <View style={styles.cartItemContainer}>
                                {/* Avatar */}
                                <View style={styles.avatarContainer} >
                                    <Image style={{ width: 80, height: 80, borderRadius: 100  }} resizeMode='cover' source={{ uri: 'https://ui-avatars.com/api/?name=Mouad+Lasri' }} />
                                </View>
                                
                                <View style={{ marginTop: 20, alignSelf: 'flex-start', width: 230 }}>
                                    <View style={styles.deleteItemButton}>
                                        <TouchableOpacity style={{ alignItems: 'center'}}>
                                            <Icon name='trash' size={30} color={'#c20000'}></Icon>
                                        </TouchableOpacity>
                                    </View>
                                    
                                        <Text style={{ fontSize: 20, marginBottom: 3 }}>{cartItem.itemName}</Text>
                                        <Text style={{ marginBottom: 3 }}>Quantity: {cartItem.quantity}</Text>
                                       
                                        <Text>Price: {parseFloat(cartItem.itemPrice).toFixed(2)} x {cartItem.quantity} = <Text style={{ fontWeight: 'bold', color: '#1A5632' }}>{parseFloat((cartItem.itemPrice) * parseFloat(cartItem.quantity)).toFixed(2)}</Text></Text>
                                    </View>
                               
                                
                            </View>
                        ))
                    }
                </View>
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
        paddingLeft: 55,
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
        top: 16,
        right: 0,
        justifyContent: 'center',
        borderRadius: 100,
    }

});