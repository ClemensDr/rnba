import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import TransactionExpenses from './TransactionExpenses'
import TransactionRevenues from './TransactionRevenues'
import {TabNavigator} from 'react-navigation'

export default class TransactionMainScreen extends Component {

    static navigationOptions = ({navigation}) => {
        const {navigate, state} = navigation
        return {
            title: 'Transactions',
            headerRight: (
                <TouchableOpacity onPress={() => navigate('CreateTransaction', {action: 'create', budget: state.params.budget})}>
                    <Text style={{fontSize: 30, paddingRight: 15}}>+</Text>
                </TouchableOpacity>
            )
        }
    }

    render() {
        const TabPage = TabNavigator({
            Expenses: {screen: TransactionExpenses},
            Revenues: {screen: TransactionRevenues}
        })
        return (
            <TabPage screenProps={{budget: this.props.navigation.state.params.budget}}/>
        )
    }
}
