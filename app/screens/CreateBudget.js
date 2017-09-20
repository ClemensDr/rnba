import React, {Component} from 'react';
import {Text, Image, TouchableOpacity, View, StyleSheet, TextInput, ToastAndroid, Keyboard} from 'react-native';
import {createBudget} from '../database/DatabaseHelper'

/**
 * Screen Komponente für die Erstellung eines Budgets
 */
export default class CreateBudget extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            value: -1
        }
        this._handleSave = this._handleSave.bind(this)
    }

    //Navigationsoptionen für diese Seite
    static navigationOptions = ({navigation}) => {
        const {state} = navigation
        return {
            title: 'Add a Budget',
            headerRight: (
                <TouchableOpacity onPress={() => state.params.onSavePressed()} style={{paddingRight: 15}}>
                    <Image source={require('../images/save.png')} style={{height: 25, width: 25}}/>
                </TouchableOpacity>
            )
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({onSavePressed: this._handleSave})
    }

    /**
     * Wird ausgeführt sobald der Anwender auf speichern drückt. Prüft ob alle Werte korrekt sind und versucht
     * anschließend das Budget zu erstellen. Bei Erfolg wird auf die vorherige Seite zurück navigiert. Bei einem
     * Fehler bekommt der Anwender einen entsprechenden Hinweis angezeigt.
     *
     * @private
     */
    _handleSave() {
        Keyboard.dismiss()
        const {name, value} = this.state
        //Prüfen ob alle Werte vorhanden sind
        if (name.length < 1 || value < 0) {
            ToastAndroid.show('Please enter correct values', ToastAndroid.SHORT)
            return
        }
        //Budget speichern
        if(!createBudget({name, value})){
            ToastAndroid.show('Fehler beim Speichern', ToastAndroid.SHORT)
        } else {
            // Bei Erfolg zurück navigieren
            this.props.navigation.goBack()
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
                               returnKeyType="next"
                               onSubmitEditing={() => this.valueInput.focus()}/>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Value</Text>
                    <TextInput style={styles.input}
                               ref={(input) => this.valueInput = input}
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