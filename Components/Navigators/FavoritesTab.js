import React, { Component } from "react";
import { FlatList, Text } from "react-native";

import firebase from "firebase";
import { Container, Content } from "native-base";

class FavouritesTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {}
    };
  }
  componentDidMount() {
    this.getFavourites();
  }

  getFavourites = async () => {
    currentUser = await firebase.auth().currentUser;

    var that = this;

    firebase
      .database()
      .ref("/favorite-beers/" + currentUser.uid)
      .once("value")
      .then(function(snapshot) {
        // that.setState({ currentUser: snapshot });
        console.log(snapshot);
      })
      .catch(err => alert("There was an error" + err));
  };

  render() {
    return (
      <Container
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Favorites</Text>

        {/* <Content> */}
        {/* <FlatList
          data={this.state.currentUser}
          keyExtractor={(item, index) => index.toString()}
        /> */}
        {/* // </Content> */}
      </Container>
    );
  }
}
export default FavouritesTab;
