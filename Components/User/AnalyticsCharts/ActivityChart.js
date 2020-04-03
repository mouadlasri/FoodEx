import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';
import { Divider } from 'react-native-elements';

import { ContributionGraph } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width - 20;

class ActivityChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activityData: []
        }
    }

    // function that returns a color based on the rsetaurant's name
    assignColors = (restaurantName) => {
        
    }


    componentDidMount() {
        var localPieData = [];
        const commitsData = [
            { date: "2020-01-02", count: 1 },
            { date: "2020-01-03", count: 2 },
            { date: "2020-01-04", count: 3 },
            { date: "2020-01-05", count: 4 },
            { date: "2020-01-06", count: 5 },
            { date: "2020-01-30", count: 2 },
            { date: "2020-01-31", count: 3 },
            { date: "2020-03-01", count: 2 },
            { date: "2020-04-02", count: 4 },
            { date: "2020-03-05", count: 2 },
            { date: "2020-02-30", count: 4 }
        ];
        this.setState({
            activityData: commitsData
        });
       
    }

    render() {
        var today = new Date();
      
        if (this.state.activityData != null) {
            return (
                <View style={styles.chartContainer}>
                    <Text style={{ color: 'black', fontSize: 18, marginLeft: 10, marginBottom: 5, marginTop: 12, alignSelf: 'center' }}>Activity in the last 120 days </Text>
                    <Divider style={{ margin: 10, width: '20%', borderWidth: 1, borderColor: '#219ff7'}}/>
                    <ContributionGraph
                        values={this.state.activityData}
                        endDate={`${today.getFullYear()}-${today.getMonth() < 10 ? '0' : ''}${today.getMonth()}-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`}
                        numDays={100}
                        width={Dimensions.get("window").width * 0.9}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#132154',
                            backgroundGradientFrom: 'rgba(255,255,255,0.04)',
                            backgroundGradientTo: 'rgba(255,255,255,0.04)',
                            
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                backgroundColor: 'red',
                                borderRadius: 16
                            },
                        }}
                        backgroundColor={'#134232'}
                    />
                </View>
            );
        }
        else {
            return (
                <View>
                    <Text>Loading..</Text>
                </View>
            )
           
        }
    }
}

export default ActivityChart;

const styles = StyleSheet.create({
    chartContainer: {
        borderColor: 'gray',
        // borderRadius: 10,
        // borderWidth: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
    }

})