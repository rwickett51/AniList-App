import React, {Component} from "react";

//Dependencies
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createDrawerNavigator} from "react-navigation-drawer";
import {createMaterialTopTabNavigator} from "react-navigation-tabs";

//Services
import NavigationService from "../services/NavigationService.js";

//Screens
import MediaDescriptionScreen from "../screens/MediaDescriptionScreen.js";
import HomeScreen from "../screens/HomeScreen.js";
import SettingsScreen from "../screens/SettingsScreen.js";
import SearchScreen from "../screens/SearchScreen.js";
import LoginScreen from "../screens/LoginScreen.js";
import EditEntryScreen from "../screens/EditEntryScreen.js";
import MediaListScreen from "../screens/MediaListScreen.js";

const Settings = createStackNavigator({
  Settings: {
    screen: SettingsScreen
  }
});

const Navigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Details: {
    screen: MediaDescriptionScreen
  },
  Search: {
    screen: SearchScreen
  },
  EditEntry: {
    screen: EditEntryScreen
  }
});

const MediaLists = createMaterialTopTabNavigator(
  {
    Anime: {
      screen: MediaListScreen,
      params: {type: "ANIME"}
    },
    Manga: {
      screen: MediaListScreen,
      params: {type: "MANGA"}
    }
  },
  {lazy: true, swipeEnabled: true}
);

const MediaList = createStackNavigator({
  List: {
    screen: MediaLists
  },
  Details: {
    screen: MediaDescriptionScreen
  },
  EditEntry: {
    screen: EditEntryScreen
  }
});

const Login = createStackNavigator({
  Login: {
    screen: LoginScreen
  }
});

//Drawer Tab
const DrawerStack = createDrawerNavigator(
  {
    Home: {screen: Navigator},
    Settings: {screen: Settings},
    List: {screen: MediaList},
    Login: {screen: Login}
  },
  {
    initialRouteName: "Home"
  }
);

//Create Primary App Container
const NavAppContainer = createAppContainer(DrawerStack);

//Export App Container
export default class Nav extends Component {
  render() {
    return (
      <NavAppContainer
        theme="dark"
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
