import React from 'react';
import { View } from 'react-native';
import Navigator from './components/Navigator.js'

export default class App extends React.Component {

	render() {
    	return (
			<View style={{flex: 1}}>
        <Navigator />
			</View>
		);
  }
}



/*
import * as React from 'react';
import { BottomNavigation, Text, DefualtTheme } from 'react-native-paper';
import {StyleSheet} from 'react-native'
import Home from './components/Home.js'

const HomeRoute = () => <Home />;

const ProfileRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

export default class MyComponent extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'home' },
      { key: 'profile', title: 'Profile', icon: 'account-circle' },
      { key: 'recents', title: 'Recents', icon: 'settings' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    profile: ProfileRoute,
    recents: RecentsRoute,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        theme={theme}
      />
    );
  }
}

const theme = {
  ...DefualtTheme,
  colors: {
    primary: '#383838',
    accent: 'white',
  },
}
*/
