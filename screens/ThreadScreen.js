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
  TouchableHighlight,
  Linking
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {showMessage, hideMessage} from "react-native-flash-message";
import Markdown from "react-native-easy-markdown";
import Autolink from "react-native-autolink";
import defaultStyles from "../constants/MarkdownStyles.js";

//Import Services
import NavigationService from "../services/NavigationService.js";
import {getThreadComments} from "../services/AniListQueryService.js";

export default class SettingsScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.state = {data: null, isLoading: true};
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {
    getThreadComments(this.props.navigation.state.params.id).then(data => {
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
      title: "Thread",
      headerRight: () => (
        <Icon
          name="ios-sync"
          onPress={() =>
            getThreadComments(navigation.state.params.id).then(data => {
              if (data.data == null) {
                showMessage({
                  icon: "auto",
                  message: "Something went wrong",
                  type: "danger"
                });
              } else {
                this.setState({isLoading: false, data: data});
              }
            })
          }
          style={{color: "white", fontSize: 30, marginRight: 10, marginTop: 5}}
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
        <ScrollView style={{flex: 1}}>
          <View style={styles.ThreadContainer}>
            <View>
              <Markdown markdownStyles={defaultStyles}>
                {this.props.navigation.state.params.op.title}
              </Markdown>
              <Markdown markdownStyles={defaultStyles}>
                {this.props.navigation.state.params.op.body.replace(
                  /(<([^>]+)>)/gi,
                  ""
                )}
              </Markdown>
            </View>
          </View>
          {this.state.data.data.Page.threadComments.map((obj, index) => {
            return (
              <View style={styles.ThreadContainer} key={obj.id}>
                <Markdown markdownStyles={defaultStyles} onLinkPress={true}>
                  {obj.comment.replace(/(<([^>]+)>)/gi, "")}
                </Markdown>
                <Text style={styles.ThreadBody}>#{index + 1}</Text>
              </View>
            );
          })}
        </ScrollView>
      );
    }
  }
}

//Create Component Styles
var styles = StyleSheet.create({
  ThreadContainer: {
    width: "100%",
    backgroundColor: "#232323", //"#232323",
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
    color: "white"
  }
});
