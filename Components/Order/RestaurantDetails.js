import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, ScrollView, ImageBackground } from 'react-native';


class RestaurantDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantData: null
        }
    }
   
    componentDidMount() {
        // axios.get(`https://localhost:44312/api/Users/${this.state.userId}`).then(response => {
        var test = this.props.navigation.getParam('restaurantData');
        this.setState({ restaurantData: this.props.navigation.getParam('restaurantData') });
        console.log('Restaurant Details => ', test);

    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: '#1D1D1B' }}>

                </View>
                <View style={{ flex: 2, backgroundColor: '' }}>
                    {/* <Text style={styles.orderTitle}>Make an Order</Text> */}

                </View>
                <View style={{ flex: 3, backgroundColor: '' }}>
                </View>
            </ScrollView>
        );
    }
}


export default RestaurantDetails;

const styles = StyleSheet.create({

   
});