import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const AboutScreen = props => {
  return (
    <View style={styles.container}>
      <Text>AboutScreen</Text>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 100
  }
});
