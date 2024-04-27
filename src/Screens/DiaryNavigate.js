import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import NotesModalForm from "../components/NotesModalForm";
import Diary from "./Diary";

const DiaryNavigate = () => {
  const MainStack = createStackNavigator();
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Diary"
        component={Diary}
        options={{
          title: "Щоденник власних думок",
          headerTitleAlign: "center",
          headerLeft: false,
        }}
      />

      <MainStack.Screen
        name="NotesModalForm"
        component={NotesModalForm}
        options={({ navigation }) => ({
          title: "Занотувати думку",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Diary")}>
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

export default DiaryNavigate;
