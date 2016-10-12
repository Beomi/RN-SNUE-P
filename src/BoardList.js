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
      backgroundColor: '#123456',
    }
});

class BoardList extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Second Main Page!
        </Text>
      </View>
    )
  }
}

export default BoardList