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
    return (
      <View>
        <Text style={styles.maintext}>{rowData.title}</Text>
        <Text style={styles.smalltext}>{rowData.user}</Text>
        <Text style={styles.smalltext}>{rowData.datetime}</Text>
      </View>)
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
          post_number: responseJSON.freeboard_list[p].post_number,
          datetime: responseJSON.freeboard_list[p].datetime
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
          <Text>스누피 자유게시판 최신글</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          style={styles.row}
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
    paddingTop: 25,
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
    padding: 20,
  },
  maintext: {
    fontSize: 20,
  },
  smalltext: {
    fontSize: 15,
    textAlign: 'right',
  }
});

AppRegistry.registerComponent('Project', () => Project);
