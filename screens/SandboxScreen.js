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
  TextInput
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

//Import Services
import NavigationService from "../services/NavigationService.js";

export default class SettingsScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      seed: 1,
      topanimedata: null,
      trendinganimedata: null,
      topmangadata: null,
      trendingmangadata: null,
      searchResponseData: null
    };
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {
    if (this.state.topanimedata === null) {
      this.UIUpdate();
    }

    //this.updateSearchRecommendations()
  }

  UIUpdate() {
    var query = `
    query ($id: Int){
      Page(page: 1, perPage: 30) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(id: $id, sort: POPULARITY_DESC) {
          id
          coverImage {
            large
          }
          title {
            english
            native
            romaji
          }
        }
      }
    }
    `;

    var url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          query: query
        })
      };

    fetch(url, options)
      .then(response => {
        return response.json().then(function(json) {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then(responseJson => {
        this.setState({
          topanimedata: responseJson
        });
        var query = `
      query ($id: Int){
        Page(page: 1, perPage: 30) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(id: $id, sort: TRENDING_DESC) {
            id
            coverImage {
              large
            }
            title {
              english
              native
              romaji
            }
          }
        }
      }
      `;

        var url = "https://graphql.anilist.co",
          options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              query: query
            })
          };

        fetch(url, options)
          .then(response => {
            return response.json().then(function(json) {
              return response.ok ? json : Promise.reject(json);
            });
          })
          .then(responseJson => {
            this.setState({
              trendinganimedata: responseJson
            });
            var query = `
        query ($id: Int){
          Page(page: 1, perPage: 30) {
            pageInfo {
              total
              currentPage
              lastPage
              hasNextPage
              perPage
            }
            media(id: $id, sort: POPULARITY_DESC, type: MANGA) {
              id
              coverImage {
                large
              }
              title {
                english
                native
                romaji
              }
            }
          }
        }
        `;

            var url = "https://graphql.anilist.co",
              options = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body: JSON.stringify({
                  query: query
                })
              };

            fetch(url, options)
              .then(response => {
                return response.json().then(function(json) {
                  return response.ok ? json : Promise.reject(json);
                });
              })
              .then(responseJson => {
                this.setState({
                  topmangadata: responseJson
                });
                var query = `
          query ($id: Int){
            Page(page: 1, perPage: 30) {
              pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
              }
              media(id: $id, sort: TRENDING_DESC, type: MANGA) {
                id
                coverImage {
                  large
                }
                title {
                  english
                  native
                  romaji
                }
              }
            }
          }
          `;

                var url = "https://graphql.anilist.co",
                  options = {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json"
                    },
                    body: JSON.stringify({
                      query: query
                    })
                  };

                fetch(url, options)
                  .then(response => {
                    return response.json().then(function(json) {
                      return response.ok ? json : Promise.reject(json);
                    });
                  })
                  .then(responseJson => {
                    this.setState({
                      isLoading: false,
                      trendingmangadata: responseJson
                    });
                  })
                  .catch(error => {
                    alert("Error, check console");
                    console.error(error);
                  });
              })
              .catch(error => {
                alert("Error, check console");
                console.error(error);
              });
          })
          .catch(error => {
            alert("Error, check console");
            console.error(error);
          });
      })
      .catch(error => {
        alert("Error, check console");
        console.error(error);
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
        <View
          style={{flex: 1, justifyContent: "center", alignItems: "center"}}
          size="large"
        >
          <ActivityIndicator />
        </View>
      );
    } else {
      let topanime = this.state.topanimedata.data.Page.media.map(obj => {
        return (
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
            <View style={styles.box}>
              <Image source={{uri: obj.coverImage.large}} style={styles.img} />
            </View>
            <View style={{flex: 1, marginTop: 10, width: 150}}>
              <Text
                style={{alignSelf: "center", color: "white"}}
                numberOfLines={2}
              >
                {obj.title.romaji}
              </Text>
            </View>
          </TouchableOpacity>
        );
      });
      let trendinganime = this.state.trendinganimedata.data.Page.media.map(
        obj => {
          return (
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
              <View style={styles.box}>
                <Image
                  source={{uri: obj.coverImage.large}}
                  style={styles.img}
                />
              </View>
              <View style={{flex: 1, marginTop: 10, width: 150}}>
                <Text
                  style={{alignSelf: "center", color: "white"}}
                  numberOfLines={2}
                >
                  {obj.title.romaji}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }
      );
      let topmanga = this.state.topmangadata.data.Page.media.map(obj => {
        return (
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
            <View style={styles.box}>
              <Image source={{uri: obj.coverImage.large}} style={styles.img} />
            </View>
            <View style={{flex: 1, marginTop: 10, width: 150}}>
              <Text
                style={{alignSelf: "center", color: "white"}}
                numberOfLines={2}
              >
                {obj.title.romaji}
              </Text>
            </View>
          </TouchableOpacity>
        );
      });
      let trendingmanga = this.state.trendingmangadata.data.Page.media.map(
        obj => {
          return (
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
              <View style={styles.box}>
                <Image
                  source={{uri: obj.coverImage.large}}
                  style={styles.img}
                />
              </View>
              <View style={{flex: 1, marginTop: 10, width: 150}}>
                <Text
                  style={{alignSelf: "center", color: "white"}}
                  numberOfLines={2}
                >
                  {obj.title.romaji}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }
      );
      return (
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <Text style={styles.headerText}>Trending Anime</Text>
          <ScrollView
            horizontal={true}
            style={styles.horizontalScroll}
            nestedScrollEnabled
            indicatorStyle="white"
          >
            {topanime}
          </ScrollView>
          <Text style={styles.headerText}>Most Popular Anime</Text>
          <ScrollView
            horizontal={true}
            style={styles.horizontalScroll}
            nestedScrollEnabled
            indicatorStyle="white"
          >
            {trendinganime}
          </ScrollView>
          <Text style={styles.headerText}>Trending Manga</Text>
          <ScrollView
            horizontal={true}
            style={styles.horizontalScroll}
            nestedScrollEnabled
            indicatorStyle="white"
          >
            {topmanga}
          </ScrollView>
          <Text style={styles.headerText}>Most Popular Manga</Text>
          <ScrollView
            horizontal={true}
            style={styles.horizontalScroll}
            nestedScrollEnabled
            indicatorStyle="white"
          >
            {trendingmanga}
          </ScrollView>
        </ScrollView>
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
