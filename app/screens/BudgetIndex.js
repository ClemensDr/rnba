import React, {Component} from "react"
import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import BudgetListItem from '../components/BudgetListItem'
import realm from "../database/realm"

/**
 * Screen Komponente für die Budget Übersicht
 */
export default class BudgetIndex extends Component {

    //Navigationsoptionen für diese Seite
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
        this._renderTotal = this._renderTotal.bind(this)
    }

    componentWillMount() {
        // Die Budgets aus realm lesen
        this.setState({
            budgets: realm.objects('Budget')
        })
        //Wenn sich die Budgets ändern, wird die Komponente aktualisiert
        realm.addListener('change', () => {
            this.forceUpdate()
        })
    }

    componentWillUnmount() {
        //Listener entfernen wenn die Komponente nicht länger zur Laufzeit existiert
        realm.removeAllListeners()
    }

    /**
     * Berechnet die Summe der Ausgaben und Einnahmen für alle Budgets und gibt diese formatiert zurück
     *
     * @returns {string}
     * @private
     */
    _renderTotal() {
        let value = 0
        let spent = 0
        this.state.budgets.forEach((budget) => {
            value += budget.value
            spent += budget.spent
        })
        return spent.toFixed(2) + '/' + value.toFixed(2)
    }

    render() {
        let height = Dimensions.get('window').height
        const {navigate} = this.props.navigation
        return (
            <View style={styles.container}>
                <ScrollView style={{height: height - 70}}>
                    {this.state.budgets.map((budget, index) => {
                        return <BudgetListItem key={index} budget={budget}
                                               onPressed={() => navigate('TransactionIndex', {budget})}
                                               longPressed={() => navigate('ViewBudget', {budget})}/>
                    })}
                </ScrollView>
                <View style={styles.totalBottom}>
                    <View style={styles.contentLeft}>
                        <Text style={styles.title}>Total</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <Text style={styles.title}>{this._renderTotal()}</Text>
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
    },
    contentLeft: {
        marginLeft: 5,
        alignSelf: 'flex-start',
        justifyContent: 'center'
    },
    contentRight: {
        marginRight: 15,
        alignSelf: 'flex-end'
    }
})