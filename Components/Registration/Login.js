import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import axios from 'axios';
import Home from '../Home/Home';
import DrawerNavigator from '../../routes/drawerNavigator';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            userPassword: '',
            authFlag: false,
            errorMessage: ''
        }
    } 

    changeUserIdHandler = (e) => {
        this.setState({
            userId: e.nativeEvent.text
        });
        console.log('UserId change => ', e.nativeEvent.text);
    }

    changeUserPasswordHandler = (e) => {
        this.setState({
            userPassword: e.nativeEvent.text
        });
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log("CURRENT STATE s=> ", this.state);

        // var responseStatus = await axios.post('https://localhost:44312/api/Users/', this.state);
        axios.post('https://e3378e38.ngrok.io/api/Users', this.state).then(response => {
            console.log('STATUS => ', response.status);
            console.log('User Found!, Id => ', response.data.userId);
            // this.props.navigation.navigate('Home', {'connectedUserId': response.userId});
            this.setState({
                authFlag: true,
                userId: response.data.userId
            });

            this.storeUserId(response.data.userId);
            // this.props.navigation.navigate('Home', {connectedUserId: response.data.userId});

        }).catch(error => {
            console.log('Error: ', error.response);
            this.setState({ errorMessage: 'Wrong Credentials! Please try again.' });
        });
          
 
        // console.log("RESPONSE => ", responseStatus);
    }

    removeUserId = async () => {
        AsyncStorage.removeItem('connectedUserId');
    }
    storeUserId = async (x) => {
        // console.log('X => ', x);
        this.removeUserId();
        await AsyncStorage.mergeItem('connectedUserId', x.toString());
    }
    getUserId = async () => {
        let x = await AsyncStorage.getItem('connectedUserId');
        console.log('STORAGE => ', x);
    }

    render() {
        const { userId, userPassword, authFlag, errorMessage } = this.state;

        if (authFlag) {
            return (
                <DrawerNavigator />
                // <Home userId={this.state.userId}/>
            )
        }
        else {
            return (

                <View >
                    <TextInput type='text' name='userId' label='Username' value={this.state.userId} onChange={this.changeUserIdHandler} style={styles.input} />
                    <TextInput type='password' name='userPassword' label='Password' value={this.state.userPassword} onChange={this.changeUserPasswordHandler} style={styles.input} />
                    <Button type='submit' title='submit' onPress={this.submitHandler} styles={styles.submitButton}>Submit</Button>
                    <Text>{errorMessage}</Text>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={this.submitHandler}>
                        <Text style={styles.submitButtonText}> Submit </Text>
                    </TouchableOpacity>
                </View>
            );
        }
       
    }
}

export default Login;

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    }
})