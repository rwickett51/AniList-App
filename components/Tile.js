import React from 'react'
import {View, StyleSheet, Dimensions, Image, Text, ActivityIndicator, TouchableOpacity, Alert, AsyncStorage} from 'react-native'
import TextTicker from 'react-native-text-ticker'
import { createAppContainer, withNavigation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import NavigationService from '../services/NavigationService.js';

const anilist = require('anilist-node');
const Anilist = new anilist();

//Constants
let imgHeight = 142;
let imgWidth = 100;
let cols = Math.floor(Dimensions.get('window').width / imgWidth);
let marginSize = 6;

//Basic Tile Structure
function TileStructure(imgURL, title, id) {
  return (
    <TouchableOpacity key={id} activeOpacity={0.5}
    onPress={() => NavigationService.navigate('Details', {itemId: id, title: title})}>
      <View style={styles.box}>
        <View style={styles.imgBox}>
          <Image source={{uri:imgURL}} style={styles.img}/>
          <TextTicker style={{color: 'white'}} duration={15000} repeatSpacer={50}>{title}</TextTicker>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}



export default class Tile extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        data: null,
        allowAdult: false,
        isAdult: true
      }
    }

    //Math.floor(getRandomArbitrary(21700, 21800))
    componentDidMount() {
       return Anilist.media.anime(Math.floor(getRandomArbitrary(21700, 21900))).then(response => {
        return response;
      }).then( responseJson => {
        AsyncStorage.getItem(
          '@Settings:value'
        ).then(value => {
          this.setState({
            isLoading: false,
            allowAdult: (value == 'true')
          })
          console.log('After Mounting(Settings): ', value)
        })
        this.setState({
          data: responseJson,
          isAdult: responseJson.isAdult
        })
      })
    }

  render() {
    if(this.state.isLoading || (!this.state.allowAdult && this.state.isAdult)) { //Still Loading
      //Alert.alert(this.state.isAdult.toString())
      return(
        <View style={styles.box}>
          <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large"/>
          </View>
        </View>)
    } else if(this.state.data.id == null) {
      return(
        <View style={styles.box}>
          <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
          </View>
        </View>)
    } else if(this.state.data.title.english != null) { //Found an English Title
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {TileStructure(this.state.data.coverImage.large, this.state.data.title.english, this.state.data.id)}
        </View>
      )
    } else if(this.state.data.title.native != null) { //No english title, use native title
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {TileStructure(this.state.data.coverImage.large, this.state.data.title.native, this.state.data.id)}
        </View>
      )
    } else if (this.state.data.title.romaji != null) { //No native title, use romaji title
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {TileStructure(this.state.data.coverImage.large, this.state.data.title.romaji, this.state.data.id)}
        </View>
      )
    } else {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {TileStructure(this.state.data.coverImage.large, '', this.state.data.id)}
        </View>
      )
    }
  }
}

//StyleSheet
const styles = StyleSheet.create({
  box: {
    backgroundColor: '#696969',
    height: (Dimensions.get('window').height / 3.3) - marginSize,
    width: imgWidth + marginSize,
    margin: marginSize / 3,
  },
  img: {
    height: imgHeight,
    width: imgWidth,
  },
  imgBox: {
    alignItems: 'center',
    marginTop: marginSize / 2,
    flex: 1,
    overflow: 'hidden'
  },
});
