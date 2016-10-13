import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

var styles = StyleSheet.create({
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
  row: {
  },
  renderRow: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#AAA',
  },
  maintext: {
    fontSize: 18,
  },
  smalltextWithUser: {
    fontSize: 14,
    textAlign: 'left',
    color: '#AAA',
  },
  smalltextWithDate: {
    fontSize: 14,
    textAlign: 'right',
    color: '#AAA'
  },
  navbar: {
    backgroundColor: '#DADADA',
  }
});

class FrontPage extends Component {
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
      <View style={styles.renderRow}>
          <Text style={styles.maintext}>{rowData.group}</Text>
        <View>
            <Text style={styles.smalltextWithUser}></Text>
            <Text style={styles.smalltextWithDate}></Text>
        </View>
        
      </View>)
  }
  
  componentWillMount(){
    fetch('http://localhost:8000/community/boardlist/')
      .then((response) => response.json())
      .then((responseJSON) => {
      var textList=[];
      for (var prop in responseJSON){
          textList.push({
            group: prop
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
        <View style={{ flex:1, }}>
          <View style={styles.container}>
              <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              style={styles.row}
            />
            
        </View>
      </View>
      )
      
    }
    else{
      return <Text style={styles.welcome}>서버 접속이 올바르지 않습니다.</Text>
    }
  }
  
  
  
}

export default FrontPage