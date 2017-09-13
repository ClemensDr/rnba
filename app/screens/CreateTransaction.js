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
        this.state = {
            date: new Date(),
            note: '',
            type: 'E'
        }
        this._renderPickerItems = this._renderPickerItems.bind(this)
        this._validateForm = this._validateForm.bind(this)
        this._handleSave = this._handleSave.bind(this)
        this._saveTransaction = this._saveTransaction.bind(this)
    }

    componentWillMount() {
        const {budget, transactionType} = this.props.navigation.state.params
        const budgets = realm.objects('Budget')
        this.setState({
            budgets,
            type: transactionType,
            budget: budget ? budget.id : budgets[0].id
        })
        this.props.navigation.setParams({handleSave: this._handleSave})
    }

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

    _validateForm() {
        const {name, budget, account, value} = this.state
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
        const {name, budget, account, value, note, date, type} = this.state
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
                        budgetObj.value += value
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

    _renderPickerItems() {
        return this.state.budgets.map((budget, index) => {
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
                               ref={(input) => this.accountInput = input}
                               onChangeText={(account) => this.setState({account})}
                               returnKeyType="next"
                               onSubmitEditing={() => this.valueInput.focus()}/>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Value</Text>
                    <TextInput style={styles.input}
                               ref={(input) => this.valueInput = input}
                               keyboardType="numeric"
                               onChangeText={(value) => this.setState({value: parseFloat(value)})}
                               returnKeyType="next"
                               onSubmitEditing={() => this.noteInput.focus()}/>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Note</Text>
                    <TextInput style={styles.input}
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
        );
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