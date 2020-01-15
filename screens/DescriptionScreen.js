import React from "react";
import {
  Button,
  Image,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {LinearGradient} from "expo-linear-gradient";
import Home from "./HomeScreen.js";
import NavigationService from "../services/NavigationService.js";
import {getInfo} from "../services/AniListQueryService.js";

export default class DescriptionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: "",
      headerTransparent: true,
      headerRight: () => (
        <Button
          onPress={() =>
            Alert.alert(
              navigation.getParam("title", "Title"),
              navigation.getParam("itemId", "id").toString()
            )
          }
          title={"Info "}
        />
      ),
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

  componentDidMount() {
    getInfo(
      this.props.navigation.state.params.itemId,
      this.props.navigation.state.params.type
    ).then(data => this.setState({data: data, isLoading: false}));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      let data = this.state.data.data.Media;
      return (
        <ScrollView style={{flex: 1}}>
          <View>
            {data.bannerImage == null ? (
              <View style={styles.bannerimg}></View>
            ) : (
              <Image
                source={{uri: data.bannerImage}}
                style={styles.bannerimg}
              />
            )}
          </View>
          <Image
            source={{uri: data.coverImage.large}}
            style={styles.coverImg}
          />
          <Text style={styles.title}>{data.title.romaji}</Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 30,
              color: "white",
              fontSize: 15
            }}
          >
            Recomendations
          </Text>
          <ScrollView
            horizontal={true}
            style={styles.horizontalScroll}
            nestedScrollEnabled
            indicatorStyle="white"
          >
            {data == null ? (
              <Text>Placeholder</Text>
            ) : (
              data.relations.edges.map(obj => {
                return (
                  <View
                    key={obj.id}
                    style={{margin: 10, height: 200, width: 105}}
                  >
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() =>
                        NavigationService.navigate(
                          "Details",
                          {
                            itemId: obj.node.id,
                            title: obj.node.title.romaji,
                            type: obj.node.type
                          },
                          obj.id
                        )
                      }
                    >
                      <Image
                        style={styles.recommendationImg}
                        source={{uri: obj.node.coverImage.large}}
                      />
                      <Text
                        style={{
                          color: "white",
                          fontSize: 10,
                          alignSelf: "center"
                        }}
                        numberOfLines={2}
                      >
                        {obj.node.title.romaji}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 10,
                          alignSelf: "center"
                        }}
                      >
                        {obj.relationType.toString()}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })
            )}
          </ScrollView>
        </ScrollView>
      );
    }
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
  recommendationImg: {height: 150, width: 105}
});
