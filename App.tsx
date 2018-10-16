import { createStackNavigator } from "react-navigation";
import Search from "./Search";
import Detail from "./Detail";

const App = createStackNavigator({
  Search: { screen: Search },
  Card: { screen: Detail }
});

export default App;
