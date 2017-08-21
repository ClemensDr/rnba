import React, {Component} from 'react'
import {View, StyleSheet, Dimensions, Text} from 'react-native'

let width = Dimensions.get('window').width

export default class NavigationBar extends Component {
    static defaultProps = {
        title: 'Hallo'
    }

    constructor(props) {
        super(props)
    }

    _renderBackButton() {
        if (this.props.handleBackPress) {
            return (
                <Text>Back</Text>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderBackButton()}
                <View style={styles.title}>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'row',
        width: width,
        height: 44,
        backgroundColor: 'purple'
    },
    title: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 1,
        justifyContent: 'center',
        width: width - 200,
        overflow: 'hidden'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '400',
        color: 'white'
    }
})