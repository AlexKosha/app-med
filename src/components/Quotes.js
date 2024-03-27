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
        <Pressable style={styles.btnGoBack} onPress={handleNavigationToHome}>
          <Text style={styles.positionPass}>Мудрість дня</Text>
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
          <Text style={styles.positionPass}>Ознайомитись</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={handleNavigationToHome}>
          <Text style={styles.positionPass}>Автоматичне відправлення</Text>
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

    backgroundColor: "orange",
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
    width: 200,
    height: 60,
    backgroundColor: "orange",
    borderRadius: 50,
    marginBottom: 20,
    paddingVertical: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Quotes;
