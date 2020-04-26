//Import React
import React from "react";

//Import React Components
import {View, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class NotificationsScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
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
    import DiscoverScreen from "../screens/DiscoverScreen.js";
    import SettingsScreen from "../screens/SettingsScreen.js";
    import SearchScreen from "../screens/SearchScreen.js";
    import LoginScreen from "../screens/LoginScreen.js";
    import EditEntryScreen from "../screens/EditEntryScreen.js";
    import MediaListScreen from "../screens/MediaListScreen.js";
    import CharacterScreen from "../screens/CharacterScreen.js";
    import StaffScreen from "../screens/StaffScreen.js";
    import DrawerScreen from "./Drawer.js";
    import HomeScreen from "../screens/HomeScreen.js";
    import ForumHomeScreen from "../screens/ForumHomeScreen.js";
    import ProfileScreen from "../screens/ProfileScreen.js";

    //Stack Navigators
    const Settings = createStackNavigator({
      Settings: {
        screen: SettingsScreen
      }
    });

    const Forum = createStackNavigator({
      Settings: {
        screen: ForumHomeScreen
      }
    });

    const HomeTabs = createMaterialTopTabNavigator(
      {
        Activity: {
          screen: HomeScreen,
          params: {type: "ANIME"}
        },
        Progress: {
          screen: HomeScreen,
          params: {type: "MANGA"}
        }
      },
      {lazy: true, swipeEnabled: true}
    );

    const Navigator = createStackNavigator({
      Discover: {
        screen: DiscoverScreen
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
      },
      Profile: {
        screen: ProfileScreen
      }
    });

    const Home = createStackNavigator(
      {
        Home: {
          screen: HomeTabs
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
        },
        Profile: {
          screen: ProfileScreen
        }
      },
      {
        initialRouteName: "Home"
      }
    );

    const Search = createStackNavigator(
      {
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
        },
        Profile: {
          screen: ProfileScreen
        }
      },
      {
        initialRouteName: "Search"
      }
    );

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
      },
      Settings: {
        screen: SettingsScreen
      },
      Profile: {
        screen: ProfileScreen
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
        Discover: {
          screen: Navigator,
          tabBarOptions: {
            activeTintColor: "red"
          },
          navigationOptions: {
            tabBarIcon: ({tintColor}) => {
              return (
                <Icon
                  name="ios-compass"
                  style={{color: tintColor, fontSize: 25}}
                />
              );
            }
          }
        },
        List: {
          screen: MediaList,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => {
              return (
                <Icon
                  name="ios-journal"
                  style={{color: tintColor, fontSize: 25}}
                />
              );
            }
          }
        },
        Home: {
          screen: Home,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => {
              return (
                <Icon
                  name="ios-home"
                  style={{color: tintColor, fontSize: 25}}
                />
              );
            }
          }
        },
        Search: {
          screen: Search,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => {
              return (
                <Icon
                  name="ios-search"
                  style={{color: tintColor, fontSize: 25}}
                />
              );
            }
          }
        },
        Forum: {
          screen: Forum,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => {
              return (
                <Icon
                  name="ios-list-box"
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
    this.state = {};
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {}

  //Header Options
  static navigationOptions = ({navigation}) => {
    return {
      title: "Notifications",
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
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text style={{color: "grey"}}>Text</Text>
      </View>
    );
  }
}

//Create Component Styles
var styles = StyleSheet.create({});
