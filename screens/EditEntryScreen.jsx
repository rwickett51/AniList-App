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
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Modal
} from "react-native";
import {Dropdown} from "react-native-material-dropdown";
import {
  TextField,
  FilledTextField,
  OutlinedTextField
} from "react-native-material-textfield";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/Ionicons";
import {TextButton, RaisedTextButton} from "react-native-material-buttons";
import ModalMessage from "../components/ModalMessage";
import KeyboardDismiss from "../components/KeyboardDismiss";
import {showMessage, hideMessage} from "react-native-flash-message";

//Import Services
import NavigationService from "../services/NavigationService";
import {
  getUserEntryData,
  addEntryToList,
  deleteEntryFromList
} from "../services/AniListQueryService";

export default class SettingsScreen extends React.Component {
  //Class Constructor
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      score: 0,
      progress: "0",
      data: null,
      isLoading: true,
      startday: null,
      startmonth: null,
      startyear: null,
      finishday: null,
      finishmonth: null,
      finishyear: null,
      notes: "",
      modalOpen: false
    };
  }

  //Called After render(). Recalls render() when finished
  componentDidMount() {
    getUserEntryData(
      this.props.navigation.state.params.mediaId,
      this.state.status
    ).then(data => {
      console.log(data);
      if (data.data.MediaList != null)
        if (data.data.MediaList.startedAt.year == null) {
          this.setState({
            data: data,
            isLoading: false,
            status: data.data.MediaList.status,
            score: data.data.MediaList.score,
            progress: data.data.MediaList.progress.toString(),
            notes:
              data.data.MediaList.notes == "null" ||
              data.data.MediaList.notes == null
                ? ""
                : data.data.MediaList.notes
          });
        } else {
          this.setState({
            data: data,
            isLoading: false,
            status: data.data.MediaList.status,
            score: data.data.MediaList.score,
            progress: data.data.MediaList.progress.toString(),
            startday: data.data.MediaList.startedAt.day.toString(),
            startmonth: data.data.MediaList.startedAt.month.toString(),
            startyear: data.data.MediaList.startedAt.year.toString(),
            finishday:
              data.data.MediaList.completedAt.day == null
                ? null
                : data.data.MediaList.completedAt.day.toString(),
            finishmonth:
              data.data.MediaList.completedAt.month == null
                ? null
                : data.data.MediaList.completedAt.month.toString(),
            finishyear:
              data.data.MediaList.completedAt.year == null
                ? null
                : data.data.MediaList.completedAt.year.toString(),
            notes:
              data.data.MediaList.notes == "null" ||
              data.data.MediaList.notes == null
                ? ""
                : data.data.MediaList.notes
          });
        }
      else this.setState({isLoading: false});
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
    } else {
      let d = new Date();
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <ImageBackground
            source={{
              uri: this.props.navigation.state.params.image
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
            <Modal
              visible={this.state.modalOpen}
              transparent={true}
              animationType="fade"
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({modalOpen: false});
                }}
              >
                <View style={styles.ModalContainer}>
                  <View
                    style={{
                      height: 120,
                      width: 250,
                      backgroundColor: "#2A2A2A",
                      borderRadius: 15
                    }}
                  >
                    <Text
                      style={{alignSelf: "center", margin: 15, color: "white"}}
                    >
                      Are you sure you want to delete this list entry?
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <RaisedTextButton
                        title="Yes"
                        onPress={() => {
                          NavigationService.goBack();
                          deleteEntryFromList(
                            this.state.data.data.MediaList.id
                          ).then(data => {
                            showMessage({
                              icon: "auto",
                              message: "List Entry Deleted",
                              type: "success"
                            });
                          });
                        }}
                        titleColor="white"
                        style={{
                          width: "30%",
                          alignSelf: "center",
                          backgroundColor: "#ffa420",
                          marginBottom: 15,
                          marginLeft: "10%"
                        }}
                      />
                      <RaisedTextButton
                        title="Cancel"
                        onPress={() => {
                          this.setState({modalOpen: false});
                        }}
                        titleColor="white"
                        style={{
                          width: "30%",
                          alignSelf: "center",
                          backgroundColor: "#5280e9",
                          marginBottom: 15,
                          marginRight: "10%"
                        }}
                      />
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
            <KeyboardAwareScrollView
              style={{flex: 1, backgroundColor: "rgba(0,0,0, 0.25)"}}
            >
              <View style={{marginRight: 15, marginLeft: 15}}>
                <Dropdown
                  label="Status"
                  textColor="white"
                  baseColor="white"
                  selectedItemColor="black"
                  disabledItemColor="grey"
                  dropdownPosition={0}
                  onChangeText={value => {
                    if (this.state.startyear == null && value == "CURRENT") {
                      this.setState({startyear: d.getFullYear().toString()});
                      this.startyearinput.setValue(d.getFullYear().toString());
                    }
                    if (this.state.startmonth == null && value == "CURRENT") {
                      this.setState({
                        startmonth: (d.getMonth() + 1).toString()
                      });
                      this.startmonthinput.setValue(
                        (d.getMonth() + 1).toString()
                      );
                    }
                    if (this.state.startday == null && value == "CURRENT") {
                      this.setState({startday: d.getDate().toString()});
                      this.startdayinput.setValue(d.getDate().toString());
                    }
                    if (this.state.finishyear == null && value == "COMPLETED") {
                      this.setState({finishyear: d.getFullYear().toString()});
                      this.finishyearinput.setValue(d.getFullYear().toString());
                    }
                    if (
                      this.state.finishmonth == null &&
                      value == "COMPLETED"
                    ) {
                      this.setState({
                        finishmonth: (d.getMonth() + 1).toString()
                      });
                      this.finishmonthinput.setValue(
                        (d.getMonth() + 1).toString()
                      );
                    }
                    if (this.state.finishday == null && value == "COMPLETED") {
                      this.setState({finishday: d.getDate().toString()});
                      this.finishdayinput.setValue(d.getDate().toString());
                    }
                    this.setState({status: value});
                  }}
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
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
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
                    value={
                      this.state.data == null
                        ? 0
                        : this.state.data.data.MediaList.score
                    }
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
              <Text style={{marginLeft: 15, marginTop: 15, color: "white"}}>
                Started
              </Text>
              <View style={{marginRight: 15, marginLeft: 15}}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <TextField
                    label="Month"
                    keyboardType="decimal-pad"
                    textColor="white"
                    baseColor="white"
                    onChangeText={value => {
                      this.setState({startmonth: value});
                      console.log(value);
                    }}
                    value={this.state.startmonth}
                    ref={component => (this.startmonthinput = component)}
                    containerStyle={{width: "30%"}}
                  />
                  <TextField
                    label="Day"
                    keyboardType="decimal-pad"
                    textColor="white"
                    baseColor="white"
                    onChangeText={value => {
                      this.setState({startday: value});
                      console.log(value);
                    }}
                    value={this.state.startday}
                    ref={component => (this.startdayinput = component)}
                    containerStyle={{width: "30%"}}
                  />
                  <TextField
                    label="Year"
                    keyboardType="decimal-pad"
                    textColor="white"
                    baseColor="white"
                    onChangeText={value => {
                      this.setState({startyear: value});
                      console.log(value);
                    }}
                    value={this.state.startyear}
                    ref={component => (this.startyearinput = component)}
                    containerStyle={{width: "30%"}}
                  />
                </View>
              </View>
              <Text style={{marginLeft: 15, marginTop: 15, color: "white"}}>
                Completed
              </Text>
              <View style={{marginRight: 15, marginLeft: 15}}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <TextField
                    label="Month"
                    keyboardType="decimal-pad"
                    textColor="white"
                    baseColor="white"
                    onChangeText={value => {
                      this.setState({finishmonth: value});
                      console.log(value);
                    }}
                    value={this.state.finishmonth}
                    ref={component => (this.finishmonthinput = component)}
                    containerStyle={{width: "30%"}}
                  />
                  <TextField
                    label="Day"
                    keyboardType="decimal-pad"
                    textColor="white"
                    baseColor="white"
                    onChangeText={value => {
                      this.setState({finishday: value});
                      console.log(value);
                    }}
                    value={this.state.finishday}
                    ref={component => (this.finishdayinput = component)}
                    containerStyle={{width: "30%"}}
                  />
                  <TextField
                    label="Year"
                    keyboardType="decimal-pad"
                    textColor="white"
                    baseColor="white"
                    onChangeText={value => {
                      this.setState({finishyear: value});
                      console.log(value);
                    }}
                    value={this.state.finishyear}
                    ref={component => (this.finishyearinput = component)}
                    containerStyle={{width: "30%"}}
                  />
                </View>
              </View>
              <TextField
                label="Notes"
                multiline={true}
                textColor="white"
                baseColor="white"
                onChangeText={value => {
                  this.setState({notes: value});
                  console.log(value);
                }}
                value={this.state.notes}
                ref={component => (this.notesinput = component)}
                containerStyle={{width: "90%", alignSelf: "center"}}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 15
                }}
              >
                <RaisedTextButton
                  title="Delete"
                  onPress={() => {
                    this.setState({modalOpen: true});
                  }}
                  titleColor="white"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ffa420",
                    width: 70,
                    marginLeft: 15
                  }}
                />
                <RaisedTextButton
                  title="Save"
                  onPress={() => {
                    let editData = {
                      mediaId: this.state.data.data.MediaList.mediaId,
                      status: this.state.status,
                      score: this.state.score,
                      progress: parseInt(this.state.progress, 10),
                      startDate: {
                        day: this.state.startday,
                        month: this.state.startmonth,
                        year: this.state.startyear
                      },
                      completeDate: {
                        day: this.state.finishday,
                        month: this.state.finishmonth,
                        year: this.state.finishyear
                      },
                      notes:
                        this.state.notes.length == 0 ? null : this.state.notes
                    };
                    addEntryToList(editData).then(data => {
                      console.log(data);
                      if (data != undefined)
                        showMessage({
                          icon: "auto",
                          message: `${this.props.navigation.state.params.title} list entry updated`,
                          type: "success"
                        });
                      else
                        showMessage({
                          icon: "auto",
                          message: "Edit Failure",
                          type: "danger"
                        });
                    });
                  }}
                  titleColor="white"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#5280e9",
                    width: 70,
                    marginRight: 15
                  }}
                />
              </View>
            </KeyboardAwareScrollView>
          </ImageBackground>
        </TouchableWithoutFeedback>
      );
    }
  }
}

//Create Component Styles
var styles = StyleSheet.create({
  ModalContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center"
  }
});
