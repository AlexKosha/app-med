import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Home = () => {
  const navigation = useNavigation();

  const handleLogOut = () => {
    navigation.navigate("Login");
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
  return (
    <ImageBackground
      source={{
        uri: "https://kartinki.pics/uploads/posts/2021-07/thumbs/1625809191_52-kartinkin-com-p-meditatsiya-art-art-krasivo-54.jpg",
      }}
      style={styles.container}
    >
      <Pressable style={styles.logOut} onPress={handleLogOut}>
        <Icon name="sign-out" size={30} color="black" />
      </Pressable>
      <Image
        source={require("../img/logo.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Pressable style={styles.btn} onPress={handleNavigateToQuotes}>
        <Text style={styles.positionPass}>Мудрість дня</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={handleNavigateToArchangels}>
        <Text style={styles.positionPass}>Ангельська терапія</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={handleNavigateToMeditation}>
        <Text style={styles.positionPass}>Медитації</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={handleNavigateToMeditation}>
        <Text style={styles.positionPass}>??????</Text>
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  logOut: {
    position: "absolute",
    top: 30,
    right: 10,
  },
  image: {
    // marginBottom: 20,
    width: 350,
    height: 350,
  },

  btn: {
    width: 270,
    height: 70,
    backgroundColor: "orange",
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  positionPass: {
    textAlign: "center",
    fontSize: 24,
  },
});

export default Home;
