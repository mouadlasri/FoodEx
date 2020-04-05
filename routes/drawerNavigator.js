import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerView } from '@react-navigation/drawer';
import { Divider, ListItem, Badge } from 'react-native-elements';
import axios from 'axios';
import { ProgressBar, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';

import DetailedAnalytics from '../Components/User/DetailedAnalytics';
import Home from '../Components/Home/Home';
import Profile from '../Components/User/Profile';
import RestaurantDetails from '../Components/Order/RestaurantDetails';
import RestaurantCart from '../Components/Order/RestaurantCart';
import ExpensesOverMonths from '../Components/User/AnalyticsCharts/ExpensesOverMonths';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// function that renders the drawer
function DrawerContent(props) {

    return (
        <View {...props} style={{ height: '100%', width: 280 }}>

            {/* Green Header */}
            <View style={{ position: 'absolute', top: 0, right: 0, left: 0, height: 25, backgroundColor: '#1A5632', elevation: 10 }}>

            </View>

            <View style={{ margin: 0, marginTop: 15, justifyContent: 'space-between' }}>
                <ListItem
                    leftAvatar={{ size:'large', source: { uri: props.avatarImage } }}
                    title={`${props.firstName} ${props.lastName}`}
                    titleStyle={{}}
                        subtitle={'progress bar here'}
                    />
                {/* <Divider style={{ height: 1, width: '80%', alignSelf: 'center', backgroundColor: '#c3c3c3', marginTop: 15, marginBottom: 15 }} /> */}
            </View> 
            <Divider style={{ height: 1, width: '80%', backgroundColor: '#c3c3c3', alignSelf: 'center', marginTop: 10, marginBottom: 20 }} />

            <View>
                <DrawerItemList {...props} />
                <Divider style={{ height: 1, width: '80%', backgroundColor: '#c3c3c3', alignSelf: 'center', marginTop: 20 }} />
                <DrawerItem
                    style={{marginTop: 20, paddingTop: 3, paddingBottom: 3, backgroundColor: '#79242F', alignItems: 'center'}}
                    icon={() => <Icon name={'power-off'} size={28} color={'white'} />}
                    labelStyle={{color: 'white', fontWeight: 'bold', textTransform: 'uppercase'}}
                    label="Log out"
                    onPress={() => props.navigation.closeDrawer()} // To Change
                />
            </View>
            
            {/* Green Footer */}
            <View style={styles.footer}>
                <Text style={{ color: 'white' }}>{'\u00A9'} Mouad Lasri - 2020</Text>
            </View>

        </View>
    );
}

 class DrawerNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            firstName: '',
            lastName: '',
            avatarImage: 'default',
            pendingOrders: null,
            completedOrders: null
        }
     }
     
     // retrieve user information
     retrieveUserInformation = async () => {
         console.log('');
         var connectedUserId = await AsyncStorage.getItem('connectedUserId');
         console.log('Drawer Async User ID=> ', connectedUserId);
         this.setState({ userId: connectedUserId });

         await axios.get(`https://683e9d34.ngrok.io/api/Users/${this.state.userId}`).then(response => {
             console.log('Get user data: ', response.data.firstName);
             this.setState({
                 userId: response.data.userId,
                 firstName: response.data.firstName,
                 lastName: response.data.lastName,
                 avatarImage: `https://ui-avatars.com/api/?name=${response.data.firstName}+${response.data.lastName}&rounded=true&size=100`
             });
         }).catch(error => console.log(error));
     }

     // load fonts
     loadFoat = async () => {
         await Font.loadAsync({
             'Pacifico': require('../assets/fonts/Pacifico-Regular.ttf')
         });
    }

     // retrieve pending orders of user
     retrievePendingOrders = () => {
         console.log(' USER ID STATE PENDING: ', this.state.userId);
         axios.get(`https://683e9d34.ngrok.io/api/Users/${this.state.userId}/OrdersPending`).then(response => {
            //  console.log('Response => ', response);
             this.setState({
                 pendingOrders: response.data
             });
         }).catch(error => console.log(error));
     }
     
     // retrieve completed orders of user
     retrieveCompletedOrders = () => {
         axios.get(`https://683e9d34.ngrok.io/api/Users/${this.state.userId}/OrdersCompleted`).then(response => {
            //  console.log('Response => ', response);
             this.setState({
                 completedOrders: response.data
             });
         }).catch(error => console.log(error));
     }
     
     async componentDidMount() {
        // load fonts
        this.loadFoat();
         
        // retrieve user information before calling the next two functions
        await this.retrieveUserInformation();
         
        // retrieve pending orders of users
        this.retrievePendingOrders();

        // retrieve completed orders of users
        this.retrieveCompletedOrders();
         
        console.log("State: ", this.state);

    }
     
    createHomeStack = () => (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="RestaurantDetails" options={{ title: '' }} component={RestaurantDetails} />
            <Stack.Screen name="RestaurantCart" options={{ title: '' }} component={RestaurantCart} />
        </Stack.Navigator>
    );
    
    
    render() {
       
        return (
            <Drawer.Navigator headerShown={true} drawerContent={props => <DrawerContent {...props} firstName={this.state.firstName} lastName={this.state.lastName} avatarImage={this.state.avatarImage}/>}>
                <Drawer.Screen name="Home" children={this.createHomeStack} options={{
                    drawerIcon: config => <Icon
                        size={28}
                        name={'home'}></Icon>,
                    drawerLabel: () => (
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Text>
                                    Home
                                </Text>
                            </View>
                        </View>
                    )
                }} />

                <Drawer.Screen name="Pending Orders" options={{ headerShown: false }} component={Profile} options={{
                    drawerIcon: config => <Icon
                        style={{ marginRight: 3 }}
                        size={28}
                        name={'history'}></Icon>,
                    drawerLabel: () => (
                        <View style={{   flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{alignItems: 'flex-start'}}>
                                <Text>
                                    Pending Orders
                                </Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Badge badgeStyle={{ marginLeft: 10, padding: 5, marginTop: 2}} value={this.state.pendingOrders} status="warning" />
                            </View>
                        </View>
                    )
                }} />

                <Drawer.Screen name="Completed Orders" options={{ headerShown: false }} component={Profile} options={{
                    drawerIcon: config => <Icon
                        size={23}
                        style={{ marginRight: 3 }}
                        name={'envelope'}></Icon>,
                     drawerLabel: () => (
                         <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                             <View style={{ alignItems: 'flex-start' }}>
                                 <Text >
                                    Completed Orders
                                </Text>
                             </View>
                             <View style={{ alignSelf: 'flex-end' }}>
                                 <Badge badgeStyle={{ marginLeft: 10, padding: 5, marginTop: 2}} value={this.state.completedOrders} status="primary" />
                             </View>
                        </View>
                    )
                }} />
                
                <Drawer.Screen name="Detailed Analytics" options={{ headerShown: false }} component={DetailedAnalytics} options={{
                    drawerIcon: config => <Icon
                        size={23}
                        name={'bar-chart'}></Icon>,
                    drawerLabel: () => (
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Text >
                                    Detailed Analytics
                                </Text>
                            </View>
                        </View>
                    )
                }}/>
                
            </Drawer.Navigator>

        );
    }
   
}

export default DrawerNavigator;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
});
