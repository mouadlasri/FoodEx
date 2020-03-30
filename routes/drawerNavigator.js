import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerView} from '@react-navigation/drawer';
import Home from '../Components/Home/Home';
import Profile from '../Components/User/Profile';
import RestaurantDetails from '../Components/Order/RestaurantDetails';
import RestaurantCart from '../Components/Order/RestaurantCart';
import { Divider, ListItem } from 'react-native-elements';
import axios from 'axios';
import { ProgressBar, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import testComponent from './testComponent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function DrawerContent(props) {

    return (
        <View {...props} style={{height: '100%'}}>
            <View style={{ margin: 0, marginTop: 15, justifyContent: 'space-between' }}>
                
                <ListItem
                    containerStyle={{ }}
                        leftAvatar={{ size:'large', source: { uri: props.avatarImage } }}
                    title={`${props.firstName} ${props.lastName}`}
                    titleStyle={{}}
                        subtitle={'progress bar here'}
                    />
                {/* <Divider style={{ height: 1, width: '80%', alignSelf: 'center', backgroundColor: '#c3c3c3', marginTop: 15, marginBottom: 15 }} /> */}
            </View> 
            <Divider style={{ height: 1, width: '80%', backgroundColor: '#c3c3c3', alignSelf: 'center', marginTop: 10, marginBottom: 20 }} />

            <View style={{}}>
                <DrawerItemList {...props} />
                <Divider style={{ height: 1, width: '80%', backgroundColor: '#c3c3c3', alignSelf: 'center', marginTop: 20 }} />
                <DrawerItem
                    icon={() => <Icon name={'power-off'} size={20} color={'crimson'} />}

                    label="Log out"
                    onPress={() => props.navigation.closeDrawer()}
                />
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
            avatarImage: 'default'
        }
     }
     
     retrieveUserId = async () => {
         console.log('');
         var x = await AsyncStorage.getItem('connectedUserId');
         console.log('Drawer Async User ID=> ', x);
         this.setState({ userId: x });

         axios.get(`https://79950a69.ngrok.io/api/Users/${this.state.userId}`).then(response => {
             console.log('Get user data: ', response.data.firstName);
             this.setState({
                 userId: response.data.userId,
                 firstName: response.data.firstName,
                 lastName: response.data.lastName,
                 avatarImage: `https://ui-avatars.com/api/?name=${response.data.firstName}+${response.data.lastName}&rounded=true&size=100`
             });
         }).catch(error => console.log(error));
     }

     componentDidMount() {
        this.retrieveUserId();
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
                        name={'home'}></Icon>
                }} />
                <Drawer.Screen name="Detailed Analytics" options={{ headerShown: false }} component={Profile} options={{
                    drawerIcon: config => <Icon
                        size={23}
                        name={'bar-chart'}></Icon>
                }}/>
                <Drawer.Screen name="Order History" options={{ headerShown: false }} component={Profile} options={{
                    drawerIcon: config => <Icon
                        style={{marginRight: 3}}
                        size={28}
                        name={'history'}></Icon>
                }} />
                <Drawer.Screen name="Contact Us!" options={{ headerShown: false }} component={Profile} options={{
                    drawerIcon: config => <Icon
                        size={23}
                        style={{ marginRight: 5 }}

                        name={'envelope'}></Icon>
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
    }
});
