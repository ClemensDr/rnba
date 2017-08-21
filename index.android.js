/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import HomeScreen from './app/screens/HomeScreen'
import {StackNavigator} from 'react-navigation'

const rnba = StackNavigator({
  Home: {screen: HomeScreen}
})

AppRegistry.registerComponent('rnba', () => rnba);
