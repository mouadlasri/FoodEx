import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';

import PieChartTopFiveOrders from './AnalyticsCharts/PieChartTopFiveOrders';
import PieChartRestaurantsOrdersRatio from './AnalyticsCharts/PieChartRestaurantsOrdersRatio';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit';
const screenWidth = Dimensions.get("window").width;
const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
};
const year = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const data = {

    labels: year,
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43, 50, 32, 15, 93, 12, 39],
            // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2, // optional,
        }
    ]
};



class DetailedAnalytics extends React.Component {
    constructor(props) {
        super(props);

    }


    componentDidMount() {
        
       
    }

    render() {
        
        
        // console.log(' HOME STATE ID => ', this.props.route.params.test);
        return (
            <ScrollView style={{ marginTop: 25 }}>
                
                <PieChartRestaurantsOrdersRatio />
                
                <PieChartTopFiveOrders />

            </ScrollView>
        );
    }
}

export default DetailedAnalytics;

const styles = StyleSheet.create({



})