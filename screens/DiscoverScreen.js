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
  TextInput,
  AsyncStorage,
  ImageBackground
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import {getDiscoverInfo} from "../services/AniListQueryService.js";
import ImageLoader from "../components/ImageLoader.js";

//Import Services
import NavigationService from "../services/NavigationService.js";

export default class SettingsScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      topanimedata: null,
      trendinganimedata: null,
      topmangadata: null,
      trendingmangadata: null
    };
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {
    getDiscoverInfo("ANIME", "POPULARITY_DESC").then(data =>
      this.setState({isLoading: false, topanimedata: data})
    );
    getDiscoverInfo("ANIME", "TRENDING_DESC").then(data =>
      this.setState({isLoading: false, trendinganimedata: data})
    );
    getDiscoverInfo("MANGA", "POPULARITY_DESC").then(data =>
      this.setState({isLoading: false, topmangadata: data})
    );
    getDiscoverInfo("MANGA", "TRENDING_DESC").then(data =>
      this.setState({isLoading: false, trendingmangadata: data})
    );
  }

  //Header Options
  static navigationOptions = ({navigation}) => {
    return {
      title: "Discover",
      headerRight: () => (
        <Icon
          name="ios-search"
          onPress={() => NavigationService.navigate("Search")}
          style={{color: "white", fontSize: 30, marginRight: 10, marginTop: 5}}
        />
      )
    };
  };

  //Generate Horizontal Lists
  horizontalList(data) {
    return (
      <ScrollView
        horizontal={true}
        style={styles.horizontalScroll}
        nestedScrollEnabled
        indicatorStyle="white"
      >
        {data.map(obj => {
          return (
            <TouchableOpacity
              key={obj.id}
              activeOpacity={0.5}
              onPress={() =>
                NavigationService.navigate("Details", {
                  itemId: obj.id,
                  title: obj.title.userPreferred,
                  type: obj.type
                })
              }
            >
              <View style={styles.box}>
                <ImageLoader
                  source={{uri: obj.coverImage.large}}
                  style={styles.img}
                />
              </View>
              <View style={{flex: 1, marginTop: 10, width: 150}}>
                <Text
                  style={{alignSelf: "center", color: "white"}}
                  numberOfLines={2}
                >
                  {obj.title.userPreferred}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  //Render Components to screen
  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{flex: 1, justifyContent: "center", alignItems: "center"}}
          size="large"
        >
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <ImageBackground
          source={require("../assets/MediaListBackground.jpg")}
          style={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            flex: 1
          }}
          blurRadius={15}
        >
          <ScrollView
            style={{flex: 1, backgroundColor: "rgba(0,0,0, 0.35)"}}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.headerText}>Trending Anime</Text>
            {this.state.topanimedata == null ? (
              <ActivityIndicator />
            ) : (
              this.horizontalList(this.state.topanimedata.data.Page.media)
            )}
            <Text style={styles.headerText}>Most Popular Anime</Text>
            {this.state.trendinganimedata == null ? (
              <ActivityIndicator />
            ) : (
              this.horizontalList(this.state.trendinganimedata.data.Page.media)
            )}
            <Text style={styles.headerText}>Trending Manga</Text>
            {this.state.topmangadata == null ? (
              <ActivityIndicator />
            ) : (
              this.horizontalList(this.state.topmangadata.data.Page.media)
            )}
            <Text style={styles.headerText}>Most Popular Manga</Text>
            {this.state.trendingmangadata == null ? (
              <ActivityIndicator />
            ) : (
              this.horizontalList(this.state.trendingmangadata.data.Page.media)
            )}
          </ScrollView>
        </ImageBackground>
      );
    }
  }
}

//Create Component Styles
var styles = StyleSheet.create({
  box: {
    width: 150,
    alignSelf: "center",
    marginRight: 10,
    marginLeft: 10,
    flex: 4
  },
  img: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    height: "50%",
    resizeMode: "cover",
    borderRadius: 20,
    overflow: "hidden"
  },
  img2: {
    height: 100,
    width: 100
  },
  horizontalScroll: {
    height: 250,
    flexDirection: "row"
  },
  headerText: {
    color: "white",
    fontSize: 20,
    margin: 20
  },
  results: {
    position: "absolute",
    top: 60,
    left: 10,
    right: 10,
    height: 300,
    borderRadius: 10,
    backgroundColor: "white",
    zIndex: 2
  },
  searchbar: {
    backgroundColor: "white",
    left: "5%",
    top: "1%",
    width: "90%",
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    flexDirection: "row"
  }
});
