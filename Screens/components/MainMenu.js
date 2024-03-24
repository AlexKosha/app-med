import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Home = () => {
  const navigation = useNavigation();
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
    <View style={styles.container}>
      <Image
        source={require("../../img/logo.png")}
        style={styles.image}
        resizeMode="contain"
      />
      {/* <View> */}
      <Pressable style={styles.btn} onPress={handleNavigateToQuotes}>
        <Text style={styles.positionPass}>Мудрість дня</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={handleNavigateToArchangels}>
        <Text style={styles.positionPass}>Послання Архангелів</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={handleNavigateToMeditation}>
        <Text style={styles.positionPass}>Медитації</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={handleNavigateToMeditation}>
        <Text style={styles.positionPass}>??????</Text>
      </Pressable>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  image: {
    // marginBottom: 20,
    width: 350,
    height: 350,
  },
  btn: {
    width: 190,
    height: 70,
    backgroundColor: "orange",
    borderRadius: 15,
    marginBottom: 20,
    paddingBottom: 22,
    paddingTop: 22,
  },
  positionPass: {
    textAlign: "center",
    fontSize: 18,
  },
});

export default Home;
