/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ToastAndroid,
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import CheckPermissions from './features/permissions/CheckPermissions';
import Pomodoro from './features/pomodoro/pomodoro';
import TinderSwiper from './features/tinderswiper/TinderSwiper'
import stack from './features/tinderswiper/stack'
import MyCarousel from './features/carousel/MyCarousel';
import SearchBar from './features/searchbar/SearchBar';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'App',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button style={styles.button}
            title='Go to check permissions'
            onPress={
              () => { navigate('CheckPermissions'); }
            }>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button}
            title='Show toast'
            onPress={
              () => {
                ToastAndroid.show("Click button.", ToastAndroid.SHORT);
              }
            }>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button}
            title='Go to pomodoro page'
            onPress={
              () => {
                navigate('Pomodoro');
              }
            }>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button}
            title='Tinder Swiper'
            onPress={
              () => {
                navigate('TinderSwiper');
              }
            }>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button}
            title='MyCarousel'
            onPress={
              () => {
                navigate('MyCarousel');
              }
            }>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button}
            title='SearchBar'
            onPress={
              () => {
                navigate('SearchBar');
              }
            }>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button}
            title='stack'
            onPress={
              () => {
                navigate('stack');
              }
            }>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    marginTop: 20,
    marginLeft: 20,
  }
});

const StackNavigator = createStackNavigator({
  App,
  CheckPermissions,
  Pomodoro,
  TinderSwiper,
  stack,
  MyCarousel,
  SearchBar
}, {
    initialRouteName: 'App',
  });

export default createAppContainer(StackNavigator);
