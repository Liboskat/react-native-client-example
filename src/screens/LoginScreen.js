import React from "react";
import {Button, Text, View, StyleSheet, AsyncStorage} from "react-native";
import t from 'tcomb-form-native'
import APIController from "../utils/APIController";

const User = t.struct({
    login: t.String,
    password: t.String
});
const Form = t.form.Form;

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
    };

    handleSubmit = () => {
        const user = this._form.getValue();
        var that = this;
        const response = APIController.loginPost(user['login'], user['password']).then(function (response) {
            if(response['status'] === 'error') {
            } else {
                AsyncStorage.setItem('token', response['token']);
                that.props.navigation.navigate('Logic');
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Form
                    ref={c => this._form = c} // assign a ref
                    type={User}
                />
                <Button
                    title="Login"
                    onPress={this.handleSubmit}
                />
                <Button
                    title="Registration"
                    onPress={() => this.props.navigation.navigate('Signup')}
                />
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
        flex: 1
    },
});