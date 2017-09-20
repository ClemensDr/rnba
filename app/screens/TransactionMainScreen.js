import React, {Component} from 'react';
import {Text, TouchableOpacity, Alert} from 'react-native';
import TransactionExpenses from './TransactionExpenses'
import TransactionRevenues from './TransactionRevenues'
import {TabNavigator} from 'react-navigation'
import realm from '../database/realm'

/**
 * Screen für die Transaktionsübersicht
 */
export default class TransactionMainScreen extends Component {
    //Navigationsoptionen
    static navigationOptions = ({navigation}) => {
        const {navigate, state} = navigation
        return {
            title: 'Transactions',
            headerRight: (
                //Button um eine neue Transaktion zu erstellen. Wenn noch kein Budget erstellt wurde,
                // wird der Anwender darauf hingewiesen erst ein Budget zu erstellen
                <TouchableOpacity onPress={() => {
                    if(!state.params.canCreateTransaction)
                        Alert.alert('Bitte zuerst ein Budget erstellen!')
                    else
                        navigate('CreateTransaction', {budget: state.params.budget, transactionType: state.params.transactionType})
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
        // Wenn die Variable budget einen gültigen Wert enthält, werden nur die Transaktionen dieses Budgets angezeigt
        const {budget} = this.props.navigation.state.params
        this.setState({
            transactions: budget ? budget.transactions : realm.objects('Transaction')
        })
        //Realm listener für Änderungen in der Datenbank
        realm.addListener('change', () => {
            this.forceUpdate()
        })
        this.props.navigation.setParams({
            canCreateTransaction: this._canCreateTransaction(),
            transactionType: 0
        })
    }

    componentWillUnmount(){
        // Listener abmelden wenn die Komponenten entfernt wird
        realm.removeAllListeners()
    }

    /**
     * Gibt true zurück wenn mindestens ein Budget vorhanden ist, sonst false
     *
     * @return {boolean}
     * @private
     */
    _canCreateTransaction(){
        const budgets = realm.objects('Budget')
        return budgets.length > 0
    }

    /**
     * Callback der von den beiden Tab Screens im Tab-Navigator verwendet wird, um den Typ der Transaktion
     * zu setzen
     *
     * @param type
     * @private
     */
    _setTransactionType(type){
        this.props.navigation.setParams({transactionType: type})
    }

    /**
     * Callback der von den beiden Tab Screens im Tab-Navigator verwendet wird, um auf die Transaktions Detailseite zu wechseln
     *
     * @param transaction
     * @private
     */
    _navigate(transaction){
        this.props.navigation.navigate('ViewTransaction', {transaction})
    }

    render() {
        //Rendern der Tab Komponente. Die Callbacks und die Transaktionen werden übergeben
        return (
            <TabPage screenProps={{
                transactions: this.state.transactions,
                navigate: this._navigate
            }} onNavigationStateChange={(prevState, currentState) => {
                this._setTransactionType(currentState.index)
            }}
            />
        )
    }
}

//Tab-Navigator für die Darstellung der Tabs
const TabPage = TabNavigator({
    Expenses: {screen: TransactionExpenses},
    Revenues: {screen: TransactionRevenues}
})