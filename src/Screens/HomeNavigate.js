import { createStackNavigator } from "@react-navigation/stack";
import Quotes from "../components/Quotes";
import Archangels from "../components/Archangels";
import Meditation from "../components/Meditation";
import Exercises from "../components/Exercises";
import MainMenu from "../components/MainMenu";
import News from "../components/News";

const HomeNavigate = () => {
  const MainStack = createStackNavigator();
  return (
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
        options={({ route }) => ({ title: route.params.item.text })}
      />
    </MainStack.Navigator>
  );
};

export default HomeNavigate;
