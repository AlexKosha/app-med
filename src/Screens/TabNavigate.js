import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconDiary from "react-native-vector-icons/SimpleLineIcons";
import IconForProfile from "react-native-vector-icons/Ionicons";
import Profile from "./Profile";
import Favorite from "./Favorite";
import HomeNavigate from "./HomeNavigate";
import DiaryNavigate from "./DiaryNavigate";
import FavoriteNavigate from "./FavoriteNavigate";

const Tab = createBottomTabNavigator();
const TabNavigate = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          display: "flex",
          paddingHorizontal: 40,
          paddingTop: 5,
        },
        lazy: true,
      }}
    >
      <Tab.Screen
        name="HomeNavigate"
        component={HomeNavigate}
        options={({ navigation }) => ({
          headerShown: false,
          title: null,
          headerLeft: null,
          tabBarLabel: "",
          headerTitleAlign: "center",
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{
                alignItems: "center",
                marginTop: focused ? -7 : 0,
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
        name="FavoriteNavigate"
        component={FavoriteNavigate}
        options={() => ({
          headerShown: false,
          title: "Обрані",
          headerTitleAlign: "center",
          tabBarLabel: "",
          tabBarIcon: ({ size, focused }) => (
            <View style={{ alignItems: "center", marginTop: focused ? -7 : 0 }}>
              <Icon
                name="heart-o"
                size={focused ? size + 5 : size + 3}
                color={focused ? "tomato" : "gray"}
              />
            </View>
          ),
        })}
      />

      <Tab.Screen
        name="DiaryNavigate"
        component={DiaryNavigate}
        options={() => ({
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ size, focused }) => (
            <View style={{ alignItems: "center", marginTop: focused ? -7 : 0 }}>
              <IconDiary
                name="book-open"
                size={focused ? size + 5 : size + 3}
                color={focused ? "tomato" : "gray"}
              />
            </View>
          ),
        })}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerShown: false,
          title: "Профіль",
          headerTitleAlign: "center",
          tabBarLabel: "",
          tabBarIcon: ({ size, focused }) => (
            <View style={{ alignItems: "center", marginTop: focused ? -7 : 0 }}>
              <Icon
                name="user-o"
                size={focused ? size + 5 : size + 3}
                color={focused ? "tomato" : "gray"}
              />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <IconForProfile
                name="settings-outline"
                size={30}
                color="black"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigate;
