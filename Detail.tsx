import * as React from "react";
import { View, Text } from "react-native";
import { Card, Rating, Badge } from "react-native-elements";
import { NavigationScreenProp } from "react-navigation";
import { PokeCard } from "./types/pokecard.type";

type DetailProps = { navigation: NavigationScreenProp<any, any> };
type DetailState = { card: PokeCard; rating: { startingValue: number } };

const defaultState = { card: {}, rating: { startingValue: 1.57 } };

export default class Detail extends React.Component<DetailProps, DetailState> {
  static navigationOptions = {
    title: "Detail",
    headerStyle: { backgroundColor: "#d4d10e" },
    headerTintColor: "#fff",
    headerTitleStyle: { fontWeight: "bold" }
  };

  constructor(props: any) {
    super(props);
    this.state = defaultState;
  }

  async componentDidMount() {
    const id = this.props.navigation.state.params.id;
    const { card } = await fetch(
      `https://api.pokemontcg.io/v1/cards/${id}`
    ).then(r => r.json());
    this.setState({ card });
  }

  ratingCompleted = (rating: number): void => {
    alert("(⁎⁍﹃ ⁍⁎)♡");
  };

  render() {
    const { card, rating } = this.state;

    return (
      <View>
        <Card title={card.name} image={{ uri: card.imageUrl }}>
          <Text style={{ marginBottom: 10 }}>
            {card.text || "No Description available"}
          </Text>

          <Rating
            type="heart"
            ratingCount={5}
            fractions={2}
            startingValue={rating.startingValue}
            imageSize={40}
            onFinishRating={this.ratingCompleted}
            showRating={true}
            style={{ paddingVertical: 10, marginBottom: 40, marginTop: 40 }}
          />

          <Badge
            containerStyle={{ ...styles.badge, backgroundColor: "#eeeedd" }}
          >
            <Text>Attack +10</Text>
          </Badge>

          <Badge
            containerStyle={{ ...styles.badge, backgroundColor: "#ddeeee" }}
          >
            <Text>Metal -20</Text>
          </Badge>

          <Badge
            containerStyle={{ ...styles.badge, backgroundColor: "#ddeeff" }}
          >
            <Text>Lightning</Text>
          </Badge>

          <Badge
            containerStyle={{ ...styles.badge, backgroundColor: "#ddeedd" }}
          >
            <Text>Fighting</Text>
          </Badge>
        </Card>
      </View>
    );
  }
}

const styles = {
  badge: {
    width: 130,
    marginBottom: 10,
    marginTop: 10
  }
};
