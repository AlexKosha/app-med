import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import * as SecureStore from "expo-secure-store";
import Registration from "./src/components/Registration";
import Login from "./src/components/Login";
import IntroScreen from "./src/Screens/IntroScreen";
import TabNavigate from "./src/Screens/TabNavigate";
import { getProfile } from "./src/service/authService";

const fetchFonts = () => {
  return Font.loadAsync({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Black": require("./assets/fonts/Montserrat-Black.ttf"),
    "Montserrat-ExtraBold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
  });
};

export default function App() {
  const MainStack = createStackNavigator();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isToken, setIsToken] = useState(null); // Ініціалізуємо як null для стану завантаження

  useEffect(() => {
    const loadAppData = async () => {
      try {
        await fetchFonts();
        const storedToken = await SecureStore.getItemAsync("token");
        if (storedToken) {
          const data = await getProfile(storedToken);
          await SecureStore.setItemAsync("user", JSON.stringify(data));
          setIsToken(true);
        } else {
          setIsToken(false);
        }
      } catch (error) {
        setIsToken(false);
        console.log(error);
      } finally {
        setDataLoaded(true); // Завантаження завершено
      }
    };

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

// export default function App() {
//   const MainStack = createStackNavigator();
//   const [dataLoaded, setDataLoaded] = useState(false);
//   const [isToken, setIsToken] = useState(null);

//   useEffect(() => {
//     const loadData = async () => {
//       await fetchFonts();
//       setDataLoaded(true);
//     };

//     const fetchUser = async () => {
//       const storedToken = await SecureStore.getItemAsync("token");
//       try {
//         const data = await getProfile(storedToken);
//         setIsToken(true);
//         await SecureStore.setItemAsync("user", JSON.stringify(data));
//       } catch (error) {
//         setIsToken(false);
//         console.log(error);
//       }
//     };

//     fetchUser();
//     loadData();
//   }, []);

//   if (!dataLoaded) {
//     console.log(isToken);
//     return <Text>Loading</Text>;
//   }

//   return (
//     <NavigationContainer style={styles.container}>
//       <MainStack.Navigator initialRouteName={isToken ? "Home" : "IntroScreen"}>
//         <MainStack.Screen
//           name="IntroScreen"
//           component={IntroScreen}
//           options={{ headerShown: false }}
//         />
//         <MainStack.Screen
//           name="Registration"
//           component={Registration}
//           options={{ headerShown: false }}
//         />
//         <MainStack.Screen
//           name="Login"
//           component={Login}
//           options={{ headerShown: false }}
//         />
//         <MainStack.Screen
//           name="Home"
//           component={TabNavigate}
//           options={{ headerShown: false }}
//         />
//       </MainStack.Navigator>
//     </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
