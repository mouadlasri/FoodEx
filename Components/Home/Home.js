import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, ScrollView, ImageBackground} from 'react-native';
import { TextField } from '@material-ui/core';
import { NavigationContainer } from '@react-navigation/native';
import { ProgressBar, Colors } from 'react-native-paper';
import HomeRestaurants from './HomeRestaurants';
import RecentActivity from './RecentActivity';
import Drawer from '@material-ui/core/Drawer';
import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.navigation.getParam('connectedUserId'),
            firstName: '',
            lastName: '',
            profileImage: 'https://ui-avatars.com/api/?name=Mouad+Lasri&rounded=true',
            
        }
    }
    
    storeUserId = async () => {
        await AsyncStorage.setItem('connectedUserId', this.state.userId);
        console.log('ASync Home Storaeg id => ', this.state.userId);
    }

    componentDidMount() {  
        // axios.get(`https://localhost:44312/api/Users/${this.state.userId}`).then(response => {
        //     console.log('Get user data: ', response.data);
        //     this.setState({ userId: response.data.userId });
        // });
        axios.get(`https://e3378e38.ngrok.io/api/Users/67887`).then(response => {
            // console.log('Get user data: ', response.data);
            this.setState({ userId: response.data.userId, firstName: response.data.firstName, lastName: response.data.lastName });
        });
        this.storeUserId();
    }
    
    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <View style={{ flex: 1, backgroundColor: '#1D1D1B'}}>
                
                    <View style={{ flexDirection: 'row', paddingTop: 36, paddingBottom: 16, paddingLeft: 10, justifyContent: 'space-between'}}>
                        <View style={{ justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                                <Image source={{ uri: 'https://ui-avatars.com/api/?name=Mouad+Lasri&rounded=true' }} style={{ height: 75, width: 75 }} />
                                <View style={{ justifyContent: 'center', paddingLeft: 10}}>
                                    <Text style={{ marginBottom: 2, color: 'white' }}>{this.state.firstName} {this.state.lastName}</Text>
                                    <ProgressBar progress={0.5} color={Colors.red800} style={{ height: 8, borderRadius: 8}}  />
                                </View>
                            </View>
                        </View>
                    
                        <View style={{ justifyContent: 'center', marginRight: 20}}>
                            <Text style={{ marginBottom: 2, color: 'white' }}>Logout</Text>
                        </View>

                    </View>
                
                </View>
                <View style={{ flex: 2, backgroundColor: '' }}>
                    {/* <Text style={styles.orderTitle}>Make an Order</Text> */}
                    <Text style={styles.orderTitle}>Restaurants</Text>

                    <HomeRestaurants navigation={this.props.navigation}/>
                </View>
                <View style={{ flex: 3, backgroundColor: '' }}>
                    <RecentActivity />
                </View>
                <View style={{flex: 1}}>
                    <Text>ID of user: {this.state.userId}</Text>
                </View>
            </ScrollView>
        );
    }
}

export default Home;

const styles = StyleSheet.create({
   
    orderTitle: {
        margin: 10,
        marginLeft: 30,
        // borderStyle: 'solid',
        // borderWidth: 0.5,
        // borderColor: '#000',
        alignSelf: 'flex-start',
        padding: 5
    },
    
})