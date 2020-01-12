import React from 'react';
import { Button, Image, View, Text, ActivityIndicator, StyleSheet, Dimensions, ScrollView, Alert, AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { LinearGradient } from 'expo-linear-gradient';
import Home from './HomeScreen.js'
import NavigationService from '../services/NavigationService.js';
import {getAnimeInfo} from '../services/AniListQueryService.js';

const anilist = require('anilist-node');
const Anilist = new anilist();

//Constants
let imgHeight = 142;
let imgWidth = 100;

function build(data) {
  //Set Title
  let title;
  if(data.title.english != null) { //Found an English Title
    title = data.title.english
  } else if(data.title.native != null) { //No english title, use native title
    title = data.title.native
  } else if (data.title.romaji != null) { //No native title, use romaji title
    title = data.title.romaji
  } else { //No Valid title
    title = ''
  }

  //Set Banner Image
  let bannerImg;
  if (data.bannerImage === null) {
    bannerImg = <View style={styles.bannerimg}></View>
  } else {
    bannerImg = <Image source={{uri: data.bannerImage}} style={styles.bannerimg}/>
  }

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.header}>
        {bannerImg}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  img: {
    height: imgHeight,
    width: imgWidth,
    borderColor: 'black',
    borderWidth: 2,
    marginLeft: 20,
    top: 80,
  },
  bannerimg: {
    position: 'absolute',
    height: 150,
    resizeMode: 'cover',
    flex: 1,
    top: 0,
    right: 0,
    left: 0,
  },
  statusButton: {
    backgroundColor: 'red'
  },
  header: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 0.045 * Dimensions.get('window').width,
    paddingLeft: 10,
    flexWrap: 'wrap',
    paddingEnd: '30%',
  },
});

export default class DescriptionScreen extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        data: null,
        id: this.props.navigation.state.params.itemId,
        name: this.props.navigation.state.params.title,
        type: this.props.navigation.state.params.type
      }
    }

  static navigationOptions = ({navigation}) => {
    return {
      title: '',
      headerTransparent: true,
      headerRight:() => <Button onPress={() => Alert.alert(navigation.getParam('title', 'Title'), navigation.getParam('itemId', 'id').toString())} title={'Info '}/>,
      headerBackground: () => <LinearGradient
          colors={['black', 'transparent']}
          style={{ flex: 1 }}
          start={{x: 0, y: 0.25}}
          end={{x: 0, y: 1}}
        />

    }
  };

  componentDidMount() {
    if (this.state.type === 'ANIME')
      return Anilist.media.anime(parseInt(this.state.id)).then(response => {
        return response;
      }).then( responseJson => {
        this.setState({
          isLoading: false,
          data: responseJson,
        })

      })
    else if (this.state.type === 'MANGA')
      return Anilist.media.manga(parseInt(this.state.id)).then(response => {
        return response;
      }).then( responseJson => {
        this.setState({
          isLoading: false,
          data: responseJson,
        })
      })

    AsyncStorage.getItem(
      '@Settings:value'
    ).then(value => {
      console.log('After Mounting(Description): ', value)
    })
  }

  render() {

    if(this.state.isLoading) {
      let itemId = this.props.navigation.state.params.itemId
      return (
        <View adjustsFontSizeToFit='true' numberOfLines={2} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>)
    } else {
      let itemId = this.props.navigation.state.params.itemId
      return (
        <View style={{ flex: 1}}>
          {build(this.state.data)}
        </View>)
    }
  }
}
