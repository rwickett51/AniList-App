import React from "react";

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import NavigationService from "../services/NavigationService";
import ImageLoader from "../components/ImageLoader";

export default class ActivityItem extends React.Component {
  render() {
    let obj = this.props.data;
    return (
      <TouchableHighlight
        onPress={() => {
          NavigationService.navigate("Details", {
            itemId: obj.media.id,
            title: obj.media.title.romaji,
            type: obj.media.type
          });
          obj.media.id;
        }}
        key={obj.id}
      >
        <View style={styles.ActivityContainer}>
          <View style={{flexDirection: "row", flex: 1}}>
            <Image
              source={{uri: obj.media.coverImage.medium}}
              style={styles.ActivityImage}
            />
            <View>
              <Text style={{color: "white"}}>
                {obj.media.title.userPreferred}
              </Text>
              <Text style={{color: "white"}}>{obj.progress}</Text>
              <Text style={{color: "white"}}>{obj.status}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

//Create Component Styles
var styles = StyleSheet.create({
  ActivityContainer: {
    width: "95%",
    height: 100,
    backgroundColor: "grey",
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 5,
    alignItems: "flex-start"
  },
  ActivityImage: {
    height: 100,
    width: 65,
    borderRadius: 5
  }
});
