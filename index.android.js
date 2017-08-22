/**
 * Index Android App file
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation'

import HomeScreen from './app/screens/HomeScreen'
import BudgetIndex from './app/screens/BudgetIndex'
//import TransactionIndex from './app/screens/TransactionIndex'
import CreateBudget from './app/screens/CreateBudget'
import TransactionExpenses from './app/screens/TransactionExpenses'
import TransactionRevenues from './app/screens/TransactionRevenues'

const transactionMainScreen = TabNavigator({
    Expenses: {screen: TransactionExpenses},
    Revenues: {screen: TransactionRevenues}
})
transactionMainScreen.navigationOptions = {
    title: 'Transactions'
}

const rnba = StackNavigator({
    Home: {screen: HomeScreen},
    BudgetIndex: {screen: BudgetIndex},
    TransactionIndex: {screen: transactionMainScreen},
    CreateBudget: {screen: CreateBudget}
})

AppRegistry.registerComponent('rnba', () => rnba);
