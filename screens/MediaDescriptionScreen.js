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
  Picker,
  ImageBackground
} from "react-native";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {LinearGradient} from "expo-linear-gradient";
import Home from "./HomeScreen.js";
import NavigationService from "../services/NavigationService.js";
import {getInfo, addEntryToList} from "../services/AniListQueryService.js";
import RelatedHorizontalList from "../components/RelatedHorizontalList.js";
import RecommendationHorizontalList from "../components/RecommendationHorizontalList.js";
import ImageLoader from "../components/ImageLoader.js";
import {TextButton, RaisedTextButton} from "react-native-material-buttons";
export default class DescriptionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
      selectedValue: ""
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
    console.log(this.props.navigation.state.params.itemId);
    getInfo(
      this.props.navigation.state.params.itemId,
      this.props.navigation.state.params.type
    ).then(data => {
      console.log(data);
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
            <Text style={styles.title}>{data.title.romaji}</Text>
            <RaisedTextButton
              title="Edit Title"
              onPress={() =>
                NavigationService.navigate("EditEntry", {
                  mediaId: data.id,
                  image: data.coverImage.extraLarge
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

            {data.relations.edges.length == 0 ? (
              <View></View>
            ) : (
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 30,
                  color: "white",
                  fontSize: 15
                }}
              >
                Related
              </Text>
            )}
            <RelatedHorizontalList data={data} />
            {data.recommendations.edges.length == 0 ? (
              <View></View>
            ) : (
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 30,
                  color: "white",
                  fontSize: 15
                }}
              >
                Recommendations
              </Text>
            )}
            <RecommendationHorizontalList data={data} />
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
    marginTop: 90,
    borderWidth: 5
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
