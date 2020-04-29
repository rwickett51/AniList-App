import React, {Component} from "react";
import {View, StyleSheet, Animated} from "react-native";
import AutoHeightImage from "react-native-auto-height-image";

export default class ImageLoader extends Component {
  state = {
    opacity: new Animated.Value(0)
  };

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  render() {
    return (
      <AutoHeightImage
        animated
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1]
                })
              }
            ]
          },
          this.props.style
        ]}
      />
    );
  }
}
