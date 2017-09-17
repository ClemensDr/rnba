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
import TransactionMainScreen from './app/screens/TransactionMainScreen'
import UpdateTransaction from './app/screens/UpdateTransaction'

const transactionMainScreen = TabNavigator({
    Expenses: {screen: TransactionExpenses},
    Revenues: {screen: TransactionRevenues}
})
transactionMainScreen.navigationOptions = ({navigation}) => {
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
/*({navigation}) =>{
    return <TransactionMainScreen screenProps={{budget: navigation.state.params.budget}}/>
}*/

const rnba = StackNavigator({
    Home: {screen: HomeScreen},
    BudgetIndex: {screen: BudgetIndex},
    TransactionIndex: {screen: TransactionMainScreen},
    CreateBudget: {screen: CreateBudget},
    CreateTransaction: {screen: CreateTransaction},
    ViewTransaction: {screen: ViewTransaction},
    UpdateTransaction: {screen: UpdateTransaction}
})

AppRegistry.registerComponent('rnba', () => rnba);
