import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import realm from '../database/realm'

export default class BudgetIndex extends Component {
    static navigationOptions = ({navigation}) => {
        const {navigate} = navigation
        return {
            title: 'Budgets',
            headerRight: (
                <TouchableOpacity onPress={() => navigate('CreateBudget')}>
                    <Text style={{fontSize: 30, paddingRight: 15}}>+</Text>
                </TouchableOpacity>
            )
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            budgets: [],
            transactions: []
        }
        this._renderTotal = this._renderTotal.bind(this)
    }

    componentDidMount() {
        let budgets = realm.objects('Budget')
        this.setState({
            budgets: budgets
        })
        budgets.addListener((collection, changes) => {
            this.setState({
                budgets: collection
            })
        })
    }

    _renderTotal(){
        let value = 0
        let spent = 0
        this.state.budgets.forEach((budget) => {
            value += budget.value
        })
        return value
    }

    render() {
        let height = Dimensions.get('window').height
        const {navigate} = this.props.navigation
        return (
            <View style={styles.container}>
                <ScrollView style={{height: height - 90}}>
                    {this.state.budgets.map((budget, index) => {
                        return (
                            <TouchableOpacity key={index} style={styles.item}
                                              onPress={() => navigate('TransactionIndex', {budget: budget})}>
                                <View style={styles.contentLeft}>
                                    <Text style={styles.title}>{budget.name}</Text>
                                </View>
                                <View style={styles.contentRight}>
                                    <Text style={styles.title}>0/{budget.value}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <View style={styles.totalBottom}>
                    <View style={styles.contentLeft}>
                        <Text style={styles.title}>Total</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <Text style={styles.title}>986/{this._renderTotal()}</Text>
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
        height: 70,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingLeft: 10,
        //backgroundColor: 'grey'
    },
    contentLeft: {
        marginLeft: 5,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        //backgroundColor: 'blue'
    },
    contentRight: {
        marginRight: 15,
        alignSelf: 'flex-end',
        //backgroundColor: 'red'
    },
    title: {
        fontSize: 20,
        color: 'grey'
    },
    totalBottom: {
        height: 70,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: 'grey',
        paddingLeft: 10
    }
})