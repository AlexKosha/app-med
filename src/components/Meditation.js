import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Meditation = () => {
  const navigation = useNavigation();

  const handleNavigationToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Image source={require("../img/logo.png")} style={styles.imageLogo} />
        <Pressable style={styles.btnGoBack} onPress={handleNavigationToHome}>
          <Text style={styles.positionPass}>Ангельська терапія</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  imageLogo: {
    width: 150,
    height: 170,
  },
  btnGoBack: {
    width: 170,
    height: 80,

    backgroundColor: "orange",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  positionPass: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default Meditation;
