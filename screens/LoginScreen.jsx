//Import React
import React from "react";

//Import React Components
import {View, Text, StyleSheet, AsyncStorage} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {WebView} from "react-native-webview";

//Services
import NavigationService from "../services/NavigationService";

export default class SettingsScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.state = {
      url:
        "https://anilist.co/api/v2/oauth/authorize?client_id=3076&response_type=token",
      showWeb: true
    };
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {}

  //Header Options
  static navigationOptions = ({navigation}) => {
    return {
      title: "Login"
    };
  };

  _onNavigationStateChange(webViewState) {
    if (webViewState.url.toString().includes("access_token")) {
      let url = webViewState.url.replace(
        "https://anilist.co/api/v2/oauth/anilist.co#",
        ""
      );
      let hash;
      let myJson = {};
      let hashes = url.slice(url.indexOf("?") + 1).split("&");
      for (let i = 0; i < hashes.length; i++) {
        hash = hashes[i].split("=");
        myJson[hash[0]] = hash[1];
      }
      AsyncStorage.setItem("@AccessToken:key", myJson.access_token.toString());
      this.setState({showWeb: false});
    }
  }

  //Render Components to screen
  render() {
    if (!this.state.showWeb) {
      NavigationService.navigate("Home");
      return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Text style={{color: "grey"}}>Text</Text>
        </View>
      );
    }
    return (
      <WebView
        ref="webview"
        source={{uri: this.state.url}}
        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
      />
    );
  }
}

//Create Component Styles
var styles = StyleSheet.create({});
