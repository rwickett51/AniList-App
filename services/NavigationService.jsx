import * as React from "react";

export const navigationRef = React.createRef();

export function navigate(name, key, params) {
  navigationRef.current?.navigate(name, key, params);
}
