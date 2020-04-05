import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';
import { Divider } from 'react-native-elements';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width - 20;

class ExpensesOverMonths extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expensesData: ['2']
        }
    }

    // function that returns a color based on the rsetaurant's name
    assignColors = (restaurantName) => {

    }


    componentDidMount() {
       
       

    }

    render() {
        const chartConfig = {
            backgroundGradientFrom: "#000",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#000",
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            
        };
        var today = new Date();
        const data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug" , "Sept", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    data: [20, 45, 28, 80, 99, 43, 23, 13, 89, 12, 100, 50],
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                }
            ]
        };
        if (this.state.expensesData != null) {
            return (
                <View style={styles.chartContainer}>
                    <Text style={{ color: 'black', fontSize: 18, marginLeft: 10, marginBottom: 5, marginTop: 12, alignSelf: 'center' }}>Expenses in the last 12 months </Text>
                    <Divider style={{ margin: 10, width: '20%', borderWidth: 1, borderColor: '#219ff7', marginBottom: 20 }} />
                    <LineChart
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        verticalLabelRotation={0}
                        withInnerLines={true}
                        withOuterLines={false}
                        bezier
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

export default ExpensesOverMonths;

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