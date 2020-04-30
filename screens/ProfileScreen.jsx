//Import React
import React from "react";

//Import React Components
import {View, Text, StyleSheet, TouchableHighlight, Image} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

//Services
import {getBasicUserInfo} from "../services/AniListQueryService";

export default class ProfileScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.state = {
      URL: "https:via.placeholder.com/150",
      name: ""
    };
  }

  //Called After render(). Recalls render() when finished
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

  //Header Options
  static navigationOptions = ({navigation}) => {
    return {
      title: "Template",
      headerLeft: () => (
        <Icon
          name="ios-menu"
          onPress={() => navigation.openDrawer()}
          style={{color: "white", fontSize: 30, marginLeft: 10, marginTop: 5}}
        />
      )
    };
  };

  //Render Components to screen
  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableHighlight style={styles.profileContainer}>
          <Image
            source={{
              uri: this.state.URL
            }}
            style={styles.profileImage}
          />
        </TouchableHighlight>
        <Text style={styles.profileName}>{this.state.name}</Text>
      </View>
    );
  }
}

//Create Component Styles
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
