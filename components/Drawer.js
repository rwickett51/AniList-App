import React from "react";

//Dependencies
import {
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import {createDrawerNavigator, DrawerItems} from "react-navigation-drawer";

//Services
import {getBasicUserInfo} from "../services/AniListQueryService.js";
import NavigationService from "../services/NavigationService.js";

export default class DrawerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      URL: "https:via.placeholder.com/150",
      name: ""
    };
  }

  componentDidMount() {
    this.getBasicUserURL();
  }

  getBasicUserURL() {
    return getBasicUserInfo().then(data => {
      console.log(data);
      this.setState({
        URL: data.data.User.avatar.large,
        name: data.data.User.name
      });
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <Image
            source={{
              uri: this.state.URL
            }}
            style={{
              height: 150,
              width: 150,
              borderRadius: 75,
              alignSelf: "center"
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 30,
              alignSelf: "center"
            }}
          >
            {this.state.name}
          </Text>
          <TouchableOpacity
            style={{height: 200, width: 100, backgroundColor: "red"}}
            onPress={() => NavigationService.navigate("Settings")}
          ></TouchableOpacity>
          <DrawerItems {...this.props} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
