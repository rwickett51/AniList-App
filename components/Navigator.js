import React, {Component} from "react";

//Dependencies
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createDrawerNavigator, DrawerItems} from "react-navigation-drawer";
import {createMaterialTopTabNavigator} from "react-navigation-tabs";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

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
import CharacterScreen from "../screens/CharacterScreen.js";
import StaffScreen from "../screens/StaffScreen.js";
import DrawerScreen from "./Drawer.js";

//Stack Navigators
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
  },
  Character: {
    screen: CharacterScreen
  },
  Staff: {
    screen: StaffScreen
  },
  Settings: {
    screen: SettingsScreen
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
  },
  Character: {
    screen: CharacterScreen
  },
  Staff: {
    screen: StaffScreen
  }
});

const Login = createStackNavigator({
  Login: {
    screen: LoginScreen
  }
});

//Drawer Tab
const TabStack = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Navigator,
      tabBarOptions: {
        activeTintColor: "red"
      },
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          return (
            <Icon name="ios-home" style={{color: tintColor, fontSize: 25}} />
          );
        }
      }
    },
    List: {
      screen: MediaList,
      navigationOptions: {
        tabBarBadge: true,
        tabBarIcon: ({tintColor}) => {
          return (
            <Icon name="ios-journal" style={{color: tintColor, fontSize: 25}} />
          );
        }
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          return (
            <Icon
              name="ios-settings"
              style={{color: tintColor, fontSize: 25}}
            />
          );
        }
      }
    }
  },
  {
    initialRouteName: "Home",
    barStyle: {backgroundColor: "#2A2A2A"},
    activeColor: "cyan",
    inactiveColor: "white"
  }
);

const DrawerStack = createDrawerNavigator(
  {
    Default: TabStack
  },
  {
    contentComponent: DrawerScreen
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
