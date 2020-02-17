import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image
} from "react-native";
import { Container, Content, ListItem, List, Button } from "native-base";
import SearchHeader from "./Navigators/SearchHeader";
import firebase from "firebase";

class SearchBody extends Component {
  state = {
    searchBeer: "",
    beerData: [],
    beerFound: false,
    error: {},
    loading: false
  };

  addToFavorites = async beerName => {
    //Get the current User
    const currentUser = await firebase.auth().currentUser;
    console.log(currentUser);

    let dbRef = await firebase
      .database()
      .ref(currentUser.uid)
      .child("favorite-beers")
      .push();

    //updating the beername at the unique key
    dbRef
      .set({ name: beerName })
      .then(success =>
        alert(
          "Good Choice!\n " + beerName + " was added to your favorites.",
          success
        )
      )
      .catch(err => console.log(err));
  };

  beerSearch = () => {
    const { searchBeer } = this.state;
    const beerName = searchBeer.toLowerCase();

    const query = `https://sandbox-api.brewerydb.com/v2/search?q=${beerName}&type=beer&key=c2430c73760d4890d86687207ac56866`;

    fetch(query)
      .then(res => res.json(), this.setState({ loading: true }))
      .then(beers => {
        if (beers) {
          // const data = beers.data.map(beer => beer);
          const data = beers;
          console.log("The cleaned data is: ", data);
          this.setState(
            { beerData: beers.data, beerFound: true, loading: false },
            console.log(this.state.beerData)
          );
        } else {
          this.setState({ beerFound: false, loading: true });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.state.beerData);
    return (
      <Container style={{ paddingTop: 23 }}>
        <SearchHeader
          onChangeText={searchBeer => this.setState({ searchBeer: searchBeer })}
          value={this.state.searchBeer}
          beerSearch={this.beerSearch}
        />
        <Content>
          {this.state.loading ? (
            <View style={styles.container}>
              <ActivityIndicator size={70} color="gold" />
            </View>
          ) : (
            this.state.beerData.map(beer => (
              <ScrollView style={{ paddingBottom: 20 }}>
                <ListItem itemDivider>
                  {beer.labels ? (
                    <Image
                      source={{
                        uri: beer.labels.large
                      }}
                      style={{
                        resizeMode: "cover",
                        height: 350,
                        width: null,
                        flex: 1
                      }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/beer-locator.png")}
                      style={{
                        resizeMode: "cover",
                        height: 350,
                        width: null,
                        flex: 1
                      }}
                    />
                  )}
                </ListItem>
                <ListItem
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <View>
                    <Text>{beer.name}</Text>
                  </View>
                  <View>
                    <Button
                      info
                      style={{ padding: 10, backgroundColor: "gold" }}
                      onPress={() => this.addToFavorites(beer.name)}
                    >
                      <Text>+ Favorites</Text>
                    </Button>
                  </View>
                </ListItem>
                <ListItem itemDivider>
                  <Text>Category</Text>
                </ListItem>
                <ListItem>
                  <Text>{beer.style.category.name}</Text>
                </ListItem>
                <ListItem itemDivider>
                  <Text>Description</Text>
                </ListItem>
                <ListItem>
                  <Text>{beer.description}</Text>
                </ListItem>
                <ListItem itemDivider>
                  <Text>Rating</Text>
                </ListItem>
                <ListItem>
                  <Text>{beer.abv}</Text>
                </ListItem>
                <ListItem itemDivider>
                  <Text>Is Organic?</Text>
                </ListItem>
                <ListItem>
                  <Text>{beer.isOrganic == "Y" ? "Yes" : "No"}</Text>
                </ListItem>
              </ScrollView>
            ))
          )}
        </Content>
      </Container>
    );
  }
}
export default SearchBody;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 100
  },
  border: {
    borderWidth: 1,
    borderColor: "hotpink",
    padding: 15
  }
});
