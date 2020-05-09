import * as React from "react";

//Import Native Base

import { SafeAreaView, ScrollView, View, Text } from "react-native";

//Import Custom Components
import { showMessage } from "react-native-flash-message";
import NotificationItem from "../components/NotificationItem";

//Import Services
import { getNotifications } from "../services/AniListQueryService";
import * as NavigationService from "../services/NavigationService";

export default class NotificationsScreen extends React.Component<
  {},
  { isLoading: boolean; data: any }
> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { isLoading: true, data: null };
  }
  async getData() {
    return getNotifications().then((data) => {
      if (data.data == null) {
        showMessage({
          icon: "default",
          message: `Something went wrong`,
          type: "warning",
        });
        return null;
      }
      return data;
    });
  }

  componentDidMount() {
    this.getData().then((notifications) => {
      if (notifications.data != null) {
        console.log(notifications);
        this.setState({ data: notifications, isLoading: false });
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      return <View />;
    } else
      return (
        <SafeAreaView>
          <ScrollView>
            {this.state.data.data.Page.notifications.map((not: any) => {
              return <NotificationItem data={not} />;
            })}
          </ScrollView>
        </SafeAreaView>
      );
  }
}
