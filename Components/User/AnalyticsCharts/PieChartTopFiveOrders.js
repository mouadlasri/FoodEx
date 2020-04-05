import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';
import { VictoryChart, ChartContainer, ChartWrapper, VictoryPie, VictoryAxis, VictoryLegend } from 'victory-native';
import { PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';



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
        axios.get(`https://683e9d34.ngrok.io/api/UserAnalytics/67887/topFiveOrders`).then(response => {
            // console.log('Get pie data: ', response.data);
            for (var i = 0; i < response.data.length; i++) {
                // assign a color to the appropriate restaurant
                console.log('response => ', response.data[i]);
                console.log('item => ', response.data[i]);

                // push the data of the pie chart into the local variable before updating the state itself
                localPieData.push({
                    x: `${response.data[i].name} (${response.data[i].restaurantName})`,
                    y: response.data[i].quantityOrdered
                });
            }
            
            this.setState({
                pieData: localPieData
            });
            // console.log('State: ', this.state);
        }).catch(error => console.log(error));
    }

    render() {

        if (this.state.pieData != null ) {
            // console.log('State Data:   ', this.state.pieData);
            return (
                <View style={styles.chartContainer}>
                    <Text style={{ fontSize: 18,  marginBottom: 5, marginTop: 20, alignSelf: 'center' }}>Most ordered items: </Text>
                    <Divider style={{ marginTop: 20, width: '20%', alignSelf: 'center' }} />
                    <View style={{alignSelf: 'center', padding: 0}}>
                        <VictoryPie
                            data={this.state.pieData}
                            width={screenWidth * 0.9}
                            height={300}
                            padAngle={3}
                            innerRadius={50}
                            labelRadius={110}
                            colorScale={this.state.colors}
                            style={{ labels: { fill: "black", fontSize: 16, alignSelf: 'flex-start', } }}
                            labels={({ datum }) => `${datum.y}`}
                        />
                    </View>
                   

                   
                    <VictoryLegend
                        orientation="vertical"
                        colorScale={this.state.colors}
                        height={180}
                        x={45} y={0}
                        color={'white'}
                        style={{ labels: {fill: 'black', fontSize: 13}, color: 'white' }}
                        width={screenWidth}
                        // itemsPerRow={1}
                        data={this.state.pieData.map(({ x }) => ({ name: x }))}
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
      
        backgroundColor: 'white',
        width: '90%',
        // height: 470,
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