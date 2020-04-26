import React from "react";
import {
  Button,
  Image,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Picker,
  ImageBackground
} from "react-native";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {LinearGradient} from "expo-linear-gradient";
import NavigationService from "../services/NavigationService.js";
import {getMediaInfo, addEntryToList} from "../services/AniListQueryService.js";
import RelatedHorizontalList from "../components/RelatedHorizontalList.js";
import RecommendationHorizontalList from "../components/RecommendationHorizontalList.js";
import MediaCharacterHorizontalList from "../components/MediaCharacterHorizontalList.js";
import ImageLoader from "../components/ImageLoader.js";
import {TextButton, RaisedTextButton} from "react-native-material-buttons";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/Ionicons";
export default class DescriptionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
      selectedValue: "",
      isCollapsedReccomendation: true,
      isCollapsedCharacters: true,
      isCollapsedRelated: true
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: "",
      headerTransparent: true,
      headerRight: () => (
        <Button
          onPress={() =>
            Alert.alert(
              navigation.getParam("title", "Title"),
              navigation.getParam("itemId", "id").toString()
            )
          }
          title={"Info "}
        />
      ),
      headerBackground: () => (
        <LinearGradient
          colors={["black", "transparent"]}
          style={{flex: 1}}
          start={{x: 0, y: 0.25}}
          end={{x: 0, y: 1}}
        />
      )
    };
  };

  componentDidMount() {
    getMediaInfo(
      this.props.navigation.state.params.itemId,
      this.props.navigation.state.params.type
    ).then(data => {
      //console.log(data);
      this.setState({data: data, isLoading: false});
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      let data = this.state.data.data.Media;
      return (
        <ImageBackground
          source={{uri: data.coverImage.extraLarge}}
          style={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            flex: 1
          }}
          blurRadius={15}
        >
          <ScrollView style={{flex: 1, backgroundColor: "rgba(0,0,0, 0.25)"}}>
            <ImageLoader
              source={{uri: data.coverImage.large}}
              style={styles.coverImg}
            />
            <Text style={styles.title}>{data.title.userPreferred}</Text>
            <RaisedTextButton
              title="Edit Title"
              onPress={() =>
                NavigationService.navigate("EditEntry", {
                  mediaId: data.id,
                  image: data.coverImage.extraLarge,
                  title: data.title.userPreferred,
                  type: data.type
                })
              }
              style={{
                width: "75%",
                alignSelf: "center",
                backgroundColor: "#5280e9",
                marginBottom: 15
              }}
            />
            <View>
              <Text style={{color: "white"}}>
                Rating: {data.averageScore}/100
              </Text>
              <View style={{flexDirection: "row"}}>
                <Text style={{color: "white"}}>Genres: </Text>
                {data.genres.map(obj => {
                  return <Text style={{color: "white"}}>{obj}, </Text>;
                })}
              </View>

              {this.props.navigation.state.params.type == "ANIME" ? (
                <Text style={{color: "white"}}>Episodes: {data.episodes}</Text>
              ) : (
                <View>
                  <Text style={{color: "white"}}>Volumes: {data.volumes}</Text>
                  <Text style={{color: "white"}}>
                    Chapters: {data.chapters}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.description}>
              <Text style={{color: "white"}}>
                {data.description == null
                  ? ""
                  : data.description.replace(/<[^>]*>?/gm, "")}
              </Text>
            </View>

            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({
                  isCollapsedRelated: !this.state.isCollapsedRelated
                });
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      marginLeft: 15
                    }}
                  >
                    Related
                  </Text>
                  <Icon
                    name="ios-arrow-down"
                    style={{
                      color: "white",
                      fontSize: 35,
                      marginLeft: 10,
                      marginRight: 15,
                      transform: [
                        {
                          rotateX:
                            this.state.isCollapsedRelated == true
                              ? "0deg"
                              : "180deg"
                        }
                      ]
                    }}
                  />
                </View>
                <View
                  style={{
                    borderBottomColor: "gray",
                    borderBottomWidth: 1
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
            <Collapsible collapsed={this.state.isCollapsedRelated}>
              <RelatedHorizontalList data={data} />
            </Collapsible>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({
                  isCollapsedReccomendation: !this.state
                    .isCollapsedReccomendation
                });
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      marginLeft: 15
                    }}
                  >
                    Recommendations
                  </Text>
                  <Icon
                    name="ios-arrow-down"
                    style={{
                      color: "white",
                      fontSize: 35,
                      marginLeft: 10,
                      marginRight: 15,
                      transform: [
                        {
                          rotateX:
                            this.state.isCollapsedReccomendation == true
                              ? "0deg"
                              : "180deg"
                        }
                      ]
                    }}
                  />
                </View>
                <View
                  style={{
                    borderBottomColor: "gray",
                    borderBottomWidth: 1
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
            <Collapsible collapsed={this.state.isCollapsedReccomendation}>
              <RecommendationHorizontalList data={data} />
            </Collapsible>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({
                  isCollapsedCharacters: !this.state.isCollapsedCharacters
                });
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      marginLeft: 15
                    }}
                  >
                    Characters
                  </Text>
                  <Icon
                    name="ios-arrow-down"
                    style={{
                      color: "white",
                      fontSize: 35,
                      marginLeft: 10,
                      marginRight: 15,
                      transform: [
                        {
                          rotateX:
                            this.state.isCollapsedCharacters == true
                              ? "0deg"
                              : "180deg"
                        }
                      ]
                    }}
                  />
                </View>
                <View
                  style={{
                    borderBottomColor: "gray",
                    borderBottomWidth: 1
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
            <Collapsible collapsed={this.state.isCollapsedCharacters}>
              <MediaCharacterHorizontalList data={data} />
            </Collapsible>
          </ScrollView>
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  coverImg: {
    height: 250,
    width: 170,
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: 90
  },
  bannerimg: {
    position: "absolute",
    height: 200,
    resizeMode: "cover",
    flex: 1,
    top: 0,
    right: 0,
    left: 0
  },
  title: {
    color: "white",
    alignSelf: "center",
    fontSize: 20,
    margin: 10
  },
  recommendationImg: {height: 150, width: 105},
  description: {
    marginLeft: 15,
    marginRight: 15
  }
});
