import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import Favorite from "./Favorite/Favorite";
import Practice from "../components/Practice/Practice";

const FavoriteNavigate = () => {
  const MainStack = createStackNavigator();
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Favorite"
        component={Favorite}
        options={{
          headerLeft: false,
          title: "Обрані",
          headerTitleAlign: "center",
        }}
      />

      <MainStack.Screen
        name="Practice"
        component={Practice}
        options={({ route, navigation }) => ({
          title: route.params.item.name,
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Favorite")}>
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

export default FavoriteNavigate;
