import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet, Text, View, Button,  Image, TouchableOpacity, AsyncStorage, ImageBackground } from 'react-native';
import axios from 'axios';
import Home from '../Home/Home';
import DrawerNavigator from '../../routes/drawerNavigator';
import { TextInput } from 'react-native-paper';
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
        axios.post('https://79950a69.ngrok.io/api/Users', this.state).then(response => {
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
        await AsyncStorage.setItem('connectedUserId', x.toString());
    }
    getUserId = async () => {
        let x = await AsyncStorage.getItem('connectedUserId');
        console.log('STORAGE => ', x);
    }

    render() {
        const { userId, userPassword, authFlag, errorMessage } = this.state;

        if (authFlag) {
            return (
                <DrawerNavigator connectedUserId={this.userId}/>
                // <Home userId={this.state.userId}/>
            )
        }
        else {
            return (

                <ImageBackground style={{
                    backgroundColor: '#ccc',
                    flex: 1,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                }}
                    source={{ uri: 'https://wallpapershome.com/images/pages/pic_v/12115.jpg' }}>
                    <View style={styles.loginContainer}>
                        <Text style={{ justifyContent: 'center', textAlign: 'center', fontSize: 20}}>Welcome to</Text>
                        <Text style={{ justifyContent: 'center' , textAlign: 'center', fontSize: 56, fontFamily: 'Roboto'}}>foodeX</Text>
                        <TextInput theme={{ colors: { primary: 'black' } }} mode={'flat'} name='userId' label='Username' value={this.state.userId} onChange={this.changeUserIdHandler} style={styles.input}  />
                        <TextInput theme={{ colors: { primary: 'black' } }} mode={'flat'} type='password' name='userPassword' label='Password' value={this.state.userPassword} onChange={this.changeUserPasswordHandler} style={styles.input} />
                        <Text>{errorMessage}</Text>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={this.submitHandler}>
                            <Text style={styles.submitButtonText}> Submit </Text>
                        </TouchableOpacity>
                    </View>
                   
                </ImageBackground>
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
        backgroundColor: 'rgba(255,255,255,0)',
        color: 'black',
    
    },
    submitButton: {
        backgroundColor: '#1A5632',
        textAlign: 'center',
        justifyContent: 'center',
        padding: 25,
        marginLeft: 15,
        marginRight: 15,
        height: 40,
        borderRadius: 10
        
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
        // padding: 10,
        // marginBottom: 20
    },
    loginContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        margin: 40,
        borderRadius: 15,
        height: '60%',
        padding: 25
    }
})