import React, {Component} from 'react';
import {Text, Alert, Image, TouchableOpacity, View, StyleSheet, TextInput} from 'react-native';

export default class CreateBudget extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Add a Budget',
            headerRight: (
                <TouchableOpacity onPress={() => Alert.alert('Not implemented')} style={{paddingRight: 15}}>
                    <Image source={require('../images/save.png')} style={{height: 25, width: 25}}/>
                </TouchableOpacity>
            )
        }
    }

    componentWillMount(){
        this.setState({
            name: '',
            value: -1
        })
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
                               onChangeText={(value) => this.setState({value})}
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