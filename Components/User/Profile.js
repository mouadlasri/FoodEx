import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit'


export default class Profile extends React.Component {



    render() {

        const line = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                {
                    data: [20, 45, 28, 80, 99, 43],
                    strokeWidth: 6, // optional
                },
            ],
        };

        const pieData = [
            {
                name: 'Seoul',
                population: 1,
                color: '#43D6E5',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: 'Toronto',
                population: 2,
                color: '#FF7B78',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: 'Beijing',
                population: 3,
                color: '#EF548E',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: 'New York',
                population: 4,
                color: '#4F70E6',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: 'Moscow',
                population: 5,
                color: '#C459F3',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
        ];

        return (
            <View style={{ marginTop: 25, padding: 10 }}>
                <Text>
                    Bezier Line Chart
        </Text>
                <LineChart
                    data={line}
                    width={Dimensions.get('window').width} // from react-native
                    height={200}
                    yAxisLabel={'Q '}
                    chartConfig={{
                        backgroundColor: '#56B1D0',
                        backgroundGradientFrom: '#56B1D0',
                        backgroundGradientTo: '#54E1A5',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
                <PieChart
                    data={pieData}
                    width={Dimensions.get('window').width * 0.95}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#56B1D0',
                        backgroundGradientFrom: '#56B1D0',
                        backgroundGradientTo: '#54E1A5',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
            </View>
        );
    }
}