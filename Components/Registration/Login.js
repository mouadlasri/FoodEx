import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { TextField } from '@material-ui/core';
import { NavigationContainer } from '@react-navigation/native';
// import { Alert } from '@material-ui/core/';

import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            userPassword: '',
            authFlag: false
        }
    } 

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = async (e) => {
        e.preventDefault();
        console.log("CURRENT STATE => ", this.state)

        // var responseStatus = await axios.post('https://localhost:44312/api/Users/', this.state);
        axios.post('https://localhost:44312/api/Users/', this.state).then(response => {
            console.log('STATUS => ', response.status);
            console.log('User Found!');
            this.props.navigate
        }).catch(error => {
            console.log('Error: ', error.response);
            this.setState({ authFlag: true });
        });
          
 
        // console.log("RESPONSE => ", responseStatus);
    }

    render() {
        const { userId, userPassword, authFlag } = this.state;

        return (
            <NavigationContainer>
                <View>
                    <Text>Login Page</Text>
                    <TextField type='text' name='userId' label="Username" value={userId} onChange={this.changeHandler} />
                    <TextField type='password' name='userPassword' label="Password" value={userPassword} style={{ margin: '20px 0px' }} onChange={this.changeHandler} />
                    <Button type='submit' title='submit' onPress={this.submitHandler} style={{ marginTop: '40px' }}>Submit</Button>
                    {authFlag ? <Text>Wrong Credentials! Please try again.</Text> : <Text></Text>}
                </View>
            </NavigationContainer>
        );
    }
}

export default Login;