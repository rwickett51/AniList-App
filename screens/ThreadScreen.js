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

//Import Services
import NavigationService from "../services/NavigationService.js";
import {getThreadComments} from "../services/AniListQueryService.js";
import {showMessage, hideMessage} from "react-native-flash-message";

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
          {this.state.data.data.Page.threadComments.map(obj => {
            return (
              <View style={styles.ThreadContainer}>
                <Text style={styles.ThreadBody}>{obj.comment}</Text>
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
