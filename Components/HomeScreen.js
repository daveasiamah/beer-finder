import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Image, Text, StyleSheet } from "react-native";

import { Button } from "native-base";
import bg from "../assets/beer-bg1.jpg";

class HomeScreen extends Component {
  componentDidMount() {
    console.log(this.props.user);
  }
  render() {
    return (
      <View style={Styles.homeScreenView}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%"
          }}
        >
          <Image source={bg} style={{ flex: 1, width: null, height: null }} />
        </View>
        <Button
          large
          block={true}
          style={{ backgroundColor: "#ffde00" }}
          onPress={() => this.props.navigation.navigate("SearchTabNavigator")}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 20
            }}
          >
            Search Beer
          </Text>
        </Button>
      </View>
    );
  }
}

export default HomeScreen;

const Styles = StyleSheet.create({
  homeScreenView: {
    flex: 1,
    justifyContent: "flex-end"
  }
});
