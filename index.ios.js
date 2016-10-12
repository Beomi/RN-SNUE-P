import React, {Component} from 'react';
import {
  AppRegistry,
  TabBarIOS
} from 'react-native'
import FrontPage from './src/FrontPage'
import BoardList from './src/BoardList'

class Project extends Component {
  constructor(props) {
    super(props)
    this.state={
      selectedTab: 'FrontPage',
    }
  }
  
  render() {
    return (
        <TabBarIOS selectedTab={this.state.selectedTab}>
          <TabBarIOS.Item selected={this.state.selectedTab === 'FrontPage'}
            systemIcon="featured"
            onPress = {() => {
              this.setState({
                selectedTab: 'FrontPage'
              })
            }}>
            <FrontPage />
          </TabBarIOS.Item>
          <TabBarIOS.Item selected={this.state.selectedTab === 'BoardList'}
            systemIcon="contacts"
            onPress = {() => {
              this.setState({
                selectedTab: 'BoardList'
              })
            }}>
            <BoardList />
          </TabBarIOS.Item>
        </TabBarIOS>
      )
  }
  
}

AppRegistry.registerComponent('Project', () => Project);