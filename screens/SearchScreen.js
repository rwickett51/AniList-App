//Import React
import React from "react";

//Import React Components
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import {List, ListItem} from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

import NavigationService from "../services/NavigationService.js";

export default class SettingsScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      animedata: null,
      mangadata: null
    };
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {}

  //Header Options
  static navigationOptions = ({navigation}) => {
    return {
      title: "Template",
      headerShown: false
    };
  };

  updateSearch(value) {
    this.setState({
      search: value.toString()
    });
    if (this.state.search.length >= 2) {
      this.updateSearchRecommendations();
      this.updateSearchRecommendations("MANGA");
    }
  }

  updateSearchRecommendations(mediatype = "ANIME") {
    var query = `
    query ($page: Int, $perPage: Int, $search: String) {
      Page (page: $page, perPage: $perPage) {
        media (search: $search, type: ${mediatype}) {
          id
          coverImage {
            large
          }
          title {
            romaji
          }
        }
      }
    }
    `;
    console.log(mediatype);

    var variables = {
      search: this.state.search,
      page: 1,
      perPage: 5
    };

    var url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        })
      };

    fetch(url, options)
      .then(response => {
        return response.json().then(function(json) {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then(responseJson => {
        if (mediatype === "ANIME") {
          this.setState({
            animedata: responseJson
          });
        } else if (mediatype === "MANGA") {
          this.setState({
            mangadata: responseJson
          });
        }
        console.log(responseJson);
      });
  }

  //Render Components to screen
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            width: "85%",
            left: "5%",
            height: 30,
            backgroundColor: "white",
            marginTop: 10,
            borderRadius: 15,
            flexDirection: "row"
          }}
        >
          <Icon
            name="md-arrow-back"
            style={{color: "black", fontSize: 25, marginLeft: 10, marginTop: 2}}
            onPress={() => NavigationService.navigate("Sandbox")}
          />
          <TextInput
            value={this.state.search}
            placeholder="Search"
            onChangeText={value => this.updateSearch(value)}
            style={styles.searchbar}
            autoFocus
            clearButtonMode={"always"}
          />
        </View>
        <ScrollView>
          <Text
            style={{
              color: "white",
              marginLeft: 20,
              fontSize: 20,
              marginTop: 20
            }}
          >
            Anime
          </Text>
          <View
            style={{
              backgroundColor: "white",
              height: 1,
              width: "100%",
              margin: 10
            }}
          ></View>
          <View>
            {this.state.animedata == null ? (
              <Text>''</Text>
            ) : (
              this.state.animedata.data.Page.media.map(obj => (
                <TouchableOpacity
                  key={obj.id}
                  activeOpacity={0.5}
                  onPress={() =>
                    NavigationService.navigate("Details", {
                      itemId: obj.id,
                      title: obj.title.romaji,
                      type: "ANIME"
                    })
                  }
                >
                  <View style={{flexDirection: "row"}}>
                    <Image
                      source={{uri: obj.coverImage.large}}
                      style={styles.img}
                    />
                    <Text
                      style={{color: "white", marginTop: 15, marginLeft: 15}}
                    >
                      {obj.title.romaji}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
          <Text
            style={{
              color: "white",
              marginLeft: 20,
              fontSize: 20,
              marginTop: 10
            }}
          >
            Manga
          </Text>
          <View
            style={{
              backgroundColor: "white",
              height: 1,
              width: "100%",
              margin: 10
            }}
          ></View>
          <View>
            {this.state.mangadata == null ? (
              <Text>''</Text>
            ) : (
              this.state.mangadata.data.Page.media.map(obj => (
                <TouchableOpacity
                  key={obj.id}
                  activeOpacity={0.5}
                  onPress={() =>
                    NavigationService.navigate("Details", {
                      itemId: obj.id,
                      title: obj.title.romaji,
                      type: "MANGA"
                    })
                  }
                >
                  <View style={{flexDirection: "row"}}>
                    <Image
                      source={{uri: obj.coverImage.large}}
                      style={styles.img}
                    />
                    <Text
                      style={{color: "white", marginTop: 15, marginLeft: 15}}
                    >
                      {obj.title.romaji}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

//Create Component Styles
var styles = StyleSheet.create({
  searchbar: {
    backgroundColor: "white",
    marginLeft: 5,
    width: "88%",
    height: 30,
    borderRadius: 15
  },
  img: {
    height: 100,
    width: 50,
    marginLeft: 20,
    marginTop: 15
  }
});
