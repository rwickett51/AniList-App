//Import React
import React from "react";

//Import React Components
import { TouchableHighlight, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

//Import Services
import { toggleLike } from "../services/AniListQueryService";

export default class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavourite: this.props.isFavourite,
      isFavouriteIcon: this.props.isFavourite ? "heart" : "hearto",
    };
  }
  render() {
    let variables = {};
    switch (this.props.type) {
      case "ANIME":
        variables = { animeId: this.props.id };
        break;
      case "MANGA":
        variables = { mangaId: this.props.id };
        break;
      case "CHARACTER":
        variables = { characterId: this.props.id };
        break;
      case "STAFF":
        variables = { staffId: this.props.id };
        break;
      case "STUDIO":
        variables = { studioId: this.props.id };
        break;
    }
    return (
      <TouchableHighlight
        onPress={() => {
          toggleLike(variables).then((data) => {});
          if (this.state.isFavourite) {
            this.setState({
              isFavourite: false,
              isFavouriteIcon: "hearto",
            });
          } else {
            this.setState({
              isFavourite: true,
              isFavouriteIcon: "heart",
            });
          }
        }}
      >
        <View style={styles.LikeButton}>
          <Icon name={this.state.isFavouriteIcon} size={25} color="white" />
          <Text style={styles.LikeButtonText}>{this.props.favourites}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
var styles = StyleSheet.create({
  LikeButton: {
    height: 50,
    width: 100,
    backgroundColor: "#EA3C53",
    borderRadius: 40,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 5,
    position: "absolute",
  },
  LikeButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
