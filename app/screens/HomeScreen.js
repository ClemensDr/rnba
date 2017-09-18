import React, {Component} from 'react';
import {Text, TouchableOpacity, Image, StyleSheet, View} from 'react-native';

export default class HomeScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Budget Watch'
        }
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
                <TouchableOpacity style={styles.item} onPress={() => navigate('TransactionIndex', {budget: null})}>
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
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingLeft: 10
    },
    icon: {
        width: 50,
        height: 50
    },
    content: {
        marginLeft: 15
    },
    title: {
        fontSize: 18,
        color: 'grey'
    }
})