import React from 'react';
import {Button, View} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {container} from '../styles/style.js';
import {createAppContainer, NavigationActions, StackActions} from 'react-navigation';
import createStackNavigator from 'react-navigation-stack/src/navigators/createStackNavigator';
import {BottomTabBar, createBottomTabNavigator} from 'react-navigation-tabs';
import Create from '../crud/Create';
import Index from '../crud/Index';
import Update from '../crud/Update';
import * as firebase from 'firebase';
import _useFb from '../fb_conf';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {color} from 'react-native-reanimated';
import NavigationService from '../NavigationService';


class Login extends React.Component {

  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    _useFb();
    this.onValidateLogin = this.onValidateLogin.bind(this);
    this.onContinue = this.onContinue.bind(this);
    this.username = 'alu_14280487';
    this.password = 'pw0000';
    this.state = {
      logged: false,
      username: undefined,
      password: undefined,
      error: undefined,
    };
  }



  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('try_log');
      if (user !== null) {
        this.onContinue();
      } else {

      }
    });
  }


  onValidateLogin() {
    this.setState({error: undefined});
    if (this.state.username === undefined || this.state.password === undefined) {
      this.setState({error: 'Verifique sus credenciales.'});
      return null;
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(() => {
        this.onContinue();
      })
      .catch(error => this.setState({error: error.message}));
  }

  onContinue = () => {
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Create'}),
      ],
    }));
  };

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

const _toolbarConfig = () => ({
  headerStyle: {backgroundColor: '#2c4370'},
  headerTintColor: '#fff',
  headerTitleStyle: {fontWeight: 'bold'},
  headerRight: (
    <Icon.Button
      name="md-exit"
      color="#FFF"
      size={25}
      backgroundColor={'rgba(255,255,255,0)'}
      onPress={e => {
        firebase.auth().signOut();
        NavigationService.navigate('Login');
      }}/>
  ),
});

const TabNavigator = createMaterialBottomTabNavigator({
  Create: {
    screen: createStackNavigator({
      Create: {
        screen: Create,
        navigationOptions: _toolbarConfig,
      },
    }),
    navigationOptions: {
      tabBarLabel: 'Crear',
      tabBarIcon: ({tintColor}) => (
        <View>
          <Icon style={[{color: tintColor}]} size={25} name={'md-add'}/>
        </View>),
    },
  },
  View: {
    screen: createStackNavigator({
      Index: {
        screen: Index,
        navigationOptions: _toolbarConfig,
      },
      Update: {
        screen: Update,
        navigationOptions: _toolbarConfig,
      },
    }),
    navigationOptions: {
      tabBarLabel: 'Listar',
      tabBarIcon: ({tintColor}) => (
        <View>
          <Icon style={[{color: tintColor}]} size={25} name={'ios-list-box'}/>
        </View>),
    },
  },
}, {
  barStyle: {backgroundColor: '#fc6441'},
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
    headerMode: 'none',
  });
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
// export default createAppContainer(AppNavigator);