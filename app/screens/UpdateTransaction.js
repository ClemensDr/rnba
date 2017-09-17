import React, {Component} from 'react';
import {
    Image,
    TouchableOpacity,
    Keyboard,
    ToastAndroid
} from 'react-native';
import realm from '../database/realm'
import {updateTransaction} from '../database/DatabaseHelper'
import TransactionForm from '../components/TransactionForm'

export default class UpdateTransaction extends Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state
        return {
            title: 'Edit a Transaction',
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
        this._updateTransaction = this._updateTransaction.bind(this)
        this._onDataChanged = this._onDataChanged.bind(this)
    }

    componentWillMount() {
        const {transaction} = this.props.navigation.state.params
        const budgets = realm.objects('Budget')
        this.setState({
            budgets,
            formData: {},
            transaction
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
        this._updateTransaction()
    }

    _updateTransaction() {
        const {name, budget, account, value, note, date} = this.state.formData
        const transactionData = {name, budget, account, value, note, date, receipt: null}
        if(!updateTransaction(this.state.transaction, transactionData)){
            ToastAndroid.show('Fehler beim Speichern', ToastAndroid.SHORT)
        } else {
            this.props.navigation.goBack()
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
                             budget={this.state.budget} transaction={this.state.transaction}/>
        )
    }
}