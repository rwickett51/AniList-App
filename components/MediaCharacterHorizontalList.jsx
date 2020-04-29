import React from "react";

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import NavigationService from "../services/NavigationService";
import ImageLoader from "../components/ImageLoader";

export default class MediaCharacterHorizontalList extends React.Component {
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
          data.characters.edges.map(obj => {
            return (
              <View key={obj.id} style={{margin: 10, height: 200, width: 105}}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    NavigationService.navigate(
                      "Character",
                      {
                        id: obj.node.id
                      },
                      obj.id
                    )
                  }
                >
                  <ImageLoader
                    style={styles.recommendationImg}
                    source={{
                      uri: obj.node.image.medium
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
                    {obj.node.name.full}
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
