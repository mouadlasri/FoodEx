import React from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage, Image, ScrollView, ImageBackground } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import InputSpinner from 'react-native-input-spinner';

import * as Font from 'expo-font';

class RestaurantItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 1
        }
    }


    updateState = () => {
        this.setState({
        });
    }

    async componentDidMount() {
        // Loading fonts
        await Font.loadAsync({
            'PoppinsRegular': require('../../assets/fonts/Poppins-Regular.ttf'),
            'PoppinsExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
            'RobotoRegular': require('../../assets/fonts/Roboto-Regular.ttf'),
            'RobotoBold': require('../../assets/fonts/Roboto-Bold.ttf')
        });

        // console.log('Cart from parent => ', this.props.cart);
       
    }

    addItemToCart = (itemToAdd) => {
        console.log('Item added to cart => ', itemToAdd);
        console.log('Quantity added to cart => ', this.state.number);
        this.props.cart.push(itemToAdd);
        console.log('Cart Props => ', this.props.cart);
        // this.setState({
        //     cart: [...this.state.cart, itemToAdd]
        // });
    }
        

    render() {
        return (
            <View style={styles.menuItem} key={this.props.foodItem.itemId}>
                <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#F4C430', elevation: 10, zIndex: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10 }}>
                    <Text style={{ padding: 8 }}>~ {this.props.foodItem.itemWaitingTime} min</Text>
                </View>
                <View style={{ flex: 3, position: 'relative', elevation: 1 }}>
                    <Image style={{ flex: 1, width: '100%', height: '100%' ,borderTopRightRadius: 20, borderTopLeftRadius: 10 }} resizeMode='cover' source={{ uri: this.props.foodItem.itemImage }} />
                </View>
                <View style={{ flex: 1, fontSize: 14 }}>
                    <Text style={{ margin: 10, marginBottom: 0 }}>{this.props.foodItem.itemName}</Text>
                    <Text style={{ marginLeft: 10, fontSize: 12, color: 'rgba(0, 0, 0, 1)', fontFamily: 'Roboto' }}><Text style={{ color: 'rgba(26,86,50,1)', fontWeight: 'bold', fontSize: 14 }}>{this.props.foodItem.itemPrice.toFixed(2)}</Text> MAD <Text style={{ fontSize: 10 }}>(+2 MAD to go)</Text> </Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: 10, paddingLeft: 10, alignSelf: 'flex-start' }} >
                        <InputSpinner
                            max={10}
                            min={1}
                            step={1}
                            colorMax={"#f04048"}
                            // colorMin={"#40c5f4"}
                            value={this.state.number}
                            // buttonFontSize={30}
                            buttonStyle={{ width: 30, height: 30 }}
                            // width={90}
                            inputStyle={{ color: 'black', paddingBottom: 20 }}
                            style={{ width: 90 }}
                            fontSize={20}
                            onChange={(num) => { this.setState({ number: num }) }} />
                        {/* <Text style={{ color: 'black'}}>Available</Text> */}
                    </View>

                    <View style={{ paddingTop: 5, paddingRight: 10, alignSelf: 'stretch' }}>
                        <TouchableOpacity style={styles.addCartButton}
                            onPress={() => {
                                this.props.addItemToCart(
                                    {
                                        itemId: this.props.foodItem.itemId,
                                        itemName: this.props.foodItem.itemName,
                                        itemPrice: this.props.foodItem.itemPrice,
                                        itemImage: this.props.foodItem.itemImage
                                    },
                                    this.state.number
                                )
                            }}>
                            <Text style={styles.addCartButtonText}>ADD TO CART</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        )
        
    }

}


export default RestaurantItem;

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
        shadowColor: "black",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1.25,
        shadowRadius: 10.84,
        elevation: 5,
        borderRadius: 10,
        marginTop: 16
    }

});