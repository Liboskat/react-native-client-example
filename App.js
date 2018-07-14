import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen'
import SignupScreen from './src/screens/SignupScreen'
import CalculatorScreen from './src/screens/CalculatorScreen'
import ConverterScreen from './src/screens/ConverterScreen'

export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}

const LogicStack = createBottomTabNavigator({
    Calculator: CalculatorScreen,
    Converter: ConverterScreen,
});

const RootStack = createStackNavigator(
    {
        Login: LoginScreen,
        Signup: SignupScreen,
        Logic: LogicStack,
    },
    {
        initialRouteName: 'Login',
    }
);

