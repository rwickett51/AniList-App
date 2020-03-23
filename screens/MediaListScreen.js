//Import React
import React from "react";

//Import React Components
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ImageBackground,
  RefreshControl
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ImageLoader from "../components/ImageLoader.js";

//Import Services
import NavigationService from "../services/NavigationService.js";
import {getUserMediaList} from "../services/AniListQueryService.js";

export default class SettingsScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.state = {listData: null, isLoading: true, refreshing: false};
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {
    this.updateUI();
  }

  updateUI = () => {
    this.setState({refreshing: true});
    getUserMediaList(this.props.navigation.state.params.type).then(data => {
      console.log(data);
      this.setState({listData: data, isLoading: false, refreshing: false});
    });
  };

  //Header Options
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.type,
      tabBarOptions: {
        style: {
          backgroundColor: "#2A2A2A"
        }
      },
      headerLeft: () => (
        <Icon
          name="ios-menu"
          onPress={() => navigation.openDrawer()}
          style={{
            color: "white",
            fontSize: 30,
            marginLeft: 10,
            marginTop: 5
          }}
        />
      )
    };
  };

  //Render Components to screen
  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else
      return (
        <ImageBackground
          style={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            flex: 1
          }}
          blurRadius={15}
        >
          <ScrollView style={{backgroundColor: "rgba(0,0,0, 0.07)"}}>
            <RefreshControl
              onRefresh={() => this.updateUI()}
              colors="white"
              refreshing={this.state.refreshing}
            />
            {this.state.listData.data.MediaListCollection.lists.map(obj => {
              return (
                <View>
                  <Text style={{color: "white", fontSize: 25, margin: 30}}>
                    {obj.name}
                  </Text>
                  <View>
                    {obj.entries.map(media => {
                      return (
                        <TouchableOpacity
                          key={obj.id}
                          activeOpacity={0.5}
                          onPress={() =>
                            NavigationService.navigate("Details", {
                              itemId: media.mediaId,
                              title: media.media.romaji,
                              type: media.media.type
                            })
                          }
                          style={{flexDirection: "row"}}
                        >
                          <ImageLoader
                            source={{uri: media.media.coverImage.medium}}
                            style={{
                              height: 100,
                              width: 70,
                              marginBottom: 5,
                              marginTop: 5
                            }}
                          />
                          <Text style={{color: "white", marginLeft: 10}}>
                            {media.media.title.romaji}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </ImageBackground>
      );
  }
}

//Create Component Styles
var styles = StyleSheet.create({});
