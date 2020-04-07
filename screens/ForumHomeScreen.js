//Import React
import React from "react";

//Import React Components
import {View, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class ForumHomeScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.state = {};
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {}

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
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text style={{color: "grey"}}>Text</Text>
      </View>
    );
  }
}

//Create Component Styles
var styles = StyleSheet.create({});
