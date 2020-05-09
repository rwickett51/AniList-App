import * as React from "react";

import { CommonActions } from "@react-navigation/native";

export const navigationRef = React.createRef();

export function navigate(name: string, key: Object, params: Object) {
  navigationRef.current?.navigate(name, key, params);
}

export function goBack() {
  navigationRef.current?.dispatch(CommonActions.goBack());
}
