import React, { Component } from "react";

//Dependencies
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/Ionicons";

//Services
import { navigationRef } from "../services/NavigationService";

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
import NotificationsScreen from "../screens/NotificationsScreen";

//Create Navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

//Stack Navigators

function MediaListTabs() {
  return (
    <TopTab.Navigator lazy>
      <TopTab.Screen name="ANIME" component={MediaListScreen} />
      <TopTab.Screen name="MANGA" component={MediaListScreen} />
    </TopTab.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function Navigator({ route }) {
  return (
    <Stack.Navigator initialRouteName={route.params?.initialRouteName}>
      <Stack.Screen name="List" component={MediaListTabs} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen
        name="Media"
        component={MediaScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Character"
        component={CharacterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Staff"
        component={StaffScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Forum" component={ForumHomeScreen} />
      <Stack.Screen name="Thread" component={ThreadScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="EditEntry" component={EditEntryScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Discover"
        component={Navigator}
        initialParams={{ initialRouteName: "Discover" }}
      />
      <Tab.Screen
        name="List"
        component={Navigator}
        initialParams={{ initialRouteName: "List" }}
      />
      <Tab.Screen
        name="Home"
        component={Navigator}
        initialParams={{ initialRouteName: "Home" }}
      />
      <Tab.Screen
        name="Search"
        component={Navigator}
        initialParams={{ initialRouteName: "Search" }}
      />
      <Tab.Screen
        name="Forum"
        component={Navigator}
        initialParams={{ initialRouteName: "Forum" }}
      />
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
