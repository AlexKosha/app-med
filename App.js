import "react-native-gesture-handler";
import { Suspense, lazy, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
// import Registration from "./src/components/Registration/Registration";
// import Login from "./src/components/Login/Login";
// import IntroScreen from "./src/Screens/IntroScreen";
import TabNavigate from "./src/Screens/TabNavigate";
import { getProfile } from "./src/service/authService";
import { fetchFonts } from "./src/helpers/fetchFonts";

const Registration = lazy(() =>
  import("./src/components/Registration/Registration")
);
const Login = lazy(() => import("./src/components/Login/Login"));
const IntroScreen = lazy(() => import("./src/Screens/IntroScreen"));
// const TabNavigate = lazy(() => import("./src/Screens/TabNavigate"));

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
    try {
      await loadFonts();
      await checkToken();
      setDataLoaded(true);
    } catch (error) {
      console.log("Error loading app data:", error);
    }
  };

  useEffect(() => {
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
      <Suspense
        fallback={
          <View style={styles.loadingContainer}>
            <Text>Завантаження...</Text>
          </View>
        }
      >
        <MainStack.Navigator
          initialRouteName={isToken ? "Home" : "IntroScreen"}
        >
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
      </Suspense>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
