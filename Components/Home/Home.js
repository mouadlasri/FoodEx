import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, ScrollView, ImageBackground, Dimensions} from 'react-native';
import { TextField } from '@material-ui/core';
import { NavigationContainer } from '@react-navigation/native';
import { ProgressBar, Colors } from 'react-native-paper';
import Drawer from '@material-ui/core/Drawer';
import axios from 'axios';
import { Divider } from 'react-native-elements';

// Components
import HomeRestaurants from './HomeRestaurants';
import RecentActivity from './RecentActivity';
import FoodexLogo from '../Logo/FoodexLogo';

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
    
    
    retrieveUserId = async () => {
        console.log('');
        var x = await AsyncStorage.getItem('connectedUserId');
        this.setState({ userId: x });

        axios.get(`https://6f212dcd.ngrok.io/api/Users/${this.state.userId}`).then(response => {
            // console.log('Get user data: ', response.data.firstName);
            this.setState({ userId: response.data.userId, firstName: response.data.firstName, lastName: response.data.lastName });
        }).catch(error => console.log(error));
        // console.log(' Async storage in retrieve user id function => ', x);

    }
    componentDidMount() {  
        this.retrieveUserId();
    }
    
    render() {
        // console.log(' HOME STATE ID => ', this.props.route.params.test);
        return (
            <View style={{ flex: 1 }}>
                {/* Green Header */}
                <View style={{ position: 'absolute', top: 0, right: 0, left: 0, height: 25, backgroundColor: '#1A5632', elevation: 10 }}>

                </View>
                <View style={{ height: 100, marginTop: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                    <FoodexLogo />
                    <Divider style={{ height: 3, backgroundColor: 'black', width: '10%', marginTop: 10}} />
                </View>
                <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ flex: 1 }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                            <View style={{ justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    
                                </View>
                            </View>

                            <View style={{ justifyContent: 'center', marginRight: 20 }}>
                                <Text style={{ marginBottom: 2, color: 'white' }}>Logout</Text>
                            </View>

                        </View>

                    </View>
                    {/* <View style={{ flex: 2, marginLeft: 16 }}>
                        <RecentActivity />
                    </View> */}
                    <View style={{ flex: 2, backgroundColor: 'white' }}>
                        <HomeRestaurants navigation={this.props.navigation} />
                    </View>

                </ScrollView>
                {/* Green Footer */}
                <View style={styles.footer}>
                    <Text style={{ color: 'white' }}>{'\u00A9'} Mouad Lasri - 2020</Text>
                </View>
            </View>
            
        );
    }
}

export default Home;

const styles = StyleSheet.create({
   
    orderTitle: {
        margin: 10,
        marginLeft: 30,
        alignSelf: 'flex-start',
        padding: 5,
        fontSize: 20
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 50,
        backgroundColor: '#1A5632',
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    }
    
})