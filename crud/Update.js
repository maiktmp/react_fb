import React from 'react';
import {Button, Text, View} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
import * as firebase from 'firebase';
import {container} from '../styles/style';
import _useFb from '../fb_conf';

class Update extends React.Component {
  static navigationOptions = () => ({
    title: 'Actualizar',
  });

  constructor(props) {
    super(props);
    this.onUpdateSubject = this.onUpdateSubject.bind(this);
    _useFb();
    console.log(this.props.navigation.getParam('id'));
    console.log(this.props.navigation.getParam('name'));
    console.log(this.props.navigation.getParam('teacher'));
    this.state = {
      id: this.props.navigation.getParam('id'),
      name: this.props.navigation.getParam('name'),
      teacher: this.props.navigation.getParam('teacher'),
    };
  }

  componentDidMount(): void {

  }

  onUpdateSubject() {
    if (this.state.name === undefined || this.state.teacher === undefined) {
      return null;
    }
    firebase.database().ref('/school/subject/' + this.state.id).set(
      {
        name: this.state.name,
        teacher: this.state.teacher,
      },
      (error) => {
        if (error) {
          console.log(error);
        } else {
          const {goBack} = this.props.navigation;
          goBack();
        }
      });
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
          title="ACTUALIZAR"
          color={'#32c6e1'}
          onPress={this.onUpdateSubject}
        />
      </View>
    );
  }
}

export default Update;