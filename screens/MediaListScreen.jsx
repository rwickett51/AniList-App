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
import ImageLoader from "../components/ImageLoader";

//Import Services
import * as NavigationService from "../services/NavigationService";
import {getUserMediaList, getViewerId} from "../services/AniListQueryService";

function mapOrder(array, order, key) {
  array.sort((a, b) => {
    var A = a[key],
      B = b[key];

    if (order.indexOf(A) > order.indexOf(B)) {
      return 1;
    } else {
      return -1;
    }
  });

  return array;
}

export default class MediaListScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.name = this.props.route.name;
    console.log(this.props.route.name);
    this.state = {
      isLoading: true
    };
  }

  async getData(viewerId, mediaType) {
    return getUserMediaList(viewerId, mediaType).then(data => {
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

  updateUI = () => {
    this.setState({isLoading: true});
    getViewerId().then(viewerId => {
      this.getData(viewerId.data.Viewer.id, this.name).then(data => {
        let Order = [
          this.name == "ANIME" ? "Watching" : "Reading",
          "Completed",
          "Paused",
          "Dropped",
          "Planning"
        ];
        data.data.MediaListCollection.lists = mapOrder(
          data.data.MediaListCollection.lists,
          Order,
          "name"
        );
        data.data.MediaListCollection.lists.forEach(list => {
          list.entries.sort((a, b) => {
            return a.media.title.userPreferred > b.media.title.userPreferred
              ? 1
              : -1;
          });
        });
        this.setState({data: data, isLoading: false});
      });
    });
  };

  //Called After render(). Recalls render() when finished
  componentDidMount() {
    this.updateUI();
  }

  //Render Components to screen
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: "center"}}>
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
          source={{uri: this.props.route.params?.image}}
          blurRadius={15}
        >
          <ScrollView style={{backgroundColor: "rgba(0,0,0, 0.07)"}}>
            <RefreshControl
              onRefresh={() => this.updateUI()}
              colors="white"
              isLoading={this.state.isLoading}
            />
            {this.state.data.data.MediaListCollection.lists.map(obj => {
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
                            NavigationService.navigate({
                              name: "Media",
                              params: {
                                mediaId: media.mediaId,
                                mediaType: media.media.type
                              }
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
                            {media.media.title.userPreferred}
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
