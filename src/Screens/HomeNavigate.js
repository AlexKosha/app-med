// import Quotes from "../components/Quotes/Quotes";
// import Archangels from "../components/Archangles/Archangels";
// import Meditation from "../components/Meditation";
// import Exercises from "../components/Exercises/Exercises";
// import News from "../components/News";
import MainMenu from "../components/MainMenu";

import { createStackNavigator } from "@react-navigation/stack";
import { lazy, Suspense } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const Quotes = lazy(() => import("../components/Quotes/Quotes"));
const Archangels = lazy(() => import("../components/Archangles/Archangels"));
const Meditation = lazy(() => import("../components/Meditation"));
const Exercises = lazy(() => import("../components/Exercises/Exercises"));
const News = lazy(() => import("../components/News"));
const Practice = lazy(() => import("../components/Practice/Practice"));

const HomeNavigate = () => {
  const MainStack = createStackNavigator();

  return (
    <Suspense
      fallback={
        <View style={styles.loadingContainer}>
          <Text>Завантаження...</Text>
        </View>
      }
    >
      <MainStack.Navigator>
        <MainStack.Screen
          name="MainMenu"
          component={MainMenu}
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
        <MainStack.Screen
          name="News"
          component={News}
          options={{ title: "Новини", headerTitleAlign: "center" }}
        />
        <MainStack.Screen
          name="Exercises"
          component={Exercises}
          options={({ route, navigation }) => ({
            title: route.params.item.text,
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="arrowleft"
                  size={30}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <MainStack.Screen
          name="Practice"
          component={Practice}
          options={({ route, navigation }) => ({
            title: route.params.item.name,
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="arrowleft"
                  size={30}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            ),
          })}
        />
      </MainStack.Navigator>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default HomeNavigate;
