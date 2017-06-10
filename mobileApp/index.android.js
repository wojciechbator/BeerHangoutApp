import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Button, ScrollView, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HangoutsMap from './views/components/HangoutsMap';
import {loginStyles} from './views/styles/styles';

export default class mobileApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled: true
        };
    }


    static navigationOptions = {
        title: 'Login',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
        <View style={loginStyles}>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <Text>Podaj login</Text>
                <TextInput
                    value={this.state.username}
                    onChange={(username) => {
                        this.setState({username});
                        this.state.username && this.state.password ? this.setState({buttonDisabled:false}) : this.setState({buttonDisabled:true});
                    }}
                />
                <Text>Podaj haslo</Text>
                <TextInput
                    secureTextEntry={true}
                    value={this.state.password}
                    onChange={(password) => {
                        this.setState({password});
                        this.state.username && this.state.password ? this.setState({buttonDisabled:false}) : this.setState({buttonDisabled:true});
                    }}
                />
                <Button
                    disabled={this.state.buttonDisabled}
                    onPress={() => {
                        navigate('Map');
                        this.setState({username: '', password: '', buttonDisabled: true})
                    }}
                    title="Zaloguj"
                />
            </ScrollView>
            </View>
        );
    }
}

mobileApp.propTypes = {
  username: React.PropTypes.string,
  password: React.PropTypes.string,
  buttonDisabled: React.PropTypes.bool,
};

const SimpleApp = StackNavigator({
    Home: { screen: mobileApp },
    Map: { screen: HangoutsMap },
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('mobileApp', () => SimpleApp);
