import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header, Icon, Input, Item, Button } from "native-base";

class SearchHeader extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   console.log("My props are: ", this.props);
  // }
  render() {
    return (
      <Header searchBar rounded style={{ height: 90, backgroundColor: "gold" }}>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Enter beer name... eg. miller"
            returnKeyType="search"
            onChangeText={this.props.onChangeText}
            onSubmitEditing={this.props.beerSearch}
          />
          <Icon
            name="menu"
            style={{ fontSize: 40 }}
            // onPress={() => this.props.navigation.openDrawer()}
          />
        </Item>
      </Header>
    );
  }
}
export default SearchHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
