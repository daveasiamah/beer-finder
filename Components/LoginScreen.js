import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  AsyncStorage
} from "react-native";

import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import "firebase/firestore";
// import * as firestore from 'firebase/firestore';

import clientID from "../superSecretKey/clientID";

import beerFinderLogo from "../assets/beer-finder-logo.png";
import googleLogo from "../assets/googleLogo.png";
// import facebookLogo from "../assets/facebookLogo.png";

class LoginScreen extends Component {
  //Check if user is already signed in
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  //Signin user
  onSignIn = googleUser => {
    console.log("Signing in as: " + googleUser);
    this.props.navigation.navigate("Home", { user: googleUser });
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
      unsubscribe();

      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(result => {
            console.log("user signed in");
            if (result.additionalUserInfo.isNewUser) {
              //Save User info to realtime data base
              firebase
                .database()
                .ref("/users/" + result.user.uid)
                .set(
                  {
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    locale: result.additionalUserInfo.profile.locale,
                    first_name: result.additionalUserInfo.profile.given_name,
                    family_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  },
                  function(error) {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log("Data was not saved.");
                    }
                  }
                )
                .then(snapshot => {
                  console.log("Snapshot", snapshot);
                });
            } else {
              firebase
                .database()
                .ref("users" + result.user.uid)
                .update({
                  lastLogged_in: Date.now()
                });
            }
          })
          .catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            console.log("Oops!!! Error saving data to firestore: ", errorCode);
            var errorMessage = error.message;
            console.log("Error message is:", errorMessage);
            // The email of the user's account used.
            var email = error.email;
            console.log(email);
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(credential);
          });
      } else {
        console.log("User already signed-in Firebase.");
      }
    });
  };

  //Google auth function
  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        // behaviour: "web",
        androidClientId: clientID,
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "#000000",
              paddingBottom: 25
            }}
          >
            Beer Finder
          </Text>
        </View>
        <Image
          style={{
            width: 150,
            height: 100,
            borderRadius: 5,
            marginBottom: 20
          }}
          source={beerFinderLogo}
        />
        <TouchableOpacity
          style={styles.GoogleLogoStyle}
          activeOpacity={0.5}
          onPress={() => this.signInWithGoogleAsync()}
        >
          <Image
            source={googleLogo}
            width={50}
            height={50}
            style={styles.ImageIconStyle}
          />
          <View style={styles.SeparatorLine} />
          <Text style={styles.TextStyle}> Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  GoogleLogoStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.15)",
    height: 60,
    width: "60%",
    borderRadius: 5,
    margin: 5,
    shadowColor: "rgba(0,0,0,0.15)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.15,
    shadowRadius: 12.62,

    elevation: 5
  },
  SeparatorLine: {
    backgroundColor: "rgba(0,0,0,0.15)",
    width: 1,
    height: "100%",
    // marginLeft: 20,
    marginRight: 2
  },
  ImageIconStyle: {
    padding: 10,
    margin: 10,
    height: 35,
    width: 35,
    resizeMode: "stretch"
  },
  TextStyle: {
    color: "#000",
    marginBottom: 4,
    marginRight: 20,
    alignItems: "center",
    paddingLeft: 5
  }
});
