import React, { Component } from "react";
import { StyleSheet, Image, InteractionManager, Platform } from "react-native";

import * as firebase from "firebase";
import { firebaseConfig } from "./config";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./Components/HomeScreen";
import LoginScreen from "./Components/LoginScreen";
import LoadingScreen from "./Components/LoadingScreen";
import SearchTabNavigator from "./Components/Navigators/SearchTabNavigator";
import SearchHeader from "./Components/Navigators/SearchHeader";

const Stack = createStackNavigator();

firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={{ headerMode: null, headerShown: false }}
        >
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerMode: null }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="SearchTabNavigator"
            component={SearchTabNavigator}
          />
          {/* <Stack.Screen name="SearchHeader" component={SearchHeader} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

//Timer warning workaround
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === "android") {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = "_lt_" + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = id => {
    if (typeof id === "string" && id.startsWith("_lt_")) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}
