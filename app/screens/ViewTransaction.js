import React, {Component} from 'react';
import {
    Text,
    Alert,
    Image,
    TouchableOpacity,
    View,
    StyleSheet,
    Button
} from 'react-native';

/**
 * Screen zur Anzeige einer Transaktion
 */
export default class ViewTransaction extends Component {
    static navigationOptions = ({navigation}) => {
        const {transaction} = navigation.state.params
        return {
            title: 'View Transaction',
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('UpdateTransaction', {transaction})} style={{paddingRight: 15}}>
                    <Image source={require('../images/pencil.png')} style={{height: 25, width: 25}}/>
                </TouchableOpacity>
            )
        }
    }

    componentWillMount(){
        //Anzuzeigende Transaktion wird über Properties übergeben
        const {transaction} = this.props.navigation.state.params
        this.setState({
            transaction
        })
    }

    render() {
        const transaction = this.state.transaction
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.title}>Name</Text>
                    <Text style={styles.input}>{transaction.name}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Budget</Text>
                    <Text style={styles.input}>{transaction.budget.name}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Account</Text>
                    <Text style={styles.input}>{transaction.account}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Value</Text>
                    <Text style={styles.input}>{transaction.value.toFixed(2)}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Note</Text>
                    <Text style={styles.input}>{transaction.note}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Date</Text>
                    <Text style={styles.input}>{transaction.date.toDateString()}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Receipt</Text>
                    <View style={[styles.input, {marginRight: 15}]}>
                        <Button title="View"
                                onPress={() => Alert.alert('Not implemented')}/>
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