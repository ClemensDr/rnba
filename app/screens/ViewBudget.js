import React, {Component} from 'react';
import {
    Text,
    Alert,
    Image,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';

export default class ViewBudget extends Component {
    static navigationOptions = ({navigation}) => {
        const {budget} = navigation.state.params
        return {
            title: 'View Budget',
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('UpdateBudget', {budget})} style={{paddingRight: 15}}>
                    <Image source={require('../images/pencil.png')} style={{height: 25, width: 25}}/>
                </TouchableOpacity>
            )
        }
    }

    componentWillMount(){
        const {budget} = this.props.navigation.state.params
        this.setState({
            budget
        })
    }

    render() {
        const budget = this.state.budget
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.title}>Name</Text>
                    <Text style={styles.input}>{budget.name}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Budget</Text>
                    <Text style={styles.input}>{budget.value}</Text>
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
        fontSize: 18,
        flex: 0.2,
        color: 'grey'
    }
})