import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';
import { VictoryChart, ChartContainer, ChartWrapper, VictoryPie, VictoryAxis, VictoryLegend } from 'victory-native';
import { PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';



const screenWidth = Dimensions.get("window").width - 20;

class Scratch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pieData: [],
            pieDataBis: [],
            colors: ['#219ff7', '#ff8e9b', '#ff860f', '#9ed765', '#ffd38e']
        }
    }


    componentDidMount() {
        var localPieData = [];
        var x = [];
        axios.get(`https://bced91b8.ngrok.io/api/UserAnalytics/67887/topFiveOrders`).then(response => {
            // console.log('Get pie data: ', response.data);
            for (var i = 0; i < response.data.length; i++) {
                // assign a color to the appropriate restaurant
                console.log('response => ', response.data[i]);
                console.log('item => ', response.data[i]);

                x.push({
                    ...response.data[i],
                    color: this.state.colors[i],
                    legendFontSize: 15,
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,
                });

               
            }

            this.setState({
                pieData: localPieData,
                pieDataBis: x
            });
            // console.log('State: ', this.state);
        }).catch(error => console.log(error));
    }

    render() {

        if (this.state.pieData != null && this.state.pieDataBis != null) {
            // console.log('State Data:   ', this.state.pieData);
            return (
                <View style={styles.chartContainer}>
                    <Text style={{ fontSize: 18, marginBottom: 5, marginTop: 20, alignSelf: 'center' }}>Most ordered items </Text>
                    <Divider style={{ marginTop: 20, width: '20%', alignSelf: 'center' }} />
                    

                    <PieChart
                        data={this.state.pieDataBis}
                        width={screenWidth}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#56B1D0',
                            backgroundGradientFrom: '#56B1D0',
                            backgroundGradientTo: '#54E1A5',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(123, 123, 123, ${opacity})`,
                            style: {
                                title: {
                                    fontSize: 8
                                },
                                borderRadius: 20
                            },
                            propsForLabels: {
                                fill: "#134234",
                                fontSize: 6,
                                marginTop: 30,
                                fontWeight: 'bold',
                                color: '#123456',
                                stroke: "#ffa726",
                                title: {
                                    fontSize: 8
                                }
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

export default Scratch;

const styles = StyleSheet.create({
    chartContainer: {
        // borderColor: 'gray',
        // borderWidth: 1,
        // alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.03)',
        // backgroundColor: '#1f2f3e',
        backgroundColor: 'white',
        width: '90%',
        // height: 450,
        // justifyContent: 'center',
        alignSelf: 'center',
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