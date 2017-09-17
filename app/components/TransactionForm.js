import React, {Component, PropTypes} from "react";
import {Alert, StyleSheet, Text, TextInput, Picker, Button, View, DatePickerAndroid, Keyboard} from "react-native";

export default class TransactionForm extends Component {

    static propTypes = {
        //budgets: PropTypes.object.isRequired,
        onDataChanged: PropTypes.func.isRequired,
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
        if(JSON.stringify(prevState) !== JSON.stringify(this.state)){
            this.props.onDataChanged(this.state)
        }
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
