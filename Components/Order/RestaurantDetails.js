import React from 'react';
import { StyleSheet, Text, View,  TextInput, AsyncStorage, Image, ScrollView, ImageBackground } from 'react-native';
import NumericInput from 'react-native-numeric-input'
// import { Icon } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';


class RestaurantDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantId: null,
            restaurantImage: '',
            restaurantCategoriesItems: null,
            totalItems: null
        }
    }
   
  
    updateState = () => {
        this.setState({
            restaurantId: this.props.route.params.restaurantId,
            restaurantImage: this.props.route.params.restaurantImage
        });
    }

    componentDidMount() {
        console.log('DETAILED RESTAURANT ID => ', this.props.route.params.restaurantId);
        axios.get(`https://330d4cee.ngrok.io/api/Restaurants/${this.props.route.params.restaurantId}/ItemCategories`).then(response => {
            // console.log('Item Category => ', response.data);
            console.log('TOTAL ITEMS => ', response.data.length);
            var results = {}; // m

            for (var i = 0; i < response.data.length; i++) {
                // console.log(p[i]);
                var category = response.data[i].categoryName;
                // console.log('Category => ', category);
                if (results[category] == null) {
                    // console.log('true');
                    results[category] = [];
                    results[category].push(response.data[i])

                }
                else if (results[category] != null) {
                    // console.log('test');
                    results[category].push(response.data[i]);
                }
            }

            this.setState({
                restaurantId: this.props.route.params.restaurantId,
                restaurantImage: this.props.route.params.restaurantImage,
                // restaurantCategoriesItems: response.data
                restaurantCategoriesItems: results,
                totalItems: response.data.length
            });
            // console.log('Restaurant ID => ', this.state.restaurantId);

        }).catch(error => {console.log(error)});
       

        // console.log('Image Link => ', this.state.restaurantImage);
        // console.log('Restaurant ID => ', this.state.restaurantId);
    }

   
    displayItems = (key) => {
        var items = this.state.restaurantCategoriesItems;

        var results = items[key].map((foodItem) => {
            // console.log('T => ', t);
            return (
                // <Text>{t.itemName}</Text>
                <View style={styles.menuItem}>
                    <View style={{ flex: 3, position: 'relative', elevation: 1 }}>
                        <Image style={{ flex: 1, borderTopRightRadius: 20, borderTopLeftRadius: 20 }} resizeMode='cover' source={{ uri: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/4/2/0/GH0504H_rib-eye-steak-panini-recipe_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371616898935.jpeg' }} />   
                    </View>
                    <View style={{ flex: 1, fontSize: 14 }}>
                        <Text style={{ margin: 10, marginBottom: 0 }}>{foodItem.itemName}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 12, color: 'rgba(0, 0, 0, 0.5)', fontFamily: 'Roboto' }}>Unit price: <Text style={{ color: 'rgba(26,86,50,1)', fontWeight: 'bold' }}>{foodItem.itemprice}</Text> MAD <Text style={{ fontSize: 10 }}>(+2 MAD to go)</Text> </Text>
                    </View>
                    
                    <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ paddingTop: 5, paddingLeft: 10, alignSelf: 'flex-start' }} >
                         
                        </View>
                        <View style={{ paddingTop: 5, paddingRight: 10, alignSelf: 'stretch' }}>
                            <TouchableOpacity style={styles.addCartButton}>
                                <Text style={styles.addCartButtonText}>Add to cart</Text>
                            </TouchableOpacity>
                           
                        </View>
                       
                    </View>
                    
                </View>
            )
        });

        return results;
        
    }

    render() {
        
        if (this.state.restaurantId != null && this.state.restaurantCategoriesItems != null && this.state.totalItems != null) {
            var itemsData = this.state.restaurantCategoriesItems;
            var results = Object.keys(itemsData).map((key) => {
                return (
                    <ScrollView style={{ flex: 3, marginLeft: 20 }}>
                        <Text style={{ marginTop: 10, fontSize: 20 }}>{key}</Text>
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

            return (
                <ScrollView>
                    <View>
                        <Image source={{ uri: this.props.route.params.restaurantImage }} style={{ height: 160 }}/>
                    </View>
                    {results}
                    {/* {itemsData} */}
                </ScrollView>
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
        fontFamily: 'System',
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