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
import Icon from "react-native-vector-icons/Ionicons";
import {
  searchMedia,
  searchStaff,
  searchCharacters
} from "../services/AniListQueryService";

import * as NavigationService from "../services/NavigationService";

export default class SettingsScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      animedata: null,
      mangadata: null,
      staffdata: null,
      characterdata: null
    };
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {}

  //Header Options
  static navigationOptions = ({navigation}) => {
    return {
      headerShown: false
    };
  };

  updateSearch(value) {
    this.setState({
      search: value.toString()
    });
    if (this.state.search.length >= 2) {
      this.updateSearches(value.toString());
    }
  }

  updateSearches(search) {
    searchMedia("ANIME", search).then(data => this.setState({animedata: data}));
    searchMedia("MANGA", search).then(data => this.setState({mangadata: data}));
    searchStaff(search).then(data => this.setState({staffdata: data}));
    searchCharacters(search).then(data => this.setState({characterdata: data}));
  }

  generateMediaList(title, data) {
    //console.log(data);
    return (
      <View>
        <Text
          style={{
            color: "white",
            marginLeft: 20,
            fontSize: 20,
            marginTop: 20
          }}
        >
          {title}
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
          {data == null ? (
            <Text>''</Text>
          ) : (
            data.data.Page.media.map(obj => (
              <TouchableOpacity
                key={obj.id}
                activeOpacity={0.5}
                onPress={() =>
                  NavigationService.navigate({
                    name: "Media",
                    mediaId: obj.id,
                    params: {
                      mediaId: obj.id,
                      mediaType: obj.type
                    }
                  })
                }
              >
                <View style={{flexDirection: "row"}}>
                  <Image
                    source={{uri: obj.coverImage.medium}}
                    style={styles.img}
                  />
                  <Text style={{color: "white", marginTop: 15, marginLeft: 15}}>
                    {obj.title.userPreferred}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
    );
  }

  //Render Components to screen
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 50
          }}
        >
          <View
            style={{
              width: "85%",
              left: "5%",
              height: 30,
              backgroundColor: "white",

              borderRadius: 15,
              flexDirection: "row"
            }}
          >
            <Icon
              name="md-arrow-back"
              style={{
                color: "black",
                fontSize: 25,
                marginLeft: 10,
                marginTop: 2
              }}
              onPress={() => NavigationService.goBack()}
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
        </View>
        <ScrollView>
          {this.state.animedata != null ? (
            this.generateMediaList("Anime", this.state.animedata)
          ) : (
            <View></View>
          )}
          {this.state.mangadata != null ? (
            this.generateMediaList("Manga", this.state.mangadata)
          ) : (
            <View></View>
          )}

          {this.state.staffdata != null ? (
            <View>
              <Text
                style={{
                  color: "white",
                  marginLeft: 20,
                  fontSize: 20,
                  marginTop: 10
                }}
              >
                Staff
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
                {this.state.staffdata == null ? (
                  <Text>''</Text>
                ) : (
                  this.state.staffdata.data.Page.staff.map(obj => (
                    <TouchableOpacity
                      key={obj.id}
                      activeOpacity={0.5}
                      onPress={() =>
                        NavigationService.navigate({
                          name: "Staff",
                          params: {staffId: obj.id}
                        })
                      }
                    >
                      <View style={{flexDirection: "row"}}>
                        <Image
                          source={{uri: obj.image.medium}}
                          style={styles.img}
                        />
                        <Text
                          style={{
                            color: "white",
                            marginTop: 15,
                            marginLeft: 15
                          }}
                        >
                          {obj.name.full}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </View>
          ) : (
            <View></View>
          )}
          {this.state.characterdata != null ? (
            <View>
              <Text
                style={{
                  color: "white",
                  marginLeft: 20,
                  fontSize: 20,
                  marginTop: 10
                }}
              >
                Characters
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
                {this.state.characterdata == null ? (
                  <Text>''</Text>
                ) : (
                  this.state.characterdata.data.Page.characters.map(obj => (
                    <TouchableOpacity
                      key={obj.id}
                      activeOpacity={0.5}
                      onPress={() =>
                        NavigationService.navigate({
                          name: "Character",
                          key: obj.id,
                          params: {characterId: obj.id}
                        })
                      }
                    >
                      <View style={{flexDirection: "row"}}>
                        <Image
                          source={{uri: obj.image.medium}}
                          style={styles.img}
                        />
                        <Text
                          style={{
                            color: "white",
                            marginTop: 15,
                            marginLeft: 15
                          }}
                        >
                          {obj.name.full}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </View>
          ) : (
            <View></View>
          )}
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
    width: 70,
    marginLeft: 20,
    marginTop: 15
  }
});
