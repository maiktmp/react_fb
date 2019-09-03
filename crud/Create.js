import React from 'react';
import {Button, Text, View} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
import * as firebase from 'firebase';

class Create extends React.Component {
  static navigationOptions = {
    title: 'Crear',
  };

  constructor(props) {
    super(props);
    this.onCreateSubject = this.onCreateSubject.bind(this);
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: 'AIzaSyBACjCDT5Yk8PbwMQI3zvMwOT2BoC8Ax6U',
        authDomain: 'react-firebase-50308.firebaseapp.com',
        databaseURL: 'https://react-firebase-50308.firebaseio.com',
        projectId: 'react-firebase-50308',
        storageBucket: 'react-firebase-50308.appspot.com',
        messagingSenderId: '602001500230',
        appId: '1:602001500230:web:632102877f694fbf',
      };
      firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      name: undefined,
      teacher: undefined,
    };
  }

  componentDidMount(): void {

  }

  onCreateSubject() {
    if (this.state.name === undefined || this.state.teacher === undefined) {
      return null;
    }
    const ref = firebase.database().ref('/school/subject/');
    ref.push({'name': this.state.name, 'teacher': this.state.teacher});
  }


  render() {
    return (
      <View>
        <Text>Crear</Text>
        <TextField
          label='Nombre'
          onChangeText={(name) => this.setState({name: name})}
        />

        <TextField
          label='Profesor'
          onChangeText={(teacher) => this.setState({teacher: teacher})}
        />

        <Button
          title="CREAR"
          onPress={this.onCreateSubject}
        />
      </View>
    );
  }
}

export default Create;