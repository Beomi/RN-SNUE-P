/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  TouchableOpacity,
} from 'react-native'

class Project extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1,r2) => r1 !== r2
    })
    this.state = {
      pagination: '',
      dataSource: ds.cloneWithRows([])
    };
  }
  
  
  _renderRow(rowData){
    return <Text style={styles.row}>{rowData.title}</Text>
  }
  
  componentWillMount(){
    fetch('http://localhost:8000/community/freeboard/1/')
      .then((response) => response.json())
      .then((responseJSON) => {
      var textList=[];
      for (var p in responseJSON.freeboard_list){
        textList.push({
          title: responseJSON.freeboard_list[p].title,
          user: responseJSON.freeboard_list[p].user,
          post_number: responseJSON.freeboard_list[p].post_number
        })
      }
      var ds = new ListView.DataSource({
      rowHasChanged: (r1,r2) => r1 !== r2
      })
      this.setState({
        dataSource: ds.cloneWithRows(textList)
      })
    })
      .catch((error) => {
        console.error(error);
      })
  }
  
  render() {
    if (this.freeboard_list !== []){
      return (
        <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
        </View>
      )
      
    }
    else{
      return <Text style={styles.welcome}>서버 접속이 올바르지 않습니다.</Text>
    }
  }
  
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 60,
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
  row: {
    textAlign: 'center',
    height: 20
  },
});

AppRegistry.registerComponent('Project', () => Project);
