import React from "react";
import {Button, Text, View, AsyncStorage, StyleSheet} from "react-native";
import t from 'tcomb-form-native'
import APIController from "../utils/APIController";

const Operation = t.enums({
    ADDITION: '+',
    SUBTRACTION: '-',
    MULTIPLICATION: '*',
    DIVISION: '/'
});

const Calculation = t.struct({
    first: t.Number,
    second: t.Number,
    operation: Operation
});
const Form = t.form.Form;

export default class CalculatorScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            result: ''
        }
    }

    static navigationOptions = {
        title: 'Calculator',
    };

    handleSubmit = () => {
        var that = this;
        const calculation = this._form.getValue();
        AsyncStorage.getItem("token").then((value) => {
            const response = APIController.calculatorPost(calculation['first'], calculation['second'], calculation['operation'], value)
                .then(function (response) {
                    if(response['status'] === 'success') {
                        that.setState({result: response['result']});
                    }  else if (response['status'] === 'error'){
                        console.log('error');
                    }
                });
        }).catch(e => console.log("Critical failure: " + e.message));
    };

    render() {
        return (
            <View style={styles.container}>
                <Form
                    ref={c => this._form = c} // assign a ref
                    type={Calculation}
                />
                <Button
                    title="Calculate"
                    onPress={this.handleSubmit}
                />
                <Text>{this.state.result}</Text>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
});