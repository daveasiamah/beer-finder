import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
// import { bg } from "../assets/loginbg2.jpg";

const Drawer = createDrawerNavigator();
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

class HomeScreenNavigator extends Component {
  render() {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => CustomDrawerContent(props)}
        drawerContentOptions={{
          activeTintColor: "black",
          activeBackgroundColor: "gold"
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    );
  }
}
export default HomeScreenNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
