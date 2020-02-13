import React, { Component, lazy } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchTab from "./SearchTab";
import FavoritesTab from "./FavoritesTab";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

class SearchTabNavigator extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Search"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Search") {
              iconName = focused ? "md-search" : "ios-search";
            } else if (route.name === "Favorites") {
              iconName = focused ? "ios-star" : "ios-star-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          lazy
        })}
        tabBarOptions={{
          activeTintColor: "black",
          inactiveTintColor: "gray"
        }}
      >
        <Tab.Screen name="Search" component={SearchTab} />
        <Tab.Screen name="Favorites" component={FavoritesTab} />
      </Tab.Navigator>
    );
  }
}
export default SearchTabNavigator;
