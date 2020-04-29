import React from "react";
import {TouchableWithoutFeedback, Keyboard} from "react-native";

export default class KeyboardDismiss extends React.Component {
  render() {
    const DismissKeyboard = ({children}) => (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        {children}
      </TouchableWithoutFeedback>
    );
    return <DismissKeyboard />;
  }
}
