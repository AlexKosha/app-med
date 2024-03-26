import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Registration from "./src/components/Registration";
import Login from "./src/components/Login";
import IntroScreen from "./src/Screens/IntroScreen";
import Quotes from "./src/components/Quotes";
// import Profile from "./Screens/Profile";
import Home from "./src/Screens/Home";

// import CreatePostsScreen from "./Screens/CreatePostsScreen";

export default function App() {
  const MainStack = createStackNavigator();
  return (
    <NavigationContainer style={styles.container}>
      <MainStack.Navigator initialRouteName="IntroScreen">
        <MainStack.Screen
          name="IntroScreen"
          component={IntroScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Quotes"
          component={Quotes}
          options={{ headerShown: false }}
        />
        {/* <MainStack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        /> */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
