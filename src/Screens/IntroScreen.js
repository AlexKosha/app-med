import React, { useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const IntroScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Registration");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../img/logo.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Image
        source={require("../img/intro.gif")}
        style={styles.gif}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gif: {
    width: 300,
    height: 300,
  },
  image: {
    marginBottom: 10,
    width: 250,
    height: 250,
  },
});

export default IntroScreen;
