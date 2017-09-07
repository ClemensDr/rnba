import React, {Component} from 'react';
import {Text, TouchableOpacity, Alert} from 'react-native';
import TransactionExpenses from './TransactionExpenses'
import TransactionRevenues from './TransactionRevenues'
import {TabNavigator} from 'react-navigation'
import realm from '../database/realm'

export default class TransactionMainScreen extends Component {

    static navigationOptions = ({navigation}) => {
        const {navigate, state} = navigation
        return {
            title: 'Transactions',
            headerRight: (
                <TouchableOpacity onPress={() => {
                    if(!state.params.canCreateTransaction)
                        Alert.alert('Create a budget first!')
                    else
                        navigate('CreateTransaction', {action: 'create', budget: state.params.budget, transactionType: state.params.transactionType})
                }}>
                    <Text style={{fontSize: 30, paddingRight: 15}}>+</Text>
                </TouchableOpacity>
            )
        }
    }
    constructor(props){
        super(props)
        this._canCreateTransaction = this._canCreateTransaction.bind(this)
        this._setTransactionType = this._setTransactionType.bind(this)
    }
    componentWillMount(){
        this.props.navigation.setParams({
            canCreateTransaction: this._canCreateTransaction(),
            transactionType: 'E'
        })
    }
    _canCreateTransaction(){
        const budgets = realm.objects('Budget')
        return budgets.length > 0
    }
    _setTransactionType(type){
        this.props.navigation.setParams({transactionType: type})
    }

    render() {
        const TabPage = TabNavigator({
            Expenses: {screen: TransactionExpenses},
            Revenues: {screen: TransactionRevenues}
        })
        return (
            <TabPage screenProps={{budget: this.props.navigation.state.params.budget, setTransactionType: this._setTransactionType}}/>
        )
    }
}
