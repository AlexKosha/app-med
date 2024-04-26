import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as SecureStore from "expo-secure-store";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";

const MainMenu = () => {
  const navigation = useNavigation();

  const checkToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      console.log("Token from SecureStore:", token);
    } catch (error) {
      console.log(error);
    }
    return;
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleLogOut = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
      console.log("Токен успішно видалено");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Помилка при видаленні токену:", error);
    }
  };

  const handleNavigateToQuotes = () => {
    navigation.navigate("Quotes");
  };

  const handleNavigateToArchangels = () => {
    navigation.navigate("Archangels");
  };

  const handleNavigateToMeditation = () => {
    navigation.navigate("Meditation");
  };

  const handleNavigateToNews = () => {
    navigation.navigate("News");
  };
  return (
    <ImageBackground
      source={{
        uri: "https://kartinki.pics/uploads/posts/2021-07/thumbs/1625809191_52-kartinkin-com-p-meditatsiya-art-art-krasivo-54.jpg",
      }}
      style={styles.container}
    >
      <Image
        source={require("../img/logo.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Pressable style={styles.logOut} onPress={handleLogOut}>
        <Icon name="sign-out" size={30} color="black" />
      </Pressable>
      <Pressable style={styles.btn} onPress={handleNavigateToQuotes}>
        <LinearGradient
          style={styles.gradiend}
          colors={["orange", "white", "orange"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.positionPass}>Мудрість дня</Text>
        </LinearGradient>
      </Pressable>
      <Pressable style={styles.btn} onPress={handleNavigateToArchangels}>
        <LinearGradient
          style={styles.gradiend}
          colors={["orange", "white", "orange"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.positionPass}>Ангельська терапія</Text>
        </LinearGradient>
      </Pressable>
      <Pressable style={styles.btn} onPress={handleNavigateToMeditation}>
        <LinearGradient
          style={styles.gradiend}
          colors={["orange", "white", "orange"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.positionPass}>Медитації</Text>
        </LinearGradient>
      </Pressable>
      <Pressable style={styles.btn} onPress={handleNavigateToNews}>
        <LinearGradient
          style={styles.gradiend}
          colors={["orange", "white", "orange"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.positionPass}>Новини</Text>
        </LinearGradient>
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logOut: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  image: {
    width: 350,
    height: 350,
  },
  btn: {
    marginBottom: 20,
  },
  gradiend: {
    width: 270,
    height: 70,
    backgroundColor: "orange",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  positionPass: {
    textAlign: "center",
    fontSize: 24,
  },
});

export default MainMenu;
