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
  ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

//Import Custom Components
import ImageLoader from "../components/ImageLoader.js";
import DiscoverList from "../components/DiscoverList.js";
import {showMessage, hideMessage} from "react-native-flash-message";

//Import Services
import NavigationService from "../services/NavigationService.js";
import {getDiscoverInfo} from "../services/AniListQueryService.js";

export default class DiscoverScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      popularanimedata: null,
      trendinganimedata: null,
      popularmangadata: null,
      trendingmangadata: null,
      topanimedata: null,
      topmangadata: null
    };
  }

  async getData(mediaType, sortType) {
    return getDiscoverInfo(mediaType, sortType).then(data => {
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
    this.getData("ANIME", "POPULARITY_DESC").then(data => {
      if (data != null)
        this.setState({isLoading: false, popularanimedata: data});
    });
    this.getData("ANIME", "TRENDING_DESC").then(data => {
      if (data != null)
        this.setState({isLoading: false, trendinganimedata: data});
    });
    this.getData("MANGA", "POPULARITY_DESC").then(data => {
      if (data != null)
        this.setState({isLoading: false, popularmangadata: data});
    });
    this.getData("MANGA", "TRENDING_DESC").then(data => {
      if (data != null)
        this.setState({isLoading: false, trendingmangadata: data});
    });
    this.getData("ANIME", "SCORE_DESC").then(data => {
      if (data != null) this.setState({isLoading: false, topanimedata: data});
    });
    this.getData("MANGA", "SCORE_DESC").then(data => {
      if (data != null) this.setState({isLoading: false, topmangadata: data});
    });
  }

  //Header Options
  static navigationOptions = ({navigation}) => {
    return {
      title: "Discover",
      headerLeft: () => (
        <Icon
          name="ios-menu"
          onPress={() => navigation.openDrawer()}
          style={{color: "white", fontSize: 30, marginLeft: 10, marginTop: 5}}
        />
      ),
      headerRight: () => (
        <Icon
          name="ios-search"
          onPress={() => NavigationService.navigate("Search")}
          style={{color: "white", fontSize: 30, marginRight: 10, marginTop: 5}}
        />
      )
    };
  };

  //Render Components to screen
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <ImageBackground
          source={require("../assets/MediaListBackground.jpg")}
          style={styles.ImageBackground}
          blurRadius={15}
        >
          <ScrollView
            style={styles.ScrollView}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.HeaderText}>Popular Anime</Text>
            {this.state.popularanimedata == null ? (
              <ActivityIndicator />
            ) : (
              <DiscoverList
                data={this.state.popularanimedata.data.Page.media}
              />
            )}
            <Text style={styles.HeaderText}>Trending Anime</Text>
            {this.state.trendinganimedata == null ? (
              <ActivityIndicator />
            ) : (
              <DiscoverList
                data={this.state.trendinganimedata.data.Page.media}
              />
            )}
            <Text style={styles.HeaderText}>Top Anime</Text>
            {this.state.topanimedata == null ? (
              <ActivityIndicator />
            ) : (
              <DiscoverList data={this.state.topanimedata.data.Page.media} />
            )}
            <Text style={styles.HeaderText}>Popular Manga</Text>
            {this.state.popularmangadata == null ? (
              <ActivityIndicator />
            ) : (
              <DiscoverList
                data={this.state.popularmangadata.data.Page.media}
              />
            )}
            <Text style={styles.HeaderText}>Trending Manga</Text>
            {this.state.trendingmangadata == null ? (
              <ActivityIndicator />
            ) : (
              <DiscoverList
                data={this.state.trendingmangadata.data.Page.media}
              />
            )}
            <Text style={styles.HeaderText}>Top Manga</Text>
            {this.state.topmangadata == null ? (
              <ActivityIndicator />
            ) : (
              <DiscoverList data={this.state.topmangadata.data.Page.media} />
            )}
          </ScrollView>
        </ImageBackground>
      );
    }
  }
}

//Create Component Styles
var styles = StyleSheet.create({
  ImageBackground: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1
  },
  ScrollView: {flex: 1, backgroundColor: "rgba(0,0,0, 0.35)"},
  HeaderText: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
    marginVertical: 10
  }
});
