import React from 'react';
import { StyleSheet, Text, View,  TextInput, AsyncStorage, Image, ScrollView, ImageBackground } from 'react-native';
import NumericInput from 'react-native-numeric-input'
// import { Icon } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';


class RestaurantDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantId: '',
            restaurantImage: '',
            restaurantCategories: []
        }
    }
   
  
    updateState = () => {
        this.setState({
            restaurantId: this.props.route.params.restaurantId,
            restaurantImage: this.props.route.params.restaurantImage
        });
    }

    async componentDidMount() {

        await axios.get(`https://9d6a7de6.ngrok.io/api/Restaurants/${this.props.route.params.restaurantId}/ItemCategories`).then(response => {
            console.log('Item Category => ', response.data);
            var ar = []
            var item;
            for ( item in response.data) {
                ar.push(item.categoryId);
            }

            console.log('AARrRR ', ar);
            
            this.setState({
                restaurantId: this.props.route.params.restaurantId,
                restaurantImage: this.props.route.params.restaurantImage,
                restaurantCategories: ar
            });
            // console.log('Restaurant ID => ', this.state.restaurantId);

        }).catch(error => {console.log(error)});
       

        console.log('Image Link => ', this.state.restaurantImage);
        console.log('Restaurant ID => ', this.state.restaurantId);
    }

    render() {
        var c = []
        
        var l = this.state.restaurantCategories.map((restaurant) => {
          
            console.log('C => ', c.push(restaurant.categoryId))
        });
        console.log('CATS => ', c);
        return (
            <ScrollView>
                {l}
            </ScrollView>
            // <ScrollView>
            //     <View>
            //         <Image source={{ uri: this.props.route.params.restaurantImage }} style={{ height: 200 }}/>
            //     </View>
            //     <ScrollView style={{ flex: 3 }}>
            //         <Text style={{ marginTop: 20, marginLeft: 10, fontSize: 20 }}>Paninis</Text>
            //         <View style={{  height: 300, borderStyle: 'solid', borderColor: 'black'}}>
            //             <ScrollView horizontal={true} contentContainerStyle={{ justifyContent: 'space-between' }} showsHorizontalScrollIndicator={false} >
            //                 <View style={styles.menuItem}>
            //                     <View style={{flex: 2}}>
            //                         <Image style={{ flex:1,borderTopRightRadius: 20, borderTopLeftRadius: 20 }} resizeMode='cover' source={{ uri: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/4/2/0/GH0504H_rib-eye-steak-panini-recipe_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371616898935.jpeg' }} />
            //                     </View>
            //                     <View style={{ flex: 1, fontSize: 14}}>
            //                         <Text style={{ margin: 10, marginBottom: 0 }}>Panini Charcuterie</Text>
            //                         <Text style={{ marginLeft: 10 }}>Unit price: 23.20 MAD <Text style={{fontSize:10}}>(+2 MAD to go)</Text> </Text>
            //                     </View>
            //                     <View style={{ flex: 1, justifyContent: 'center', flexDirection:'row', justifyContent: 'space-between'}}>
            //                         <View style={{paddingTop: 5, paddingLeft: 10, alignSelf: 'flex-start'}} >
            //                             <NumericInput
            //                                 totalWidth={100}
            //                                 totalHeight={40}
            //                                 iconSize={50}
            //                                 rounded
            //                                 textColor='#B0228C'
            //                                 iconStyle={{ color: 'white' }}
            //                                 rightButtonBackgroundColor='#EA3788'
            //                                 leftButtonBackgroundColor='#E56B70' />
            //                         </View>
            //                         <View style={{ paddingTop: 5, paddingRight: 10, alignSelf: 'stretch' }}>
            //                             <Button
            //                                 raised
            //                                 titleStyle={{fontSize: 13, paddingTop: 4}}
            //                                 fontSize={8}
            //                                 type='solid'
            //                                 title="Total: 23.20"
            //                                 titleProps={{fontSize: 10, color: 'red'}}
            //                                 icon={
            //                                     <Icon
            //                                         name="shopping-cart"
            //                                         size={20}
            //                                         color="white"
            //                                         style={{marginLeft: 5}}
            //                                     />
            //                                 }
            //                                 iconRight={true}
            //                             />
            //                         </View>
            //                     </View>
            //                 </View>
            //                 <View  style={styles.menuItem}>

            //                 </View>
            //             </ScrollView>
            //         </View>
            //         <View style={{ flex: 2, backgroundColor: '' }}>
            //             {/* <Text style={styles.orderTitle}>Make an Order</Text> */}
            //             {/* Items of that specific category that changes when a category is chosen */}
            //         </View>
            //         <View style={{ flex: 3, backgroundColor: '' }}>
            //         </View>
            //     </ScrollView>
            // </ScrollView>
        );
    }
}


export default RestaurantDetails;

const styles = StyleSheet.create({
    menuItem: {
        width: 260,
        height: 200,
        backgroundColor: '#fff',
        margin: 10,
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