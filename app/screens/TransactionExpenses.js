import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';

/**
 * Screen für den Ausgaben Tab in der Transaktionsübersicht
 */
export default class TransactionExpenses extends Component {

    constructor(props) {
        super(props)
        //Die darzustellenden Transacktionen werden über das screenProp Prop übergeben
        //und direkt dem State übergeben
        this.state = {
            transactions: props.screenProps.transactions
        }
    }

    render() {
        const navigate = this.props.screenProps.navigate
        //Wenn keine Transaktionen vorhanden sind, wird ein einfacher Text angezeigt
        if (this.props.screenProps.transactions.length < 1) {
            return (
                <View style={styles.centerView}>
                    <Text>Keine Transaktionen vorhanden</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.state.transactions.map((transaction, index) => {
                        if (transaction.type === 'E') {
                            return (
                                <TouchableOpacity key={index} style={styles.item}
                                                  onPress={() => navigate(transaction)}>
                                    <View style={styles.top}>
                                        <Text style={styles.title}>{transaction.name}</Text>
                                        <Text style={styles.amount}>{transaction.value}</Text>
                                    </View>
                                    <View style={styles.bottom}>
                                        <Text style={styles.budget}>{transaction.budget.name}</Text>
                                        <Text style={styles.date}>{transaction.date.toDateString()}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    })
                    }
                </ScrollView>
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
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingLeft: 10,
        paddingTop: 15
    },
    top: {
        flex: 1,
        flexDirection: 'row'
    },
    bottom: {
        flex: 1,
        flexDirection: 'row'
    },
    amount: {
        flex: 1,
        fontSize: 20
    },
    title: {
        flex: 1,
        fontSize: 20,
        color: 'grey'
    },
    budget: {
        fontSize: 14,
        flex: 1
    },
    date: {
        flex: 1
    },
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})