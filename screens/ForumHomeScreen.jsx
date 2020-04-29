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
import Markdown from "react-native-easy-markdown";
import defaultStyles from "../constants/MarkdownStyles";

//Import Services
import NavigationService from "../services/NavigationService";
import {getThreads} from "../services/AniListQueryService";

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
                    NavigationService.navigate(
                      "Thread",
                      {
                        id: obj.id,
                        op: obj
                      },
                      obj.id
                    );
                  }}
                  key={obj.id}
                >
                  <View style={styles.BodyContainer}>
                    <Text style={styles.ThreadTitle}>{obj.title}</Text>
                    <Markdown markdownStyles={defaultStyles}>
                      {obj.body}
                    </Markdown>
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
  BodyContainer: {
    height: 200,
    overflow: "hidden"
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
