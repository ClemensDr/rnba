import React, {Component, PropTypes} from "react";
import {Alert, StyleSheet, Text, TextInput, Picker, Button, View, DatePickerAndroid, Keyboard} from "react-native";

/**
 * Komponente zur Darstellung des Formulars für eine Transaktion
 * Die Komponente ruft den Callback onDataChanged auf, wenn sich Eingaben im Formular verändern
 */
export default class TransactionForm extends Component {

    static propTypes = {
        //Budgets die in dem Dropdown ausgeählt werden können
        budgets: PropTypes.object.isRequired,
        //Callback wenn sich Daten des Formulars ändern
        onDataChanged: PropTypes.func.isRequired,
        //Optional das Budget das der Anwender vorher bereits ausgewählt hat
        budget: PropTypes.object
    }

    constructor(props){
        super(props)
        this._renderPickerItems = this._renderPickerItems.bind(this)
        this.state = {
            date: new Date(),
            note: '',
            budget: props.budget ? props.budget.id : props.budgets[0].id
        }
    }

    componentWillMount(){
        const transaction = this.props.transaction
        if(transaction){
            this.setState({
                name: transaction.name,
                budget: transaction.budget.id,
                account: transaction.account,
                value: transaction.value,
                note: transaction.note,
                date: transaction.date,
                receipt: transaction.receipt
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        // Bei der Aktualisierung wird der aktuelle mit dem vorherigen State verglichen
        // Bei Änderungen wird der Callback ausgeführt
        if(JSON.stringify(prevState) !== JSON.stringify(this.state)){
            this.props.onDataChanged(this.state)
        }
    }

    /**
     * Verwendet die DatePickerAndroid Schnittstelle für die Eingabe eines Datums
     * Wenn der Anwender ein Datumswert auswählt wird dieser im State gespeichert
     *
     * @returns {Promise.<void>}
     * @private
     */
    async _getDateFromUser() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            })
            Keyboard.dismiss()
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({
                    date: new Date(year, month, day)
                })
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
            Keyboard.dismiss()
        }
    }

    /**
     * Rendert die einzelnen Elemente des Budget Dropdowns
     *
     * @private
     */
    _renderPickerItems() {
        return this.props.budgets.map((budget, index) => {
            return (
                <Picker.Item key={index} label={budget.name} value={budget.id}/>
            )
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.title}>Name</Text>
                    <TextInput style={styles.input}
                               value={this.state.name}
                               onChangeText={(name) => this.setState({name})}
                               returnKeyType="done"/>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Budget</Text>
                    <Picker style={styles.input}
                            onValueChange={(value, index) => this.setState({budget: value})}
                            selectedValue={this.state.budget}>
                        {this._renderPickerItems()}
                    </Picker>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Account</Text>
                    <TextInput style={styles.input}
                               value={this.state.account}
                               ref={(input) => this.accountInput = input}
                               onChangeText={(account) => this.setState({account})}
                               returnKeyType="next"
                               onSubmitEditing={() => this.valueInput.focus()}/>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Value</Text>
                    <TextInput style={styles.input}
                               value={this.state.value ? this.state.value.toFixed() : ''}
                               ref={(input) => this.valueInput = input}
                               keyboardType="numeric"
                               onChangeText={(value) => this.setState({value: parseFloat(value)})}
                               returnKeyType="next"
                               onSubmitEditing={() => this.noteInput.focus()}/>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Note</Text>
                    <TextInput style={styles.input}
                               value={this.state.note}
                               ref={(input) => this.noteInput = input}
                               onChangeText={(note) => this.setState({note})}
                               onSubmitEditing={() => this.dateInput.focus()}
                               returnKeyType="next"/>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Date</Text>
                    <TextInput style={styles.input}
                               value={this.state.date.toDateString()}
                               ref={(input) => this.dateInput = input}
                               onFocus={() => this._getDateFromUser()}/>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Receipt</Text>
                    <View style={[styles.input, {marginRight: 15}]}>
                        <Button title="Capture"
                                onPress={() => Alert.alert('Not implemented')}/>
                    </View>
                </View>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingLeft: 10
    },
    input: {
        flex: 0.8
    },
    title: {
        fontSize: 18,
        flex: 0.2,
        color: 'grey'
    }
})
