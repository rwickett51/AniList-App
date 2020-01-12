import React from "react";
import {
  Button,
  Image,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  AsyncStorage
} from "react-native";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {LinearGradient} from "expo-linear-gradient";
import Home from "./HomeScreen.js";
import NavigationService from "../services/NavigationService.js";
import {getInfo} from "../services/AniListQueryService.js";

export default class DescriptionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: "",
      headerTransparent: true,
      headerRight: () => (
        <Button
          onPress={() =>
            Alert.alert(
              navigation.getParam("title", "Title"),
              navigation.getParam("itemId", "id").toString()
            )
          }
          title={"Info "}
        />
      ),
      headerBackground: () => (
        <LinearGradient
          colors={["black", "transparent"]}
          style={{flex: 1}}
          start={{x: 0, y: 0.25}}
          end={{x: 0, y: 1}}
        />
      )
    };
  };

  componentDidMount() {
    getInfo(
      this.props.navigation.state.params.itemId,
      this.props.navigation.state.params.type
    ).then(data => this.setState({data: data, isLoading: false}));

    AsyncStorage.getItem("@Settings:value").then(value => {
      console.log("After Mounting(Description): ", value);
    });
  }

  render() {
    if (this.state.isLoading) {
      let itemId = this.props.navigation.state.params.itemId;
      return (
        <View
          adjustsFontSizeToFit="true"
          numberOfLines={2}
          style={{flex: 1, alignItems: "center", justifyContent: "center"}}
        >
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <ScrollView style={{flex: 1}}>
          <Text style={{color: "white"}}>
            {this.state.data.data.Media.description.replace(/<br>/g, "")}
          </Text>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  img: {
    height: 142,
    width: 100,
    borderColor: "black",
    borderWidth: 2,
    marginLeft: 20,
    top: 80
  },
  bannerimg: {
    position: "absolute",
    height: 150,
    resizeMode: "cover",
    flex: 1,
    top: 0,
    right: 0,
    left: 0
  },
  statusButton: {
    backgroundColor: "red"
  },
  header: {
    flex: 1
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 0.045 * Dimensions.get("window").width,
    paddingLeft: 10,
    flexWrap: "wrap",
    paddingEnd: "30%"
  }
});
