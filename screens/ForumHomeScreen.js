//Import React
import React from "react";

//Import React Components
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {showMessage, hideMessage} from "react-native-flash-message";

//Import Services
import NavigationService from "../services/NavigationService.js";
import {getThreads} from "../services/AniListQueryService.js";

export default class ForumHomeScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.state = {data: null, isLoading: true};
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {
    getThreads().then(data => {
      if (data.data == null) {
        showMessage({
          icon: "auto",
          message: "Something went wrong",
          type: "danger"
        });
      } else {
        this.setState({isLoading: false, data: data});
      }
    });
  }

  //Header Options
  static navigationOptions = ({navigation}) => {
    return {
      title: "Forum",
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
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: "center"}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <SafeAreaView style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            {this.state.data.data.Page.threads.map(obj => {
              return (
                <TouchableHighlight
                  style={styles.ThreadContainer}
                  onPress={() => {
                    NavigationService.navigate("Thread", {id: obj.id}, obj.id);
                  }}
                >
                  <View>
                    <Text style={styles.ThreadTitle} numberOfLines={2}>
                      {obj.title}
                    </Text>
                    <Text style={styles.ThreadBody} numberOfLines={5}>
                      {obj.body}
                    </Text>
                  </View>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
}

//Create Component Styles
var styles = StyleSheet.create({
  ThreadContainer: {
    width: "100%",
    height: 250,
    backgroundColor: "#232323",
    marginBottom: 25,
    alignSelf: "center",
    borderRadius: 0,
    padding: 15
  },
  ThreadTitle: {
    color: "white",
    fontSize: 22,
    paddingBottom: 10
  },
  ThreadBody: {
    color: "white",
    fontSize: 14
  }
});
