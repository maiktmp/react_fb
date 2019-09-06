import React from 'react';
import {Button, Text, View} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
import * as firebase from 'firebase';
import {container} from '../styles/style';
import {Alert} from 'react-native';
import _useFb from '../fb_conf';

class Create extends React.Component {
  static navigationOptions = {
    title: 'Crear',
  };

  constructor(props) {
    super(props);
    this.onCreateSubject = this.onCreateSubject.bind(this);
    _useFb();
    this.state = {
      name: undefined,
      teacher: undefined,
    };
  }

  onCreateSubject() {
    if (this.state.name === undefined || this.state.teacher === undefined) {
      return null;
    }
    const ref = firebase.database().ref('/school/subject/');
    ref.push({'name': this.state.name, 'teacher': this.state.teacher});
    this.setState({
      name: '',
      teacher: '',
    });
    Alert.alert(
      'Aviso',
      'Grupo Creado correctamente',
    );
  }


  render() {
    return (
      <View style={container}>
        <TextField
          label='Nombre'
          value={this.state.name}
          onChangeText={(name) => this.setState({name: name})}
        />

        <TextField
          label='Profesor'
          value={this.state.teacher}
          onChangeText={(teacher) => this.setState({teacher: teacher})}
        />

        <Button
          title="CREAR"
          color={'#32c6e1'}
          onPress={this.onCreateSubject}
        />
      </View>
    );
  }
}

export default Create;