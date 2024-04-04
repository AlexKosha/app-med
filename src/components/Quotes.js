import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import dataCourses from "../dataCourses.json";
import { LinearGradient } from "expo-linear-gradient";

const Quotes = () => {
  const navigation = useNavigation();

  const handleNavigationToHome = () => {
    navigation.navigate("Home");
  };

  const renderItem = ({ item }) => (
    <Pressable>
      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.imagesBack}
          source={{ uri: item.img }}
          resizeMode="cover"
        />
      </View>
    </Pressable>
  );
  return (
    <View>
      <View style={styles.headerContainer}>
        <Image source={require("../img/logo.png")} style={styles.imageLogo} />
        <Pressable onPress={handleNavigationToHome}>
          <LinearGradient
            style={styles.btnGoBack}
            colors={["orange", "white", "orange"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.positionPass}>Ангельська терапія</Text>
          </LinearGradient>
        </Pressable>
      </View>
      <View style={styles.quotesContainer}>
        <Text style={styles.positionPass}>Вибери картинку</Text>
        <FlatList
          data={dataCourses}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.btnContainer}>
        <Pressable style={styles.btn} onPress={handleNavigationToHome}>
          <LinearGradient
            style={styles.gradient}
            colors={["orange", "white", "orange"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.positionPass}>Ознайомитись</Text>
          </LinearGradient>
        </Pressable>
        <Pressable style={styles.btn} onPress={handleNavigationToHome}>
          <LinearGradient
            style={styles.gradient}
            colors={["orange", "white", "orange"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.positionPass}>Автоматичне відправлення</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  positionPass: {
    textAlign: "center",
    fontSize: 20,
  },
  quotesContainer: {
    padding: 10,
  },
  imageContainer: {
    marginTop: 10,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 10,
  },
  imagesBack: {
    width: 150,
    height: 250,
  },
  btnContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    marginBottom: 20,
  },
  gradient: {
    width: 200,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Quotes;
