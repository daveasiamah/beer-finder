import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AboutScreen from "../AboutScreen";

const Drawer = createDrawerNavigator();

class SearchTab extends Component {
  render() {
    return (
      <Drawer.Navigator
        initialRouteName="About"
        drawerContentOptions={{
          activeTintColor: "white",
          activeBackgroundColor: "black"
        }}
      >
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
