import React, {Component} from "react";

//Dependencies
import {View, Text} from "react-native";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createDrawerNavigator} from "react-navigation-drawer";

//Services
import NavigationService from "../services/NavigationService.js";

//Screens
import DescriptionScreen from "../screens/DescriptionScreen.js";
import HomeScreen from "../screens/HomeScreen.js";
import SettingsScreen from "../screens/SettingsScreen.js";
import SandboxScreen from "../screens/SandboxScreen.js";
import SearchScreen from "../screens/SearchScreen.js";
import TemplateScreen from "../screens/TemplateScreen.js";

const Settings = createStackNavigator({
  Settings: {
    screen: SettingsScreen
  }
});

const Navigator = createStackNavigator({
  Sandbox: {
    screen: SandboxScreen
  },
  Details: {
    screen: DescriptionScreen
  },
  Search: {
    screen: SearchScreen
  }
});

const Template = createStackNavigator({
  Sandbox: {
    screen: TemplateScreen
  }
});

//Drawer Tab
const DrawerStack = createDrawerNavigator(
  {
    Home: {screen: Navigator},
    Settings: {screen: Settings},
    Template: {screen: Template}
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
