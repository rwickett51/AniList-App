import React from "react";
import {View} from "react-native";
import Navigator from "./components/Navigator.js";
import "react-native-gesture-handler";
import FlashMessage from "react-native-flash-message";

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Navigator />
        <FlashMessage ref="myLocalFlashMessage" position="top" />
      </View>
    );
  }
}
