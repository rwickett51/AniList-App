import React from "react";

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import * as NavigationService from "../services/NavigationService";
import ImageLoader from "../components/ImageLoader";

export default class RecommendationHorizontalList extends React.Component {
  render() {
    let data = this.props.data;
    return (
      <ScrollView
        horizontal={true}
        style={styles.horizontalScroll}
        nestedScrollEnabled
        indicatorStyle="white"
      >
        {data == null ? (
          <Text>Placeholder</Text>
        ) : (
          data.recommendations.edges.map(obj => {
            return (
              <View key={obj.id} style={{margin: 10, height: 200, width: 105}}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    NavigationService.navigate({
                      name: "Media",
                      key: obj.node.mediaRecommendation.id,
                      params: {
                        mediaId: obj.node.mediaRecommendation.id,
                        mediaType: obj.node.mediaRecommendation.type
                      }
                    })
                  }
                >
                  <ImageLoader
                    style={styles.recommendationImg}
                    source={{
                      uri: obj.node.mediaRecommendation.coverImage.large
                    }}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 10,
                      alignSelf: "center"
                    }}
                    numberOfLines={2}
                  >
                    {obj.node.mediaRecommendation.title.romaji}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    );
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
