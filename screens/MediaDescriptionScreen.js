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
import HorizontalList from "../components/HorizontalList.js";
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
    getInfo(
      this.props.navigation.state.params.itemId,
      this.props.navigation.state.params.type
    ).then(data => {
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
            <View>
              {data.bannerImage == null ? (
                <View style={styles.bannerimg}></View>
              ) : (
                <Image
                  source={{uri: data.bannerImage}}
                  style={styles.bannerimg}
                />
              )}
            </View>
            <Image
              source={{uri: data.coverImage.large}}
              style={styles.coverImg}
            />
            <Text style={styles.title}>{data.title.romaji}</Text>
            <Button
              title="Edit Title"
              onPress={() =>
                NavigationService.navigate("EditEntry", {mediaId: data.id})
              }
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
            <HorizontalList data={data} />
          </ScrollView>
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  coverImg: {
    height: 200,
    width: 140,
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: 170,
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
