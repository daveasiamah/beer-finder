import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class SearchBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>SearchBar</Text>
      </View>
    );
  }
}
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
