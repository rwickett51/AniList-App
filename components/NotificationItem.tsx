import * as React from "react";

import { View, Text, StyleSheet } from "react-native";
export default function NotificationItem(props) {
  let contextstr = "";
  switch (props.data.type) {
    case "AIRING":
      contextstr = ` ${props.data.contexts[0]}${props.data.episode}${props.data.contexts[1]}${props.data.media.title.userPreferred}${props.data.contexts[2]}`;
      break;
    case "RELATED_MEDIA_ADDITION":
      contextstr = `${props.data.media.title.userPreferred}${props.data.context}`;
      break;
  }

  return (
    <View style={styles.ItemContainer}>
      <Text style={styles.BodyText}>{contextstr}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ItemContainer: {
    width: "100%",
    height: 50,
    marginVertical: 10,
    backgroundColor: "grey",
  },
  BodyText: { color: "white" },
});
