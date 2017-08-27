/**
 * Index Android App file
 */

import React from 'react';
import {AppRegistry, TouchableOpacity, Text} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation'

import HomeScreen from './app/screens/HomeScreen'
import BudgetIndex from './app/screens/BudgetIndex'
import CreateTransaction from './app/screens/CreateTransaction'
import CreateBudget from './app/screens/CreateBudget'
import TransactionExpenses from './app/screens/TransactionExpenses'
import TransactionRevenues from './app/screens/TransactionRevenues'
import ViewTransaction from './app/screens/ViewTransaction'

const transactionMainScreen = TabNavigator({
    Expenses: {screen: TransactionExpenses},
    Revenues: {screen: TransactionRevenues}
})
transactionMainScreen.navigationOptions = ({navigation}) => {
    let {navigate} = navigation
    return {
        title: 'Transactions',
        headerRight: (
            <TouchableOpacity onPress={() => navigate('CreateTransaction', {action: 'create'})}>
                <Text style={{fontSize: 30, paddingRight: 15}}>+</Text>
            </TouchableOpacity>
        )
    }

}

const rnba = StackNavigator({
    Home: {screen: HomeScreen},
    BudgetIndex: {screen: BudgetIndex},
    TransactionIndex: {screen: transactionMainScreen},
    CreateBudget: {screen: CreateBudget},
    CreateTransaction: {screen: CreateTransaction},
    ViewTransaction: {screen: ViewTransaction}
})

AppRegistry.registerComponent('rnba', () => rnba);
