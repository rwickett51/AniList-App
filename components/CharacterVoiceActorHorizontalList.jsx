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
import ImageLoader from "../components/ImageLoader";
import AutoscaleImageLoader from "./AutoscaleImageLoader";

//Import Services
import NavigationService from "../services/NavigationService";

export default class MediaHorizontalList extends React.Component {
  render() {
    let data = this.props.data;
    let voiceActors = [];
    let voiceActorKeys = [];
    data.data.Character.media.edges.map(obj => {
      obj.voiceActors.map(voiceActor => {
        if (!voiceActorKeys.includes(voiceActor.id)) {
          voiceActors.push(voiceActor);
          voiceActorKeys.push(voiceActor.id);
        }
      });
    });
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
          voiceActors.map(voiceActor => {
            return (
              <TouchableOpacity
                style={styles.Container}
                onPress={() => {
                  NavigationService.navigate("Staff", {id: voiceActor.id});
                }}
              >
                <View>
                  <AutoscaleImageLoader
                    width={100}
                    source={{
                      uri: voiceActor.image.medium
                    }}
                  />
                  <Text style={styles.SupportText} numberOfLines={2}>
                    {voiceActor.name.full}
                  </Text>
                  <Text style={styles.SupportText} numberOfLines={2}>
                    {voiceActor.language}
                  </Text>
                </View>
              </TouchableOpacity>
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
