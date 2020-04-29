//Import React
import React from "react";

//Import React Components
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  ScrollView,
  Dimensions,
  Animated,
  TouchableHighlight
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import {LinearGradient} from "expo-linear-gradient";

//Import Custom Components
import Markdown from "react-native-easy-markdown";
import {showMessage, hideMessage} from "react-native-flash-message";
import ImageLoader from "../components/AutoscaleImageLoader";
import CharacterMediaHorizontalList from "../components/CharacterMediaHorizontalList";
import CharacterVoiceActorHorizontalList from "../components/CharacterVoiceActorHorizontalList";

//Import Custom Styles
import defaultStyles from "../constants/MarkdownStyles";

//Import Services
import NavigationService from "../services/NavigationService";
import {getCharacterInfo, toggleLike} from "../services/AniListQueryService";

export default class CharacterScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.scrollY = new Animated.Value(0);
    this.state = {
      data: null,
      ImageOpacity: this.scrollY.interpolate({
        inputRange: [0, 300],
        outputRange: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]
      }),
      isFavourite: false,
      isFavouriteIcon: "hearto"
    };
  }

  async getData(mediaType, sortType) {
    return getCharacterInfo(this.props.navigation.state.params.id).then(
      data => {
        if (data.data == null) {
          showMessage({
            icon: "auto",
            message: `Something went wrong`,
            type: "warning"
          });
          return null;
        }
        return data;
      }
    );
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {
    this.getData().then(data => {
      if (data.data != null)
        this.setState({
          data: data,
          isFavourite: data.data.Character.isFavourite,
          isFavouriteIcon:
            data.data.Character.isFavourite == true ? "heart" : "hearto"
        });
    });
  }

  //Header Options
  static navigationOptions = ({navigation}) => {
    return {
      title: "",
      headerTransparent: true,
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

  //Custom Functions

  //Render Components to screen
  render() {
    if (this.state.data == null) {
      return (
        <View
          style={{flex: 1, alignItems: "center", justifyContent: "center"}}
        ></View>
      );
    } else
      return (
        <View style={StyleSheet.absoluteFill}>
          <ImageLoader
            source={{uri: this.state.data.data.Character.image.large}}
            style={styles.HeaderImage}
            resizeMode="contain"
            width={Dimensions.get("window").width}
          />
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: this.state.ImageOpacity
            }}
          />
          <ScrollView
            scrollEventThrottle={200}
            style={StyleSheet.absoluteFill}
            onScroll={Animated.event([
              {nativeEvent: {contentOffset: {y: this.scrollY}}}
            ])}
          >
            <View style={styles.GradientContainer}>
              <LinearGradient
                colors={["black", "transparent"]}
                style={{flex: 1}}
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0.25}}
              />
            </View>
            {/*Styles For the Main Content*/}
            <View style={styles.ContentContainer}>
              <Text style={styles.NameText} numberOfLines={2}>
                {this.state.data.data.Character.name.full}
              </Text>
              <TouchableHighlight
                onPress={() => {
                  toggleLike({
                    characterId: this.state.data.data.Character.id
                  }).then(data => {
                    console.log(data);
                  });
                  if (this.state.isFavourite) {
                    this.setState({
                      isFavourite: false,
                      isFavouriteIcon: "hearto"
                    });
                  } else {
                    this.setState({
                      isFavourite: true,
                      isFavouriteIcon: "heart"
                    });
                  }
                }}
              >
                <View style={styles.LikeButton}>
                  <Icon
                    name={this.state.isFavouriteIcon}
                    size={25}
                    color="white"
                  />
                  <Text style={styles.LikeButtonText}>
                    {this.state.data.data.Character.favourites}
                  </Text>
                </View>
              </TouchableHighlight>
              <View style={styles.description}>
                <Markdown markdownStyles={defaultStyles} onLinkPress={true}>
                  {!this.state.data.data.Character.description
                    ? "No description"
                    : this.state.data.data.Character.description.replace(
                        /<br>/gi,
                        "\n"
                      )}
                </Markdown>
              </View>
              <CharacterMediaHorizontalList data={this.state.data} />
              <CharacterVoiceActorHorizontalList data={this.state.data} />
            </View>
          </ScrollView>
        </View>
      );
  }
}

//Create Component Styles
var styles = StyleSheet.create({
  ImageBackground: {
    flex: 1
  },
  HeaderImage: {
    position: "absolute"
  },
  GradientContainer: {height: 250, width: "100%", marginTop: 150},
  ContentContainer: {backgroundColor: "black"},
  NameText: {
    color: "white",
    alignSelf: "center",
    fontSize: 30,
    margin: 10
  },
  description: {
    marginLeft: 15,
    marginRight: 15
  },

  LikeButton: {
    height: 50,
    width: 100,
    backgroundColor: "#EA3C53",
    borderRadius: 5,
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 5
  },
  LikeButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold"
  }
});
