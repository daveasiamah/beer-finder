import React, { Component } from "react";
import { View, Text, StyleSheet, Icon, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";

import firebase from "firebase";

import SearchBody from "../SearchBody";
import AboutScreen from "../AboutScreen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../../assets/beer-finder-logo.png")}
          style={{ width: 160, height: 160, borderRadius: 80 }}
        />
        <View>
          <Text>User Name</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() =>
          firebase
            .auth()
            .signOut()
            .then(() => console.log("Signed out User"))
        }
      />
    </DrawerContentScrollView>
  );
}

class SearchTab extends Component {
  state = { currentUser: {}, loading: false };

  getCurrentUser = async () => {
    const userId = firebase.auth().currentUser.uid;
    const user = await firebase
      .database()
      .ref("/users/" + userId)
      .once("value")
      .then(snapshot => {
        if (snapshot) {
          return snapshot;
        }
      });
    this.setState({ currentUser: user });
  };

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return (
      <Drawer.Navigator
        {...this.props}
        initialRouteName="Search"
        // drawerContent={props => {
        //   CustomDrawerContent(props);
        // }}
        drawerStyle={{
          backgroundColor: "white"
        }}
        drawerContentOptions={{
          activeTintColor: "black",
          activeBackgroundColor: "gold"
        }}
        drawerContent={props => CustomDrawerContent(props)}
      >
        <Drawer.Screen name="Search" component={SearchBody} />
        <Drawer.Screen name="About" component={AboutScreen} />
      </Drawer.Navigator>
    );
  }
}
export default SearchTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
