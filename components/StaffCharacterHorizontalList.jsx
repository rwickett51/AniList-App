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
          data.data.Staff.characters.edges.map(obj => {
            return (
              <View key={obj.id} style={styles.Container}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    NavigationService.navigate({
                      name: "Character",
                      key: obj.node.id,
                      params: {
                        characterId: obj.node.id
                      }
                    })
                  }
                >
                  <View>
                    <AutoHeightImage
                      width={100}
                      source={{
                        uri: obj.node.image.medium
                      }}
                    />
                  </View>
                  <Text style={styles.SupportText} numberOfLines={2}>
                    {obj.node.name.full}
                  </Text>
                  <Text
                    style={[styles.SupportText, {marginTop: 5}]}
                    numberOfLines={2}
                  >
                    {obj.role}
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
