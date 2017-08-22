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

export default class ViewTransaction extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'View Transaction',
            headerRight: (
                <TouchableOpacity onPress={() => Alert.alert('Not implemented')} style={{paddingRight: 15}}>
                    <Image source={require('../images/save.png')} style={{height: 25, width: 25}}/>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.title}>Name</Text>
                    <Text style={styles.input}>Shopping</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Budget</Text>
                    <Text style={styles.input}>Freizeit</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Account</Text>
                    <Text style={styles.input}>Bar</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Value</Text>
                    <Text style={styles.input}>43,65</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Note</Text>
                    <Text style={styles.input}>Einkaufen bei H&M</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Date</Text>
                    <Text style={styles.input}>Aug 23, 2017</Text>
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