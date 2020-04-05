import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';


import PieChartTopFiveOrders from './AnalyticsCharts/PieChartTopFiveOrders';
import PieChartRestaurantsOrdersRatio from './AnalyticsCharts/PieChartRestaurantsOrdersRatio';
import ActivityChart from './AnalyticsCharts/ActivityChart';
import ProgressCircle from 'react-native-progress-circle';
import ExpensesOverMonths from './AnalyticsCharts/ExpensesOverMonths';

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
            <ScrollView style={{ height: '100%', backgroundColor: 'rgba(0,0,0,0)'}}>
                <View style={{ height: 160, justifyContent: 'center', backgroundColor: '#1A5632', elevation: 0, position: 'absolute', borderBottomLeftRadius: 70, top: 0, left: 0, right: 0}}>
                    <Text style={{ fontSize: 36, alignSelf: 'center', color: 'white' }}>Dashboard</Text>
                </View>
                <View style={{ elevation: 1, marginTop: '50%' }}>

                    {/* Main Header Dashboard */}
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.headerItems}>
                            <Text style={{fontSize: 16}}>
                                Orders
                            </Text>
                            <Text style={{fontSize: 36}}>972</Text>
                        </View>
                        <View style={styles.headerItems}>
                            <Text style={{ fontSize: 16 }}>
                                FoodEx Points
                            </Text>
                            <Text style={{ fontSize: 36 }}>13,789</Text>
                        </View>
                        
                    </View>
                    
                    {/* Contribution Chart */}
                    <ActivityChart />

                    {/* Top Five Orders ordered by the User */}
                    {/* <PieChartTopFiveOrders /> */}

                    {/* Expenses of user over months Line Chart */}
                    <ExpensesOverMonths />
                </View>
                {/* <PieChartRestaurantsOrdersRatio /> */}
                {/* <ActivityChart /> */}

            </ScrollView>
        );
    }
}

export default DetailedAnalytics;

const styles = StyleSheet.create({

    smallTitle: {
        padding: 5,
        borderBottomLeftRadius: 20,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerItems: {
        margin: 20,
        paddingTop: 20,
        paddingBottom: 20,
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',

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