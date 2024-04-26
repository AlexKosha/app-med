import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/AntDesign";
import Quotes from "../components/Quotes";
import Archangels from "../components/Archangels";
import Meditation from "../components/Meditation";
import Exercises from "../components/Exercises";
import MainMenu from "../components/MainMenu";
import News from "../components/News";
import { TouchableOpacity } from "react-native";
import NotesModalForm from "../components/NotesModalForm";
import Diary from "./Diary";

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
        name="NotesModalForm"
        component={NotesModalForm}
        options={{ title: "Занотувати думку", headerTitleAlign: "center" }}
      />
      {/* <MainStack.Screen
        name="Diary"
        component={Diary}
        options={{
          title: "Щоденник власних думок",
          headerTitleAlign: "center",
        }}
      /> */}
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
    </MainStack.Navigator>
  );
};

export default HomeNavigate;
