import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import APIController from "../utils/APIController";
import t from 'tcomb-form-native'

const User = t.struct({
    login: t.String,
    password: t.String
});
const Form = t.form.Form;

export default class SignupScreen extends React.Component {
    static navigationOptions = {
        title: 'Signup',
    };

    handleSubmit = () => {
        const user = this._form.getValue();
        var that = this;
        const response = APIController.signupPost(user['login'], user['password']).then(function (response) {
            if(response['status'] === 'error') {

            } else {
                that.props.navigation.navigate('Login');
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
                    title="Signup"
                    onPress={this.handleSubmit}
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
    },
});

//     render() {
//         return (
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                 <Text>Details Screen</Text>
//                 <Button
//                     title="Go to Detailasas s... again"
//                     onPress={() => this.props.navigation.navigate('Logic')}
//                 />
//                 <Button
//                     title="Go to Home"
//                     onPress={() => this.props.navigation.navigate('Login')}
//                 />
//                 <Button
//                     title="Go back"
//                     onPress={() => APIController.signupPost('marsel', '228')}
//                 />
//             </View>
//         );
//     }
// }