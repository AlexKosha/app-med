import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import expo from "expo";
import * as Font from "expo-font";
import Registration from "./src/components/Registration";
import Login from "./src/components/Login";
import IntroScreen from "./src/Screens/IntroScreen";
import Quotes from "./src/components/Quotes";
import Home from "./src/Screens/Home";
import Archangels from "./src/components/Archangels";
import Meditation from "./src/components/Meditation";
import { useEffect, useState } from "react";

const fetchFonts = () => {
  return Font.loadAsync({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Black": require("./assets/fonts/Montserrat-Black.ttf"),
    "Montserrat-ExtraBold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    // Додайте інші стилі шрифту, якщо вони потрібні
  });
};

export default function App() {
  const MainStack = createStackNavigator();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await fetchFonts();
      setDataLoaded(true);
    };

    loadData();
  }, []);

  if (!dataLoaded) {
    return <Text>Loading</Text>;
  }
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
        <MainStack.Screen
          name="Archangels"
          component={Archangels}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Meditation"
          component={Meditation}
          options={{ headerShown: false }}
        />
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
