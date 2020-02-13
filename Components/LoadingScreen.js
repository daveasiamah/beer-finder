import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import firebase from "firebase";

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.props.navigation.navigate("Home");
        } else {
          this.props.navigation.navigate("Login");
        }
      })
      .bind(this);
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={70} color="blue" />
      </View>
    );
  }
}
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
