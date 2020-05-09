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
import StaffMediaHorizontalList from "../components/StaffMediaHorizontalList";
import StaffCharacterHorizontalList from "../components/StaffCharacterHorizontalList";

//Import Custom Styles
import defaultStyles from "../constants/MarkdownStyles";

//Import Services
import {getStaffInfo} from "../services/AniListQueryService";

export default class StaffScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.scrollY = new Animated.Value(0);
    this.state = {
      data: null,
      isFavourite: false,
      ImageOpacity: this.scrollY.interpolate({
        inputRange: [0, 300],
        outputRange: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]
      }),
      isFavouriteIcon: "hearto"
    };
  }

  async getData(mediaType, sortType) {
    return getStaffInfo(this.props.route.params?.staffId).then(data => {
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
    this.getData().then(data => {
      if (data.data != null)
        this.setState({
          data: data,
          isFavourite: data.data.Staff.isFavourite,
          isFavouriteIcon:
            data.data.Staff.isFavourite == true ? "heart" : "hearto"
        });
      console.log(data.data.Staff.staffMedia.nodes.length);
      console.log(data.data.Staff.staffMedia.edges.length);
      console.log(data.data.Staff.characters.edges.length);
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
            source={{uri: this.state.data.data.Staff.image.large}}
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
            scrollEventThrottle={32}
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
                {this.state.data.data.Staff.name.full}
              </Text>
              <TouchableHighlight
                onPress={() => {
                  toggleLike({
                    staffId: this.state.data.data.Staff.id
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
                    {this.state.data.data.Staff.favourites}
                  </Text>
                </View>
              </TouchableHighlight>
              <View style={styles.description}>
                <Markdown markdownStyles={defaultStyles} onLinkPress={true}>
                  {!this.state.data.data.Staff.description
                    ? "No description"
                    : this.state.data.data.Staff.description.replace(
                        /<br>/gi,
                        "\n"
                      )}
                </Markdown>
              </View>
              <StaffMediaHorizontalList data={this.state.data} />
              <StaffCharacterHorizontalList data={this.state.data} />
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
