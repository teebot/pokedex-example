import * as React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { NavigationScreenProp } from "react-navigation";
import { PokeCard } from "./types/pokecard.type";

type SearchProps = { navigation: NavigationScreenProp<any, any> };
type SearchState = { cards: PokeCard[] };

export default class Search extends React.Component<SearchProps, SearchState> {
  static navigationOptions = {
    title: "Pokédex search",
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  constructor(props: SearchProps) {
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
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View>
          <SearchBar
            onChangeText={this.onSearch}
            onClearText={this.onClear}
            placeholder="Type Here..."
          />
        </View>

        <ScrollView>
          {this.state.cards.length > 0 ? (
            <List containerStyle={{ marginBottom: 20 }}>
              {this.state.cards.map((card, i: number) => (
                <ListItem
                  roundAvatar
                  avatar={{ uri: card.imageUrl }}
                  key={i}
                  title={card.name}
                  onPress={() => navigate("Card", { id: card.id })}
                />
              ))}
            </List>
          ) : (
            <Text style={styles.placeholder}>Search any pokemon</Text>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  placeholder: {
    flex: 1,
    marginTop: 300,
    alignSelf: "center"
  }
});
