import React, {Component} from 'react';
import {Text, Image, TouchableOpacity, View, StyleSheet, TextInput, ToastAndroid, Keyboard, Alert} from 'react-native';
import {updateBudget} from '../database/DatabaseHelper'

/**
 * Screen um ein Budget zu bearbeiten
 */
export default class UpdateBudget extends Component {

    constructor(props) {
        super(props)
        //Budget das bearbeitet werden soll
        const budget = props.navigation.state.params.budget
        this.state = {
            budget,
            name: budget.name,
            value: budget.value
        }
        this._handleSave = this._handleSave.bind(this)
        this._handleDelete = this._handleDelete.bind(this)
    }
    //Navigationsoptionen
    static navigationOptions = ({navigation}) => {
        const {state} = navigation
        return {
            title: 'Edit a Budget',
            //Buttons zum Speichern und Löschen eines Budgets
            headerRight: (
                <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
                    <TouchableOpacity onPress={() => state.params.onSavePressed()} style={{paddingRight: 15}}>
                        <Image source={require('../images/save.png')} style={{height: 25, width: 25}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => state.params.onDeletePressed()} style={{paddingRight: 15, flex: 1}}>
                        <Image source={require('../images/garbage.png')} style={{height: 25, width: 25}}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            onSavePressed: this._handleSave,
            onDeletePressed: this._handleDelete
        })
    }

    /**
     * Speichert die Änderungen in der Datenbank. Bei fehlenden Werten, oder einem Fehler beim Speichern
     * wird der Anwender darauf hingewiesen. Bei erfolgreicher Speicherung wird auf die Budgetübersicht navigiert
     *
     * @returns void
     * @private
     */
    _handleSave() {
        Keyboard.dismiss()
        const {name, value} = this.state
        if (name.length < 1 || value < 0) {
            ToastAndroid.show('Bitte korrekte Werte angeben', ToastAndroid.SHORT)
            return
        }
        if (!updateBudget(this.state.budget, {name: this.state.name, value: this.state.value})) {
            ToastAndroid.show('Fehler beim Speichern', ToastAndroid.SHORT)
        } else {
            this.props.navigation.navigate('BudgetIndex')
        }
    }

    /**
     * Löst den Löschvorgang aus nachdem der Anwender dies bestätigt hat. Implementiert ist nur der Alert.
     * @returns void
     * @private
     */
    _handleDelete() {
        Alert.alert('Budget löschen',
            'Möchten Sie das Budget löschen?',
            [
                {text: 'Nein', style: 'cancel'},
                {text: 'Ja', style: 'OK'}
            ])
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.title}>Name</Text>
                    <TextInput style={styles.input}
                               ref={(input) => this.nameInput = input}
                               value={this.state.name}
                               onChangeText={(name) => this.setState({name})}
                               returnKeyType="next"
                               onSubmitEditing={() => this.valueInput.focus()}/>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Value</Text>
                    <TextInput style={styles.input}
                               ref={(input) => this.valueInput = input}
                               value={this.state.value ? this.state.value.toFixed() : ''}
                               onChangeText={(value) => this.setState({value: parseFloat(value)})}
                               keyboardType="numeric"
                               returnKeyType="done"/>
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
        fontSize: 20,
        flex: 0.2,
        color: 'grey'
    }
})