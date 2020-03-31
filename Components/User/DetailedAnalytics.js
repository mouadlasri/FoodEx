import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: 'rgba(26, 255, 146,1)',
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
};
const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: 'rgba(26, 255, 146,1)', // optional
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
};

class DetailedAnalytics extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            userId: null
        };
        
    }

    
    retrieveUserId = async () => {
        
    }

    async componentDidMount() {
        var userId = await AsyncStorage.getItem('connectedUserId');
        console.log('Data Analytics Async User ID=> ', x);
       
    }

    render() {
        
        // console.log(' HOME STATE ID => ', this.props.route.params.test);
        return (
            
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: '#1A5632'}}>

                </View>
                <LineChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                />
                <Text></Text>

            </ScrollView>
        );
    }
}

export default DetailedAnalytics;

const styles = StyleSheet.create({



})