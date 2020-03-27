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
        axios.get(`https://702a3cd4.ngrok.io/api/Restaurants/${this.props.route.params.restaurantId}/ItemCategories`).then(response => {
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
        console.log('Parent Item Added to acrt => ', itemToAdd);
        console.log('Parent Quantity Added to Cart => ', quantity);
        // console.log('Parent Item added to cart => ', itemToAdd);
        // console.log('Parent Quantity added to cart => ', this.state.number);
        this.setState({
            cart: [...this.state.cart, {itemToAdd, quantity}]
        });
    }
   
    displayItems = (key) => {
        var items = this.state.restaurantCategoriesItems;

        var results = items[key].map((foodItem) => {
            // console.log('T => ', t);
            return (
                // <Text>{t.itemName}</Text>

                <RestaurantItem foodItem={foodItem} cart={this.state.cart} addItemToCart={this.addItemToCart} />

                // <View style={styles.menuItem} key={foodItem.itemName}>
                //     <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#F4C430', elevation: 10, zIndex: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10}}>
                //         <Text style={{padding: 8}}>~15 min</Text>
                //     </View>
                //     <View style={{ flex: 3, position: 'relative', elevation: 1 }}>
                //         <Image style={{ flex: 1, borderTopRightRadius: 20, borderTopLeftRadius: 20 }} resizeMode='cover' source={{ uri: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/4/2/0/GH0504H_rib-eye-steak-panini-recipe_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371616898935.jpeg' }} />   
                //     </View>
                //     <View style={{ flex: 1, fontSize: 14 }}>
                //         <Text style={{ margin: 10, marginBottom: 0 }}>{foodItem.itemName}</Text>
                //         <Text style={{ marginLeft: 10, fontSize: 12, color: 'rgba(0, 0, 0, 0.5)', fontFamily: 'Roboto' }}>Unit price: <Text style={{ color: 'rgba(26,86,50,1)', fontWeight: 'bold' }}>{foodItem.itemPrice}</Text> MAD <Text style={{ fontSize: 10 }}>(+2 MAD to go)</Text> </Text>
                //     </View>
                    
                //     <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                //         <View style={{ marginTop: 12, paddingLeft: 10, alignSelf: 'flex-start' }} >
                //             <InputSpinner
                //                 max={10}
                //                 min={0}
                //                 step={1}
                //                 colorMax={"#f04048"}
                //                 // colorMin={"#40c5f4"}
                //                 value={this.state.number}
                //                 // buttonFontSize={30}
                //                 buttonStyle={{ width: 30, height: 30 }}
                //                 // width={90}
                //                 inputStyle={{ color: 'black', paddingBottom: 20 }}
                //                 style={{width: 90}}
                //                 fontSize={20}
                //                 onChange={(num) => { this.setState({number: num}) }} />
                //             {/* <Text style={{ color: 'black'}}>Available</Text> */}
                //         </View>

                //         <View style={{ paddingTop: 5, paddingRight: 10, alignSelf: 'stretch' }}>
                //             <TouchableOpacity style={styles.addCartButton} onPress={() => {
                //                 this.addItemToCart({
                //                     itemId: foodItem.itemId,
                //                     itemName: foodItem.itemName
                //             })}}>
                //                 <Text style={styles.addCartButtonText}>ADD TO CART</Text>
                //             </TouchableOpacity>
                           
                //         </View>
                       
                //     </View>
                    
                // </View>
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
            console.log('Parent Cart => ', this.state.cart);

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
                        <TouchableOpacity style={{ alignSelf: 'center' }}>

                            <Text style={{ fontSize: 20 }}>

                                {this.state.cart.length}
                                <Icon name='shopping-cart'  size={20}/>

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