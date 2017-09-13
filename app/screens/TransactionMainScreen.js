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
                        Alert.alert('Bitte zuerst ein Budget erstellen!')
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
        this._navigate = this._navigate.bind(this)
    }
    componentWillMount(){
        const {budget} = this.props.navigation.state.params
        this.setState({
            transactions: budget ? budget.transactions : realm.objects('Transaction')
        })
        realm.addListener('change', () => {
            this.forceUpdate()
        })
        this.props.navigation.setParams({
            canCreateTransaction: this._canCreateTransaction(),
            transactionType: 'E'
        })
    }

    componentWillUnmount(){
        realm.removeAllListeners()
    }

    _canCreateTransaction(){
        const budgets = realm.objects('Budget')
        return budgets.length > 0
    }

    _setTransactionType(type){
        this.props.navigation.setParams({transactionType: type})
    }

    _navigate(transaction){
        this.props.navigation.navigate('ViewTransaction', {transaction})
    }

    render() {
        const TabPage = TabNavigator({
            Expenses: {screen: TransactionExpenses},
            Revenues: {screen: TransactionRevenues}
        })
        return (
            <TabPage screenProps={{
                setTransactionType: this._setTransactionType,
                transactions: this.state.transactions,
                navigate: this._navigate
            }}/>
        )
    }
}
