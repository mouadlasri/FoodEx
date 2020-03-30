import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image } from 'react-native';
import { TextField } from '@material-ui/core';
import { NavigationContainer } from '@react-navigation/native';
import { ProgressBar, Colors } from 'react-native-paper';
import Drawer from '@material-ui/core/Drawer';

import axios from 'axios';

class RecentActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    storeUserId = async () => {
        
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.recentActivityContainer}>
                <Text style={styles.recentActivityTitle}>Recent Activity</Text>
                <View style={styles.recentActivityItems}>
                    <Text style={{ marginBottom: 2, justifyContent: 'center', fontSize: 13 }}>Date 19/03/2019 Proxirest Order</Text>
                    <Text style={{ marginBottom: 2, justifyContent: 'center', fontSize: 13 }}>23 xp</Text>

                </View>
            </View>
        );
    }
}

export default RecentActivity;


const styles = StyleSheet.create({
    recentActivityContainer: {
        height: 150,
        margin: 16,
        marginTop: 30
    },
    recentActivityTitle: {
        margin: 10,
        alignSelf: 'flex-start',
        padding: 5,
        fontFamily: 'Pacifico',
        color: '#1A5632',
        fontSize: 20
    },
    recentActivityItems: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderWidth: 0.4,
        borderColor: '#3c3c3c',
        padding: 5
    }

})