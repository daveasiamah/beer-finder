import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import { bg } from "../assets/loginbg2.jpg";

const Drawer = createDrawerNavigator();

class HomeScreenNavigator extends Component {
  render() {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={() => (
          <Image
            source={bg}
            style={{ borderRadius: 50, width: 50, height: 50 }}
          />
        )}
        drawerContentOptions={{
          activeTintColor: "white",
          activeBackgroundColor: "black"
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
