import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, ScrollView, ImageBackground } from 'react-native';
import axios from 'axios';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

class DetailedAnalytics extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // axios.get(`https://74af6529.ngrok.io/api/Restaurants/orders/analytics`).then(response => {

        // }).catch(error => { console.log(error) });
    }

    render() {
        // console.log(' HOME STATE ID => ', this.props.route.params.test);
        return (
            <View>
                <Text>Orders</Text>

            </View>
        );
    }
}

export default DetailedAnalytics;

const styles = StyleSheet.create({



})