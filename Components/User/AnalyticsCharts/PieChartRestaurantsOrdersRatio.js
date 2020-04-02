import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';

import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width - 20;

class PieChartRestaurantsOrdersRatio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pieData: []
        }
    }

    // function that returns a color based on the rsetaurant's name
    assignColors = (restaurantName) => {
        switch (restaurantName) {
            case 'Proxirest':
                return '#e22429';
            case 'Pizzeria':
                return '#219ff7';
            case "Big Tom's":
                return '#ff860f';
        }
    }


    componentDidMount() {
        var localPieData = []
        axios.get(`https://6566eeac.ngrok.io/api/UserAnalytics/67887/numberOrdersByRestaurant`).then(response => {
            // iterate through the response
            for (var i = 0; i < response.data.length; i++) {

                // assign a color to the appropriate restaurant
                var colorAssigned = this.assignColors(response.data[i].name);

                // construct a new state variable
                localPieData.push({
                    ...response.data[i],
                    color: colorAssigned,
                    legendFontSize: 15,
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,
                });
            }

            this.setState({
                pieData: localPieData
            });

            // console.log('State: ', this.state);
        }).catch(error => console.log(error));
    }

    render() {

        if (this.state.pieData != null) {
            // console.log('State Data:   ', this.state.pieData);
            return (
                <View style={styles.chartContainer}>
                    <Text style={{ color: 'black', fontSize: 18, marginBottom: 5, marginTop: 12 }}>Restaurants Orders Ratio: </Text>
                    <PieChart
                        data={this.state.pieData}
                        width={screenWidth}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#56B1D0',
                            backgroundGradientFrom: '#56B1D0',
                            backgroundGradientTo: '#54E1A5',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 20,
                            },

                        }}
                        accessor="totalOrders"
                        backgroundColor="transparent"
                        paddingLeft="15"
                    // absolute // to show percentagse instead of absolute values
                    />
                </View>
            );
        }
        else {
            <View>
                <Text>Loading..</Text>
            </View>
        }
    }
}

export default PieChartRestaurantsOrdersRatio;

const styles = StyleSheet.create({
    chartContainer: {
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center'
    }

})