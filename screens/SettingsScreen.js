import React from "react";

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Button,
  AsyncStorage,
  Switch,
  Alert
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import {addEntryToList} from "../services/AniListQueryService.js";

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      allowAdult: false
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("@Settings:value").then(value => {
      this.setState({
        isLoading: false,
        allowAdult: value == null ? false : value == "true"
      });
      console.log("After Mounting(Settings): ", value);
    });
  }

  toggleSwitch(value) {
    //onValueChange of the switch this function will be called
    console.log(value);
    this.setState({allowAdult: value});

    AsyncStorage.setItem("@Settings:value", value.toString());
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: "Settings"
    };
  };

  render() {
    if (this.state.isLoading) {
      return <View></View>;
    } else {
      return (
        <ScrollView>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              borderBottomColor: "white",
              borderBottomWidth: "0.5",
              marginRight: 15,
              marginLeft: 15
            }}
          >
            <Text style={{margin: 20, color: "white", fontSize: 20}}>
              Setting 1
            </Text>
            <Switch
              value={this.state.allowAdult}
              onValueChange={value => {
                this.toggleSwitch(value);
              }}
              style={{marginRight: 20}}
            />
          </View>
          <Button title="Test" onPress={() => addEntryToList()} />
        </ScrollView>
      );
    }
  }
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent"
  }
});
