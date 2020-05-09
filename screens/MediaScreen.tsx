//Import React
import * as React from "react";

//Import React Components
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import Markdown from "react-native-easy-markdown";

//Import Custom components
import AutoscaleImageLoader from "../components/AutoscaleImageLoader";
import LikeButton from "../components/LikeButton";

//Import Custom Styles
import alternateStyles from "../constants/AlternateMarkdownStyles";
import defaultStyles from "../constants/MarkdownStyles";

//Import Services
import * as NavigationService from "../services/NavigationService";
import { getMediaInfo } from "../services/AniListQueryService";

//Function to convert hex to rgba
function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

export default class MediaScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.scrollY = new Animated.Value(0);
    this.state = {
      isLoading: true,
      color: "#000000",
      currentPage: 0,
    };
  }

  async getData(mediaType, sortType) {
    return getMediaInfo(
      this.props.route.params?.mediaId,
      this.props.route.params?.mediaType
    ).then((data) => {
      if (data.data == null) {
        showMessage({
          icon: "auto",
          message: `Something went wrong`,
          type: "warning",
        });
        return null;
      }
      return data;
    });
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {
    this.getData().then((data) => {
      if (data.data != null) {
        this.setState({
          data: data,
          isLoading: false,
          color:
            data.data.Media.coverImage.color == null
              ? "#ffffff"
              : data.data.Media.coverImage.color,
        });
      }
    });
  }

  //Custom Functions
  _onScroll(e) {
    let newPageNum = Math.round(
      parseFloat(e.nativeEvent.contentOffset.x / Dimensions.get("window").width)
    );
    console.log(newPageNum);
    newPageNum != this.state.currentPage &&
      this.setState({
        currentPage: newPageNum,
      });
  }

  //Render Components to screen
  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
      );
    } else {
      //Get Color Animation
      let a = hexToRGB(this.state.color, 0);
      let b = hexToRGB(this.state.color, 1);
      let CustomImageOpacity = this.scrollY.interpolate({
        inputRange: [0, 400],
        outputRange: [a, b],
      });

      //Get Text Color
      let textColor = this.state.color == "#ffffff" ? "black" : "white";
      return (
        <View style={{ flex: 1, backgroundColor: this.state.color }}>
          <AutoscaleImageLoader
            width={Dimensions.get("window").width}
            source={{ uri: this.state.data.data.Media.coverImage.extraLarge }}
            style={styles.BackgroundImage}
          />
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: CustomImageOpacity,
            }}
          />
          <ScrollView
            scrollEventThrottle={32}
            style={[StyleSheet.absoluteFill]}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.scrollY } } },
            ])}
          >
            <View style={{ marginTop: Dimensions.get("window").height * 0.6 }}>
              <View style={styles.GradientContainer}>
                <LinearGradient
                  colors={[this.state.color, a]}
                  style={{ flex: 1 }}
                  start={{ x: 0, y: 0.75 }}
                  end={{ x: 0, y: 0.25 }}
                />
                <View style={{ bottom: 55 }}>
                  <LikeButton
                    id={this.props.route.params?.mediaId}
                    type={this.props.route.params?.mediaType}
                    isFavourite={this.state.data.data.Media.isFavourite}
                    favourites={this.state.data.data.Media.favourites}
                  />
                </View>
              </View>
            </View>
            <View
              style={[
                styles.NavigatorButtonsContainer,
                { backgroundColor: this.state.color },
              ]}
            >
              <View
                style={[
                  styles.NavigatorButtons,
                  {
                    backgroundColor:
                      this.state.currentPage == 0 ? "white" : "#D3D3D3",
                  },
                ]}
              ></View>
              <View
                style={[
                  styles.NavigatorButtons,
                  {
                    backgroundColor:
                      this.state.currentPage == 1 ? "white" : "#D3D3D3",
                  },
                ]}
              ></View>
            </View>
            <ScrollView
              horizontal
              nestedScrollEnabled
              pagingEnabled
              ref={(component) => {
                this._scrollView = component;
              }}
              scrollEventThrottle={200}
              onScroll={(event) => this._onScroll(event)}
            >
              <View
                style={[
                  styles.ContentContainer,
                  {
                    backgroundColor: this.state.color,
                  },
                ]}
              >
                <Text
                  style={[styles.TitleText, { color: textColor }]}
                  numberOfLines={2}
                >
                  {this.state.data.data.Media.title.userPreferred}
                </Text>
                <Markdown
                  markdownStyles={
                    this.state.color == "#ffffff"
                      ? alternateStyles
                      : defaultStyles
                  }
                >
                  {this.state.data.data.Media.description.replace(
                    /<br>/gi,
                    "\n"
                  )}
                </Markdown>
              </View>
              <View
                style={[
                  styles.ContentContainer,
                  {
                    backgroundColor: this.state.color,
                  },
                ]}
              ></View>
            </ScrollView>
          </ScrollView>
        </View>
      );
    }
  }
}

//Create Component Styles
var styles = StyleSheet.create({
  BackgroundImage: {
    position: "absolute",
  },
  GradientContainer: {
    height: 80,
    width: "100%",
  },
  ContentContainer: {
    paddingHorizontal: 15,
    paddingTop: 30,
    width: Dimensions.get("window").width,
  },
  TitleText: {
    alignSelf: "center",
    fontSize: 28,
    paddingBottom: 20,
  },
  DescriptionText: {
    paddingTop: 30,
    alignSelf: "center",
    fontSize: 14,
  },
  NavigatorButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  NavigatorButtons: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});
