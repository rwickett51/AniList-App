import React, {Component} from "react";

//Dependencies
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
//import Icon from "react-native-vector-icons/Ionicons";

//Services
import {navigationRef} from "../services/NavigationService";

//Screens

import MediaScreen from "../screens/MediaScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SearchScreen from "../screens/SearchScreen";
import LoginScreen from "../screens/LoginScreen";
import EditEntryScreen from "../screens/EditEntryScreen";
import MediaListScreen from "../screens/MediaListScreen";
import CharacterScreen from "../screens/CharacterScreen";
import StaffScreen from "../screens/StaffScreen";
import DrawerScreen from "./Drawer";
import HomeScreen from "../screens/HomeScreen";
import ForumHomeScreen from "../screens/ForumHomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ThreadScreen from "../screens/ThreadScreen";
import TemplateScreen from "../screens/TemplateScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

//Stack Navigators
function List() {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="List" component={MediaListScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Media" component={MediaScreen} />
      <Stack.Screen name="Character" component={CharacterScreen} />
      <Stack.Screen name="Staff" component={StaffScreen} />
      <Stack.Screen name="Forum" component={ForumHomeScreen} />
      <Stack.Screen name="Thread" component={ThreadScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="EditEntry" component={EditEntryScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Discover" component={DiscoverScreen} />
    </Stack.Navigator>
  );
}
function Discover() {
  return (
    <Stack.Navigator initialRouteName="Discover">
      <Stack.Screen name="List" component={MediaListScreen} />
      <Stack.Screen name="Discover" component={DiscoverScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Media" component={MediaScreen} />
      <Stack.Screen name="Character" component={CharacterScreen} />
      <Stack.Screen name="Staff" component={StaffScreen} />
      <Stack.Screen name="Forum" component={ForumHomeScreen} />
      <Stack.Screen name="Thread" component={ThreadScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="EditEntry" component={EditEntryScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

function Home() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="List" component={MediaListScreen} />
      <Stack.Screen name="Discover" component={DiscoverScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Media" component={MediaScreen} />
      <Stack.Screen name="Character" component={CharacterScreen} />
      <Stack.Screen name="Staff" component={StaffScreen} />
      <Stack.Screen name="Forum" component={ForumHomeScreen} />
      <Stack.Screen name="Thread" component={ThreadScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="EditEntry" component={EditEntryScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

function Search() {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="List" component={MediaListScreen} />
      <Stack.Screen name="Discover" component={DiscoverScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Media" component={MediaScreen} />
      <Stack.Screen name="Character" component={CharacterScreen} />
      <Stack.Screen name="Staff" component={StaffScreen} />
      <Stack.Screen name="Forum" component={ForumHomeScreen} />
      <Stack.Screen name="Thread" component={ThreadScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="EditEntry" component={EditEntryScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

function Forum() {
  return (
    <Stack.Navigator initialRouteName="Forum">
      <Stack.Screen name="List" component={MediaListScreen} />
      <Stack.Screen name="Discover" component={DiscoverScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Media" component={MediaScreen} />
      <Stack.Screen name="Character" component={CharacterScreen} />
      <Stack.Screen name="Staff" component={StaffScreen} />
      <Stack.Screen name="Forum" component={ForumHomeScreen} />
      <Stack.Screen name="Thread" component={ThreadScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="EditEntry" component={EditEntryScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="List" component={List} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Forum" component={Forum} />
    </Tab.Navigator>
  );
}

//Export App Container
export default class Nav extends Component {
  render() {
    return (
      <NavigationContainer ref={navigationRef} theme={DarkTheme}>
        <Drawer.Navigator drawerContent={() => <DrawerScreen />}>
          <Drawer.Screen name="HomeStack" component={Tabs} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
