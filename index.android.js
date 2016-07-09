/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

var App = require('./app');
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');

AppRegistry.registerComponent('reactapp', () => App);
