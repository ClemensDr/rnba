import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default class BudgetListItem extends Component{
    static propTypes = {
        budget: PropTypes.object,
        onPressed: PropTypes.func,
        longPressed: PropTypes.func
    }

    render(){
        const budget = this.props.budget
        return(
            <TouchableOpacity style={styles.item}
                              onPress={this.props.onPressed} onLongPress={this.props.longPressed}>
                <View style={styles.contentLeft}>
                    <Text style={styles.title}>{budget.name}</Text>
                </View>
                <View style={styles.contentRight}>
                    <Text style={styles.title}>{budget.spent.toFixed(2)}/{budget.value.toFixed(2)}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

let styles = StyleSheet.create({
    item: {
        height: 70,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
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
    },
    title: {
        fontSize: 20,
        color: 'grey'
    }
})
