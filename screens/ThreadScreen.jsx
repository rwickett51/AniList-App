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
import defaultStyles from "../constants/MarkdownStyles";

//Import Services
import NavigationService from "../services/NavigationService";
import {getThreadComments} from "../services/AniListQueryService";

export default class ThreadScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.state = {data: null, isLoading: true, order: "ID"};
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {
    NavigationService.setParams({getComments: this.getComments});
    this.getComments();
  }

  getComments() {
    let order = this.state.order;
    if (order == "ID") {
      this.setState({order: "ID_DESC"});
      order = "ID_DESC";
    } else {
      this.setState({order: "ID"});
      order = "ID";
    }
    getThreadComments(this.props.navigation.state.params.id, order).then(
      data => {
        console.log(data);
        if (
          data.data === null ||
          data.data.Page === null ||
          data == undefined
        ) {
          showMessage({
            icon: "auto",
            message: "Something went wrong",
            type: "danger"
          });
        } else {
          this.setState({isLoading: false, data: data});
        }
      }
    );
  }

  //Header Options
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: "Thread"
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
