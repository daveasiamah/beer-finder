import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class About extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Beer Finder</Text>
        <Text style={styles.paragraph}> 2020, All Rights Reserved.</Text>
        <Text style={styles.paragraph}>"Powered by ❤(D.A)"</Text>
      </View>
    );
  }
}
export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 100,
    backgroundColor: "#fff"
  },
  titleText: {
    fontFamily: "Roboto",
    fontSize: 30,
    color: "#333"
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 24,
    fontSize: 18,
    fontFamily: "sans-serif"
  }
});
