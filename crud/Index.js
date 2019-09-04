import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as firebase from 'firebase';
import {Row, Rows, Table} from 'react-native-table-component';
import Icon from 'react-native-vector-icons/Ionicons';


class Index extends React.Component {
  static navigationOptions = {
    title: 'Listar',
  };

  constructor(props) {
    super(props);
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
    this.ref = firebase.app().database().ref('/school/subject/');

    this.state = {
      subjects: [],
    };
  }

  componentDidMount() {
    this.downloadFirebase();
  }

  downloadFirebase() {
    this.ref.on('value', snap => {
      let subjects = [];
      snap.forEach((childSnap) => {
        let subject = {
          id: childSnap.key,
          name: childSnap.val().name,
          teacher: childSnap.val().teacher,
        };
        subjects.push(subject);
      });
      this.setState({subjects: subjects});
    });
  }

  onRemoveItem(id) {
    firebase.database().ref('/school/subject/' + id).set(
      null,
      function(error) {
        if (error) {
          console.log(error);
        } else {
          console.log('deleted');
        }
      });
  }

  renderTable = () => {
    const tableHead = ['Nombre', 'Profesor', ' '];
    const tableData = this.state.subjects.map(subject => [
      subject.name,
      subject.teacher,
      <React.Fragment>
        <Icon.Button
          name="md-trash"
          color="#FF0C00"
          size={25}
          backgroundColor={'#FFFF'}
          onPress={e => this.onRemoveItem(subject.id)}>
          Eliminar</Icon.Button>
        <Icon.Button
          name="md-create"
          color={'#3ead03'}
          size={25}
          backgroundColor={'#FFFF'}
          onPress={e => this.props.navigation.push('Update', {
            id: subject.id,
            name: subject.name,
            teacher: subject.teacher,
          })}>
          Actualizar</Icon.Button>
      </React.Fragment>,
    ]);
    return (
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
        <Rows data={tableData} textStyle={styles.text}/>
      </Table>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderTable()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});
export default Index;
