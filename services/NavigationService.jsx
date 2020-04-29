import {NavigationActions} from "react-navigation";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params, key) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
      key
    })
  );
}

function goBack() {
  _navigator.dispatch(NavigationActions.back());
}

function setParams(params, key) {
  _navigator.dispatch(NavigationActions.setParams(params, key));
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  setParams
};
