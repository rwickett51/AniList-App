import React from "react";

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Button,
  AsyncStorage,
  Switch,
  Alert,
  TouchableWithoutFeedback
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import {getViewerId} from "../services/AniListQueryService.js";
import Collapsible from "react-native-collapsible";

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
        allowAdult: value == null ? false : value == "true",
        isCollapsed: true
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
      const SECTIONS = [
        {
          title: "First",
          content: "Lorem ipsum..."
        },
        {
          title: "Second",
          content: "Lorem ipsum..."
        }
      ];
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
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({isCollapsed: !this.state.isCollapsed});
            }}
          >
            <Collapsible
              collapsed={this.state.isCollapsed}
              style={{backgroundColor: "red"}}
              collapsedHeight={30}
            >
              <Button
                title="Test2"
                onPress={() => {
                  getViewerId().then(data => {
                    console.log(data);
                  });
                }}
              />
              <Text style={{margin: 20, color: "white", fontSize: 20}}>
                Setting 1
              </Text>
              <Text style={{margin: 20, color: "white", fontSize: 20}}>
                Setting 1
              </Text>
              <Text style={{margin: 20, color: "white", fontSize: 20}}>
                Setting 1
              </Text>
              <Text style={{margin: 20, color: "white", fontSize: 20}}>
                Setting 1
              </Text>
            </Collapsible>
          </TouchableWithoutFeedback>
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
