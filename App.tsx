import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Header, List, ListItem, SearchBar } from "react-native-elements";

export default class App extends React.Component<{}> {
  constructor(props: React.Props<any>) {
    super(props);
    this.state = { cards: [] };
  }

  onSearch = async (search: string) => {
    this.setState({ cards: [] });

    if (search.length > 2) {
      const { cards } = await fetch(
        `https://api.pokemontcg.io/v1/cards?name=${search}`
      ).then(r => r.json());
      this.setState({ cards });
    }
  };

  onClear = () => {
    this.setState({ cards: [] });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "Pokédex", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <View style={styles.search}>
          <SearchBar
            onChangeText={this.onSearch}
            onClearText={this.onClear}
            placeholder="Type Here..."
          />
        </View>

        <ScrollView>
          <List containerStyle={{ marginBottom: 20 }}>
            {this.state.cards.map((card, i) => (
              <ListItem
                roundAvatar
                avatar={{ uri: card.imageUrl }}
                key={i}
                title={card.name}
              />
            ))}
          </List>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  search: {}
});
