import React, {Component} from 'react';
import {
    Text,
    Alert,
    Image,
    TouchableOpacity,
    View,
    StyleSheet,
    TextInput,
    Picker,
    DatePickerAndroid,
    Keyboard,
    Button,
    ToastAndroid
} from 'react-native';
import realm from '../database/realm'
import {makeId, calculateSpent} from '../helper'
import TransactionForm from '../components/TransactionForm'

export default class CreateTransaction extends Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state
        return {
            title: `${params.action === 'edit' ? 'Edit' : 'Add a'} Transaction`,
            headerRight: (
                <TouchableOpacity onPress={params.handleSave} style={{paddingRight: 15}}>
                    <Image source={require('../images/save.png')} style={{height: 25, width: 25}}/>
                </TouchableOpacity>
            )
        }
    }

    constructor(props) {
        super(props)
        this._validateForm = this._validateForm.bind(this)
        this._handleSave = this._handleSave.bind(this)
        this._saveTransaction = this._saveTransaction.bind(this)
        this._onDataChanged = this._onDataChanged.bind(this)
    }

    componentWillMount() {
        const {budget, transactionType} = this.props.navigation.state.params
        const budgets = realm.objects('Budget')
        this.setState({
            budgets,
            formData: {},
            type: transactionType
        })
        this.props.navigation.setParams({handleSave: this._handleSave})
    }

    _validateForm() {
        const {name, budget, account, value} = this.state.formData
        return (name && budget && account && value)
    }

    _handleSave() {
        Keyboard.dismiss()
        if (!this._validateForm()) {
            ToastAndroid.show('Bitte alle Werte eingeben', ToastAndroid.SHORT)
            return
        }
        this._saveTransaction()
        this.props.navigation.goBack()
    }

    _saveTransaction() {
        const {name, budget, account, value, note, date} = this.state.formData
        const type = this.state.type
        const {action} = this.props.navigation.state.params
        const budgetObj = realm.objectForPrimaryKey('Budget', budget)
        const id = makeId()
        if (budgetObj) {
            try {
                realm.write(() => {
                    const ta = realm.create('Transaction', {
                        id, name, budget: null, account, value, note, date, type, receipt: null
                    })
                    ta.budget = budgetObj
                    if (type === 'R') {
                        budgetObj.spent -= value
                    }
                    else {
                        budgetObj.spent = calculateSpent(value, budgetObj.spent, action)
                    }
                })
            } catch (e) {
                console.warn(e.message)
            }
        } else {
            ToastAndroid.show('Fehler beim Speichern', ToastAndroid.SHORT)
        }
    }

    _onDataChanged(data){
        this.setState({
            formData: data
        })
    }

    render() {
        return (
            <TransactionForm budgets={this.state.budgets}
                             onDataChanged={(data) => this._onDataChanged(data)}
                             budget={this.state.budget}/>
        )
    }
}