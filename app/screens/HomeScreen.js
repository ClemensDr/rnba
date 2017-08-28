import React, {Component} from 'react';
import {Text, Button, TouchableOpacity, Image, StyleSheet, View, AsyncStorage} from 'react-native';

export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Budget Watch'
    }

    render() {
        const {navigate} = this.props.navigation
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.item} onPress={() => navigate('BudgetIndex')}>
                    <Image source={require('../images/purse.png')} style={styles.icon}/>
                    <View style={styles.content}>
                        <Text style={styles.title}>Budgets</Text>
                        <Text>Create and manage budgets</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => navigate('TransactionIndex')}>
                    <Image source={require('../images/transaction.png')} style={styles.icon}/>
                    <View style={styles.content}>
                        <Text style={styles.title}>Transactions</Text>
                        <Text>Enter transactions and revenues</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingLeft: 10
    },
    icon: {
        width: 70,
        height: 70
    },
    content: {
        marginLeft: 15
    },
    title: {
        fontSize: 20,
        color: 'grey'
    }
})