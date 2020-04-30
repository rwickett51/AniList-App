//Import React
import React from "react";

//Import React Components
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";

//Import Custom Components
import ImageLoader from "../components/ImageLoader";

//Import Services
import * as NavigationService from "../services/NavigationService";

export default class DiscoverList extends React.Component {
  //Render Components to screen
  render() {
    return (
      <ScrollView
        horizontal={true}
        style={styles.HorizontalScroll}
        nestedScrollEnabled
        indicatorStyle="white"
      >
        {this.props.data.map(media => {
          return (
            <TouchableOpacity
              key={media.id}
              activeOpacity={0.7}
              onPress={() =>
                NavigationService.navigate({
                  name: "Media",
                  key: media.id,
                  params: {
                    mediaId: media.id,
                    mediaType: media.type
                  }
                })
              }
            >
              <View style={styles.MediaContainer}>
                <View style={styles.ImageContainer}>
                  <ImageLoader
                    source={{uri: media.coverImage.large}}
                    style={styles.Image}
                  />
                </View>
                <View style={styles.TitleContainer}>
                  <Text style={styles.Title} numberOfLines={2}>
                    {media.title.userPreferred}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

//Create Component Styles
var styles = StyleSheet.create({
  MediaContainer: {
    width: 150,
    height: 250,
    marginHorizontal: 10
  },
  ImageContainer: {
    flex: 5
  },
  Image: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    height: "50%",
    resizeMode: "cover",
    borderRadius: 10,
    overflow: "hidden"
  },
  TitleContainer: {
    flex: 1,
    padding: 5
  },
  Title: {alignSelf: "center", color: "white"},
  HorizontalScroll: {
    flexDirection: "row"
  }
});
