import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRoute } from "@react-navigation/native";
import Profile from "./Profile";
import Favorite from "./Favorite";
import MainMenu from "./components/MainMenu";

const Tab = createBottomTabNavigator();
const Home = () => {
  const route = useRoute();
  const { email, password, name } = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          display: "flex",
          paddingHorizontal: 40,
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen
        name="MainMenu"
        component={MainMenu}
        options={({ navigation }) => ({
          title: null,
          headerLeft: null,
          tabBarLabel: "",
          headerTitleAlign: "center",
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{
                alignItems: "center",
                marginTop: focused ? -10 : 0,
              }}
            >
              <Icon
                name="th-large"
                size={focused ? size + 5 : size + 3}
                color={focused ? "tomato" : "gray"}
              />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Icon
                name="sign-out"
                size={30}
                color="black"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={({ navigation }) => ({
          title: "Створити пост",
          headerTitleAlign: "center",
          tabBarLabel: "",
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{ alignItems: "center", marginTop: focused ? -10 : 0 }}
            >
              <Icon
                name="plus"
                size={focused ? size + 5 : size + 3}
                color={focused ? "tomato" : "gray"}
              />
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-left"
                size={30}
                color="black"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{ alignItems: "center", marginTop: focused ? -10 : 0 }}
            >
              <Icon
                name="user-o"
                size={focused ? size + 5 : size + 3}
                color={focused ? "tomato" : "gray"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
