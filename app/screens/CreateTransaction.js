import React, {Component} from 'react';
import {
    Image,
    TouchableOpacity,
    Keyboard,
    ToastAndroid
} from 'react-native';
import realm from '../database/realm'
import {createTransaction} from '../database/DatabaseHelper'
import TransactionForm from '../components/TransactionForm'

/**
 * Screen zur Erstellung einer Transaction
 */
export default class CreateTransaction extends Component {
    //Navigationsoptionen
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state
        return {
            title: 'Add a Transaction',
            headerRight: (
                //Speicher Button
                <TouchableOpacity onPress={params.handleSave} style={{paddingRight: 15}}>
                    <Image source={require('../images/save.png')} style={{height: 25, width: 25}}/>
                </TouchableOpacity>
            )
        }
    }

    constructor(props) {
        super(props)
        //Methoden an die Klassen binden, wenn sie mit der Komponente interagieren (state, props...)
        this._validateForm = this._validateForm.bind(this)
        this._handleSave = this._handleSave.bind(this)
        this._saveTransaction = this._saveTransaction.bind(this)
        this._onDataChanged = this._onDataChanged.bind(this)
    }

    componentWillMount() {
        //Navigationsparametern extrahieren
        const {budget, transactionType} = this.props.navigation.state.params
        //Budgets aus der Datenbank laden
        const budgets = realm.objects('Budget')
        //Werte im State setzen
        this.setState({
            budgets,
            formData: {},
            budget,
            type: transactionType === 0 ? 'E' : 'R'
        })
        //Button Callback an Navigation übergeben
        this.props.navigation.setParams({handleSave: this._handleSave})
    }

    /**
     * Gibt true zurück wenn alle erforderlichen Werte des Formulars ausgefüllt sind, sonst false
     *
     * @returns boolean
     * @private
     */
    _validateForm() {
        const {name, budget, account, value} = this.state.formData
        return (name && budget && account && value)
    }

    /**
     * Validiert das Formular und weist den Anwender auf fehlende Eingaben hin. Wenn die Eingaben gültig sind
     * wird die Transaktion gespeichert
     *
     * @returns void
     * @private
     */
    _handleSave() {
        Keyboard.dismiss()
        if (!this._validateForm()) {
            ToastAndroid.show('Bitte alle Werte eingeben', ToastAndroid.SHORT)
            return
        }
        this._saveTransaction()
    }

    /**
     * Speichert die Transaktion ab. Wenn Fehler beim Speichervorgang auftreten, wird der Anwender darauf hingewiesen.
     * Wenn die Speicherung erfolgreich war, wird auf den vorherigen Screen zurück navigiert.
     *
     * @returns void
     * @private
     */
    _saveTransaction() {
        const {name, budget, account, value, note, date} = this.state.formData
        const type = this.state.type
        const transaction = {name, budget, account, value, note, date, type, receipt: null}
        if(!createTransaction(transaction)){
            ToastAndroid.show('Fehler beim Speichern', ToastAndroid.SHORT)
        } else {
            this.props.navigation.goBack()
        }
    }

    /**
     * Callback für die <TransactionForm> Komponente, die aufgerufen wird wenn sich Daten des Formulars ändern.
     *
     * @param data Geänderte Daten des Formulars
     * @private
     */
    _onDataChanged(data){
        this.setState({
            formData: data
        })
    }

    render() {
        return (
            // Komponente zur Darstellung des Transaktions Formulars
            <TransactionForm budgets={this.state.budgets}
                             onDataChanged={(data) => this._onDataChanged(data)}
                             budget={this.state.budget} transaction={null}/>
        )
    }
}