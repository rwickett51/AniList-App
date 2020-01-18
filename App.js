import React from "react";
import {View} from "react-native";
import Navigator from "./components/Navigator.js";
import "react-native-gesture-handler";

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Navigator />
      </View>
    );
  }
}
