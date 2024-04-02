import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import data from "../data.json";

const Meditation = () => {
  const navigation = useNavigation();

  const handleNavigationToHome = () => {
    navigation.navigate("Home");
  };

  const handleNavigationToExercises = (item) => {
    navigation.navigate("Exercises", { item });
  };

  const renderSeparator = () => <View style={styles.separator} />;

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.btnList}
      onPress={() => handleNavigationToExercises(item)}
    >
      <LinearGradient
        style={styles.listItem}
        colors={["#3498db", "white", "#3498db"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        // style={styles.gradientt}
      >
        <Text>{item.text}</Text>
      </LinearGradient>
    </Pressable>
  );
  return (
    <View style={{ flex: 1 }}>
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

      <View style={styles.containerList}>
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={renderSeparator}
        />
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

    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  positionPass: {
    textAlign: "center",
    fontSize: 20,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  containerList: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: "grey",
  },
  list: {
    width: "100%",
  },
  listContent: {
    alignItems: "center",
  },
  separator: {
    marginBottom: 20,
  },
  listItem: {
    width: 250,
    borderRadius: 8,
    padding: 10,

    alignItems: "center",
  },
});

export default Meditation;
