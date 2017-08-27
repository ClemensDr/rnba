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
    Button
} from 'react-native';

export default class CreateTransaction extends Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state
        return {
            title: `${params.action === 'edit' ? 'Edit' : 'Add a'} Transaction`,
            headerRight: (
                <TouchableOpacity onPress={() => Alert.alert('Not implemented')} style={{paddingRight: 15}}>
                    <Image source={require('../images/save.png')} style={{height: 25, width: 25}}/>
                </TouchableOpacity>
            )
        }
    }

    componentWillMount() {
        this.setState({
            name: '',
            value: -1,
            date: ''
        })
    }

    async _getDateFromUser() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({
                    date: dates[month] + ' ' + day + ', ' + year
                })
                Keyboard.dismiss()

            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
            return ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.title}>Name</Text>
                    <TextInput style={styles.input}
                               ref={(input) => this.nameInput = input}
                               onChangeText={(name) => this.setState({name})}
                               returnKeyType="done"/>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Budget</Text>
                    <Picker style={styles.input}
                            ref={(input) => this.budgetInput = input}
                            onValueChange={(value, index) => this.setState({budget: value})}
                            selectedValue={this.state.budget}>
                        <Picker.Item label="Essen" value="0"/>
                        <Picker.Item label="Feiern" value="1"/>
                        <Picker.Item label="Wohnen" value="2"/>
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
                               onChangeText={(value) => this.setState({value})}
                               returnKeyType="next"
                               onSubmitEditing={() => this.noteInput.focus()}/>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Note</Text>
                    <TextInput style={styles.input}
                               ref={(input) => this.noteInput = input}
                               onChangeText={(note) => this.setState({note})}
                               returnKeyType="done"/>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Date</Text>
                    <TextInput style={styles.input}
                               value={this.state.date}
                               ref={(input) => this.dateInput = input}
                               onFocus={() => this._getDateFromUser()}
                               onChangeText={(value) => this.setState({value})}
                               returnKeyType="done"/>
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

const dates = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dez'
}