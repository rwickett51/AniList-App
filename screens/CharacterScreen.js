//Import React
import React from "react";

//Import React Components
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {LinearGradient} from "expo-linear-gradient";
import ImageLoader from "../components/ImageLoader.js";
import MediaHorizontalList from "../components/MediaHorizontalList.js";

//Import Services
import {getCharacterInfo} from "../services/AniListQueryService.js";

export default class SettingsScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.state = {data: null};
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {
    getCharacterInfo(this.props.navigation.state.params.id).then(data =>
      this.setState({data: data})
    );
  }

  //Header Options
  static navigationOptions = ({navigation}) => {
    return {
      title: "",
      headerTransparent: true,
      headerBackground: () => (
        <LinearGradient
          colors={["black", "transparent"]}
          style={{flex: 1}}
          start={{x: 0, y: 0.25}}
          end={{x: 0, y: 1}}
        />
      )
    };
  };

  //Render Components to screen
  render() {
    if (this.state.data == null) {
      return (
        <View
          style={{flex: 1, alignItems: "center", justifyContent: "center"}}
        ></View>
      );
    } else
      return (
        <ImageBackground
          source={{uri: this.state.data.data.Character.image.large}}
          style={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            flex: 1
          }}
          blurRadius={15}
        >
          <ScrollView style={{flex: 1, backgroundColor: "rgba(0,0,0, 0.25)"}}>
            <ImageLoader
              source={{uri: this.state.data.data.Character.image.large}}
              style={styles.coverImg}
            />
            <Text style={styles.title} numberOfLines={2}>
              {this.state.data.data.Character.name.full}
            </Text>
            <View style={styles.description}>
              <Text style={{color: "white"}}>
                {this.state.data.data.Character.description}
              </Text>
            </View>
            <MediaHorizontalList data={this.state.data} />
          </ScrollView>
        </ImageBackground>
      );
  }
}

//Create Component Styles
var styles = StyleSheet.create({
  coverImg: {
    height: 250,
    width: 170,
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: 90
  },
  title: {
    color: "white",
    alignSelf: "center",
    fontSize: 20,
    margin: 10
  },
  description: {
    marginLeft: 15,
    marginRight: 15
  }
});
