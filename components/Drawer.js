import React from "react";

//Dependencies
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight
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
          <TouchableHighlight
            onPress={() => NavigationService.navigate("Profile")}
            style={styles.profileContainer}
          >
            <Image
              source={{
                uri: this.state.URL
              }}
              style={styles.profileImage}
            />
          </TouchableHighlight>
          <Text style={styles.profileName}>{this.state.name}</Text>
          <DrawerItems {...this.props} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

var styles = StyleSheet.create({
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignSelf: "center"
  },
  profileName: {
    color: "white",
    fontSize: 30,
    alignSelf: "center"
  },
  profileContainer: {borderRadius: 75, width: 150, alignSelf: "center"}
});
