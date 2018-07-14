import React from "react";
import {AsyncStorage, Button, StyleSheet, Text, View} from "react-native";
import t from 'tcomb-form-native'
import APIController from "../utils/APIController";

const Currency = t.enums({
    EUR: 'Euro',
    USD: 'US Dollar',
    RUB: 'Rouble',
    GBP: 'Pound'
});

const Calculation = t.struct({
    first: Currency,
    second: Currency,
    value: t.Number
});
const Form = t.form.Form;

export default class ConverterScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            result: ''
        }
    }

    static navigationOptions = {
        title: 'Converter',
    };

    handleSubmit = () => {
        var that = this;
        const calculation = this._form.getValue();
        AsyncStorage.getItem("token").then((token) => {
            const response = APIController.converterPost(calculation['first'], calculation['second'], calculation['value'], token)
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