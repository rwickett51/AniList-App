import React from "react";
import {View} from "react-native";
import Navigator from "./components/Navigator";
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
