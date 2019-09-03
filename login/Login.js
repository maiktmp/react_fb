import React from 'react';
import {Button, View} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {container} from '../styles/style.js';
import {createAppContainer, NavigationActions, StackActions} from 'react-navigation';
import createStackNavigator from 'react-navigation-stack/src/navigators/createStackNavigator';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Create from '../crud/Create';
import Index from '../crud/Index';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.onValidateLogin = this.onValidateLogin.bind(this);
    this.username = 'alu_14280487';
    this.password = 'pw0000';
    this.state = {
      username: undefined,
      password: undefined,
      error: undefined,
    };
  }

  static navigationOptions = {
    title: 'Login',
  };

  onValidateLogin() {
    this.setState({error: undefined});
    // if (this.state.username !== this.username) {
    //     this.setState({error: "Usuario/Contraseña incorrectos"});
    //     return null;
    // }
    // if (this.state.password !== this.password) {
    //     this.setState({error: "Usuario/Contraseña incorrectos"});
    //     return null;
    // }
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Create'}),
      ],
    }));
  }

  render() {
    return (
      <View style={container}>
        <TextField
          label='Usuario'
          onChangeText={(username) => this.setState({username: username})}
        />
        <TextField
          label='Contraseña'
          secureTextEntry={true}
          error={this.state.error}
          onChangeText={(password) => this.setState({password: password})}
        />
        <Button
          title="LOGIN"
          onPress={this.onValidateLogin}
        />
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Create: Create,
  View: Index,
});

const AppNavigator = createStackNavigator({
    Login: {
      screen: Login,
    },
    Create: {
      screen: TabNavigator,
    },
  },
  {
    initialRouteName: 'Login',
  });

export default createAppContainer(AppNavigator);