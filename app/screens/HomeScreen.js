import React, {Component} from 'react';
import {Text, TouchableOpacity, Image, StyleSheet, View, Alert, Modal, WebView} from 'react-native';

export default class HomeScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Budget Watch',
            headerRight: (
                <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
                    <TouchableOpacity onPress={() => Alert.alert('Settings')} style={{paddingRight: 15, flex: 1}}>
                        <Image source={require('../images/save.png')} style={{height: 25, width: 25}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Alert.alert('Export/Import')} style={{paddingRight: 15, flex: 1}}>
                        <Image source={require('../images/garbage.png')} style={{height: 25, width: 25}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.state.params.openModal(true)} style={{paddingRight: 15, flex: 1}}>
                        <Image source={require('../images/pencil.png')} style={{height: 25, width: 25}}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    constructor(props){
        super(props)
        this.state = {visible: false}
        this._setModalVisible = this._setModalVisible.bind(this)
    }

    componentWillMount(){
        this.props.navigation.setParams({openModal: this._setModalVisible})
    }

    _setModalVisible(visible){
        this.setState({visible})
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
                <Modal visible={this.state.visible} onRequestClose={() => this._setModalVisible(false)}>
                    <Text style={{fontSize: 20}} onPress={() => this._setModalVisible(false)}>X Schließen</Text>
                    <WebView source={{uri: 'https://github.com/ClemensDr/rnba/blob/master/README.md'}}/>
                </Modal>
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