import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class FavoritesTab extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>FavoritesTab</Text>
      </View>
    );
  }
}
export default FavoritesTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
