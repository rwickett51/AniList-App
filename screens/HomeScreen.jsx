//Import React
import React from "react";

//Import React Components
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ActivityItem from "../components/ActivityItem";

//Import Services
import {getUserActivity} from "../services/AniListQueryService";

export default class HomeScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.state = {
      id: 341284,
      isLoading: true,
      data: null
    };
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {
    getUserActivity(this.state.id).then(data => {
      this.setState({data: data, isLoading: false});
    });
  }

  //Header Options
  static navigationOptions = ({navigation}) => {
    return {
      title: "Home",
      headerLeft: () => (
        <Icon
          name="ios-menu"
          onPress={() => navigation.openDrawer()}
          style={{color: "white", fontSize: 30, marginLeft: 10, marginTop: 5}}
        />
      ),
      tabBarOptions: {
        style: {
          backgroundColor: "#2A2A2A"
        }
      }
    };
  };

  //Render Components to screen
  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator />;
    } else {
      console.log(this.state.data);
      return (
        <ScrollView style={{flex: 1}}>
          {this.state.data.data.Page.ListFields.map(obj => {
            return <ActivityItem data={obj} />;
          })}
        </ScrollView>
      );
    }
  }
}

//Create Component Styles
var styles = StyleSheet.create({
  ActivityContainer: {
    width: "95%",
    height: 100,
    backgroundColor: "grey",
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 5
  },
  ActivityImage: {
    height: 100,
    width: 65,
    borderRadius: 5
  }
});
