import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';

import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width - 20;

class PieChartTopFiveOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pieData: [],
            colors: ['#219ff7', '#ff8e9b', '#ff860f', '#9ed765', '#ffd38e']
        }
    }


    componentDidMount() {
        var localPieData = [];
        axios.get(`https://6566eeac.ngrok.io/api/UserAnalytics/67887/topFiveOrders`).then(response => {
            // console.log('Get pie data: ', response.data);
            for (var i = 0; i < response.data.length; i++) {
                // assign a color to the appropriate restaurant
                console.log('response => ', response.data[i]);
                // console.log('item => ', response.data[i]);
                localPieData.push({
                    ...response.data[i],
                    color: this.state.colors[i],
                    legendFontSize: 15,
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,
                });
            }
            
            this.setState({
                pieData: localPieData
            });
            console.log('State: ', this.state);
        }).catch(error => console.log(error));
    }

    render() {

        if (this.state.pieData != null) {
            // console.log('State Data:   ', this.state.pieData);
            return (
                <View style={styles.chartContainer}>
                    <Text style={{ color: 'black', fontSize: 18, marginBottom: 5, marginTop: 12 }}>Most ordered items: </Text>
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
                                borderRadius: 20
                            },
                            propsForLabels: {
                                fill:"#134234",
                                fontSize: 8,
                                marginTop: 30,
                                fontWeight: 'bold',
                                color: '#123456',
                                stroke: "#ffa726"
                            },
                            
                        }}
                        accessor="quantityOrdered"
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

export default PieChartTopFiveOrders;

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