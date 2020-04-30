//Import React
import React from "react";

//Import React Components
import {View, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {LinearGradient} from "expo-linear-gradient";

//Import Custom components

//Import Services
import * as NavigationService from "../services/NavigationService";
import {getMediaInfo} from "../services/AniListQueryService";

export default class MediaScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  async getData(mediaType, sortType) {
    return getMediaInfo(
      this.props.route.params?.mediaId,
      this.props.route.params?.mediaType
    ).then(data => {
      if (data.data == null) {
        showMessage({
          icon: "auto",
          message: `Something went wrong`,
          type: "warning"
        });
        return null;
      }
      return data;
    });
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {
    this.getData().then(data => {
      if (data.data != null)
        this.setState({
          data: data
        });
    });
  }

  //Header Options
  static navigationOptions = ({navigation}) => {
    return {
      title: "Media",
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
