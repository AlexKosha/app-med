import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import Registration from "./src/components/Registration/Registration";
import Login from "./src/components/Login/Login";
import IntroScreen from "./src/Screens/IntroScreen";
import TabNavigate from "./src/Screens/TabNavigate";
import { getProfile } from "./src/service/authService";
import { fetchFonts } from "./src/helpers/fetchFonts";

const fetchAndStoreUserProfile = async (token) => {
  try {
    const data = await getProfile(token);
    await SecureStore.setItemAsync("user", JSON.stringify(data));
  } catch (error) {
    console.log("Error fetching and storing user profile:", error);
    throw error;
  }
};

export default function App() {
  const MainStack = createStackNavigator();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isToken, setIsToken] = useState(null);

  const loadFonts = async () => {
    try {
      await fetchFonts();
    } catch (error) {
      console.log("Error loading fonts:", error);
    }
  };

  const checkToken = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) {
        await fetchAndStoreUserProfile(storedToken);
        setIsToken(true);
      } else {
        setIsToken(false);
      }
    } catch (error) {
      setIsToken(false);
      console.log("Error checking token:", error);
    }
  };

  const loadAppData = async () => {
    await Promise.all([loadFonts(), checkToken()]);

    setDataLoaded(true);
  };

  useEffect(() => {
    console.log(1);
    loadAppData();
  }, []);

  if (!dataLoaded || isToken === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Завантаження...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer style={styles.container}>
      <MainStack.Navigator initialRouteName={isToken ? "Home" : "IntroScreen"}>
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
          component={TabNavigate}
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
