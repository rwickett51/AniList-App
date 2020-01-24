//Import React
import React from "react";

//Import React Components
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ImageBackground
} from "react-native";
import {Dropdown} from "react-native-material-dropdown";
import {
  TextField,
  FilledTextField,
  OutlinedTextField
} from "react-native-material-textfield";
import Icon from "react-native-vector-icons/Ionicons";

import {
  getUserEntryData,
  addEntryToList
} from "../services/AniListQueryService.js";

export default class SettingsScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      score: 0,
      progress: "",
      data: null,
      isLoading: true
    };
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {
    getUserEntryData(
      this.props.navigation.state.params.mediaId,
      this.state.status
    ).then(data => {
      this.setState({
        data: data,
        isLoading: false,
        status: data.data.MediaList.status,
        score: data.data.MediaList.score,
        progress: data.data.MediaList.progress.toString()
      });
    });
  }

  //Header Options
  static navigationOptions = ({navigation}) => {
    return {
      title: "Edit Title"
    };
  };

  //Render Components to screen
  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator />;
    } else
      return (
        <ImageBackground
          source={{
            uri: this.state.data.data.MediaList.media.coverImage.extraLarge
          }}
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
            <View style={{marginRight: 15, marginLeft: 15}}>
              <Dropdown
                label="Status"
                textColor="white"
                baseColor="white"
                selectedItemColor="black"
                disabledItemColor="grey"
                dropdownPosition={0}
                onChangeText={value => this.setState({status: value})}
                data={[
                  {
                    label: "Current",
                    value: "CURRENT"
                  },
                  {
                    label: "Planning",
                    value: "PLANNING"
                  },
                  {
                    label: "Completed",
                    value: "COMPLETED"
                  },
                  {
                    label: "Dropped",
                    value: "DROPPED"
                  },
                  {
                    label: "Paused",
                    value: "PAUSED"
                  },
                  {
                    label: "Repeating",
                    value: "REPEATING"
                  }
                ]}
                value={this.state.status}
              />
              <View
                style={{flexDirection: "row", justifyContent: "space-between"}}
              >
                <Dropdown
                  label="Score"
                  textColor="white"
                  baseColor="white"
                  selectedItemColor="black"
                  disabledItemColor="grey"
                  dropdownPosition={0}
                  onChangeText={value => this.setState({score: value})}
                  data={[
                    {
                      value: 1
                    },
                    {
                      value: 2
                    },
                    {
                      value: 3
                    },
                    {
                      value: 4
                    },
                    {
                      value: 5
                    },
                    {
                      value: 6
                    },
                    {
                      value: 7
                    },
                    {
                      value: 8
                    },
                    {
                      value: 9
                    },
                    {
                      value: 10
                    }
                  ]}
                  value={this.state.data.data.MediaList.score}
                  containerStyle={{width: "45%"}}
                />
                <TextField
                  label="Progress"
                  keyboardType="decimal-pad"
                  textColor="white"
                  baseColor="white"
                  onChangeText={value => {
                    this.setState({progress: value});
                    console.log(value);
                  }}
                  value={this.state.progress}
                  ref={component => (this.progressinput = component)}
                  containerStyle={{width: "45%"}}
                />
              </View>
            </View>
            <View
              style={{flexDirection: "row", justifyContent: "space-between"}}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "red",
                  width: 70,
                  height: 40,
                  borderRadius: 10,
                  marginLeft: 15
                }}
              >
                <TouchableOpacity style={{right: 0, bottom: 0}}>
                  <Text style={{color: "white", alignSelf: "center"}}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "blue",
                  width: 70,
                  height: 40,
                  borderRadius: 10,
                  marginRight: 15
                }}
              >
                <TouchableOpacity
                  style={{right: 0, bottom: 0}}
                  onPress={() =>
                    addEntryToList(
                      this.props.navigation.state.params.mediaId,
                      this.state.status,
                      this.state.score,
                      parseInt(this.state.progress, 10)
                    )
                  }
                >
                  <Text style={{color: "white", alignSelf: "center"}}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      );
  }
}

//Create Component Styles
var styles = StyleSheet.create({});
