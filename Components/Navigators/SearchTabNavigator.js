import React, { Component, lazy } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchTab from "./SearchTab";
import FavoritesTab from "./FavoritesTab";
import { Ionicons } from "@expo/vector-icons";

import { Footer, FooterTab, Button, Icon } from "native-base";

const Tab = createBottomTabNavigator();

const MyTabBar = props => {
  return (
    <Footer>
      <FooterTab>
        <Button vertical active={props.navigation.index === 0}>
          <Icon name="md-beer" />
          <Text>Search</Text>
        </Button>
        <Button vertical active={props.navigation.index === 1}>
          <Icon name="md-star" />
          <Text>Favorites</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};
class SearchTabNavigator extends Component {
  render() {
    return (
      <Tab.Navigator
        // tabBar={props => <MyTabBar {...props} />}
        initialRouteName="Search"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Search") {
              iconName = focused ? "ios-beer" : "ios-beer";
            } else if (route.name === "Favorites") {
              iconName = focused ? "ios-star" : "ios-star-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          lazy
        })}
        tabBarOptions={{
          activeTintColor: "gold",
          inactiveTintColor: "#222"
        }}
      >
        <Tab.Screen name="Search" component={SearchTab} />
        <Tab.Screen name="Favorites" component={FavoritesTab} />
      </Tab.Navigator>
    );
  }
}
export default SearchTabNavigator;
