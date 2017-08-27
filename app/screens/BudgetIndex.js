import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import store from '../store'

export default class BudgetIndex extends Component {
    static navigationOptions = ({navigation}) => {
        const {navigate, state} = navigation
        return {
            title: 'Budgets',
            headerRight: (
                <TouchableOpacity onPress={() => navigate('CreateBudget', {onBudgetAdded: state.params.onBudgetAdded})}>
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
        this.onBudgetAdded = this.onBudgetAdded.bind(this)
    }

    /**
     * Beim laden der Komponente werden alle Daten zur Anzeige aus dem AsyncStorage geladen und der Navigation der Callback hinzugefügt
     */
    componentDidMount() {
        store.getAllBudgets()
            .then((budgets) => {
            console.log(budgets)
                if (budgets.data.length > 0)
                    this.setState({budgets: budgets.data})
            })
        this.props.navigation.setParams({onBudgetAdded: this.onBudgetAdded})
    }

    /**
     * @param budget Das neue Budget (id, name, value)
     * Callback der ausgeführt wird, wenn ein neues Budget angelegt wurde, um die Daten aktuell zu halten
     */
    onBudgetAdded(budget){
        this.setState(previousState => {
            previousState.budgets.push(budget)
            return {budgets: previousState.budgets}
        })
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
                                              onPress={() => navigate('TransactionIndex')}>
                                <View style={styles.contentLeft}>
                                    <Text style={styles.title}>{budget.name}</Text>
                                </View>
                                <View style={styles.contentRight}>
                                    <Text style={styles.title}>150/{budget.value}</Text>
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
                        <Text style={styles.title}>986/2000</Text>
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
        height: 90,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: 'grey',
        paddingLeft: 10,
        backgroundColor: 'powderblue'
    }
})