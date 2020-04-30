//Import React
import React from "react";

//Import React Components
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";

//Install Custom Components
import AutoHeightImage from "react-native-auto-height-image";

//Import Services
import * as NavigationService from "../services/NavigationService";

export default class MediaHorizontalList extends React.Component {
  render() {
    let data = this.props.data;
    return (
      <ScrollView
        horizontal={true}
        style={styles.horizontalScroll}
        nestedScrollEnabled
        indicatorStyle="white"
        showsHorizontalScrollIndicator={false}
      >
        {data == null ? (
          <View />
        ) : (
          data.data.Staff.staffMedia.nodes.map((obj, index) => {
            return (
              <View key={obj.id} style={styles.Container}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    NavigationService.navigate(
                      (name: "Media"),
                      (key: obj.id),
                      (params: {
                        itemId: obj.id,
                        title: obj.title.userPreferred,
                        type: obj.type
                      })
                    )
                  }
                >
                  <View>
                    <AutoHeightImage
                      width={100}
                      source={{
                        uri: obj.coverImage.medium
                      }}
                    />
                  </View>
                  <Text style={styles.SupportText} numberOfLines={2}>
                    {obj.title.userPreferred}
                  </Text>
                  <Text
                    style={[styles.SupportText, {marginTop: 5}]}
                    numberOfLines={2}
                  >
                    {data.data.Staff.staffMedia.edges[index].staffRole}
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
  Container: {margin: 10, width: 100},
  SupportText: {
    color: "white",
    fontSize: 10,
    alignSelf: "center"
  },
  description: {
    marginLeft: 15,
    marginRight: 15
  }
});
