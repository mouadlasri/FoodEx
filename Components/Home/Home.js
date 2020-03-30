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
            userId: '',
            firstName: '',
            lastName: '',
            profileImage: 'https://ui-avatars.com/api/?name=Mouad+Lasri&rounded=true',
            
        }
    }
    
    
    storeUserId = async () => {
        // await AsyncStorage.setItem('connectedUserId', this.state.userId);
        // console.log('ASync Home Storaeg id => ', this.state.userId);
    }

    retrieveUserId = async () => {
        console.log('');
        var x = await AsyncStorage.getItem('connectedUserId');
        this.setState({ userId: x });

        axios.get(`https://74af6529.ngrok.io/api/Users/${this.state.userId}`).then(response => {
            console.log('Get user data: ', response.data.firstName);
            this.setState({ userId: response.data.userId, firstName: response.data.firstName, lastName: response.data.lastName });
        }).catch(error => console.log(error));
        console.log(' Async storage in retrieve user id function => ', x);

    }
    componentDidMount() {  
        this.retrieveUserId();
    }
    
    render() {
        // console.log(' HOME STATE ID => ', this.props.route.params.test);
        return (
            
            <ScrollView style={{flex: 1}}>
                <View style={{ flex: 1}}>
                
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#3c3c3c' }}>
                        
                        <View style={{ justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Image source={{ uri: 'https://static.lematin.ma/files/lematin/images/articles/2018/06/509b571360adc2cc9b14ac4564b3cd82.gif' }} style={{ height: 160, width: '100%' }} resizeMode='cover' />
                                {/* <Image source={{ uri: 'https://ui-avatars.com/api/?name=Mouad+Lasri&rounded=true' }} style={{ height: 75, width: 75 }} />
                                <View style={{ justifyContent: 'center', paddingLeft: 10}}>
                                    <Text style={{ marginBottom: 2, color: 'white' }}>{this.state.firstName} {this.state.lastName}</Text>
                                    <ProgressBar progress={0.5} color={Colors.red800} style={{ height: 8, borderRadius: 8}}  />
                                </View> */}
                            </View>
                        </View>
                    
                        <View style={{ justifyContent: 'center', marginRight: 20}}>
                            <Text style={{ marginBottom: 2, color: 'white' }}>Logout</Text>
                        </View>

                    </View>
                
                </View>
                <View style={{ flex: 2, backgroundColor: '' }}>
                    {/* <Text style={styles.orderTitle}>Make an Order</Text> */}
                    {/* <Text style={styles.orderTitle}>Restaurants</Text> */}

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
        padding: 5,
        fontSize: 20
    },
    
})