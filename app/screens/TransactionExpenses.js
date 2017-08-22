import React, { Component } from 'react';
import {Text, View, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';

export default class TransactionExpenses extends Component {

    render() {
        const {navigate} = this.props.navigation
        return (
            <View style={styles.container}>
                <ScrollView>
                    <TouchableOpacity style={styles.item} onPress={() => navigate('ViewTransaction')}>
                        <View style={styles.top}>
                            <Text style={styles.title}>Essen</Text>
                            <Text style={styles.amount}>30,00</Text>
                        </View>
                        <View style={styles.bottom}>
                            <Text style={styles.budget}>Fixkosten</Text>
                            <Text style={styles.date}>Feb 4, 2017</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => navigate('ViewTransaction')}>
                        <View style={styles.top}>
                            <Text style={styles.title}>Essen</Text>
                            <Text style={styles.amount}>30,00</Text>
                        </View>
                        <View style={styles.bottom}>
                            <Text style={styles.budget}>Fixkosten</Text>
                            <Text style={styles.date}>Feb 4, 2017</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => navigate('ViewTransaction')}>
                        <View style={styles.top}>
                            <Text style={styles.title}>Essen</Text>
                            <Text style={styles.amount}>30,00</Text>
                        </View>
                        <View style={styles.bottom}>
                            <Text style={styles.budget}>Fixkosten</Text>
                            <Text style={styles.date}>Feb 4, 2017</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15
    },
    item: {
        height: 70,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingLeft: 10,
        //backgroundColor: 'grey'
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
        fontSize: 20,
        backgroundColor: 'powderblue'
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
    }
})