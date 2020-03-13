import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import Home from '../Components/Home/Home';
import Login from '../Components/Registration/Login';
import RestaurantDetails from '../Components/Order/RestaurantDetails';

const screens = {
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login
    },
   
    RestaurantDetails: {
        screen: RestaurantDetails,
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);