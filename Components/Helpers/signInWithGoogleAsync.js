import { clientID } from "../../superSecretKey/clientID";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";

//Signin user
onSignIn = googleUser => {
  // console.log("Google Auth Response", googleUser);
  props.navigation.navigate("Home", { user: googleUser });
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
          // console.log("user signed in");
          if (result.additionalUserInfo.isNewUser) {
            //My optional testing :Write user infor to Firebase Firestore
            firebase
              .firestore()
              .doc("userInfo/users")
              .set({
                comment: "Hurray getting data into firestore.",
                gmail: result.user.email,
                profile_picture: result.additionalUserInfo.profile.picture,
                locale: result.additionalUserInfo.profile.locale,
                first_name: result.additionalUserInfo.profile.given_name,
                family_name: result.additionalUserInfo.profile.family_name
              })
              .then(snapshot => console.log("Savinging data..."))
              .catch(err => console.log(err));
            //Save User info to realtime data base
            firebase
              .database()
              .ref("users/" + result.user.uid)
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
                    console.log("Data was saved successfully.");
                  }
                }
              )
              .then(snapshot => {
                //   console.log("Snapshot", snapshot);
              });
          } else {
            firebase
              .database()
              .ref("users/" + result.user.uid)
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
      onSignIn(result);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
    // console.log("There was an error: " + e.toString());
  }
};

export default signInWithGoogleAsync;
