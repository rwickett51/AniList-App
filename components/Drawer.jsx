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
import {getBasicUserInfo, getViewerId} from "../services/AniListQueryService";
import * as NavigationService from "../services/NavigationService";

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
    return getViewerId().then(viewerId => {
      getBasicUserInfo(viewerId.data.Viewer.id).then(data => {
        this.setState({
          URL: data.data.User.avatar.large,
          name: data.data.User.name
        });
      });
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <TouchableHighlight
            onPress={() => NavigationService.navigate("Profile")}
            style={styles.ProfileContainer}
          >
            <Image
              source={{
                uri: this.state.URL
              }}
              style={styles.ProfileImage}
            />
          </TouchableHighlight>
          <Text style={styles.ProfileName}>{this.state.name}</Text>
          <TouchableOpacity
            style={styles.DrawerItemContainer}
            onPress={() => {
              NavigationService.navigate("Profile");
            }}
          >
            <Text style={styles.DrawerItem}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.DrawerItemContainer}
            onPress={() => {}}
          >
            <Text style={styles.DrawerItem}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.DrawerItemContainer}
            onPress={() => {
              NavigationService.navigate("Settings");
            }}
          >
            <Text style={styles.DrawerItem}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.DrawerItemContainer}
            onPress={() => {}}
          >
            <Text style={styles.DrawerItem}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

var styles = StyleSheet.create({
  ProfileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignSelf: "center"
  },
  ProfileName: {
    color: "white",
    fontSize: 30,
    alignSelf: "center"
  },
  ProfileContainer: {borderRadius: 75, width: 150, alignSelf: "center"},
  DrawerItem: {color: "white", fontWeight: "bold"},
  DrawerItemContainer: {
    paddingLeft: 15,
    height: 50,
    justifyContent: "center",
    marginTop: 5
  }
});
