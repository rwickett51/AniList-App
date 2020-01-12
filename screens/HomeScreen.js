import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Button,
  Alert,
  RefreshControl,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import Tile from "../components/Tile.js";
import {
  createStackNavigator,
  DrawerNavigator,
  DrawerItems
} from "react-navigation";
import NavigationService from "../services/NavigationService.js";
import Icon from "react-native-vector-icons/Ionicons";

let cols = 3;
let rows = 5;
let marginSize = 10;

function row() {
  let data = [];
  for (let i = 0; i < cols; i++) {
    data.push(<Tile />);
  }
  return (
    <View style={{flexDirection: "row", justifyContent: "space-around"}}>
      {data}
    </View>
  );
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      data: null,
      seed: 1,
      cols: 3,
      rows: 5,
      marginSize: 10
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: "Home",
      headerLeft: () => (
        <Icon
          name="ios-menu"
          onPress={() => navigation.openDrawer()}
          style={{color: "white", fontSize: 30, marginLeft: 10, marginTop: 5}}
        />
      )
    };
  };

  componentDidMount() {
    this.UIUpdate();

    AsyncStorage.getItem("@Settings:value").then(value => {
      console.log("After Mounting(Home): ", value);
    });
  }

  RefreshHandler() {
    this.setState(
      {
        refreshing: true,
        data: null,
        seed: this.state.seed + 1
      },
      () => {
        this.UIUpdate();
      }
    );
  }

  UIUpdate() {
    let data = [];
    for (let i = 0; i < rows; i++) {
      data.push(row());
    }
    this.setState({
      refreshing: false,
      data: data
    });
  }

  render() {
    if (this.state.refreshing) {
      return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View>
          <SafeAreaView style={styles.safeBackground}></SafeAreaView>
          <ScrollView
            style={styles.background}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.RefreshHandler.bind(this)}
              />
            }
          >
            {this.state.data}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  safeBackground: {
    backgroundColor: "#383838"
  },
  background: {
    backgroundColor: "#808080"
  },
  box: {
    backgroundColor: "#696969",
    height: Dimensions.get("window").height / 5,
    width: Dimensions.get("window").width / cols - 5,
    margin: 5
  }
});
